// `aidd found <archetype>`: copy an archetype of the catalog into a greenfield system, set the identity of the system, and register its projects.
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { aiddbotPath, commitPaths, currentBranch, git, journal, productPath, readJson, RuleError, UsageError, writeJson } from "../lib/core.mjs";
import { config } from "./work.mjs";

const CATALOG = fileURLToPath(new URL("../archetypes.json", import.meta.url));
const BRANCH = "chore/foundation";
/** The archetype root files that the system has its own of; `.gitignore` is merged instead. */
const OWN_FILES = new Set(["AGENTS.md", "CLAUDE.md", "README.md", "LICENSE", ".gitignore", ".product/system.md"]);
const SKIPPED = new Set([".git", "node_modules"]);
/** `aiddbot init` writes a root `package.json`; the one of the archetype replaces it. */
const REPLACED = new Set(["package.json"]);
const INSTALL = "npm ci";
const INSTALL_MINUTES = 20;
const AUTHOR_LINE = /^> Author: (.+?) · Website: (\S+) · approved: (\d{4}-\d{2}-\d{2})\s*$/m;

/** The archetypes of the catalog, by key. */
export const catalog = () => readJson(CATALOG);

/** The files of `dir`, relative and with `/`, without the folders that are never copied. */
function files(dir, base = dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (SKIPPED.has(entry.name)) return [];
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? files(full, base) : [path.relative(base, full).split(path.sep).join("/")];
  });
}

/** The system data of an approved `.product/system.md`: its name, author, website, and the first sentence of its purpose. */
function systemData(root) {
  const file = productPath(root, "system.md");
  if (!fs.existsSync(file)) throw new RuleError("Write and approve .product/system.md first.");
  const text = fs.readFileSync(file, "utf8");
  const name = /^# (.+)$/m.exec(text)?.[1].trim();
  const [, author, website, approved] = AUTHOR_LINE.exec(text) ?? [];
  const purpose = /^## Purpose\s*\n([\s\S]*?)(?=^## |(?![\s\S]))/m.exec(text)?.[1].trim().split(/(?<=\.)\s/)[0];
  if (!approved) throw new RuleError("The line '> Author: … · Website: … · approved: YYYY-MM-DD' of .product/system.md has no approval date.");
  if (!name || name.startsWith("{") || !purpose || purpose.startsWith("{")) throw new RuleError(".product/system.md needs its name and its Purpose.");
  return { name, author, website, purpose, slug: kebab(name) };
}

const kebab = (text) => text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** A copy of the archetype in a temporary folder: from `source`, else from its pinned tag. */
function fetchArchetype(archetype, source) {
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), "aidd-found-"));
  if (source) {
    fs.cpSync(path.resolve(source), temp, { recursive: true, filter: (from) => !SKIPPED.has(path.basename(from)) });
    return temp;
  }
  const command = `npx --yes degit ${archetype.repository}#${archetype.tag} "${temp}" --force`;
  const result = spawnSync(command, { shell: true, encoding: "utf8" });
  if (result.status !== 0) {
    fs.rmSync(temp, { recursive: true, force: true });
    throw new RuleError(`${command} failed: ${(result.stderr || result.stdout || "").trim()}`);
  }
  return temp;
}

/** Add each line of the archetype `.gitignore` that the system does not have; never remove a line. */
function mergeIgnore(root, temp) {
  const theirs = path.join(temp, ".gitignore");
  if (!fs.existsSync(theirs)) return;
  const file = path.join(root, ".gitignore");
  const ours = fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
  const have = new Set(ours.split(/\r?\n/).map((line) => line.trim()));
  const added = fs.readFileSync(theirs, "utf8").split(/\r?\n/).filter((line) => line.trim() && !have.has(line.trim()));
  if (added.length) fs.writeFileSync(file, `${ours.trimEnd()}\n\n# From the archetype\n${added.join("\n")}\n`, "utf8");
}

function editJson(file, change) {
  const value = readJson(file);
  change(value);
  writeJson(file, value);
}

