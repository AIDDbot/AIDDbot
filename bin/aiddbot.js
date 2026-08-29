#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");

const sourceRoot = path.resolve(__dirname, "..");
const destRoot = path.resolve(process.cwd());

const TREES = [
  ".agents/agents",
  ".agents/commands",
  ".agents/rules",
  ".agents/skills",
  ".claude/agents",
  ".claude/commands",
  ".claude/rules",
  ".cursor/agents",
  ".cursor/commands",
  ".cursor/rules",
  ".github/prompts",
  ".github/agents",
  ".github/instructions",
];

const KNOWN_FLAGS = new Set(["--dry-run", "--force"]);

function sameDir(a, b) {
  try {
    return fs.realpathSync(a) === fs.realpathSync(b);
  } catch {
    return path.resolve(a) === path.resolve(b);
  }
}

function parseArgs(argv) {
  const flags = [];
  const positionals = [];
  for (const arg of argv) {
    if (arg.startsWith("-")) flags.push(arg);
    else positionals.push(arg);
  }
  return { command: positionals[0] ?? "init", flags };
}

function help() {
  process.stderr.write(
    "Usage: npx github:AIDDbot/AIDDbot init [--dry-run] [--force]\nCopies AIDDbot into the current directory. Existing files are left alone unless they match (skipped) or you pass --force.\n"
  );
}

function shouldSkip(relPosix) {
  if (relPosix === ".claude/agents/runs" || relPosix.startsWith(".claude/agents/runs/")) {
    return true;
  }
  const parts = relPosix.split("/");
  return parts.includes(".git") || parts.includes("node_modules");
}

function walkFiles(absDir, relPosix, out) {
  if (shouldSkip(relPosix)) return;
  let entries;
  try {
    entries = fs.readdirSync(absDir, { withFileTypes: true });
  } catch {
    return;
  }
  entries.sort((a, b) => a.name.localeCompare(b.name));
  for (const ent of entries) {
    const childRel = relPosix ? `${relPosix}/${ent.name}` : ent.name;
    const childAbs = path.join(absDir, ent.name);
    if (ent.isDirectory()) walkFiles(childAbs, childRel, out);
    else if (ent.isFile()) {
      if (!shouldSkip(childRel)) out.push(childRel);
    }
  }
}

function overlayFiles() {
  const files = [];
  for (const tree of TREES) {
    walkFiles(path.join(sourceRoot, ...tree.split("/")), tree, files);
  }
  return files;
}

function srcAbs(relPosix) {
  return path.join(sourceRoot, ...relPosix.split("/"));
}

function destAbs(relPosix) {
  return path.join(destRoot, ...relPosix.split("/"));
}

function classify(relPosix) {
  const to = destAbs(relPosix);
  if (!fs.existsSync(to)) return "create";
  let destStat;
  try {
    destStat = fs.lstatSync(to);
  } catch {
    return "conflict";
  }
  if (!destStat.isFile()) return "conflict";
  const src = fs.readFileSync(srcAbs(relPosix));
  const dest = fs.readFileSync(to);
  return src.equals(dest) ? "skip-same" : "conflict";
}

function isFile(abs) {
  try {
    return fs.lstatSync(abs).isFile();
  } catch {
    return false;
  }
}

function inventory(force) {
  const rows = [];
  for (const relPosix of overlayFiles()) {
    let action = classify(relPosix);
    if (action === "conflict" && force && isFile(destAbs(relPosix))) {
      action = "overwritten";
    }
    rows.push({ action, file: relPosix });
  }
  return rows;
}

function printInventory(rows) {
  const counts = { create: 0, "skip-same": 0, conflict: 0, overwritten: 0 };
  for (const { action, file } of rows) {
    counts[action] += 1;
    process.stdout.write(`${action.padEnd(11)} ${file}\n`);
  }
  process.stdout.write(
    `# create ${counts.create}  skip-same ${counts["skip-same"]}  conflict ${counts.conflict}  overwritten ${counts.overwritten}\n`
  );
  return counts.conflict;
}

function apply(rows) {
  for (const { action, file } of rows) {
    if (action !== "create" && action !== "overwritten") continue;
    const to = destAbs(file);
    fs.mkdirSync(path.dirname(to), { recursive: true });
    fs.copyFileSync(srcAbs(file), to);
  }
}

const { command, flags } = parseArgs(process.argv.slice(2));

if (command !== "init") {
  help();
  process.exit(1);
}

const unknown = flags.filter((f) => !KNOWN_FLAGS.has(f));
if (unknown.length) {
  process.stderr.write(`Unknown flag: ${unknown.join(", ")}\n`);
  help();
  process.exit(1);
}

if (sameDir(sourceRoot, destRoot)) {
  process.stderr.write(
    "Refusing to run inside the AIDDbot origin. Run init from the target project directory.\n"
  );
  process.exit(1);
}

const dryRun = flags.includes("--dry-run");
const force = flags.includes("--force");

const rows = inventory(force);
if (!dryRun) apply(rows);
const conflicts = printInventory(rows);
process.exit(conflicts ? 2 : 0);
