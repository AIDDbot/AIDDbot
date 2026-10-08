// End-to-end tests of the aidd core: commit, integrate, and the repository checks.
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";
import { git, write, repo, aidd, accept, approve } from "./helpers.mjs";

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
  assert.match(fs.readFileSync(path.join(root, ".aiddbot/journals", fs.readdirSync(path.join(root, ".aiddbot/journals"))[0]), "utf8"), /committed  INFO  feat\(a\): one/);
});

test("commit needs a passing lint on the same files of each project it changes", () => {
  const root = repo();
  git(root, "switch", "-q", "-c", "chore/task");
  const lint = (code) => aidd(root, "config", "set", "projects.back", JSON.stringify({
    path: "back",
    commands: { lint: `node -e "process.exit(${code})"`, format: "node -e \"require('fs').writeFileSync('style.ts', 'x')\"" },
  }));
  write(root, "back/one.ts", "1\n");
  lint(0);
  const refused = aidd(root, "commit", "feat(back): one", "back");
  assert.equal(refused.code, 1);
  assert.match(refused.body.error, /back \(never linted\)/);

  aidd(root, "run", "lint", "--project", "back");
  assert.equal(aidd(root, "commit", "feat(back): one", "back").body.committed, true);

  write(root, "back/two.ts", "2\n");
  assert.match(aidd(root, "commit", "feat(back): two", "back").body.error, /changed since its last lint/);
  lint(1);
  aidd(root, "run", "lint", "--project", "back");
  assert.match(aidd(root, "commit", "feat(back): two", "back").body.error, /its last lint failed/);

  lint(0);
  aidd(root, "run", "lint", "--project", "back");
  aidd(root, "run", "format", "--project", "back");
  assert.equal(aidd(root, "commit", "feat(back): two", "back").body.committed, true, "a format of clean files keeps the lint valid");

  write(root, "back/AGENTS.md", "# back\n");
  write(root, "docs/notes.txt", "outside every project\n");
  assert.equal(aidd(root, "commit", "docs(back): rules").body.committed, true, "documents and files outside projects need no lint");
});

test("release and integrate refuse project code that changed since its last lint", () => {
  const root = repo();
  aidd(root, "config", "set", "projects.back", JSON.stringify({ path: "back", commands: { lint: 'node -e "process.exit(0)"' } }));
  aidd(root, "spec", "new", "feat", "styled", "Styled", "--domain", "ui");
  approve(root);
  write(root, "back/one.ts", "1\n");
  aidd(root, "run", "lint", "--project", "back");
  assert.equal(aidd(root, "commit", "feat(back): one", "back").body.committed, true);
  accept(root, 0, "S0001");
  aidd(root, "eval", "verification", "green", "ok");
  aidd(root, "eval", "qualification", "green", "ok");
  write(root, "back/one.ts", "1;\n");
  const refused = aidd(root, "release");
  assert.equal(refused.code, 1);
  assert.match(refused.body.error, /back \(changed since its last lint\)/);
  aidd(root, "run", "lint", "--project", "back");
  assert.equal(aidd(root, "release").code, 0, "a formatted file ships once its lint passes again");
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
  const journal = fs.readdirSync(path.join(root, ".aiddbot/journals"));
  const lines = fs.readFileSync(path.join(root, ".aiddbot/journals", journal[0]), "utf8").trim().split("\n");
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
