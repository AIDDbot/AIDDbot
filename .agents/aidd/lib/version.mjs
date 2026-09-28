// The product version and its changelog (D37, D38). The core computes the next version from
// the spec type, writes it into every declared JSON version file, and records the changelog entry.
import fs from "node:fs";
import path from "node:path";
import { RuleError } from "./cli.mjs";
import { readConfig } from "./config.mjs";
import { writeAtomic } from "./files.mjs";

const SEMVER = /^(\d+)\.(\d+)\.(\d+)(?:[-+].*)?$/;
const SECTIONS = { feat: "Added", fix: "Fixed", refactor: "Changed", chore: "Changed" };
export const CHANGELOG = "CHANGELOG.md";

/** The declared version files, or the root package.json and its lockfile by default. */
export function versionFiles(root) {
  const declared = readConfig(root).release?.versionFiles;
  if (declared) return declared;
  return ["package.json", "package-lock.json"].filter((file) => fs.existsSync(path.join(root, file)));
}

function readJson(root, file) {
  const full = path.join(root, file);
  if (!fs.existsSync(full)) throw new RuleError(`Version file is missing: ${file}`);
  const text = fs.readFileSync(full, "utf8");
  try { return { full, text, value: JSON.parse(text) }; } catch (error) { throw new RuleError(`${file} is not valid JSON: ${error.message}`); }
}

/** The current product version, read from the first version file. */
export function currentVersion(root) {
  const [first] = versionFiles(root);
  if (!first) throw new RuleError("No version file: add a root package.json with a version, or declare release.versionFiles in config.json.");
  const { value } = readJson(root, first);
  if (!SEMVER.test(value.version ?? "")) throw new RuleError(`${first} has no semantic version.`);
  return value.version;
}

/** `feat` bumps the minor, anything else the patch; `major` resets both (D37). */
export function nextVersion(current, type, major = false) {
  const [, x, y, z] = SEMVER.exec(current).map(Number);
  if (major) return `${x + 1}.0.0`;
  return type === "feat" ? `${x}.${y + 1}.0` : `${x}.${y}.${z + 1}`;
}

/** Set `version` in every version file, and in a lockfile's root package entry, keeping each file's indentation. */
export function writeVersions(root, version) {
  const written = [];
  for (const file of versionFiles(root)) {
    const { full, text, value } = readJson(root, file);
    if (typeof value.version !== "string") throw new RuleError(`${file} has no version field to update.`);
    value.version = version;
    if (typeof value.packages?.[""]?.version === "string") value.packages[""].version = version;
    const indent = /^([ \t]+)"/m.exec(text)?.[1] ?? "  ";
    writeAtomic(full, `${JSON.stringify(value, null, indent)}${text.endsWith("\n") ? "\n" : ""}`);
    written.push(file);
  }
  return written;
}

/** Add the release entry at the top of CHANGELOG.md, creating the file when absent. */
export function writeChangelog(root, { version, type, title, id, key }) {
  const file = path.join(root, CHANGELOG);
  const header = "# Changelog\n\nAll notable changes to this project are documented in this file.\n";
  const current = fs.existsSync(file) ? fs.readFileSync(file, "utf8") : header;
  const date = new Date().toISOString().slice(0, 10);
  const entry = `## [${version}] - ${date}\n\n### ${SECTIONS[type]}\n\n- ${title} ([${id}](.product/specs/${key}/spec.md))\n`;
  const first = /^## /m.exec(current);
  const next = first ? `${current.slice(0, first.index)}${entry}\n${current.slice(first.index)}` : `${current.replace(/\s*$/, "")}\n\n${entry}`;
  writeAtomic(file, next);
  return CHANGELOG;
}
