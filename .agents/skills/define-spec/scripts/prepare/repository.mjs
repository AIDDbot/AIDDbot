import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));

export function findRoot() {
  let current = path.resolve(HERE, "..", "..", "..", "..");
  while (true) {
    if (fs.existsSync(path.join(current, ".aiddbot")) && fs.existsSync(path.join(current, ".git"))) return current;
    const parent = path.dirname(current);
    if (parent === current) return null;
    current = parent;
  }
}

export function git(root, args, quiet = false) {
  try {
    const stdio = quiet ? ["ignore", "pipe", "ignore"] : ["ignore", "pipe", "inherit"];
    return execFileSync("git", args, { cwd: root, encoding: "utf8", stdio }).trim();
  } catch (error) {
    throw new Error(`git ${args.join(" ")} failed${error.status ? ` (exit ${error.status})` : ""}`);
  }
}

export function defaultBranch(root, branches) {
  let remote = "";
  try { remote = git(root, ["symbolic-ref", "--quiet", "--short", "refs/remotes/origin/HEAD"], true); } catch { /* Fall through to local names. */ }
  if (remote.startsWith("origin/")) return remote.slice("origin/".length);
  return branches.includes("main") ? "main" : branches.includes("master") ? "master" : null;
}

export function checkRecords(root, options) {
  const product = path.resolve(root, options.product);
  const countersFile = path.join(root, ".aiddbot", "counters.yaml");
  const required = [countersFile, path.join(product, "specs", "PRD.md"), path.join(product, "quality", "TDR.md")];
  const model = path.join(product, "model", "model.schema.md");
  if (!fs.existsSync(model)) throw new Error(`Product model schema missing under ${path.dirname(model)}; run outline-system first.`);
  const missing = required.filter((file) => !fs.existsSync(file));
  if (missing.length) throw new Error(`Required records are missing; run aiddbot init: ${missing.map((file) => path.relative(root, file)).join(", ")}`);
  return { product, countersFile };
}

export function checkBranch(root, base, branch, specDir) {
  const branches = git(root, ["branch", "--format=%(refname:short)"], true).split(/\r?\n/);
  if (!branches.includes(base)) throw new Error(`Unknown base branch: ${base}`);
  if (git(root, ["branch", "--show-current"], true) !== base) throw new Error(`Switch to the default branch (${base}) before preparing a spec.`);
  if (git(root, ["status", "--porcelain"], true)) throw new Error("The worktree must be clean before creating a spec branch.");
  const all = git(root, ["branch", "--all", "--format=%(refname:short)"], true).split(/\r?\n/);
  if (branches.includes(branch) || all.some((name) => name.endsWith(`/${branch}`))) throw new Error(`Spec branch already exists: ${branch}`);
  if (fs.existsSync(specDir)) throw new Error(`Spec directory already exists: ${specDir}`);
}
