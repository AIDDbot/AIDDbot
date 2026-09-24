import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { parseArgs } from "node:util";

export const DEFAULTS = JSON.parse(fs.readFileSync(new URL("../assets/defaults.json", import.meta.url), "utf8"));
export const CATALOG = DEFAULTS.catalog;
export const TIERS = Object.keys(CATALOG);
export const TRACKED_SCRIPTS = ["start", "dev", "test:e2e", "test:acceptance", "test"];
const FLAGS = {
  name: { type: "string" },
  author: { type: "string" },
  "dry-run": { type: "boolean" },
  list: { type: "boolean" },
  ...Object.fromEntries(TIERS.flatMap((tier) => [[tier, { type: "string" }], [`${tier}-dir`, { type: "string" }]])),
};

export const out = (text) => process.stdout.write(`${text}\n`);
export const fail = (message) => {
  process.stderr.write(`${message}\n`);
  return 1;
};
export const readJson = (file) => JSON.parse(fs.readFileSync(file, "utf8"));
export const writeJson = (file, value) => fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`, "utf8");
export const objectOr = (value) => (value && typeof value === "object" && !Array.isArray(value) ? value : {});
export const slug = (value) => value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
export const selectedTiers = (options) => TIERS.filter((tier) => options[tier]);
export const destinationsOf = (options) => selectedTiers(options).map((tier) => options[`${tier}Dir`]);
export const isSafeDestination = (destination) => /^[a-z0-9](?:[a-z0-9._-]*[a-z0-9])?$/i.test(destination)
  && !/^(con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|$)/i.test(destination);
export const hasContent = (folder) => fs.statSync(folder, { throwIfNoEntry: false })?.isDirectory() && fs.readdirSync(folder).length > 0;
export const listCatalog = () => out(TIERS.map((tier) => `--${tier} default: ${CATALOG[tier][0]}; catalog: ${CATALOG[tier].join(", ")}`).join("\n"));
export const spawnNpx = (args, cwd) => (process.platform === "win32"
  ? spawnSync(process.env.ComSpec || "cmd.exe", ["/d", "/s", "/c", ["npx", ...args].join(" ")], { cwd, stdio: "inherit", windowsHide: true })
  : spawnSync("npx", args, { cwd, stdio: "inherit", windowsHide: true }));

export const usage = (problem) => process.stderr.write(`${problem}
Usage: node .agents/skills/scaffold-system/scripts/materialize.mjs --name NAME [tiers]

  --name NAME    Human-readable system name (required)
  --author NAME  Product author (required)
${TIERS.map((tier) => `  --${tier} TECH${" ".repeat(Math.max(1, 5 - tier.length))}default: ${CATALOG[tier][0]}; catalog: ${CATALOG[tier].join(", ")}`).join("\n")}
${TIERS.map((tier) => `  --${tier}-dir DIR Destination folder for --${tier}; default: ${DEFAULTS.directories[tier]}`).join("\n")}
  --dry-run      Print the materialization plan only
  --list         Print catalogued defaults and exit
`);

export const CHECKS = [
  (options) => (options.name && slug(options.name) ? null : "--name needs letters or digits"),
  (options) => (options.author?.trim() ? null : "--author needs a value"),
  (options) => (selectedTiers(options).length ? null : "Select at least one tier"),
  (options) => TIERS.filter((tier) => !options[tier] && options[`${tier}Dir`] !== DEFAULTS.directories[tier]).map((tier) => `--${tier}-dir requires --${tier}`)[0],
  (options) => selectedTiers(options).filter((tier) => !CATALOG[tier].includes(options[tier]))
    .map((tier) => `Unknown --${tier} "${options[tier]}" (choose: ${CATALOG[tier].join(", ")})`)[0],
  (options) => destinationsOf(options).filter((destination) => !isSafeDestination(destination))
    .map((destination) => `Invalid destination folder "${destination}" (use one safe child folder name)`)[0],
  (options) => (new Set(destinationsOf(options).map((destination) => destination.toLowerCase())).size === destinationsOf(options).length
    ? null
    : "Selected destination folders must be unique"),
];

export function parse(argv) {
  try {
    const { values } = parseArgs({ args: argv, options: FLAGS, strict: true });
    const tiers = TIERS.flatMap((tier) => [[tier, values[tier]?.toLowerCase() ?? null], [`${tier}Dir`, values[`${tier}-dir`] ?? DEFAULTS.directories[tier]]]);
    return { options: { name: values.name ?? null, author: values.author ?? null, dryRun: Boolean(values["dry-run"]), list: Boolean(values.list), ...Object.fromEntries(tiers) } };
  } catch (error) {
    return { error: error.message };
  }
}

export function readJsonOr(file, fallback) {
  try {
    return readJson(file);
  } catch {
    return fallback;
  }
}

export function copyRootDefaults(workspace, dryRun) {
  for (const { source, destination } of DEFAULTS.rootFiles) {
    const sourcePath = new URL(`../assets/${source}`, import.meta.url);
    const destinationPath = path.join(workspace, destination);
    if (fs.existsSync(destinationPath)) {
      out(`keep       ${destination}`);
      continue;
    }
    if (dryRun) {
      out(`create     ${destination}`);
      continue;
    }
    if (!fs.existsSync(sourcePath)) return fail(`Root default asset is missing: ${source}`);
    fs.copyFileSync(sourcePath, destinationPath, fs.constants.COPYFILE_EXCL);
    out(`create     ${destination}`);
  }
  return 0;
}
