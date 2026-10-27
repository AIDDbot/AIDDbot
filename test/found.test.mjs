// End-to-end tests of `aidd found`: an archetype of the catalog copied into a greenfield system, with the identity of the system.
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";
import { git, write, repo, aidd, journalText } from "./helpers.mjs";

const SYSTEM = `# Café Notes

> Author: Ada Lovelace · Website: https://ada.example · approved: 2026-10-27

## Purpose

Keep notes from the command line. Nothing else.

## Users and needs
`;

/** A local copy of Archetype CLI: the projects of the catalog, its own root files, and its shipped specs. */
function archetype() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "aidd-archetype-"));
  const pkg = { name: "archetype-cli", version: "0.4.22", private: true, license: "MIT", codename: "Daylight" };
  write(dir, "package.json", JSON.stringify(pkg, null, 2));
  const lock = { name: "archetype-cli", version: "0.4.22", lockfileVersion: 3, requires: true, packages: { "": { name: "archetype-cli", version: "0.4.22", license: "MIT" } } };
  write(dir, "package-lock.json", JSON.stringify(lock, null, 2));
  write(dir, "projects/cli/package.json", JSON.stringify({ name: "cli", displayName: "Archetype CLI", version: "0.4.0", author: { name: "AIDDbot", url: "https://aiddbot.com" } }, null, 2));
  write(dir, "projects/cli/src/app.main.ts", "export {};\n");
  write(dir, "projects/e2e/package.json", JSON.stringify({ name: "e2e", version: "0.0.0" }, null, 2));
  write(dir, ".product/specs/chore/S0001-scaffold.md", "# S0001\n");
  write(dir, ".product/model/model.schema.md", "# Model schema — Archetype CLI\n");
  write(dir, ".product/system.md", "# Archetype CLI\n");
  write(dir, "AGENTS.md", "# Archetype CLI\n");
  write(dir, "README.md", "# Archetype CLI\n");
  write(dir, ".gitignore", "*.log\ncoverage/\n");
  return dir;
}

/** A system with its approved proposal committed on chore/foundation. */
function proposed(text = SYSTEM) {
  const root = repo();
  write(root, "README.md", "# Café Notes\n");
  write(root, ".product/system.md", text);
  git(root, "switch", "-q", "-c", "chore/foundation");
  git(root, "add", "-A");
  git(root, "commit", "-q", "-m", "docs(system): propose Café Notes");
  return root;
}

const json = (root, file) => JSON.parse(fs.readFileSync(path.join(root, file), "utf8"));

test("found copies the archetype, sets the identity of the system, registers its projects, and installs", () => {
  const root = proposed();
  const result = aidd(root, "found", "cli", "--source", archetype());
  assert.equal(result.code, 0, JSON.stringify(result.body));
  assert.deepEqual(result.body.projects, ["cli", "e2e"]);
  assert.deepEqual(git(root, "log", "-2", "--format=%s").split("\n"), ["chore(scaffold): set the system identity", "chore(scaffold): copy Archetype CLI v0.4.22"]);
  assert.equal(git(root, "status", "--porcelain"), "");
  const pkg = json(root, "package.json");
  assert.deepEqual([pkg.name, pkg.version, pkg.codename], ["cafe-notes", "0.0.0", undefined]);
  assert.equal(json(root, "package-lock.json").packages[""].name, "cafe-notes");
  const cli = json(root, "projects/cli/package.json");
  assert.deepEqual([cli.displayName, cli.description, cli.author, cli.version], ["Café Notes", "Keep notes from the command line.", { name: "Ada Lovelace", url: "https://ada.example" }, "0.0.0"]);
  assert.equal(fs.readFileSync(path.join(root, ".product/model/model.schema.md"), "utf8"), "# Model schema — Café Notes\n");
  assert.ok(fs.existsSync(path.join(root, ".product/specs/chore/S0001-scaffold.md")));
  // The system keeps its own proposal, README and AGENTS.md, and gets each ignore line that it lacks.
  assert.match(fs.readFileSync(path.join(root, ".product/system.md"), "utf8"), /^# Café Notes/);
  assert.equal(fs.readFileSync(path.join(root, "README.md"), "utf8"), "# Café Notes\n");
  assert.equal(fs.readFileSync(path.join(root, ".gitignore"), "utf8").match(/\*\.log/g).length, 1);
  assert.match(fs.readFileSync(path.join(root, ".gitignore"), "utf8"), /coverage\//);
  const config = json(root, ".aiddbot/config.json");
  assert.equal(config.projects.cli.commands.start, "node src/app.main.ts");
  assert.deepEqual(config.release.versionFiles, ["projects/cli/package.json"]);
  assert.match(journalText(root), /scaffolded INFO  Archetype CLI v0\.4\.22: cli, e2e/);
});

test("found refuses an unknown archetype, another branch, a proposal with no approval, and a system with project code", () => {
  const source = archetype();
  assert.equal(aidd(proposed(), "found", "desktop", "--source", source).code, 2);
  const onMain = proposed();
  git(onMain, "switch", "-q", "main");
  assert.match(aidd(onMain, "found", "cli", "--source", source).body.error, /chore\/foundation/);
  const unapproved = proposed(SYSTEM.replace(" · approved: 2026-10-27", " · approved: {YYYY-MM-DD}"));
  assert.match(aidd(unapproved, "found", "cli", "--source", source).body.error, /no approval date/);
  const withCode = proposed();
  write(withCode, "projects/cli/src/app.main.ts", "console.log(1);\n");
  git(withCode, "add", "-A");
  git(withCode, "commit", "-q", "-m", "feat: code");
  const refused = aidd(withCode, "found", "cli", "--source", source);
  assert.equal(refused.code, 1);
  assert.match(refused.body.error, /already has projects\/cli\/src\/app\.main\.ts/);
  assert.equal(git(withCode, "log", "-1", "--format=%s"), "feat: code");
});
