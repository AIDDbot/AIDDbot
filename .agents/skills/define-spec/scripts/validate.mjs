#!/usr/bin/env node
// Check deterministic spec/PRD identifiers and change bookkeeping before approval.
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const TYPES = new Set(["feat", "fix", "refactor", "chore"]);

function fail(message) {
  process.stderr.write(`${message}\nUsage: node validate.mjs <spec-directory> [--product <folder>] [--base <branch>]\n`);
  process.exit(2);
}

function git(root, args) {
  return execFileSync("git", args, { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
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

function options(argv) {
  if (!argv.length) fail("Provide a spec directory.");
  const result = { specDir: argv[0], product: ".product", base: null };
  const seen = new Set();
  for (let index = 1; index < argv.length; index += 2) {
    const flag = argv[index];
    const value = argv[index + 1];
    if (!value || !["--product", "--base"].includes(flag)) fail(`Invalid option: ${flag}`);
    const key = flag === "--product" ? "product" : "base";
    if (seen.has(key)) fail(`Duplicate option: ${flag}`);
    seen.add(key);
    result[key] = value;
  }
  return result;
}

function parseFields(text) {
  const frontmatter = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(text)?.[1];
  if (!frontmatter) throw new Error("Spec frontmatter is missing.");
  const fields = {};
  for (const key of ["id", "slug", "key", "type", "branch", "status"]) {
    const value = new RegExp(`^${key}:\\s*(.+?)\\s*(?:#.*)?$`, "m").exec(frontmatter)?.[1];
    if (!value) throw new Error(`Spec frontmatter is missing ${key}.`);
    fields[key] = value.trim();
  }
  return fields;
}

function counterValues(text) {
  const values = {};
  for (const key of ["spec", "functional", "technical", "debt"]) {
    const matches = [...text.matchAll(new RegExp(`^${key}:\\s*(\\d+)\\s*$`, "gm"))];
    if (matches.length !== 1) throw new Error(`Counters must contain exactly one numeric ${key} field.`);
    values[key] = Number(matches[0][1]);
  }
  return values;
}

function requirementMap(text, label) {
  const map = new Map();
  for (const line of text.split(/\r?\n/)) {
    if (!/\*\*[FT]\d{4}\*\*/.test(line)) continue;
    const match = /^- \*\*([FT]\d{4})\*\*: (\S.*)$/.exec(line);
    if (!match) throw new Error(`${label} has a malformed requirement line: ${line}`);
    if (map.has(match[1])) throw new Error(`${label} repeats requirement ${match[1]}.`);
    map.set(match[1], match[2]);
  }
  return map;
}

function verificationChanges(specText) {
  const heading = /^## Verification\s*$/m.exec(specText);
  if (!heading) throw new Error("Spec is missing the Verification section.");
  const tail = specText.slice(heading.index + heading[0].length);
  const nextSection = /^## /m.exec(tail);
  const section = nextSection ? tail.slice(0, nextSection.index) : tail;
  const changes = new Map();
  for (const line of section.split(/\r?\n/)) {
    const match = /^\|\s*([FT]\d{4})\s*\|\s*(new|changed|deprecated|related)\s*\|/i.exec(line);
    if (!match) continue;
    const id = match[1];
    if (changes.has(id)) throw new Error(`Verification table repeats ${id}.`);
    changes.set(id, match[2].toLowerCase());
  }
  return changes;
}

function main(argv) {
  const args = options(argv);
  const root = findRoot();
  if (!root) fail("Could not find the project root.");
  const product = path.resolve(root, args.product);
  const specDir = path.resolve(root, args.specDir);
  const specFile = path.join(specDir, "spec.md");
  const prdFile = path.join(product, "specs", "PRD.md");
  const countersFile = path.join(root, ".aiddbot", "counters.yaml");
  for (const file of [specFile, prdFile, countersFile]) if (!fs.existsSync(file)) throw new Error(`Required file is missing: ${path.relative(root, file)}`);

  const specText = fs.readFileSync(specFile, "utf8");
  const spec = parseFields(specText);
  const identity = /^(S\d{4})-([a-z0-9]+(?:-[a-z0-9]+)*)$/.exec(spec.key);
  if (!identity || spec.id !== identity[1] || spec.slug !== identity[2]) throw new Error("Spec id, slug, and key do not agree.");
  if (!TYPES.has(spec.type) || spec.branch !== `${spec.type}/${spec.key}`) throw new Error("Spec type, branch, and key do not agree.");
  if (!["draft", "in-progress"].includes(spec.status)) throw new Error(`Unexpected pre-approval spec status: ${spec.status}`);
  const branch = git(root, ["branch", "--show-current"]);
  if (branch !== spec.branch) throw new Error(`Current branch ${branch} does not match spec branch ${spec.branch}.`);

  const branches = git(root, ["branch", "--format=%(refname:short)"]).split(/\r?\n/);
  let remoteDefault = "";
  try { remoteDefault = git(root, ["symbolic-ref", "--quiet", "--short", "refs/remotes/origin/HEAD"]); } catch { /* Use conventional local names below. */ }
  const inferredBase = remoteDefault.startsWith("origin/") ? remoteDefault.slice("origin/".length)
    : branches.includes("main") ? "main" : branches.includes("master") ? "master" : null;
  const base = args.base ?? inferredBase;
  if (!base || !branches.includes(base)) throw new Error(`Could not resolve local base branch${args.base ? ` ${args.base}` : ""}.`);
  const counters = counterValues(fs.readFileSync(countersFile, "utf8"));
  const baseCounters = counterValues(git(root, ["show", `${base}:.aiddbot/counters.yaml"]));
  const allocatedSpec = Number(spec.id.slice(1));
  if (allocatedSpec <= baseCounters.spec || allocatedSpec !== counters.spec) throw new Error(`Spec ID ${spec.id} is not the ID reserved by this branch's counters.`);

  const currentText = fs.readFileSync(prdFile, "utf8");
  const basePrdPath = path.relative(root, prdFile).split(path.sep).join("/");
  const baseText = git(root, ["show", `${base}:${basePrdPath}`]);
  const current = requirementMap(currentText, "PRD");
  const previous = requirementMap(baseText, "Base PRD");
  const changes = verificationChanges(specText);

  for (const [id, content] of current) {
    const prior = previous.get(id);
    const change = changes.get(id);
    if (!prior) {
      if (!change || change !== "new") throw new Error(`New PRD requirement ${id} needs a 'new' verification row.`);
      const number = Number(id.slice(1));
      const counter = id.startsWith("F") ? counters.functional : counters.technical;
      const priorCounter = id.startsWith("F") ? baseCounters.functional : baseCounters.technical;
      if (number <= priorCounter || number > counter) throw new Error(`New requirement ${id} is outside this branch's reserved ID range.`);
    } else if (prior !== content) {
      if (change !== "changed") throw new Error(`Changed requirement ${id} needs a 'changed' verification row.`);
    }
    if (!prior || prior !== content) {
      if (!/\b(?:IF|WHEN|WHILE|WHERE|SHALL)\b/.test(content) || /\b(?:if|when|while|where|shall)\b/.test(content)) {
        throw new Error(`New or changed requirement ${id} must contain uppercase EARS keywords.`);
      }
    }
  }
  for (const [id] of previous) {
    if (!current.has(id)) throw new Error(`Requirement ${id} was removed before shipping; keep deprecated requirements in the PRD.`);
  }
  for (const [id] of changes) if (!current.has(id)) throw new Error(`Verification row ${id} does not exist in the PRD.`);

  process.stdout.write(`${JSON.stringify({ spec: spec.id, branch, requirements: current.size, verificationRows: changes.size, valid: true }, null, 2)}\n`);
}

try {
  main(process.argv.slice(2));
} catch (error) {
  process.stderr.write(`${error.message}\n`);
  process.exitCode = 1;
}
