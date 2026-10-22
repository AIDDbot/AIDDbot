// End-to-end tests of the aidd core: commit, integrate, and the repository checks.
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";
import { git, write, repo, aidd, approve, journalText } from "./helpers.mjs";

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

test("a commit needs no lint or test run: the hook of the technology lints, formats and runs the affected unit tests", () => {
  const root = repo();
  git(root, "switch", "-q", "-c", "chore/task");
  aidd(root, "config", "set", "projects.back", JSON.stringify({ type: "api", path: "back", commands: { test: 'node -e "process.exit(1)"' } }));
  write(root, "back/src/one.ts", "1\n");
  assert.equal(aidd(root, "commit", "feat(back): one", "back").body.committed, true);
  assert.equal(aidd(root, "run", "lint").code, 2);
  assert.equal(aidd(root, "run", "format").code, 2);
  assert.equal(aidd(root, "run", "test:files").code, 2);
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
  assert.equal(aidd(root, "log", "approved", "S0001 Rocket fleet", "--spec", "S0001").code, 1, "no spec S0001 exists: nothing to approve");
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
  assert.match(lines.at(-3), /model +S0001 +handoff +INFO +builder → craftsman: S0001$/);
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

test("commit refuses a type of spec that is not the type of the spec of the branch", () => {
  const root = repo();
  aidd(root, "spec", "new", "chore", "platform", "Platform");
  approve(root);
  write(root, "back/one.ts", "1\n");
  const refused = aidd(root, "commit", "feat(back): implement platform services", "back");
  assert.equal(refused.code, 1);
  assert.match(refused.body.error, /S0001-platform is a chore: commit its work as `chore\(\.\.\.\)`, never `feat\(\.\.\.\)`/);
  assert.equal(aidd(root, "commit", "chore(back): add platform services", "back").code, 0);
  write(root, "back/AGENTS.md", "# back\n");
  assert.equal(aidd(root, "commit", "docs(back): describe the platform", "back").code, 0);
});

test("commit refuses text with garbled characters, as a shell with the wrong encoding writes it", () => {
  const root = repo();
  git(root, "switch", "-q", "-c", "chore/docs");
  write(root, "e2e/AGENTS.md", "# Acceptance suite â€” e2e\n\n## 1 Â· Purpose\n");
  const refused = aidd(root, "commit", "docs(e2e): purpose", "e2e");
  assert.equal(refused.code, 1);
  assert.match(refused.body.error, /e2e\/AGENTS\.md has garbled characters/);
  write(root, "e2e/AGENTS.md", "# Acceptance suite — e2e\n\n## 1 · Purpose\n\nCafé, naïve, ½.\n");
  assert.equal(aidd(root, "commit", "docs(e2e): purpose", "e2e").code, 0);
});