/** The identity of the system replaces the identity of the archetype: the root, each version file, the lockfile, and the title of the model. */
function setIdentity(root, archetype, system) {
  editJson(path.join(root, "package.json"), (pkg) => {
    pkg.name = system.slug;
    pkg.version = "0.0.0";
    delete pkg.codename;
    delete pkg.repository;
  });
  for (const versionFile of archetype.versionFiles) {
    editJson(path.join(root, versionFile), (pkg) => {
      Object.assign(pkg, { displayName: system.name, description: system.purpose, author: { name: system.author, url: system.website }, version: "0.0.0" });
    });
  }
  const lock = path.join(root, "package-lock.json");
  if (fs.existsSync(lock)) {
    editJson(lock, (value) => {
      Object.assign(value, { name: system.slug, version: "0.0.0" });
      if (value.packages?.[""]) Object.assign(value.packages[""], { name: system.slug, version: "0.0.0" });
      for (const versionFile of archetype.versionFiles) {
        const entry = value.packages?.[path.posix.dirname(versionFile)];
        if (entry) entry.version = "0.0.0";
      }
    });
  }
  const model = productPath(root, "model", "model.schema.md");
  if (fs.existsSync(model)) {
    fs.writeFileSync(model, fs.readFileSync(model, "utf8").replace(/^(# .*?)\s+—\s+.*$/m, `$1 — ${system.name}`), "utf8");
  }
}

/** Install at the root, with the whole output in a log; its `prepare` installs the pre-commit hook. */
function install(root) {
  const log = aiddbotPath(root, "logs", "found-install.log");
  fs.mkdirSync(path.dirname(log), { recursive: true });
  const result = spawnSync(INSTALL, { cwd: root, shell: true, encoding: "utf8", timeout: INSTALL_MINUTES * 60_000 });
  fs.writeFileSync(log, `${result.stdout ?? ""}${result.stderr ?? ""}`, "utf8");
  if (result.status !== 0) throw new RuleError(`${INSTALL} failed; see .aiddbot/logs/found-install.log. It is a defect of the environment or of the archetype: never repair it in the system.`);
}

/** `found <archetype> [--source <folder>]`: on `chore/foundation`, with an approved `.product/system.md` and no project code. */
export function found(root, [key], flags) {
  const archetypes = catalog();
  const archetype = archetypes[key];
  if (!archetype) throw new UsageError(`Archetype must be one of: ${Object.keys(archetypes).join(", ")}.`);
  if (currentBranch(root) !== BRANCH) throw new RuleError(`Found the system on ${BRANCH}, with the approved proposal committed.`);
  if (git(root, ["status", "--porcelain"])) throw new RuleError("Commit or remove each change first: the foundation starts from a clean working tree.");
  const system = systemData(root);
  const temp = fetchArchetype(archetype, typeof flags.source === "string" ? flags.source : null);
  try {
    const copied = files(temp).filter((file) => !OWN_FILES.has(file));
    const taken = copied.filter((file) => !REPLACED.has(file) && fs.existsSync(path.join(root, file)));
    if (taken.length) throw new RuleError(`The system already has ${taken.slice(0, 3).join(", ")}: found only a system with no project code.`);
    for (const file of copied) {
      fs.mkdirSync(path.dirname(path.join(root, file)), { recursive: true });
      fs.copyFileSync(path.join(temp, file), path.join(root, file));
    }
    mergeIgnore(root, temp);
  } finally {
    fs.rmSync(temp, { recursive: true, force: true });
  }
  const copy = `chore(scaffold): copy ${archetype.name} ${archetype.tag}`;
  commitPaths(root, ["."], copy);
  setIdentity(root, archetype, system);
  for (const [name, project] of Object.entries(archetype.projects)) config(root, ["set", `projects.${name}`, JSON.stringify(project)]);
  config(root, ["set", "release.versionFiles", JSON.stringify(archetype.versionFiles)]);
  install(root);
  const identity = "chore(scaffold): set the system identity";
  commitPaths(root, ["."], identity);
  const projects = Object.keys(archetype.projects);
  journal(root, { event: "scaffolded", summary: `${archetype.name} ${archetype.tag}: ${projects.join(", ")}` });
  return { archetype: archetype.name, tag: archetype.tag, system: system.name, projects, commits: [copy, identity] };
}
