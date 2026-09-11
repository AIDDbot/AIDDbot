#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const root = fileURLToPath(new URL("../", import.meta.url));
const git = (...args) => execFileSync("git", args, { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();

function release() {
  const args = process.argv.slice(2);
  if (args.includes("--help")) {
    console.log("Usage: npm run release -- [patch|minor|major] [--dry-run]");
    return;
  }
  const bumps = args.filter((arg) => arg !== "--dry-run");
  const bump = bumps[0] || "patch";
  if (bumps.length > 1 || !["patch", "minor", "major"].includes(bump)) {
    throw new Error("Expected patch, minor, or major and optional --dry-run.");
  }
  const packagePath = path.join(root, "package.json");
  const pkg = JSON.parse(fs.readFileSync(packagePath, "utf8"));
  if (!/^\d+\.\d+\.\d+$/.test(pkg.version)) throw new Error(`Unsupported version: ${pkg.version}`);
  const parts = pkg.version.split(".").map(Number);
  const index = { major: 0, minor: 1, patch: 2 }[bump];
  parts[index]++;
  parts.fill(0, index + 1);
  const version = parts.join(".");
  const timestamp = new Date().toISOString();
  const head = git("rev-parse", "HEAD");
  let base = pkg.releaseCommit;
  if (base) {
    if (!/^[a-f0-9]{40,64}$/.test(base)) throw new Error("Invalid releaseCommit in package.json.");
    git("merge-base", "--is-ancestor", base, head);
  } else {
    try { base = git("describe", "--tags", "--abbrev=0", "--match", "v[0-9]*"); }
    catch { /* The first release includes all history when no version tag exists. */ }
  }
  const commits = git("log", "--format=- %s (%h)", base ? `${base}..${head}` : head);
  const changelogPath = path.join(root, "CHANGELOG.md");
  const existing = fs.existsSync(changelogPath) ? fs.readFileSync(changelogPath, "utf8") : "# Changelog\n";
  const history = existing.replace(/^# Changelog\r?\n\s*/, "");
  const entry = `## ${version} - ${timestamp.slice(0, 10)}\n\n${commits || "- No new commits."}\n`;
  const changelog = `# Changelog\n\n${entry}${history ? `\n${history}` : ""}`;
  console.log(`${pkg.version} -> ${version}\nBuild timestamp: ${timestamp}\n\n${entry}`);
  if (args.includes("--dry-run")) return;
  pkg.version = version;
  pkg.buildTimestamp = timestamp;
  pkg.releaseCommit = head;
  fs.writeFileSync(changelogPath, changelog);
  fs.writeFileSync(packagePath, `${JSON.stringify(pkg, null, 2)}\n`);
  console.log("Updated package.json and CHANGELOG.md. Review and commit these files with the release changes.");
}

try { release(); }
catch (error) { console.error(`Release failed: ${error.message}`); process.exitCode = 1; }
