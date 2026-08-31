#!/usr/bin/env node
"use strict";

const { spawnSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");
const { sourceRoot, refuseOrigin, runOverlay } = require("./lib/overlay");
const { ensureGit } = require("./lib/git");

const VALUE_FLAGS = {
  "--dest": "dest",
  "--back": "back",
  "--front": "front",
  "--e2e": "e2e",
  "--domain": "domain",
  "--cli": "cli",
  "--app": "app",
};

const CATALOG = {
  back: ["express"],
  front: ["standard"],
  e2e: ["playwright"],
  domain: ["astro-bookings", "acorn-bank", "adventure-bazaar", "alpine-basecamp"],
  cli: ["node"],
};

const DEFAULTS = {
  back: "express",
  front: "standard",
  e2e: "playwright",
};

function isolatedEnv() {
  const env = { ...process.env };
  for (const key of Object.keys(env)) {
    if (/^npm_/i.test(key)) delete env[key];
  }
  return env;
}

function npxTiged(repo, dest, cwd) {
  const destArg = dest.split(path.sep).join("/");
  const args = ["--yes", "--package=tiged", "--", "tiged", repo, destArg];
  const env = isolatedEnv();
  if (process.platform === "win32") {
    return spawnSync(process.env.ComSpec || "cmd.exe", ["/d", "/s", "/c", ["npx", ...args].join(" ")], {
      stdio: "inherit",
      windowsHide: true,
      env,
      cwd,
    });
  }
  return spawnSync("npx", args, { stdio: "inherit", env, cwd });
}

function help() {
  process.stderr.write(`Usage:
  node bin/scaffold.js --domain NAME [options]
  npx --allow-git=all -p github:AIDDbot/AIDDbot aiddbot-scaffold --domain NAME [options]

Fetch workshop archetypes, git init if needed, then copy the AIDD overlay (same as bin/aiddbot.js).
--domain is required (any slug; samples listed below). Workshop profile: back, front, and e2e
default to express, standard, and playwright. CLI profile: --cli node. Other app models:
--app NAME fetches AIDDbot/NAME → NAME/. Slugs not in the catalog are accepted as given.
Existing archetype folders are left alone.

Options
  --dest DIR     Workshop root (default: current directory).
                 Must not be the AIDDbot origin or a folder inside it.
  --back TECH    AIDDbot/back-{TECH} → back/     (catalog: ${CATALOG.back.join(", ")})
  --front TECH   AIDDbot/front-{TECH} → front/   (catalog: ${CATALOG.front.join(", ")})
  --e2e TECH     AIDDbot/e2e-{TECH} → e2e/       (catalog: ${CATALOG.e2e.join(", ")})
  --cli TECH     AIDDbot/cli-{TECH} → cli/       (catalog: ${CATALOG.cli.join(", ")})
  --app NAME     AIDDbot/{NAME} → {NAME}/        (any slug; not in catalog)
  --domain NAME  domain sample when catalogued → docs/domain/
                 (samples: ${CATALOG.domain.join(", ")}; any other slug skips the fetch)
  --dry-run      Print the plan; write nothing
  --force        Overlay only: overwrite differing AIDD files
  --list         Print the catalog and exit

Examples
  node bin/scaffold.js --dest ../workshop --domain alpine-basecamp
  node bin/scaffold.js --dest ../cli-tool --domain acorn-bank --cli node
  node bin/scaffold.js --dest ../custom --domain pet-hotel --app my-stack
`);
}

function catalogValue(key, value) {
  if (key === "dest") return value;
  return value.toLowerCase();
}

function isSlug(value) {
  return /^[a-z0-9][a-z0-9-]*$/.test(value);
}

function parseArgs(argv) {
  const opts = {
    dest: null,
    back: null,
    front: null,
    e2e: null,
    domain: null,
    cli: null,
    app: null,
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
  const result = npxTiged(repo, dest, destRoot);
  if (result.status !== 0) {
    if (result.error) process.stderr.write(`${result.error.message}\n`);
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
  if (opts.app) {
    pieces.push({ repo: `AIDDbot/${opts.app}`, dest: path.join(destRoot, opts.app) });
  } else if (opts.cli) {
    pieces.push({ repo: `AIDDbot/cli-${opts.cli}`, dest: path.join(destRoot, "cli") });
  } else {
    if (opts.back) pieces.push({ repo: `AIDDbot/back-${opts.back}`, dest: path.join(destRoot, "back") });
    if (opts.front) pieces.push({ repo: `AIDDbot/front-${opts.front}`, dest: path.join(destRoot, "front") });
    if (opts.e2e) pieces.push({ repo: `AIDDbot/e2e-${opts.e2e}`, dest: path.join(destRoot, "e2e") });
  }
  if (opts.domain && CATALOG.domain.includes(opts.domain)) {
    pieces.push({
      repo: `AIDDbot/domain-samples/${opts.domain}`,
      dest: path.join(destRoot, "docs", "domain"),
    });
  }
  return pieces;
}

function listCatalog() {
  process.stdout.write(`profile    workshop (default): --back, --front, --e2e\n`);
  process.stdout.write(`           cli: --cli node\n`);
  process.stdout.write(`           other: --app NAME (any AIDDbot repo slug)\n`);
  process.stdout.write(`--back     ${CATALOG.back.join(", ")} (or any slug)\n`);
  process.stdout.write(`--front    ${CATALOG.front.join(", ")} (or any slug)\n`);
  process.stdout.write(`--e2e      ${CATALOG.e2e.join(", ")} (or any slug)\n`);
  process.stdout.write(`--cli      ${CATALOG.cli.join(", ")} (or any slug)\n`);
  process.stdout.write(`--app      any AIDDbot repo slug → ./{slug}/\n`);
  process.stdout.write(`--domain   samples: ${CATALOG.domain.join(", ")} (or any slug; custom skips fetch)\n`);
  return 0;
}

function applyDefaults(opts) {
  if (opts.cli || opts.app) return opts;
  for (const key of Object.keys(DEFAULTS)) {
    if (!opts[key]) opts[key] = DEFAULTS[key];
  }
  return opts;
}

function validateCatalog(opts) {
  for (const key of ["back", "front", "e2e", "cli", "app", "domain"]) {
    const value = opts[key];
    if (!value) continue;
    if (!isSlug(value)) return `Invalid --${key} "${value}" (use lowercase letters, digits, hyphens)`;
  }
  if (opts.cli && opts.app) return "Use --cli or --app, not both";
  if (opts.cli && (opts.back || opts.front || opts.e2e)) return "Use --cli or back/front/e2e, not both";
  if (opts.app && (opts.back || opts.front || opts.e2e)) return "Use --app or back/front/e2e, not both";
  if (!opts.cli && !opts.app && !opts.back && !opts.front && !opts.e2e) {
    return "Pass --cli, --app NAME, or omit flags for the default workshop (back, front, e2e)";
  }
  return null;
}

function noteCustomDomain(opts) {
  if (!opts.domain || CATALOG.domain.includes(opts.domain)) return;
  process.stdout.write(`domain     custom     "${opts.domain}" (no sample fetch)\n`);
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
  process.stderr.write(`--domain is required (samples: ${CATALOG.domain.join(", ")}; any slug accepted)\n`);
  help();
  process.exit(1);
}
if (refuseOrigin(destRoot, "scaffold")) process.exit(1);

const pieces = piecesFrom(opts, destRoot);

process.stdout.write(`source     ${sourceRoot}\n`);
process.stdout.write(`dest       ${destRoot}\n`);
noteCustomDomain(opts);
if (!opts.dryRun) fs.mkdirSync(destRoot, { recursive: true });
ensureGit(destRoot, opts.dryRun);
for (const piece of pieces) {
  const status = fetchPiece(destRoot, piece.repo, piece.dest, opts.dryRun);
  if (status !== 0) process.exit(status);
}
process.stdout.write("overlay    aiddbot.js\n");
const { conflicts } = runOverlay(destRoot, opts);
process.exit(conflicts ? 2 : 0);
