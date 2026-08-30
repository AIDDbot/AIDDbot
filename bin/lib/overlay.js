"use strict";

const fs = require("node:fs");
const path = require("node:path");

const sourceRoot = path.resolve(__dirname, "../..");

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

function sameDir(a, b) {
  try {
    return fs.realpathSync(a) === fs.realpathSync(b);
  } catch {
    return path.resolve(a) === path.resolve(b);
  }
}

function isInside(child, parent) {
  const rel = path.relative(path.resolve(parent), path.resolve(child));
  return rel === "" || (!rel.startsWith("..") && !path.isAbsolute(rel));
}

function refuseOrigin(destRoot, kind) {
  if (!isInside(destRoot, sourceRoot) && !sameDir(destRoot, sourceRoot)) return false;
  const hint =
    kind === "init"
      ? "Run it from the target project directory."
      : "Pass --dest to a directory outside this repo.";
  process.stderr.write(`Refusing to ${kind} inside the AIDDbot origin. ${hint}\n`);
  return true;
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
    else if (ent.isFile() && !shouldSkip(childRel)) out.push(childRel);
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

function destAbs(destRoot, relPosix) {
  return path.join(destRoot, ...relPosix.split("/"));
}

function isFile(abs) {
  try {
    return fs.lstatSync(abs).isFile();
  } catch {
    return false;
  }
}

function classify(destRoot, relPosix) {
  const to = destAbs(destRoot, relPosix);
  if (!fs.existsSync(to)) return "create";
  let destStat;
  try {
    destStat = fs.lstatSync(to);
  } catch {
    return "conflict";
  }
  if (!destStat.isFile()) return "conflict";
  return fs.readFileSync(srcAbs(relPosix)).equals(fs.readFileSync(to)) ? "skip-same" : "conflict";
}

function overlayInventory(destRoot, force) {
  const rows = [];
  for (const relPosix of overlayFiles()) {
    let action = classify(destRoot, relPosix);
    if (action === "conflict" && force && isFile(destAbs(destRoot, relPosix))) {
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

function applyOverlay(destRoot, rows) {
  for (const { action, file } of rows) {
    if (action !== "create" && action !== "overwritten") continue;
    const to = destAbs(destRoot, file);
    fs.mkdirSync(path.dirname(to), { recursive: true });
    fs.copyFileSync(srcAbs(file), to);
  }
}

function runOverlay(destRoot, { dryRun, force }) {
  const rows = overlayInventory(destRoot, force);
  if (!dryRun) applyOverlay(destRoot, rows);
  const conflicts = printInventory(rows);
  const written = rows.filter((row) => row.action === "create" || row.action === "overwritten").map((row) => row.file);
  return { conflicts, written };
}

module.exports = { sourceRoot, refuseOrigin, runOverlay };
