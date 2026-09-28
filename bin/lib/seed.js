import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.join(here, "..", "..");
const seeds = path.join(here, "..", "seeds");

function ignoreKey(line) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#") || trimmed.startsWith("!")) return null;
  return trimmed.replace(/^\/+/, "").replace(/\/+$/, "");
}

// Read on demand so commands that never seed, such as --version, do not need the payload.
function readSeed(name) {
  return fs.readFileSync(path.join(seeds, name), "utf8");
}

function packageVersion() {
  try {
    return JSON.parse(fs.readFileSync(path.join(packageRoot, "package.json"), "utf8")).version || "unknown";
  } catch {
    return "unknown";
  }
}

function missingIgnorePatterns(text, seed) {
  const required = seed.split(/\r?\n/).map(ignoreKey).filter(Boolean);
  const present = new Set(
    text
      .split(/\r?\n/)
      .map(ignoreKey)
      .filter(Boolean)
  );
  return required.filter((pattern) => !present.has(ignoreKey(pattern)));
}

function hasReadme(destRoot) {
  let names;
  try {
    names = fs.readdirSync(destRoot);
  } catch {
    return false;
  }
  return names.some((name) => /^readme(\..+)?$/i.test(name));
}

function hasLicense(destRoot) {
  let names;
  try {
    names = fs.readdirSync(destRoot);
  } catch {
    return false;
  }
  return names.some((name) => /^licen[sc]e(\..+)?$/i.test(name));
}

function print(action, file) {
  process.stdout.write(`${action.padEnd(11)} ${file}\n`);
}

function writeFile(abs, contents, dryRun) {
  if (dryRun) return;
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, contents, "utf8");
}

function absPath(destRoot, rel) {
  return path.join(destRoot, rel);
}

// One-line records need no template file (D19).
const SEEDS = {
  "LICENSE": "Add your license here (for example, MIT, Apache-2.0, or UNLICENSED).\n",
  ".aiddbot/counters.yaml": "spec: 0\ndebt: 0\n",
};

/** Create `rel` from its seed only when nothing already occupies that name; never overwrite a human's own file. */
function ensureFromSeed(destRoot, dryRun, rel) {
  const abs = absPath(destRoot, rel);
  if (fs.existsSync(abs)) {
    print("skip-same", rel);
    return null;
  }
  print("create", rel);
  writeFile(abs, SEEDS[rel], dryRun);
  return rel;
}

function ensureGitignore(destRoot, dryRun) {
  const rel = ".gitignore";
  const abs = path.join(destRoot, rel);
  const seed = readSeed("GITIGNORE.seed");
  if (!fs.existsSync(abs)) {
    print("create", rel);
    writeFile(abs, seed, dryRun);
    return rel;
  }
  let stat;
  try {
    stat = fs.lstatSync(abs);
  } catch {
    return null;
  }
  if (!stat.isFile()) {
    print("conflict", rel);
    return null;
  }
  const current = fs.readFileSync(abs, "utf8");
  const missing = missingIgnorePatterns(current, seed);
  if (!missing.length) {
    print("skip-same", rel);
    return null;
  }
  const block = `\n# AIDDbot\n${missing.join("\n")}\n`;
  print("update", rel);
  writeFile(abs, current.replace(/\s*$/, "") + block, dryRun);
  return rel;
}

function ensureReadme(destRoot, dryRun, title = path.basename(destRoot)) {
  const rel = "README.md";
  if (hasReadme(destRoot)) {
    print("skip-same", rel);
    return null;
  }
  print("create", rel);
  writeFile(absPath(destRoot, rel), `# ${title}\n`, dryRun);
  return rel;
}

function ensureLicense(destRoot, dryRun) {
  const rel = "LICENSE";
  if (hasLicense(destRoot)) {
    print("skip-same", rel);
    return null;
  }
  print("create", rel);
  writeFile(absPath(destRoot, rel), SEEDS.LICENSE, dryRun);
  return rel;
}

// AGENTS.md starts as outline-system's own template, so consumers have one
// source for it: outline-system later fills the placeholders in place.
const agentsTemplate = path.join(packageRoot, ".agents", "skills", "outline-system", "assets", "AGENTS.template.md");

function ensureAgentSeed(destRoot, dryRun) {
  const rel = "AGENTS.md";
  const abs = absPath(destRoot, rel);
  if (fs.existsSync(abs)) {
    print("skip-same", rel);
    return [];
  }
  print("create", rel);
  writeFile(abs, fs.readFileSync(agentsTemplate, "utf8"), dryRun);
  return [rel];
}

