#!/usr/bin/env node
// Create a spec branch, reserve its identifiers, and materialize the spec template.
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATE = path.join(SCRIPT_DIR, "..", "assets", "spec.template.md");
const TYPES = new Set(["feat", "fix", "refactor", "chore"]);

function fail(message) {
  process.stderr.write(`${message}\nUsage: node prepare.mjs <type> <slug> <title> [--functional <count>] [--technical <count>] [--product <folder>] [--base <branch>]\n`);
  process.exit(2);
}

function git(root, args, quiet = false) {
  try {
    return execFileSync("git", args, { cwd: root, encoding: "utf8", stdio: quiet ? ["ignore", "pipe", "ignore"] : ["ignore", "pipe", "inherit"] }).trim();
  } catch (error) {
    throw new Error(`git ${args.join(" ")} failed${error.status ? ` (exit ${error.status})` : ""}`);
  }
}

function findRoot() {
  let current = path.resolve(SCRIPT_DIR);
  while (true) {
    if (fs.existsSync(path.join(current, ".aiddbot")) && fs.existsSync(path.join(current, ".git"))) return current;
    const parent = path.dirname(current);
    if (parent === current) return null;
    current = parent;
  }
}

function parseArgs(argv) {
  if (argv.length < 3) fail("Provide the spec type, slug, and title.");
  const [type, slug, title, ...rest] = argv;
  if (!TYPES.has(type)) fail(`Invalid type: ${type}`);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) fail(`Slug must be lowercase kebab-case: ${slug}`);
  if (!title.trim() || /[\r\n]/.test(title)) fail("Title must be non-empty and on one line.");
  const options = { functional: 0, technical: 0, product: ".product", base: null };
  const seen = new Set();
  for (let index = 0; index < rest.length; index += 2) {
    const name = rest[index];
    const value = rest[index + 1];
    if (!value || !["--functional", "--technical", "--product", "--base"].includes(name)) fail(`Invalid option: ${name}`);
    const key = { "--functional": "functional", "--technical": "technical", "--product": "product", "--base": "base" }[name];
    if (seen.has(key)) fail(`Duplicate option: ${name}`);
    seen.add(key);
    if (["functional", "technical"].includes(key)) {
      if (!/^\d+$/.test(value)) fail(`${name} must be a non-negative integer.`);
      options[key] = Number(value);
    } else options[key] = value;
  }
  return { type, slug, title: title.trim(), ...options };
}

function parseCounters(text) {
  const values = {};
  for (const key of ["spec", "functional", "technical", "debt"]) {
    const matches = [...text.matchAll(new RegExp(`^${key}:\\s*(\\d+)\\s*$`, "gm"))];
    if (matches.length !== 1) throw new Error(`Counters must contain exactly one numeric ${key} field.`);
    values[key] = Number(matches[0][1]);
  }
  return values;
}

function replaceCounter(text, key, value) {
  return text.replace(new RegExp(`^${key}:\\s*\\d+\\s*$`, "m"), `${key}: ${value}`);
}

function defaultBranch(root, branches) {
  let remote = "";
  try {
    remote = execFileSync("git", ["symbolic-ref", "--quiet", "--short", "refs/remotes/origin/HEAD"], { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
  } catch { /* Fall through to the conventional local branch names. */ }
  const inferred = remote.startsWith("origin/") ? remote.slice("origin/".length) : branches.includes("main") ? "main" : branches.includes("master") ? "master" : null;
  return inferred;
}

function validateInputs(root, options) {
  const countersFile = path.join(root, ".aiddbot", "counters.yaml");
  const product = path.resolve(root, options.product);
  const required = [countersFile, path.join(product, "specs", "PRD.md"), path.join(product, "quality", "TDR.md")];
  const modelDir = path.join(product, "model");
  if (!fs.existsSync(path.join(modelDir, "model.schema.md"))) {
    throw new Error(`Product model schemas are missing under ${modelDir}; run outline-system first.`);
  }
  const missing = required.filter((file) => !fs.existsSync(file));
  if (missing.length) throw new Error(`Required records are missing; run aiddbot init: ${missing.map((file) => path.relative(root, file)).join(", ")}`);
  return { countersFile, product };
}

function atomicWrite(file, contents) {
  const temporary = `${file}.${process.pid}.tmp`;
  fs.writeFileSync(temporary, contents, "utf8");
  fs.renameSync(temporary, file);
}

function main(argv) {
  const options = parseArgs(argv);
  const root = findRoot();
  if (!root) fail("Run this command from an AIDDbot project repository.");
  const { countersFile, product } = validateInputs(root, options);
  const counterText = fs.readFileSync(countersFile, "utf8");
  const counters = parseCounters(counterText);
  const specNumber = counters.spec + 1;
  const id = `S${String(specNumber).padStart(4, "0")}`;
  const key = `${id}-${options.slug}`;
  const branch = `${options.type}/${key}`;
  const specDir = path.join(product, "specs", key);
  const branches = git(root, ["branch", "--format=%(refname:short)"], true).split(/\r?\n/);
  const base = options.base ?? defaultBranch(root, branches);
  if (!base || !branches.includes(base)) fail(`Could not resolve local default branch${options.base ? ` ${options.base}` : ""}; pass --base <branch>.`);
  if (git(root, ["branch", "--show-current"], true) !== base) fail(`Switch to the default branch (${base}) before preparing a spec.`);
  if (git(root, ["status", "--porcelain"], true)) fail("The worktree must be clean before creating a spec branch.");
  const allBranches = git(root, ["branch", "--all", "--format=%(refname:short)"], true).split(/\r?\n/);
  if (branches.includes(branch) || allBranches.some((name) => name.endsWith(`/${branch}`))) fail(`Spec branch already exists: ${branch}`);
  if (fs.existsSync(specDir)) fail(`Spec directory already exists: ${specDir}`);

  git(root, ["switch", "-c", branch]);
  const nextCounters = replaceCounter(
    replaceCounter(
      replaceCounter(counterText, "spec", specNumber),
      "functional", counters.functional + options.functional,
    ),
    "technical", counters.technical + options.technical,
  );
  atomicWrite(countersFile, nextCounters);

  const template = fs.readFileSync(TEMPLATE, "utf8");
  const now = new Date().toISOString();
  const spec = template
    .replaceAll("S0001", id)
    .replaceAll("{slug}", options.slug)
    .replaceAll("{title}", options.title)
    .replace(/^type: feat/m, `type: ${options.type}`)
    .replaceAll("{DateTime}", now);
  fs.mkdirSync(specDir, { recursive: true });
  fs.writeFileSync(path.join(specDir, "spec.md"), spec, "utf8");

  const ids = (kind, start, count) => Array.from({ length: count }, (_, index) => `${kind}${String(start + index + 1).padStart(4, "0")}`);
  const result = {
    branch,
    spec: id,
    file: path.relative(root, path.join(specDir, "spec.md")),
    functional: ids("F", counters.functional, options.functional),
    technical: ids("T", counters.technical, options.technical),
    status: "draft",
  };
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
}

try {
  main(process.argv.slice(2));
} catch (error) {
  process.stderr.write(`${error.message}\n`);
  process.exitCode = 1;
}
