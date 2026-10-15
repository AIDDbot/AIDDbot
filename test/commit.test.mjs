// End-to-end tests of the aidd core: commit, integrate, and the repository checks.
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";
import { git, write, repo, aidd, journalText } from "./helpers.mjs";

test("commit records the paths it is given and journals the milestone", () => {
  const root = repo();
  write(root, "a/one.txt", "1\n");
  write(root, "b/two.txt", "2\n");
  const refused = aidd(root, "commit", "feat(a): one", "a");
  assert.equal(refused.code, 1);
  assert.match(refused.body.error, /Never commit on main/);
  git(root, "switch", "-q", "-c", "chore/task");
  assert.equal(aidd(root, "commit", "feat(a): one", "a").body.committed, true);
  assert.equal(git(root, "log", "-1", "--format=%s"), "feat(a): one");
  assert.match(git(root, "status", "--short"), /b\//);
  assert.equal(aidd(root, "commit", "nothing", "a").body.committed, false);
  assert.equal(aidd(root, "commit").code, 2);
  assert.match(journalText(root), /committed  INFO  feat\(a\): one/);
});

test("a commit that the pre-commit hook refuses fails with the output of the hook", () => {
  const root = repo();
  git(root, "switch", "-q", "-c", "chore/task");
  write(root, ".git/hooks/pre-commit", "#!/bin/sh\necho \"one.ts:1 no-unused-vars\" >&2\nexit 1\n");
  fs.chmodSync(path.join(root, ".git/hooks/pre-commit"), 0o755);
  write(root, "back/one.ts", "1\n");
  const refused = aidd(root, "commit", "feat(back): one", "back");
  assert.equal(refused.code, 1);
  assert.match(refused.body.error, /one\.ts:1 no-unused-vars/);
  fs.rmSync(path.join(root, ".git/hooks/pre-commit"));
  assert.equal(aidd(root, "commit", "feat(back): one", "back").body.committed, true);
});

test("a test of the changed files runs only the unit tests of the branch; lint and format are no run kinds", () => {
  const root = repo();
  write(root, "back/src/old.ts", "0\n");
  write(root, "back/args.js", "console.log(process.argv.slice(2).join(' '));\n");
  git(root, "add", "-A");
  git(root, "commit", "-q", "-m", "chore: old");
  git(root, "switch", "-q", "-c", "chore/task");
  const commands = { test: 'node -e "process.exit(0)"', "test:files": "node args.js" };
  aidd(root, "config", "set", "projects.back", JSON.stringify({ type: "api", path: "back", commands }));
  aidd(root, "config", "set", "projects.front", JSON.stringify({ type: "web", path: "front", commands: { test: 'node -e "process.exit(0)"' } }));
  write(root, "back/src/one.ts", "1\n");
  write(root, "back/src/one.test.ts", "1\n");
  write(root, "back/src/two.ts", "2\n");
  const tested = aidd(root, "run", "test", "--changed");
  assert.equal(tested.code, 0);
  assert.equal(tested.body.runs.find((entry) => entry.project === "back").command, 'node args.js "src/one.test.ts"', "the changed test and the test beside each changed source");
  assert.match(tested.body.runs.find((entry) => entry.project === "front").na, /no changed test/);
  assert.equal(aidd(root, "commit", "feat(back): one", "back").body.committed, true, "a commit needs no lint run: the hook of the technology lints");
  aidd(root, "config", "set", "projects.back.commands", JSON.stringify({ test: 'node -e "process.exit(0)"' }));
  write(root, "back/src/two.test.ts", "2\n");
  assert.equal(aidd(root, "run", "test", "--changed", "--project", "back").body.runs[0].command, 'node -e "process.exit(0)"', "a project without test:files runs its full test");
  assert.equal(aidd(root, "run", "quality", "--changed").code, 2);
  assert.equal(aidd(root, "run", "lint").code, 2);
  assert.equal(aidd(root, "run", "format").code, 2);
});

test("integrate commits and merges a task branch; log journals a capped judgment", () => {
  const root = repo();
  git(root, "switch", "-q", "-c", "chore/document");
  write(root, "AGENTS.md", "# Agents\n");
  const merged = aidd(root, "integrate", "docs(system): document foundation");
  assert.equal(merged.code, 0);
  assert.equal(merged.body.committed, true);
  assert.equal(git(root, "branch", "--show-current"), "main");
  assert.equal(aidd(root, "log", "verdict", `greenfield: ${"x".repeat(200)}`).code, 0);
  assert.equal(aidd(root, "log", "handoff", "builder → craftsman: S0001", "--spec", "S0001").code, 0);
  assert.equal(aidd(root, "log", "approved", "S0001 Rocket fleet", "--spec", "S0001").code, 0);
  assert.equal(aidd(root, "log", "plan", "back: rockets repository and route", "--spec", "S0001").code, 0);
  assert.equal(aidd(root, "log", "scaffolded", "back, front, e2e").code, 0);
  assert.equal(aidd(root, "log", "started", "nope").code, 2);
  assert.equal(aidd(root, "log", "verdict", `ℹ ✔ don't import '../core' or "x" in \`cli\` → ok`).code, 0);
  const quoted = journalText(root).trim().split("\n").at(-1);
  assert.match(quoted, /verdict +INFO +dont import \.\.\/core or x in cli → ok$/);
  const lines = journalText(root).trim().split("\n").slice(0, -1);
  const verdict = lines.find((line) => line.includes(" verdict "));
  assert.match(verdict, /model +- +verdict +INFO +greenfield: x+…$/);
  assert.ok(verdict.split(" INFO ").pop().trim().length <= 128);
  assert.match(lines.at(-3), /model +S0001 +approved +INFO +S0001 Rocket fleet$/);
  assert.match(lines.at(-2), /model +S0001 +plan +INFO +back: rockets repository and route$/);
  assert.match(lines.at(-1), /model +- +scaffolded +INFO +back, front, e2e$/);
});

test("commands outside an initialized repository explain what to do", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "aidd-bare-"));
  const result = aidd(root, "debt", "list");
  assert.equal(result.code, 1);
  assert.match(result.body.error, /aiddbot init/);
});

test("commit refuses installed dependencies, and lets them leave the index", () => {
  const root = repo();
  git(root, "switch", "-q", "-c", "chore/foundation");
  write(root, "back/node_modules/lib/index.js", "export {};\n");
  write(root, "back/package.json", "{}\n");
  const refused = aidd(root, "commit", "chore(back): register tooling", "back");
  assert.equal(refused.code, 1);
  assert.match(refused.body.error, /Installed dependencies are never committed \(back\/node_modules\/lib\/index\.js\)/);
  git(root, "add", "-A");
  git(root, "commit", "-q", "-m", "chore: slipped in");
  git(root, "rm", "-r", "-q", "--cached", "back/node_modules");
  write(root, "back/.gitignore", "/node_modules/\n");
  assert.equal(aidd(root, "commit", "chore(back): exclude installed dependencies", "back").code, 0);
});
