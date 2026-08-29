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

function npxBin() {
  return process.platform === "win32" ? "npx.cmd" : "npx";
}

function help() {
  process.stderr.write(`Usage:
  node bin/scaffold.js --back TECH --front TECH --e2e TECH --domain NAME [options]
  npx --allow-git=all -p github:AIDDbot/AIDDbot aiddbot-scaffold --back TECH --front TECH --e2e TECH --domain NAME [options]

Fetch workshop archetypes, git init if needed, then copy the AIDD overlay (same as bin/aiddbot.js).
At least one of --back --front --e2e --domain is required. Existing archetype folders are left alone.

Options
  --dest DIR     Workshop root (default: current directory).
                 Must not be the AIDDbot origin or a folder inside it.
  --back TECH    AIDDbot/back-{TECH} → back/
  --front TECH   AIDDbot/front-{TECH} → front/
  --e2e TECH     AIDDbot/e2e-{TECH} → e2e/
  --domain NAME  AIDDbot/domain-samples/{NAME} → docs/domain/
  --dry-run      Print the plan; write nothing
  --force        Overlay only: overwrite differing AIDD files
  --list         List archetype techs (needs gh)
`);
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
      opts[key] = value;
      continue;
    }
    const key = VALUE_FLAGS[arg];
    if (key) {
      const value = argv[i + 1];
      if (!value || value.startsWith("-")) return { error: `${arg} needs a value` };
      opts[key] = value;
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

function listArchetypes() {
  const result = spawnSync("gh", ["repo", "list", "AIDDbot", "--limit", "200", "--json", "name"], {
    encoding: "utf8",
  });
  if (result.error || result.status !== 0) {
    process.stderr.write(
      "Install GitHub CLI (gh) to list archetypes, or browse https://github.com/orgs/AIDDbot/repositories\n"
    );
    process.stderr.write("Names: back-{tech}, front-{tech}, e2e-{tech}, domain-samples/{domain}\n");
    return result.error ? 1 : result.status ?? 1;
  }
  const names = JSON.parse(result.stdout)
    .map((row) => row.name)
    .sort();
  const back = [];
  const front = [];
  const e2e = [];
  const other = [];
  for (const name of names) {
    if (name.startsWith("back-")) back.push(name.slice(5));
    else if (name.startsWith("front-")) front.push(name.slice(6));
    else if (name.startsWith("e2e-")) e2e.push(name.slice(4));
    else other.push(name);
  }
  process.stdout.write(`--back     ${back.join(", ") || "(none)"}\n`);
  process.stdout.write(`--front    ${front.join(", ") || "(none)"}\n`);
  process.stdout.write(`--e2e      ${e2e.join(", ") || "(none)"}\n`);
  process.stdout.write(
    `--domain   subdirectory of AIDDbot/domain-samples${other.includes("domain-samples") ? "" : " (repo not listed)"}\n`
  );
  return 0;
}

const parsed = parseArgs(process.argv.slice(2));
if (parsed.error) {
  process.stderr.write(`${parsed.error}\n`);
  help();
  process.exit(1);
}

const { opts } = parsed;
if (opts.list) process.exit(listArchetypes());

const destRoot = path.resolve(opts.dest ?? process.cwd());
const pieces = piecesFrom(opts, destRoot);
if (!pieces.length) {
  process.stderr.write("Needs at least one of --back --front --e2e --domain (or --list).\n");
  help();
  process.exit(1);
}
if (refuseOrigin(destRoot, "scaffold")) process.exit(1);

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
