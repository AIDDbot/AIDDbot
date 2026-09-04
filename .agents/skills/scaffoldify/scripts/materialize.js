#!/usr/bin/env node
"use strict";

const { spawnSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const CATALOG = {
  back: ["express"],
  front: ["standard"],
  e2e: ["playwright"],
  cli: ["node"],
};
const TIERS = Object.keys(CATALOG);

function help() {
  process.stderr.write(`Usage: node .agents/skills/scaffoldify/scripts/materialize.js --name NAME [tiers]

  --name NAME    Human-readable solution name (required)
  --back TECH    default: ${CATALOG.back[0]}; catalog: ${CATALOG.back.join(", ")}
  --front TECH   default: ${CATALOG.front[0]}; catalog: ${CATALOG.front.join(", ")}
  --e2e TECH     default: ${CATALOG.e2e[0]}; catalog: ${CATALOG.e2e.join(", ")}
  --cli TECH     default: ${CATALOG.cli[0]}; catalog: ${CATALOG.cli.join(", ")}
  --back-dir DIR Destination folder for --back; default: back
  --front-dir DIR Destination folder for --front; default: front
  --e2e-dir DIR  Destination folder for --e2e; default: e2e
  --cli-dir DIR  Destination folder for --cli; default: cli
  --dry-run      Print the materialization plan only
  --list         Print catalogued defaults and exit
`);
}

function slug(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parse(argv) {
  const options = { name: null, dryRun: false, list: false };
  for (const tier of TIERS) {
    options[tier] = null;
    options[`${tier}Dir`] = tier;
  }
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--dry-run") {
      options.dryRun = true;
      continue;
    }
    if (arg === "--list") {
      options.list = true;
      continue;
    }
    const key = arg.slice(2);
    const tier = TIERS.find((candidate) => key === `${candidate}-dir`);
    if (arg.startsWith("--") && (key === "name" || TIERS.includes(key) || tier)) {
      const value = argv[index + 1];
      if (!value || value.startsWith("--")) return { error: `${arg} needs a value` };
      if (key === "name") options.name = value;
      else if (tier) options[`${tier}Dir`] = value;
      else options[key] = value.toLowerCase();
      index += 1;
      continue;
    }
    return { error: `Unknown argument: ${arg}` };
  }
  return { options };
}

function listCatalog() {
  for (const tier of TIERS) {
    process.stdout.write(`--${tier} default: ${CATALOG[tier][0]}; catalog: ${CATALOG[tier].join(", ")}\n`);
  }
}

function validate(options) {
  if (!options.name || !slug(options.name)) return "--name needs letters or digits";
  const selected = TIERS.filter((tier) => options[tier]);
  if (!selected.length) return "Select at least one tier";
  for (const tier of TIERS) {
    if (!options[tier] && options[`${tier}Dir`] !== tier) return `--${tier}-dir requires --${tier}`;
  }
  for (const tier of selected) {
    if (!CATALOG[tier].includes(options[tier])) return `Unknown --${tier} "${options[tier]}" (choose: ${CATALOG[tier].join(", ")})`;
  }
  const destinations = selected.map((tier) => options[`${tier}Dir`]);
  for (const destination of destinations) {
    if (!isSafeDestination(destination)) return `Invalid destination folder "${destination}" (use one safe child folder name)`;
  }
  if (new Set(destinations.map((destination) => destination.toLowerCase())).size !== destinations.length) {
    return "Selected destination folders must be unique";
  }
  return null;
}

function isSafeDestination(destination) {
  if (!/^[a-z0-9](?:[a-z0-9._-]*[a-z0-9])?$/i.test(destination)) return false;
  return !/^(con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|$)/i.test(destination);
}

function hasContent(folder) {
  try {
    return fs.readdirSync(folder).length > 0;
  } catch {
    return false;
  }
}

function runTiged(repo, destination, workspace, dryRun) {
  if (dryRun) {
    process.stdout.write(`fetch      would      ${repo} -> ${path.basename(destination)}\n`);
    return 0;
  }
  if (hasContent(destination)) {
    process.stderr.write(`Refusing to overwrite ${path.basename(destination)}\n`);
    return 1;
  }
  const args = ["--yes", "--package=tiged", "--", "tiged", repo, path.basename(destination)];
  const result = process.platform === "win32"
    ? spawnSync(process.env.ComSpec || "cmd.exe", ["/d", "/s", "/c", ["npx", ...args].join(" ")], {
      cwd: workspace,
      stdio: "inherit",
      windowsHide: true,
    })
    : spawnSync("npx", args, { cwd: workspace, stdio: "inherit", windowsHide: true });
  if (result.status !== 0) process.stderr.write(`tiged failed: ${repo}\n`);
  return result.status ?? 1;
}

function reconcileReadme(workspace, name, dryRun) {
  const file = path.join(workspace, "README.md");
  if (dryRun) {
    process.stdout.write(`metadata   would      README.md -> ${name}\n`);
    return;
  }
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, `# ${name}\n`, "utf8");
    process.stdout.write(`metadata   create     README.md -> ${name}\n`);
    return;
  }
  const current = fs.readFileSync(file, "utf8");
  if (current.includes(name)) return;
  fs.writeFileSync(file, `${current.replace(/\s*$/, "")}\n\n## Solution\n\n${name}\n`, "utf8");
  process.stdout.write(`metadata   update     README.md -> ${name}\n`);
}

function reconcilePackages(workspace, selected, options, solutionSlug, dryRun) {
  for (const tier of selected) {
    const destination = options[`${tier}Dir`];
    const file = path.join(workspace, destination, "package.json");
    const name = `${solutionSlug}-${tier}`;
    if (dryRun) {
      process.stdout.write(`metadata   would      ${destination}/package.json -> ${name}\n`);
      continue;
    }
    if (!fs.existsSync(file)) continue;
    let manifest;
    try {
      manifest = JSON.parse(fs.readFileSync(file, "utf8"));
    } catch {
      process.stderr.write(`Cannot update invalid package manifest: ${destination}/package.json\n`);
      continue;
    }
    if (manifest.name === name) continue;
    manifest.name = name;
    fs.writeFileSync(file, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
    process.stdout.write(`metadata   update     ${destination}/package.json -> ${name}\n`);
  }
}

const parsed = parse(process.argv.slice(2));
if (parsed.error) {
  process.stderr.write(`${parsed.error}\n`);
  help();
  process.exit(1);
}
if (parsed.options.list) {
  listCatalog();
  process.exit(0);
}
const invalid = validate(parsed.options);
if (invalid) {
  process.stderr.write(`${invalid}\n`);
  help();
  process.exit(1);
}

const workspace = process.cwd();
const solutionSlug = slug(parsed.options.name);
const selected = TIERS.filter((tier) => parsed.options[tier]);
process.stdout.write(`solution   ${parsed.options.name} (${solutionSlug})\n`);
for (const tier of selected) {
  const destination = parsed.options[`${tier}Dir`];
  const status = runTiged(`AIDDbot/${tier}-${parsed.options[tier]}`, path.join(workspace, destination), workspace, parsed.options.dryRun);
  if (status !== 0) process.exit(status);
}
reconcileReadme(workspace, parsed.options.name, parsed.options.dryRun);
reconcilePackages(workspace, selected, parsed.options, solutionSlug, parsed.options.dryRun);
