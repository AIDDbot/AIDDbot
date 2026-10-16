// End-to-end tests of the aidd core: the evidence gate and eval.
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { test } from "node:test";
import { git, write, repo, aidd, accept, readJson, approve } from "./helpers.mjs";

test("the gate blocks red evidence until revision 3 and ships it then", () => {
  const root = repo();
  aidd(root, "spec", "new", "feat", "cart", "Cart");
  approve(root);
  write(root, ".aiddbot/logs/S0001-cart.verification.md", "# Failures\n");
  aidd(root, "eval", "verification", "red", "one failure");
  assert.equal(aidd(root, "eval", "qualification", "amber", "minor").code, 1);
  write(root, ".aiddbot/logs/S0001-cart.qualification.md", "# Findings\n");
  aidd(root, "eval", "qualification", "amber", "minor");
  fs.rmSync(path.join(root, ".aiddbot/logs/S0001-cart.qualification.md"));
  const blocked = aidd(root, "release");
  assert.equal(blocked.code, 1);
  assert.match(blocked.body.error, /verification is red at revision 1/);
  assert.match(blocked.body.error, /qualification\.md is missing/);
  write(root, ".aiddbot/logs/S0001-cart.qualification.md", "# Findings\n");
  aidd(root, "eval", "verification", "red", "still one");
  aidd(root, "eval", "verification", "red", "still one");
  assert.equal(aidd(root, "release").code, 0);
});

test("a red qualification never blocks shipping", () => {
  const root = repo();
  aidd(root, "spec", "new", "fix", "auth", "Auth");
  approve(root);
  accept(root, 0, "S0001");
  aidd(root, "eval", "verification", "green", "ok");
  write(root, ".aiddbot/logs/S0001-auth.qualification.md", "# Findings\n");
  assert.equal(aidd(root, "eval", "qualification", "red", "missing guard").code, 0);
  assert.deepEqual(aidd(root, "spec", "show").body.blockers, []);
  assert.equal(aidd(root, "release").body.version, "0.1.1");
});

test("the gate rejects evidence written by hand without a real commit", () => {
  const root = repo();
  aidd(root, "spec", "new", "feat", "fake", "Fake");
  approve(root);
  const file = path.join(root, ".aiddbot/logs/S0001-fake.json");
  const control = JSON.parse(fs.readFileSync(file, "utf8"));
  control.evaluations = ["verification", "qualification"].map((kind) => ({ kind, revision: 1, status: "green" }));
  fs.writeFileSync(file, JSON.stringify(control));
  const shown = aidd(root, "spec", "show");
  assert.equal(shown.body.blockers.length, 2);
  assert.match(shown.body.blockers[0], /no real commit/);
  assert.equal(aidd(root, "release").code, 1);
});

test("green verification needs a passing run of the tests of the spec at HEAD that tags every requirement", () => {
  const root = repo();
  aidd(root, "spec", "new", "feat", "fleet", "Fleet");
  approve(root);
  const spec = ".product/specs/feat/S0001-fleet.md";
  write(root, spec, "## Requirements\n\n- **R01**: WHEN a list is asked...\n- **R02**: WHEN a rocket is added...\n");
  assert.match(aidd(root, "eval", "verification", "green", "ok").body.error, /aidd run test --spec/);
  accept(root, 0, "S0001");
  assert.match(aidd(root, "eval", "verification", "green", "ok").body.error, /@S0001-Rnn for R02/);
  write(root, "e2e/fleet.spec.ts", 'test("lists @S0001-R01", () => {});\ntest("adds @S0001-R02", () => {});\n');
  git(root, "add", "-A");
  git(root, "commit", "-q", "-m", "test(e2e): fleet");
  assert.match(aidd(root, "eval", "verification", "green", "ok").body.error, /Code changed since the last run of the acceptance tests of the spec/);
  aidd(root, "run", "test", "--spec");
  const control = readJson(root, ".aiddbot/logs/S0001-fleet.json");
  assert.equal(control.runs.spec.e2e.commit, git(root, "rev-parse", "HEAD"));
  assert.equal(aidd(root, "eval", "verification", "green", "ok").code, 0, "the full suites belong to the release");
});

test("a failing run of the tests of the spec is red, and debt never excuses it", () => {
  const root = repo();
  aidd(root, "debt", "add", "Flaky login test", "high");
  aidd(root, "spec", "new", "fix", "crash", "Crash");
  approve(root);
  accept(root, 1, "S0001");
  assert.match(aidd(root, "eval", "verification", "green", "ok").body.error, /acceptance tests of the spec failed; record red/);
  assert.equal(aidd(root, "eval", "verification", "green", "ok", "--debt", "D0001").code, 2);
});

test("a fix without requirements is verified green with no run, and the regression proves it", () => {
  const root = repo();
  aidd(root, "spec", "new", "fix", "input", "Input");
  write(root, ".product/specs/fix/S0001-input.md", "---\ntype: fix\n---\n# S0001-input — Input\n\n## Problem\n\nAn unsafe input.\n");
  approve(root);
  assert.equal(aidd(root, "eval", "verification", "green", "no requirements").code, 0);
  aidd(root, "eval", "qualification", "green", "ok");
  accept(root, 0);
  assert.equal(aidd(root, "release").code, 0);
});

