#!/usr/bin/env node
// Native ESM; requires the Node version declared by the AIDDbot launcher.
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const CATALOG = {
  back: ["express"],
  front: ["standard"],
  e2e: ["playwright"],
  cli: ["node"],
};
const TIERS = Object.keys(CATALOG);
// E2E archetypes that start their own target servers, so the root runner must not start them too.
const SELF_HOSTED_E2E = ["playwright"];

function help() {
  process.stderr.write(`Usage: node .agents/skills/scaffold-system/scripts/materialize.mjs --name NAME [tiers]

  --name NAME    Human-readable system name (required)
  --author NAME  Product author (required)
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
  const options = { name: null, author: null, dryRun: false, list: false };
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
    if (arg.startsWith("--") && (["name", "author"].includes(key) || TIERS.includes(key) || tier)) {
      const value = argv[index + 1];
      if (!value || value.startsWith("--")) return { error: `${arg} needs a value` };
      if (["name", "author"].includes(key)) options[key] = value;
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
  if (!options.author || !options.author.trim()) return "--author needs a value";
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

function readProjectScripts(workspace, destination) {
  try {
    const packageJson = JSON.parse(fs.readFileSync(path.join(workspace, destination, "package.json"), "utf8"));
    return packageJson.scripts && typeof packageJson.scripts === "object" ? packageJson.scripts : {};
  } catch {
    return {};
  }
}

// The front renders its title and author from package.json; setting them here keeps them out of agent reconciliation.
function brandFrontProject(workspace, destination, name, author, dryRun) {
  const packagePath = path.join(workspace, destination, "package.json");
  if (dryRun) {
    process.stdout.write(`update     ${destination}/package.json displayName, author
`);
    return 0;
  }
  if (!fs.existsSync(packagePath)) return 0;
  try {
    const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));
    packageJson.displayName = name;
    packageJson.author = author;
    fs.writeFileSync(packagePath, `${JSON.stringify(packageJson, null, 2)}
`, "utf8");
    return 0;
  } catch {
    process.stderr.write(`${destination}/package.json is invalid; cannot set displayName and author
`);
    return 1;
  }
}

function writeSystemFiles(workspace, name, author, systemSlug, selected, options, dryRun) {
  const projects = selected.map((tier) => {
    const directory = options[`${tier}Dir`];
    const scripts = readProjectScripts(workspace, directory);
    return {
      kind: tier,
      technology: options[tier],
      directory,
      ...(tier === "e2e" && SELF_HOSTED_E2E.includes(options[tier]) ? { startsTargets: true } : {}),
      scripts: Object.fromEntries(["start", "dev", "test:e2e", "test:acceptance", "test"].filter((key) => typeof scripts[key] === "string").map((key) => [key, scripts[key]])),
    };
  });
  const hasStart = projects.some((project) => project.kind !== "e2e" && (project.scripts.start || project.scripts.dev));
  const hasE2e = projects.some((project) => project.kind === "e2e" && (project.scripts["test:e2e"] || project.scripts["test:acceptance"] || project.scripts.test));
  const manifest = {
    name,
    slug: systemSlug,
    projects,
    commands: {
      ...(hasStart ? { start: "node .aiddbot/run-system.mjs start" } : {}),
      ...(hasE2e ? { "test:e2e": "node .aiddbot/run-system.mjs test:e2e" } : {}),
    },
  };
  const manifestPath = path.join(workspace, ".aiddbot", "aiddbot.system.json");
  const runnerPath = path.join(workspace, ".aiddbot", "run-system.mjs");
  const runnerSource = fs.readFileSync(new URL("../assets/run-system.mjs", import.meta.url), "utf8");
  if (fs.existsSync(manifestPath) || fs.existsSync(runnerPath)) {
    process.stderr.write("Refusing to overwrite existing system manifest or runner\n");
    return 1;
  }
  if (dryRun) {
    process.stdout.write("create     .aiddbot/aiddbot.system.json\n");
    process.stdout.write("create     .aiddbot/run-system.mjs\n");
  } else {
    fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
    fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
    fs.mkdirSync(path.dirname(runnerPath), { recursive: true });
    fs.writeFileSync(runnerPath, runnerSource, "utf8");
  }
  const packagePath = path.join(workspace, "package.json");
  let packageJson = {};
  let hasPackage = false;
  if (fs.existsSync(packagePath)) {
    try { packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8")); hasPackage = true; }
    catch { process.stderr.write("Root package.json is invalid; cannot write product metadata or orchestration scripts\n"); return 1; }
  }
  packageJson.name = systemSlug;
  packageJson.version = "0.1.0";
  packageJson.description = name;
  packageJson.author = author.trim();
  packageJson.private ??= true;
  if (!packageJson.scripts || typeof packageJson.scripts !== "object" || Array.isArray(packageJson.scripts)) packageJson.scripts = {};
  if (manifest.commands.start && !packageJson.scripts.start) packageJson.scripts.start = manifest.commands.start;
  if (manifest.commands["test:e2e"] && !packageJson.scripts["test:e2e"]) packageJson.scripts["test:e2e"] = manifest.commands["test:e2e"];
  if (manifest.commands["test:e2e"] && !packageJson.scripts.test) packageJson.scripts.test = "npm run test:e2e";
  if (!packageJson.aiddbot || typeof packageJson.aiddbot !== "object" || Array.isArray(packageJson.aiddbot)) packageJson.aiddbot = {};
  packageJson.aiddbot.system = ".aiddbot/aiddbot.system.json";
  if (dryRun) process.stdout.write(`${hasPackage ? "update    " : "create    "} package.json\n`);
  else fs.writeFileSync(packagePath, `${JSON.stringify(packageJson, null, 2)}\n`, "utf8");
  return 0;
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
const systemSlug = slug(parsed.options.name);
const selected = TIERS.filter((tier) => parsed.options[tier]);
process.stdout.write(`system     ${parsed.options.name} (${systemSlug})\n`);
for (const tier of selected) {
  const destination = parsed.options[`${tier}Dir`];
  const status = runTiged(`AIDDbot/${tier}-${parsed.options[tier]}`, path.join(workspace, destination), workspace, parsed.options.dryRun);
  if (status !== 0) process.exit(status);
}
if (parsed.options.front) {
  const status = brandFrontProject(workspace, parsed.options.frontDir, parsed.options.name.trim(), parsed.options.author.trim(), parsed.options.dryRun);
  if (status !== 0) process.exit(status);
}
const systemStatus = writeSystemFiles(workspace, parsed.options.name, parsed.options.author, systemSlug, selected, parsed.options, parsed.options.dryRun);
if (systemStatus !== 0) process.exit(systemStatus);
