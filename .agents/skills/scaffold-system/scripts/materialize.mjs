#!/usr/bin/env node
// Native ESM; requires the Node version declared by the AIDDbot launcher.
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { parseArgs } from "node:util";

const CATALOG = {
  back: ["express"],
  front: ["standard"],
  e2e: ["playwright"],
  cli: ["node"],
};
const TIERS = Object.keys(CATALOG);
const START_SCRIPTS = ["start", "dev"];
const E2E_SCRIPTS = ["test:e2e", "test:acceptance", "test"];
const FLAGS = {
  name: { type: "string" },
  author: { type: "string" },
  "dry-run": { type: "boolean" },
  list: { type: "boolean" },
  ...Object.fromEntries(TIERS.flatMap((tier) => [[tier, { type: "string" }], [`${tier}-dir`, { type: "string" }]])),
};

const out = (text) => process.stdout.write(`${text}\n`);
const fail = (message) => {
  process.stderr.write(`${message}\n`);
  return 1;
};
const readJson = (file) => JSON.parse(fs.readFileSync(file, "utf8"));
const writeJson = (file, value) => fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`, "utf8");
const objectOr = (value) => (value && typeof value === "object" && !Array.isArray(value) ? value : {});
const slug = (value) => value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
const selectedTiers = (options) => TIERS.filter((tier) => options[tier]);
const destinationsOf = (options) => selectedTiers(options).map((tier) => options[`${tier}Dir`]);
const isSafeDestination = (destination) => /^[a-z0-9](?:[a-z0-9._-]*[a-z0-9])?$/i.test(destination)
  && !/^(con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|$)/i.test(destination);
const hasContent = (folder) => fs.statSync(folder, { throwIfNoEntry: false })?.isDirectory() && fs.readdirSync(folder).length > 0;
const exposesAny = (projects, scripts) => projects.some((project) => scripts.some((script) => project.scripts[script]));
const listCatalog = () => out(TIERS.map((tier) => `--${tier} default: ${CATALOG[tier][0]}; catalog: ${CATALOG[tier].join(", ")}`).join("\n"));
const spawnNpx = (args, cwd) => (process.platform === "win32"
  ? spawnSync(process.env.ComSpec || "cmd.exe", ["/d", "/s", "/c", ["npx", ...args].join(" ")], { cwd, stdio: "inherit", windowsHide: true })
  : spawnSync("npx", args, { cwd, stdio: "inherit", windowsHide: true }));

const usage = (problem) => process.stderr.write(`${problem}
Usage: node .agents/skills/scaffold-system/scripts/materialize.mjs --name NAME [tiers]

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

// Each check returns its error message, or nothing when the options pass.
const CHECKS = [
  (options) => (options.name && slug(options.name) ? null : "--name needs letters or digits"),
  (options) => (options.author?.trim() ? null : "--author needs a value"),
  (options) => (selectedTiers(options).length ? null : "Select at least one tier"),
  (options) => TIERS.filter((tier) => !options[tier] && options[`${tier}Dir`] !== tier).map((tier) => `--${tier}-dir requires --${tier}`)[0],
  (options) => selectedTiers(options).filter((tier) => !CATALOG[tier].includes(options[tier]))
    .map((tier) => `Unknown --${tier} "${options[tier]}" (choose: ${CATALOG[tier].join(", ")})`)[0],
  (options) => destinationsOf(options).filter((destination) => !isSafeDestination(destination))
    .map((destination) => `Invalid destination folder "${destination}" (use one safe child folder name)`)[0],
  (options) => (new Set(destinationsOf(options).map((destination) => destination.toLowerCase())).size === destinationsOf(options).length
    ? null
    : "Selected destination folders must be unique"),
];

function parse(argv) {
  try {
    const { values } = parseArgs({ args: argv, options: FLAGS, strict: true });
    const tiers = TIERS.flatMap((tier) => [[tier, values[tier]?.toLowerCase() ?? null], [`${tier}Dir`, values[`${tier}-dir`] ?? tier]]);
    return { options: { name: values.name ?? null, author: values.author ?? null, dryRun: Boolean(values["dry-run"]), list: Boolean(values.list), ...Object.fromEntries(tiers) } };
  } catch (error) {
    return { error: error.message };
  }
}

function readJsonOr(file, fallback) {
  try {
    return readJson(file);
  } catch {
    return fallback;
  }
}

function runTiged(repo, destination, workspace, dryRun) {
  const folder = path.basename(destination);
  if (dryRun) {
    out(`fetch      would      ${repo} -> ${folder}`);
    return 0;
  }
  if (hasContent(destination)) return fail(`Refusing to overwrite ${folder}`);
  const result = spawnNpx(["--yes", "--package=tiged", "--", "tiged", repo, folder], workspace);
  if (result.status !== 0) fail(`tiged failed: ${repo}`);
  return result.status ?? 1;
}

