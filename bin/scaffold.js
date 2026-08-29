#!/usr/bin/env node
"use strict";

const { spawnSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");
const { sourceRoot, refuseOrigin, runOverlay } = require("./lib/overlay");

const VALUE_FLAGS = {
  "--dest": "dest",
  "--back": "back",
  "--front": "front",
  "--e2e": "e2e",
  "--domain": "domain",
};

const CATALOG = {
  back: ["express"],
  front: ["standard"],
  e2e: ["playwright"],
  domain: ["astro-bookings", "acorn-bank", "adventure-bazaar", "alpine-basecamp"],
};

const DEFAULTS = {
  back: "express",
  front: "standard",
  e2e: "playwright",
};

function npxBin() {
  return process.platform === "win32" ? "npx.cmd" : "npx";
}

function help() {
  process.stderr.write(`Usage:
  node bin/scaffold.js --domain NAME [options]
  npx --allow-git=all -p github:AIDDbot/AIDDbot aiddbot-scaffold --domain NAME [options]

Fetch workshop archetypes, git init if needed, then copy the AIDD overlay (same as bin/aiddbot.js).
--domain is required. Back, front, and e2e default to express, standard, and playwright.
Existing archetype folders are left alone.

Options
  --dest DIR     Workshop root (default: current directory).
                 Must not be the AIDDbot origin or a folder inside it.
  --back TECH    AIDDbot/back-{TECH} → back/     (${CATALOG.back.join(", ")})
  --front TECH   AIDDbot/front-{TECH} → front/   (${CATALOG.front.join(", ")})
  --e2e TECH     AIDDbot/e2e-{TECH} → e2e/       (${CATALOG.e2e.join(", ")})
  --domain NAME  AIDDbot/domain-samples/{NAME} → docs/domain/
                 (${CATALOG.domain.join(", ")})
  --dry-run      Print the plan; write nothing
  --force        Overlay only: overwrite differing AIDD files
  --list         Print the catalog and exit

Example
  node bin/scaffold.js --dest ../workshop --domain alpine-basecamp
`);
}

function catalogValue(key, value) {
  return key === "dest" ? value : value.toLowerCase();
}

function parseArgs(argv) {
  const opts = {
    dest: null,
    back: null,
    front: null,
    e2e: null,
    domain: null,
    dryRun: false,
    force: false,
    list: false,
  };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--dry-run") {
      opts.dryRun = true;
      continue;
    }
    if (arg === "--force") {
      opts.force = true;
      continue;
    }
    if (arg === "--list") {
      opts.list = true;
      continue;
    }
    if (arg.startsWith("--") && arg.includes("=")) {
      const eq = arg.indexOf("=");
      const flag = arg.slice(0, eq);
      const value = arg.slice(eq + 1);
      const key = VALUE_FLAGS[flag];
      if (!key || !value) return { error: `Invalid flag: ${arg}` };
      opts[key] = catalogValue(key, value);
      continue;
    }
    const key = VALUE_FLAGS[arg];
    if (key) {
      const value = argv[i + 1];
      if (!value || value.startsWith("-")) return { error: `${arg} needs a value` };
      opts[key] = catalogValue(key, value);
      i += 1;
      continue;
    }
    if (arg.startsWith("-")) return { error: `Unknown flag: ${arg}` };
    return { error: `Unexpected argument: ${arg}` };
  }
  return { opts };
}

function hasContent(dir) {
  try {
    return fs.readdirSync(dir).length > 0;
  } catch {
    return false;
  }
}

function ensureGit(destRoot, dryRun) {
  const gitDir = path.join(destRoot, ".git");
  if (fs.existsSync(gitDir)) {
    process.stdout.write("git        skip       already a repo\n");
    return;
  }
  if (dryRun) {
    process.stdout.write("git        create     git init\n");
    return;
  }
  fs.mkdirSync(destRoot, { recursive: true });
  const result = spawnSync("git", ["init"], { cwd: destRoot, encoding: "utf8" });
  if (result.status !== 0) {
    process.stderr.write("git init failed; continuing without a repo.\n");
    if (result.stderr) process.stderr.write(result.stderr);
    return;
  }
  process.stdout.write("git        create     git init\n");
}

