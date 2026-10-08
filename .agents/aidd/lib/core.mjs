// Shared plumbing: errors, the repository root, JSON records, IDs, git, and the journal.
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

export class UsageError extends Error {}
export class RuleError extends Error {}
export class UnavailableError extends Error {}

/** Split argv into positional arguments and `--name value` / `--flag` options. */
export function parseArgs(argv) {
  const args = [];
  const flags = {};
  for (let i = 0; i < argv.length; i++) {
    const token = argv[i];
    if (!token.startsWith("--")) {
      args.push(token);
      continue;
    }
    const next = argv[i + 1];
    const hasValue = next !== undefined && !next.startsWith("--");
    flags[token.slice(2)] = hasValue ? next : true;
    if (hasValue) i++;
  }
  return { args, flags };
}

export function git(root, args, { allowFailure = false, env } = {}) {
  try {
    const options = { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], ...(env && { env: { ...process.env, ...env } }) };
    return execFileSync("git", args, options).trim();
  } catch (error) {
    if (allowFailure) return null;
    const detail = error.stderr?.toString().trim() || error.message;
    throw new RuleError(`git ${args.join(" ")} failed: ${detail}`);
  }
}

/** The git root of the working directory; it must hold `.aiddbot/`. */
export function findRoot() {
  const root = git(process.cwd(), ["rev-parse", "--show-toplevel"], { allowFailure: true });
  if (!root || !fs.existsSync(path.join(root, ".aiddbot"))) {
    throw new RuleError("Run inside a git repository prepared by `aiddbot init`.");
  }
  return path.resolve(root);
}

export const aiddbotPath = (root, ...parts) => path.join(root, ".aiddbot", ...parts);
export const productPath = (root, ...parts) => path.join(root, ".product", ...parts);
export const relative = (root, file) => path.relative(root, file).split(path.sep).join("/");

export function readJson(file, fallback) {
  if (!fs.existsSync(file)) {
    if (fallback !== undefined) return fallback;
    throw new RuleError(`Missing file: ${file}`);
  }
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (error) {
    throw new RuleError(`${file} is not valid JSON (${error.message}); restore it with git.`);
  }
}

export function writeJson(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

/** Reserve the next `S` or `D` number in `.aiddbot/counters.yaml` and return its ID. */
/** The numbers of the `S####-` names in `dir` and its subfolders. */
function specNumbers(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { recursive: true })
    .map((name) => /(?:^|[\\/])S(\d{4})-/.exec(name)?.[1])
    .filter(Boolean)
    .map(Number);
}

export function nextId(root, kind) {
  const file = aiddbotPath(root, "counters.yaml");
  const key = kind === "S" ? "spec" : "debt";
  const text = fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "spec: 0\ndebt: 0\n";
  const pattern = new RegExp(`^${key}:\\s*(\\d+)\\s*$`, "m");
  // Spec IDs also skip the ones already in use, such as the archetype foundation specs, so test tags never collide.
  const taken = kind === "S" ? [productPath(root, "specs"), productPath(root, "archetypes")].flatMap(specNumbers) : [];
  const number = Math.max(Number(pattern.exec(text)?.[1] ?? 0), ...taken) + 1;
  const line = `${key}: ${number}`;
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const updated = pattern.test(text) ? text.replace(pattern, line) : `${text.trimEnd()}\n${line}\n`;
  fs.writeFileSync(file, updated, "utf8");
  return `${kind}${String(number).padStart(4, "0")}`;
}

/** The git tree of `dir` as the working copy holds it now, ignored files left out: equal trees mean equal files. */
export function workingTree(root, dir) {
  const index = path.join(os.tmpdir(), `aidd-index-${process.pid}-${Date.now()}`);
  const real = path.resolve(root, git(root, ["rev-parse", "--git-path", "index"]));
  if (fs.existsSync(real)) fs.copyFileSync(real, index);
  try {
    const env = { GIT_INDEX_FILE: index };
    const prefix = dir === "." ? [] : [`--prefix=${dir.replace(/[\\/]+$/, "")}/`];
    git(root, ["add", "-A", "--", dir], { env });
    return git(root, ["write-tree", ...prefix], { env, allowFailure: true });
  } finally {
    fs.rmSync(index, { force: true });
  }
}

export const currentBranch = (root) => git(root, ["branch", "--show-current"]);

/** The default branch: origin's HEAD, else `main`, else `master`. */
export function defaultBranch(root) {
  const remote = git(root, ["symbolic-ref", "--short", "refs/remotes/origin/HEAD"], { allowFailure: true });
  if (remote) return remote.replace(/^origin\//, "");
  const branches = git(root, ["branch", "--format=%(refname:short)"]).split(/\r?\n/);
  const found = ["main", "master"].find((name) => branches.includes(name));
  if (!found) throw new RuleError("No default branch found (main or master).");
  return found;
}

/** Commit only `paths` with `message`; the record stands even when git cannot commit it. */
export function commitPaths(root, paths, message) {
  git(root, ["add", "-A", "--", ...paths], { allowFailure: true });
  if (!git(root, ["diff", "--cached", "--name-only", "--", ...paths], { allowFailure: true })) return false;
  return git(root, ["commit", "-q", "-m", message, "--", ...paths], { allowFailure: true }) !== null;
}

/** Merge `source` into `base` with a merge commit, then delete `source`. */
export function mergeAndDelete(root, source, base) {
  git(root, ["switch", base]);
  try {
    git(root, ["merge", "--no-ff", "--no-edit", source]);
  } catch (error) {
    git(root, ["merge", "--abort"], { allowFailure: true });
    git(root, ["switch", source], { allowFailure: true });
    throw new RuleError(`Merge into ${base} failed; ${source} is kept. ${error.message}`);
  }
  git(root, ["branch", "-d", source]);
}

const MAX_SUMMARY = 128;
const pad2 = (value) => String(value).padStart(2, "0");

/** Append one line to today's journal; a journal failure never undoes the command. */
export function journal(root, { actor = "aidd", event, spec = "-", summary = "", level = "INFO" }) {
  try {
    const now = new Date();
    const date = `${now.getFullYear()}-${pad2(now.getMonth() + 1)}-${pad2(now.getDate())}`;
    const time = `${pad2(now.getHours())}:${pad2(now.getMinutes())}:${pad2(now.getSeconds())}`;
    const text = summary.replace(/\s+/g, " ").trim() || "-";
    const capped = text.length > MAX_SUMMARY ? `${text.slice(0, MAX_SUMMARY - 1)}…` : text;
    const cells = [time, actor.padEnd(6), spec.padEnd(6), event.padEnd(10), level.padEnd(5), capped];
    const file = aiddbotPath(root, "journals", `${date}.log`);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    const header = fs.existsSync(file) ? "" : `# AIDDbot journal ${date}\n`;
    fs.appendFileSync(file, `${header}${cells.join(" ")}\n`, "utf8");
  } catch (error) {
    process.stderr.write(`Journal entry skipped: ${error.message}\n`);
  }
}
