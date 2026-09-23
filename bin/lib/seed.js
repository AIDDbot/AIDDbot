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

/** Create `rel` from `seedFile` only when nothing already occupies that name; never overwrite a human's own file. */
function ensureFromSeed(destRoot, dryRun, rel, seedFile) {
  const abs = absPath(destRoot, rel);
  if (fs.existsSync(abs)) {
    print("skip-same", rel);
    return null;
  }
  print("create", rel);
  writeFile(abs, readSeed(seedFile), dryRun);
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
  writeFile(absPath(destRoot, rel), readSeed("LICENSE.seed"), dryRun);
  return rel;
}

function ensureAgentSeed(destRoot, dryRun) {
  const written = ensureFromSeed(destRoot, dryRun, "AGENTS.md", "AGENTS.seed.md");
  return written ? [written] : [];
}

function ensureCounters(destRoot, dryRun) {
  return ensureFromSeed(destRoot, dryRun, ".aiddbot/counters.yaml", "counters.seed.yaml");
}

// {Product_Folder} defaults to .product/, matching AGENTS.seed.md; document-system
// may relocate it later, in which case these two files travel with it.
function ensureProductRecords(destRoot, dryRun) {
  const written = [];
  const prd = ensureFromSeed(destRoot, dryRun, ".product/specs/PRD.md", "PRD.seed.md");
  if (prd) written.push(prd);
  const tdr = ensureFromSeed(destRoot, dryRun, ".product/quality/TDR.md", "TDR.seed.md");
  if (tdr) written.push(tdr);
  return written;
}

// The journal is born once per repository, not once per day: only the very
// first `aiddbot init` writes this event, so re-running init or update never
// re-announces a project that already has history. Spawning append.mjs keeps
// the day-header and line format in one place instead of duplicating it here.
// Journals are gitignored (the seeded *.log rule) and this call creates a
// directory, not a trackable file, so its caller never adds it to `git add`.
//
// Call this only after the overlay has installed the destination's own copy
// of .agents/skills/record-journal/scripts/append.mjs: that script finds its
// repository root by walking up from its own location first, so spawning the
// AIDDbot package's copy (outside destRoot) would resolve to whatever repo
// that copy happens to sit under instead of destRoot.
function ensureJournalGenesis(destRoot, dryRun) {
  const rel = ".aiddbot/journals";
  if (fs.existsSync(path.join(destRoot, rel))) {
    print("skip-same", rel);
    return;
  }
  print("create", rel);
  if (dryRun) return;
  const appendScript = path.join(destRoot, ".agents", "skills", "record-journal", "scripts", "append.mjs");
  if (!fs.existsSync(appendScript)) return; // Nothing to spawn if the overlay didn't install it (unexpected, but never fatal to init).
  execFileSync(process.execPath, [appendScript, "init", "genesis", "green", `AIDDbot v${packageVersion()}`], { cwd: destRoot, stdio: "inherit" });
}

function ensureSeedFiles(destRoot, dryRun, title) {
  const written = [];
  const gitignore = ensureGitignore(destRoot, dryRun);
  if (gitignore) written.push(gitignore);
  const readme = ensureReadme(destRoot, dryRun, title);
  if (readme) written.push(readme);
  const license = ensureLicense(destRoot, dryRun);
  if (license) written.push(license);
  written.push(...ensureAgentSeed(destRoot, dryRun));
  const counters = ensureCounters(destRoot, dryRun);
  if (counters) written.push(counters);
  written.push(...ensureProductRecords(destRoot, dryRun));
  return written;
}

export { ensureSeedFiles, ensureJournalGenesis };