// The front renders its title and author from package.json; setting them here keeps them out of agent reconciliation.
function brandFrontProject(workspace, { frontDir, name, author, dryRun }) {
  const packagePath = path.join(workspace, frontDir, "package.json");
  if (dryRun) {
    out(`update     ${frontDir}/package.json displayName, author`);
    return 0;
  }
  const packageJson = readJsonOr(packagePath, null);
  if (!packageJson) return fail(`${frontDir}/package.json is missing or invalid; cannot set displayName and author`);
  writeJson(packagePath, Object.assign(packageJson, { displayName: name.trim(), author: author.trim() }));
  return 0;
}

function describeProject(workspace, options, tier) {
  const directory = options[`${tier}Dir`];
  const scripts = objectOr(readJsonOr(path.join(workspace, directory, "package.json"), null)?.scripts);
  return {
    kind: tier,
    technology: options[tier],
    directory,
    scripts: Object.fromEntries([...START_SCRIPTS, ...E2E_SCRIPTS].filter((key) => typeof scripts[key] === "string").map((key) => [key, scripts[key]])),
  };
}

function buildManifest(workspace, options, systemSlug) {
  const projects = selectedTiers(options).map((tier) => describeProject(workspace, options, tier));
  const commands = {
    ...(exposesAny(projects.filter((project) => project.kind !== "e2e"), START_SCRIPTS) ? { start: "node .aiddbot/run-system.mjs start" } : {}),
    ...(exposesAny(projects.filter((project) => project.kind === "e2e"), E2E_SCRIPTS) ? { "test:e2e": "node .aiddbot/run-system.mjs test:e2e" } : {}),
  };
  return { name: options.name, slug: systemSlug, projects, commands };
}

function writeRunner(workspace, manifest, dryRun) {
  const manifestPath = path.join(workspace, ".aiddbot", "aiddbot.system.json");
  const runnerPath = path.join(workspace, ".aiddbot", "run-system.mjs");
  if (fs.existsSync(manifestPath) || fs.existsSync(runnerPath)) return fail("Refusing to overwrite existing system manifest or runner");
  if (dryRun) {
    out("create     .aiddbot/aiddbot.system.json\ncreate     .aiddbot/run-system.mjs");
    return 0;
  }
  fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
  writeJson(manifestPath, manifest);
  fs.copyFileSync(new URL("../assets/run-system.mjs", import.meta.url), runnerPath);
  return 0;
}

// Existing root scripts win; only missing delegates are added.
function applyProductMetadata(packageJson, options, systemSlug, commands) {
  Object.assign(packageJson, { name: systemSlug, version: "0.1.0", description: options.name, author: options.author.trim() });
  packageJson.private ??= true;
  packageJson.scripts = objectOr(packageJson.scripts);
  const delegates = { ...commands, ...(commands["test:e2e"] ? { test: "npm run test:e2e" } : {}) };
  for (const [key, command] of Object.entries(delegates)) packageJson.scripts[key] ||= command;
  packageJson.aiddbot = { ...objectOr(packageJson.aiddbot), system: ".aiddbot/aiddbot.system.json" };
}

function writeRootPackage(workspace, options, systemSlug, manifest) {
  const packagePath = path.join(workspace, "package.json");
  const hasPackage = fs.existsSync(packagePath);
  const packageJson = hasPackage ? readJsonOr(packagePath, null) : {};
  if (!packageJson) return fail("Root package.json is invalid; cannot write product metadata or orchestration scripts");
  applyProductMetadata(packageJson, options, systemSlug, manifest.commands);
  if (options.dryRun) out(`${hasPackage ? "update    " : "create    "} package.json`);
  else writeJson(packagePath, packageJson);
  return 0;
}

function materialize(options) {
  const workspace = process.cwd();
  const systemSlug = slug(options.name);
  out(`system     ${options.name} (${systemSlug})`);
  for (const tier of selectedTiers(options)) {
    const status = runTiged(`AIDDbot/${tier}-${options[tier]}`, path.join(workspace, options[`${tier}Dir`]), workspace, options.dryRun);
    if (status !== 0) return status;
  }
  const manifest = buildManifest(workspace, options, systemSlug);
  return (options.front && brandFrontProject(workspace, options))
    || writeRunner(workspace, manifest, options.dryRun)
    || writeRootPackage(workspace, options, systemSlug, manifest);
}

function main(argv) {
  const { error, options } = parse(argv);
  if (options?.list) {
    listCatalog();
    return 0;
  }
  const problem = error ?? CHECKS.reduce((found, check) => found || check(options), null);
  if (!problem) return materialize(options);
  usage(problem);
  return 1;
}

process.exitCode = main(process.argv.slice(2));
