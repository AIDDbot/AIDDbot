// End-to-end tests of the aidd core: the evidence gate and eval.
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { test } from "node:test";
import { git, write, repo, aidd, accept, readJson } from "./helpers.mjs";

test("the gate blocks red evidence until revision 3 and ships it then", () => {
  const root = repo();
  aidd(root, "spec", "new", "feat", "cart", "Cart");
  write(root, ".product/specs/S0001-cart/verification.md", "# Failures\n");
  aidd(root, "eval", "verification", "red", "one failure");
  assert.equal(aidd(root, "eval", "qualification", "amber", "minor").code, 1);
  write(root, ".product/specs/S0001-cart/qualification.md", "# Findings\n");
  aidd(root, "eval", "qualification", "amber", "minor");
  fs.rmSync(path.join(root, ".product/specs/S0001-cart/qualification.md"));
  const blocked = aidd(root, "release");
  assert.equal(blocked.code, 1);
  assert.match(blocked.body.error, /verification is red at revision 1/);
  assert.match(blocked.body.error, /qualification\.md is missing/);
  write(root, ".product/specs/S0001-cart/qualification.md", "# Findings\n");
  aidd(root, "eval", "verification", "red", "still one");
  aidd(root, "eval", "verification", "red", "still one");
  assert.equal(aidd(root, "release").code, 0);
});

test("a red qualification never blocks shipping", () => {
  const root = repo();
  aidd(root, "spec", "new", "fix", "auth", "Auth");
  accept(root, 0, "S0001");
  aidd(root, "eval", "verification", "green", "ok");
  write(root, ".product/specs/S0001-auth/qualification.md", "# Findings\n");
  assert.equal(aidd(root, "eval", "qualification", "red", "missing guard").code, 0);
  assert.deepEqual(aidd(root, "spec", "show").body.blockers, []);
  assert.equal(aidd(root, "release").body.version, "0.1.1");
});

test("the gate rejects evidence written by hand without a real commit", () => {
  const root = repo();
  aidd(root, "spec", "new", "feat", "fake", "Fake");
  const file = path.join(root, ".product/specs/S0001-fake/control.json");
  const control = JSON.parse(fs.readFileSync(file, "utf8"));
  control.evaluations = ["verification", "qualification"].map((kind) => ({ kind, revision: 1, status: "green" }));
  fs.writeFileSync(file, JSON.stringify(control));
  const shown = aidd(root, "spec", "show");
  assert.equal(shown.body.blockers.length, 2);
  assert.match(shown.body.blockers[0], /no real commit/);
  assert.equal(aidd(root, "release").code, 1);
});

test("green verification needs a passing acceptance run at HEAD that tags every requirement", () => {
  const root = repo();
  aidd(root, "spec", "new", "feat", "fleet", "Fleet");
  const spec = ".product/specs/S0001-fleet/spec.md";
  write(root, spec, "## Requirements\n\n- **R01**: WHEN a list is asked...\n- **R02**: WHEN a rocket is added...\n");
  assert.match(aidd(root, "eval", "verification", "green", "ok").body.error, /aidd run acceptance/);
  accept(root);
  assert.match(aidd(root, "eval", "verification", "green", "ok").body.error, /@S0001-Rnn for R01, R02/);
  write(root, "e2e/fleet.spec.ts", 'test("lists @S0001-R01", () => {});\ntest("adds @S0001-R02", () => {});\n');
  git(root, "add", "-A");
  git(root, "commit", "-q", "-m", "test(e2e): fleet");
  assert.match(aidd(root, "eval", "verification", "green", "ok").body.error, /Code changed since the last acceptance run/);
  accept(root);
  const control = readJson(root, ".product/specs/S0001-fleet/control.json");
  assert.equal(control.runs.acceptance.e2e.commit, git(root, "rev-parse", "HEAD"));
  assert.equal(aidd(root, "eval", "verification", "green", "ok").code, 0);
});

test("a failing acceptance run is green only with debt older than the spec", () => {
  const root = repo();
  aidd(root, "debt", "add", "Flaky login test", "medium");
  aidd(root, "spec", "new", "fix", "crash", "Crash");
  accept(root, 1, "S0001");
  assert.match(aidd(root, "eval", "verification", "green", "ok").body.error, /record red, or name the older debt/);
  aidd(root, "debt", "add", "Written to dodge the failure", "low");
  assert.match(aidd(root, "eval", "verification", "green", "ok", "--preexisting", "D0002").body.error, /D0002 is not open debt recorded before S0001/);
  assert.equal(aidd(root, "eval", "verification", "green", "ok", "--preexisting", "D0001").code, 0);
});

test("eval commits its own record and drops the report once green", () => {
  const root = repo();
  aidd(root, "spec", "new", "feat", "seats", "Seats");
  write(root, ".product/specs/S0001-seats/verification.md", "# Failures\n");
  assert.equal(aidd(root, "eval", "verification", "red", "one failure").body.committed, true);
  assert.equal(git(root, "log", "-1", "--format=%s"), "docs(verification): record acceptance");
  accept(root, 0, "S0001");
  assert.equal(aidd(root, "eval", "verification", "green", "fixed").code, 0);
  assert.ok(!fs.existsSync(path.join(root, ".product/specs/S0001-seats/verification.md")));
  assert.equal(git(root, "status", "--short", "--", ".product"), "");
});

test("green verification needs a passing unit run at HEAD in each project with unit tests", () => {
  const root = repo();
  fs.mkdirSync(path.join(root, "back"));
  const unit = (code) => aidd(root, "config", "set", "projects.back", JSON.stringify({ path: "back", commands: { unit: `node -e "process.exit(${code})"` } }));
  unit(0);
  aidd(root, "spec", "new", "feat", "cart", "Cart");
  accept(root, 0, "S0001");
  assert.match(aidd(root, "eval", "verification", "green", "ok").body.error, /back has no unit run/);
  unit(1);
  aidd(root, "run", "unit");
  assert.match(aidd(root, "eval", "verification", "green", "ok").body.error, /unit run of back failed\. A failing unit test blocks/);
  unit(0);
  aidd(root, "run", "unit");
  assert.equal(aidd(root, "eval", "verification", "green", "ok").code, 0);
});
