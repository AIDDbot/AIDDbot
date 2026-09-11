#!/usr/bin/env node
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync, spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const source = fileURLToPath(new URL("../", import.meta.url));
const temp = fs.realpathSync(os.tmpdir());
const root = fs.mkdtempSync(path.join(temp, "aiddbot-release-"));
const run = (command, args) => execFileSync(command, args, { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
const release = (...args) => run(process.execPath, ["scripts/release.js", ...args]);
const pkg = () => JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
const changelog = () => fs.readFileSync(path.join(root, "CHANGELOG.md"), "utf8");
const commit = (message) => { run("git", ["add", "."]); run("git", ["-c", "user.name=Test", "-c", "user.email=test@example.com", "-c", "commit.gpgsign=false", "commit", "-m", message]); };

try {
  fs.mkdirSync(path.join(root, "scripts"));
  fs.copyFileSync(path.join(source, "scripts/release.js"), path.join(root, "scripts/release.js"));
  fs.cpSync(path.join(source, "bin"), path.join(root, "bin"), { recursive: true });
  fs.writeFileSync(path.join(root, "package.json"), JSON.stringify({ name: "release-test", type: "module", version: "1.2.3" }));
  run("git", ["init"]);
  commit("feat: first change");
  const original = fs.readFileSync(path.join(root, "package.json"), "utf8");
  assert.match(release("minor", "--dry-run"), /1\.2\.3 -> 1\.3\.0/);
  assert.equal(fs.readFileSync(path.join(root, "package.json"), "utf8"), original);
  assert.equal(fs.existsSync(path.join(root, "CHANGELOG.md")), false);
  const invalid = spawnSync(process.execPath, ["scripts/release.js", "invalid"], { cwd: root });
  assert.equal(invalid.status, 1);
  assert.equal(fs.readFileSync(path.join(root, "package.json"), "utf8"), original);
  assert.match(run(process.execPath, ["bin/aiddbot.js", "--version"]), /v1\.2\.3.*unreleased/);
  release();
  assert.equal(pkg().version, "1.2.4");
  assert.equal(new Date(pkg().buildTimestamp).toISOString(), pkg().buildTimestamp);
  assert.match(changelog(), /feat: first change/);
  const first = changelog();
  const output = run(process.execPath, ["bin/aiddbot.js", "--version"]);
  assert.ok(output.includes(`v1.2.4 (built ${pkg().buildTimestamp})`));
  assert.equal(run(process.execPath, ["bin/aiddbot.js", "-v"]), output);
  commit("fix: second change");
  release("minor");
  assert.equal(pkg().version, "1.3.0");
  assert.ok(changelog().endsWith(first.replace(/^# Changelog\n\n/, "")));
  assert.equal(changelog().match(/feat: first change/g).length, 1);
  assert.match(changelog(), /fix: second change/);
  release("major");
  assert.equal(pkg().version, "2.0.0");
  assert.match(changelog(), /No new commits/);
  // Legacy version tags supply the initial boundary when metadata is absent.
  run("git", ["tag", "v2.0.0"]);
  const legacy = pkg();
  delete legacy.releaseCommit;
  fs.writeFileSync(path.join(root, "package.json"), JSON.stringify(legacy));
  commit("feat: after tag");
  release();
  const newest = changelog().split("\n## ")[1];
  assert.match(newest, /feat: after tag/);
  assert.doesNotMatch(newest, /first change|second change/);
  assert.equal(run("git", ["log", "--format=%s"]).trim().split("\n").length, 3);
  assert.equal(run("git", ["tag", "--list"]).trim(), "v2.0.0");
  console.log("PASS release versioning, changelog boundaries, dry-run, and CLI metadata");
} finally {
  if (path.dirname(path.resolve(root)) !== temp) throw new Error(`Unsafe cleanup target: ${root}`);
  fs.rmSync(root, { recursive: true, force: true });
}