function displayRel(destRoot, dest) {
  const rel = path.relative(destRoot, dest);
  return (rel || ".").split(path.sep).join("/");
}

function runTiged(destRoot, repo, dest, dryRun) {
  const shown = displayRel(destRoot, dest);
  if (dryRun) {
    process.stdout.write(`fetch      would      ${repo} → ${shown}\n`);
    return 0;
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  if (fs.existsSync(dest) && !hasContent(dest)) fs.rmdirSync(dest);
  process.stdout.write(`fetch      tiged      ${repo} → ${shown}\n`);
  const result = spawnSync(npxBin(), ["--yes", "tiged", repo, dest], {
    stdio: "inherit",
    windowsHide: true,
  });
  if (result.status !== 0) {
    process.stderr.write(`tiged failed: ${repo}\n`);
    return result.status ?? 1;
  }
  return 0;
}

function fetchPiece(destRoot, repo, dest, dryRun) {
  if (hasContent(dest)) {
    process.stdout.write(`fetch      skip       ${repo} → ${displayRel(destRoot, dest)} (exists)\n`);
    return 0;
  }
  return runTiged(destRoot, repo, dest, dryRun);
}

function piecesFrom(opts, destRoot) {
  const pieces = [];
  if (opts.back) pieces.push({ repo: `AIDDbot/back-${opts.back}`, dest: path.join(destRoot, "back") });
  if (opts.front) pieces.push({ repo: `AIDDbot/front-${opts.front}`, dest: path.join(destRoot, "front") });
  if (opts.e2e) pieces.push({ repo: `AIDDbot/e2e-${opts.e2e}`, dest: path.join(destRoot, "e2e") });
  if (opts.domain) {
    pieces.push({
      repo: `AIDDbot/domain-samples/${opts.domain}`,
      dest: path.join(destRoot, "docs", "domain"),
    });
  }
  return pieces;
}

function listCatalog() {
  process.stdout.write(`--back     ${CATALOG.back.join(", ")}\n`);
  process.stdout.write(`--front    ${CATALOG.front.join(", ")}\n`);
  process.stdout.write(`--e2e      ${CATALOG.e2e.join(", ")}\n`);
  process.stdout.write(`--domain   ${CATALOG.domain.join(", ")}\n`);
  return 0;
}

function applyDefaults(opts) {
  for (const key of Object.keys(DEFAULTS)) {
    if (!opts[key]) opts[key] = DEFAULTS[key];
  }
  return opts;
}

function validateCatalog(opts) {
  for (const key of Object.keys(CATALOG)) {
    const value = opts[key];
    if (!value) continue;
    if (!CATALOG[key].includes(value)) {
      return `Unknown --${key} "${value}". Choose: ${CATALOG[key].join(", ")}`;
    }
  }
  return null;
}

const parsed = parseArgs(process.argv.slice(2));
if (parsed.error) {
  process.stderr.write(`${parsed.error}\n`);
  help();
  process.exit(1);
}

const { opts } = parsed;
if (opts.list) process.exit(listCatalog());

applyDefaults(opts);
const invalid = validateCatalog(opts);
if (invalid) {
  process.stderr.write(`${invalid}\n`);
  help();
  process.exit(1);
}

const destRoot = path.resolve(opts.dest ?? process.cwd());
if (!opts.domain) {
  process.stderr.write(`--domain is required. Choose: ${CATALOG.domain.join(", ")}\n`);
  help();
  process.exit(1);
}
if (refuseOrigin(destRoot, "scaffold")) process.exit(1);

const pieces = piecesFrom(opts, destRoot);

process.stdout.write(`source     ${sourceRoot}\n`);
process.stdout.write(`dest       ${destRoot}\n`);
if (!opts.dryRun) fs.mkdirSync(destRoot, { recursive: true });
ensureGit(destRoot, opts.dryRun);
for (const piece of pieces) {
  const status = fetchPiece(destRoot, piece.repo, piece.dest, opts.dryRun);
  if (status !== 0) process.exit(status);
}
process.stdout.write("overlay    aiddbot.js\n");
const conflicts = runOverlay(destRoot, opts);
process.exit(conflicts ? 2 : 0);
