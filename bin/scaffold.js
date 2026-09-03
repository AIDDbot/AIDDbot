#!/usr/bin/env node
"use strict";

const { spawnSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");
const { sourceRoot, refuseOrigin, runOverlay } = require("./lib/overlay");
const { ensureGit } = require("./lib/git");
const { ensureLicense, ensureSeedFiles } = require("./lib/seed");

const VALUE_FLAGS = {
  "--dest": "dest",
  "--name": "name",
  "--back": "back",
  "--front": "front",
  "--e2e": "e2e",
  "--cli": "cli",
};

const CATALOG = {
  back: ["express"],
  front: ["standard"],
  e2e: ["playwright"],
  cli: ["node"],
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
  node bin/scaffold.js --name NAME [projects]
  npx --allow-git=all -p github:AIDDbot/AIDDbot aiddbot-scaffold --name NAME [projects]

Fetch one or more catalogued {tier}-{tech} archetypes, initialize git, seed
.gitignore, README.md, and LICENSE when missing, then copy the AIDD overlay.
Every project tier is optional, but at least one must be selected. Existing
archetype folders are left alone.

Options
  --dest DIR     Solution root (default: current directory).
                 Must not be the AIDDbot origin or a folder inside it.
  --name NAME    Human-readable solution name (required).
  --back TECH    AIDDbot/back-{TECH} → back/     (catalog: ${CATALOG.back.join(", ")})
  --front TECH   AIDDbot/front-{TECH} → front/   (catalog: ${CATALOG.front.join(", ")})
  --e2e TECH     AIDDbot/e2e-{TECH} → e2e/       (catalog: ${CATALOG.e2e.join(", ")})
  --cli TECH     AIDDbot/cli-{TECH} → cli/       (catalog: ${CATALOG.cli.join(", ")})
  Defaults       back: ${CATALOG.back[0]}; front: ${CATALOG.front[0]}; e2e: ${CATALOG.e2e[0]}; cli: ${CATALOG.cli[0]}
  --dry-run      Print the plan; write nothing
  --force        Overlay only: overwrite differing AIDD files
  --list         Print the catalog and exit

Examples
  node bin/scaffold.js --dest ../my-app --name "My app" --back express --front standard --e2e playwright
  node bin/scaffold.js --dest ../cli-tool --name "CLI tool" --cli node
`);
}

function catalogValue(key, value) {
  if (key === "dest" || key === "name") return value;
  return value.toLowerCase();
}

function isSlug(value) {
  return /^[a-z0-9][a-z0-9-]*$/.test(value);
}

function solutionSlug(name) {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseArgs(argv) {
  const opts = {
    dest: null,
    name: null,
    back: null,
    front: null,
    e2e: null,
    cli: null,
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
  if (opts.back) pieces.push({ repo: `AIDDbot/back-${opts.back}`, dest: path.join(destRoot, "back") });
  if (opts.front) pieces.push({ repo: `AIDDbot/front-${opts.front}`, dest: path.join(destRoot, "front") });
  if (opts.e2e) pieces.push({ repo: `AIDDbot/e2e-${opts.e2e}`, dest: path.join(destRoot, "e2e") });
  if (opts.cli) pieces.push({ repo: `AIDDbot/cli-${opts.cli}`, dest: path.join(destRoot, "cli") });
  return pieces;
}

function listCatalog() {
  process.stdout.write(`--back     default: ${CATALOG.back[0]}; catalog: ${CATALOG.back.join(", ")}\n`);
  process.stdout.write(`--front    default: ${CATALOG.front[0]}; catalog: ${CATALOG.front.join(", ")}\n`);
  process.stdout.write(`--e2e      default: ${CATALOG.e2e[0]}; catalog: ${CATALOG.e2e.join(", ")}\n`);
  process.stdout.write(`--cli      default: ${CATALOG.cli[0]}; catalog: ${CATALOG.cli.join(", ")}\n`);
  return 0;
}

function validateCatalog(opts) {
  if (!opts.name || !solutionSlug(opts.name)) return "--name needs letters or digits";
  for (const key of ["back", "front", "e2e", "cli"]) {
    const value = opts[key];
    if (!value) continue;
    if (!isSlug(value)) return `Invalid --${key} "${value}" (use lowercase letters, digits, hyphens)`;
  }
  for (const key of ["back", "front", "e2e", "cli"]) {
    if (opts[key] && !CATALOG[key].includes(opts[key])) {
      return `Unknown --${key} "${opts[key]}" (choose: ${CATALOG[key].join(", ")})`;
    }
  }
  if (!opts.cli && !opts.back && !opts.front && !opts.e2e) {
    return "Select at least one project with --back, --front, --e2e, or --cli";
  }
  return null;
}

function reconcilePackageNames(destRoot, pieces, slug, dryRun) {
  for (const piece of pieces) {
    const manifest = path.join(piece.dest, "package.json");
    const tier = path.basename(piece.dest);
    if (dryRun) {
      process.stdout.write(`metadata   would      ${tier}/package.json → ${slug}-${tier}\n`);
      continue;
    }
    if (!fs.existsSync(manifest)) continue;
    let data;
    try {
      data = JSON.parse(fs.readFileSync(manifest, "utf8"));
    } catch {
      process.stderr.write(`Cannot update invalid package manifest: ${displayRel(destRoot, manifest)}\n`);
      continue;
    }
    const name = `${slug}-${tier}`;
    if (data.name === name) {
      process.stdout.write(`metadata   skip-same  ${displayRel(destRoot, manifest)}\n`);
      continue;
    }
    data.name = name;
    fs.writeFileSync(manifest, `${JSON.stringify(data, null, 2)}\n`, "utf8");
    process.stdout.write(`metadata   update     ${displayRel(destRoot, manifest)} → ${name}\n`);
  }
}

function reconcileReadmeName(destRoot, name, dryRun) {
  const readme = path.join(destRoot, "README.md");
  if (dryRun) {
    process.stdout.write(`metadata   would      README.md → ${name}\n`);
    return;
  }
  if (!fs.existsSync(readme)) return;
  const current = fs.readFileSync(readme, "utf8");
  if (current.includes(name)) {
    process.stdout.write("metadata   skip-same  README.md\n");
    return;
  }
  const seedTitle = `# ${path.basename(destRoot)}`;
  const next = current.trim() === seedTitle ? `# ${name}\n` : `${current.replace(/\s*$/, "")}\n\n## Solution\n\n${name}\n`;
  fs.writeFileSync(readme, next, "utf8");
  process.stdout.write(`metadata   update     README.md → ${name}\n`);
}

const parsed = parseArgs(process.argv.slice(2));
if (parsed.error) {
  process.stderr.write(`${parsed.error}\n`);
  help();
  process.exit(1);
}

const { opts } = parsed;
if (opts.list) process.exit(listCatalog());

const invalid = validateCatalog(opts);
if (invalid) {
  process.stderr.write(`${invalid}\n`);
  help();
  process.exit(1);
}

const destRoot = path.resolve(opts.dest ?? process.cwd());
if (refuseOrigin(destRoot, "scaffold")) process.exit(1);

const pieces = piecesFrom(opts, destRoot);
const slug = solutionSlug(opts.name);

process.stdout.write(`source     ${sourceRoot}\n`);
process.stdout.write(`dest       ${destRoot}\n`);
process.stdout.write(`solution   ${opts.name} (${slug})\n`);
if (!opts.dryRun) fs.mkdirSync(destRoot, { recursive: true });
ensureGit(destRoot, opts.dryRun);
ensureSeedFiles(destRoot, opts.dryRun, opts.name);
ensureLicense(destRoot, fs.readFileSync(path.join(sourceRoot, "LICENSE"), "utf8"), opts.dryRun);
for (const piece of pieces) {
  const status = fetchPiece(destRoot, piece.repo, piece.dest, opts.dryRun);
  if (status !== 0) process.exit(status);
}
reconcilePackageNames(destRoot, pieces, slug, opts.dryRun);
reconcileReadmeName(destRoot, opts.name, opts.dryRun);
process.stdout.write("overlay    aiddbot.js\n");
const { conflicts } = runOverlay(destRoot, opts);
process.exit(conflicts ? 2 : 0);