test("a refactor records no evaluation, and a chore no verification: the regression proves them", () => {
  const root = repo();
  aidd(root, "debt", "add", "Duplicated price rule", "medium", "cart.ts:4 and order.ts:9");
  aidd(root, "spec", "debt", "D0001");
  assert.match(aidd(root, "eval", "verification", "green", "ok").body.error, /A refactor records no verification/);
  assert.match(aidd(root, "eval", "qualification", "green", "ok").body.error, /A refactor records no qualification/);
  assert.deepEqual(aidd(root, "spec", "show").body.blockers, []);
  accept(root, 0);
  assert.equal(aidd(root, "release").code, 0);
  aidd(root, "spec", "new", "chore", "tools", "Tools");
  approve(root, "S0002");
  assert.match(aidd(root, "eval", "verification", "green", "ok").body.error, /A chore records no verification/);
  assert.deepEqual(aidd(root, "spec", "show").body.blockers, ["No qualification recorded."]);
});

test("eval keeps its record in the ignored logs, commits nothing, and drops the report once green", () => {
  const root = repo();
  aidd(root, "spec", "new", "feat", "seats", "Seats");
  approve(root);
  const head = git(root, "rev-parse", "HEAD");
  write(root, ".aiddbot/logs/S0001-seats.verification.md", "# Failures\n");
  assert.equal(aidd(root, "eval", "verification", "red", "one failure").code, 0);
  assert.equal(git(root, "rev-parse", "HEAD"), head);
  assert.equal(readJson(root, ".aiddbot/logs/S0001-seats.json").evaluations[0].status, "red");
  assert.equal(git(root, "status", "--short", "--", ".aiddbot"), "");
  accept(root, 0, "S0001");
  assert.equal(aidd(root, "eval", "verification", "green", "fixed").code, 0);
  assert.ok(!fs.existsSync(path.join(root, ".aiddbot/logs/S0001-seats.verification.md")));
});

test("release needs a passing full unit and acceptance run at HEAD; a failure ships only with open high debt", () => {
  const root = repo();
  fs.mkdirSync(path.join(root, "back"));
  const unit = (code) => aidd(root, "config", "set", "projects.back", JSON.stringify({ type: "api", path: "back", commands: { test: `node -e "process.exit(${code})"` } }));
  unit(0);
  aidd(root, "debt", "add", "Flaky login test", "medium");
  aidd(root, "spec", "new", "feat", "cart", "Cart");
  approve(root);
  accept(root, 0, "S0001");
  assert.equal(aidd(root, "eval", "verification", "green", "ok").code, 0, "the verification needs only the tests of the spec");
  aidd(root, "eval", "qualification", "green", "ok");
  assert.match(aidd(root, "release").body.error, /before you release: back has no unit run/);
  unit(1);
  aidd(root, "run", "test");
  assert.match(aidd(root, "release").body.error, /regression failed in back\. Triage each failure/);
  assert.match(aidd(root, "release", "--debt", "D0001").body.error, /D0001 is not open high debt/);
  aidd(root, "debt", "add", "Login breaks on the cart page", "high");
  assert.equal(aidd(root, "release", "--debt", "D0002").code, 0, "a failure too big for the spec ships as high debt");
});

test("a failed regression ships after a red verification at revision 3 only with high debt", () => {
  const root = repo();
  aidd(root, "spec", "new", "feat", "seats", "Seats");
  approve(root);
  accept(root, 1, "S0001");
  write(root, ".aiddbot/logs/S0001-seats.verification.md", "# Failures\n");
  for (const summary of ["one", "two"]) aidd(root, "eval", "verification", "red", summary);
  assert.match(aidd(root, "release").body.error, /verification is red at revision 2/);
  aidd(root, "eval", "verification", "red", "three");
  aidd(root, "eval", "qualification", "green", "ok");
  assert.match(aidd(root, "release").body.error, /regression failed in e2e/);
  aidd(root, "debt", "add", "Seats cannot be booked", "high");
  assert.equal(aidd(root, "release", "--debt", "D0001").code, 0);
});

test("a fix of a failing test cites it: the verification runs that test again and needs it green", () => {
  const root = repo();
  aidd(root, "debt", "add", "Fleet list fails", "high", "@S0042-R03 fails: the list is empty after a reload");
  aidd(root, "spec", "debt", "D0001");
  approve(root);
  const text = fs.readFileSync(path.join(root, ".product/specs/fix/S0001-fleet-list-fails.md"), "utf8");
  assert.match(text, /The acceptance tests @S0042-R03 pass again/);
  write(root, "e2e/suite.js", "process.exit(1);\n");
  aidd(root, "config", "set", "projects.e2e", JSON.stringify({ type: "e2e", path: "e2e", commands: { test: "node suite.js", "test:spec": "node suite.js -t" } }));
  const missing = aidd(root, "run", "test", "--spec");
  assert.equal(missing.body.runs[0].command, "node suite.js -t @S0042-R03", "the tag of the cited test, not the tag of the fix");
  assert.deepEqual(missing.body.untested, ["S0042-R03"]);
  assert.match(aidd(root, "eval", "verification", "green", "ok").body.error, /@S0042-R03, which the spec cites/);
  write(root, "e2e/fleet.spec.ts", 'test("lists after a reload @S0042-R03", () => {});\n');
  git(root, "add", "-A");
  git(root, "commit", "-q", "-m", "fix(e2e): fleet list");
  aidd(root, "run", "test", "--spec");
  assert.match(aidd(root, "eval", "verification", "green", "ok").body.error, /failed; record red/, "the cited test still fails");
  write(root, "e2e/suite.js", "process.exit(0);\n");
  git(root, "add", "-A");
  git(root, "commit", "-q", "-m", "fix(back): fleet list");
  assert.deepEqual(aidd(root, "run", "test", "--spec").body.untested, []);
  assert.equal(aidd(root, "eval", "verification", "green", "ok").code, 0);
});