// `aidd release` reads the product version from the root package.json (D38). Scaffolds put
// projects in child folders, so without this seed the first release would have no version file.
function ensureRootPackage(destRoot, dryRun, title = path.basename(destRoot)) {
  const rel = "package.json";
  if (fs.existsSync(absPath(destRoot, rel))) {
    print("skip-same", rel);
    return null;
  }
  const name = title.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "product";
  print("create", rel);
  writeFile(absPath(destRoot, rel), `${JSON.stringify({ name, version: "0.1.0", private: true }, null, 2)}
`, dryRun);
  return rel;
}

function ensureCounters(destRoot, dryRun) {
  return ensureFromSeed(destRoot, dryRun, ".aiddbot/counters.yaml");
}

// The core owns the configuration schema; init only seeds its empty form (D6).
async function ensureConfig(destRoot, dryRun) {
  const { CONFIG_FILE, EMPTY_CONFIG, configText } = await import("../../.agents/aidd/lib/config.mjs");
  SEEDS[CONFIG_FILE] = configText(EMPTY_CONFIG);
  return ensureFromSeed(destRoot, dryRun, CONFIG_FILE);
}

// The product folder is the core's fixed .product/ (D6). There is no PRD to seed: the
// spec index is generated by `aidd release` from shipped specs (D26). The core owns the
// debt register and its TDR.md view (D30); init seeds their empty forms from it.
async function ensureProductRecords(destRoot, dryRun) {
  const { EMPTY_DEBT, debtText, renderView } = await import("../../.agents/aidd/lib/debt.mjs");
  SEEDS[".product/quality/debt.json"] = debtText(EMPTY_DEBT);
  SEEDS[".product/quality/TDR.md"] = renderView(EMPTY_DEBT);
  return [".product/quality/debt.json", ".product/quality/TDR.md"].map((rel) => ensureFromSeed(destRoot, dryRun, rel)).filter(Boolean);
}

// The journal is born once per repository, not once per day: only the very
// first `aiddbot init` writes this event, so re-running init or update never
// re-announces a project that already has history. Spawning `aidd log init` keeps
// the day-header and line format in the core instead of duplicating it here.
// Journals are gitignored (the seeded *.log rule) and this call creates a
// directory, not a trackable file, so its caller never adds it to `git add`.
//
// Call this only after the overlay has installed the destination's own copy
// of .agents/aidd/aidd.mjs: the core resolves its repository root from its own
// location, so spawning the AIDDbot package's copy (outside destRoot) would
// resolve to whatever repo that copy happens to sit under instead of destRoot.
function ensureJournalGenesis(destRoot, dryRun) {
  const rel = ".aiddbot/journals";
  if (fs.existsSync(path.join(destRoot, rel))) {
    print("skip-same", rel);
    return;
  }
  print("create", rel);
  if (dryRun) return;
  const core = path.join(destRoot, ".agents", "aidd", "aidd.mjs");
  if (!fs.existsSync(core)) return; // Nothing to spawn if the overlay didn't install it (unexpected, but never fatal to init).
  try {
    execFileSync(process.execPath, [core, "log", "init", `AIDDbot v${packageVersion()}`], { cwd: destRoot, stdio: ["ignore", "ignore", "inherit"] });
  } catch {
    process.stderr.write("Journal genesis failed; continuing without it.\n");
  }
}

async function ensureSeedFiles(destRoot, dryRun, title) {
  const written = [];
  const gitignore = ensureGitignore(destRoot, dryRun);
  if (gitignore) written.push(gitignore);
  const readme = ensureReadme(destRoot, dryRun, title);
  if (readme) written.push(readme);
  const license = ensureLicense(destRoot, dryRun);
  if (license) written.push(license);
  written.push(...ensureAgentSeed(destRoot, dryRun));
  const rootPackage = ensureRootPackage(destRoot, dryRun, title);
  if (rootPackage) written.push(rootPackage);
  const counters = ensureCounters(destRoot, dryRun);
  if (counters) written.push(counters);
  const config = await ensureConfig(destRoot, dryRun);
  if (config) written.push(config);
  written.push(...await ensureProductRecords(destRoot, dryRun));
  return written;
}

export { ensureSeedFiles, ensureJournalGenesis };
