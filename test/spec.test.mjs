// End-to-end tests of the aidd core: spec new and the release of a spec.
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { test } from "node:test";
import { git, write, repo, aidd, accept, readJson } from "./helpers.mjs";

test("a spec goes from new to shipped with version, changelog, index, and tag", () => {
  const root = repo();
  const created = aidd(root, "spec", "new", "feat", "user-login", "User login", "--domain", "auth");
  assert.equal(created.code, 0);
  assert.equal(created.body.branch, "feat/S0001-user-login");
  assert.equal(git(root, "branch", "--show-current"), "feat/S0001-user-login");
  assert.match(fs.readFileSync(path.join(root, created.body.file), "utf8"), /# S0001-user-login — User login/);

  git(root, "add", "-A");
  git(root, "commit", "-q", "-m", "feat(S0001): login");
  accept(root, 0, "S0001");
  assert.equal(aidd(root, "eval", "verification", "green", "all requirements pass").code, 0);
  assert.equal(aidd(root, "eval", "qualification", "green", "clean").code, 0);

  const shipped = aidd(root, "release");
  assert.equal(shipped.code, 0, JSON.stringify(shipped.body));
  assert.equal(shipped.body.version, "0.2.0");
  assert.equal(git(root, "branch", "--show-current"), "main");
  assert.equal(git(root, "tag", "--list", "v0.2.0"), "v0.2.0");
  assert.equal(readJson(root, "package.json").version, "0.2.0");
  assert.match(fs.readFileSync(path.join(root, "CHANGELOG.md"), "utf8"), /## \[0\.2\.0\][\s\S]*### Added[\s\S]*User login \(\[S0001\]/);
  assert.match(fs.readFileSync(path.join(root, ".product/PRD.md"), "utf8"), /## auth\r?\n\r?\n- \[S0001\]\(specs\/S0001-user-login\/spec\.md\) User login/);
  assert.equal(readJson(root, ".product/specs/S0001-user-login/control.json").status, "shipped");
  assert.doesNotMatch(git(root, "branch"), /feat\/S0001/);
});

test("spec new works with pending changes and never needs a clean tree", () => {
  const root = repo();
  write(root, "notes.txt", "draft");
  const created = aidd(root, "spec", "new", "fix", "typo", "Fix typo");
  assert.equal(created.code, 0);
  assert.ok(fs.existsSync(path.join(root, "notes.txt")));
  assert.equal(readJson(root, ".product/specs/S0001-typo/control.json").domain, "general");
  assert.equal(git(root, "status", "--short", "--", ".aiddbot/counters.yaml"), "");
  assert.match(git(root, "log", "-1", "--format=%s"), /reserve S0001/);
});

test("spec new skips the IDs of the archetype foundation specs", () => {
  const root = repo();
  write(root, ".product/archetypes/foundation/S0008-record-views.spec.md", "# S0008-record-views\n");
  const created = aidd(root, "spec", "new", "feat", "catalog", "Catalog");
  assert.equal(created.code, 0, JSON.stringify(created.body));
  assert.equal(created.body.branch, "feat/S0009-catalog");
});

test("a non-green evaluation needs its report file", () => {
  const root = repo();
  aidd(root, "spec", "new", "feat", "search", "Search");
  const refused = aidd(root, "eval", "verification", "red", "two failures");
  assert.equal(refused.code, 1);
  assert.match(refused.body.error, /verification\.md/);
  write(root, ".product/specs/S0001-search/verification.md", "# Failures\n");
  assert.equal(aidd(root, "eval", "verification", "red", "two failures").code, 0);
});

test("the PRD lists shipped features only", () => {
  const root = repo();
  aidd(root, "spec", "new", "fix", "auth", "Auth", "--domain", "auth");
  accept(root, 0, "S0001");
  aidd(root, "eval", "verification", "green", "ok");
  aidd(root, "eval", "qualification", "green", "ok");
  assert.equal(aidd(root, "release").code, 0);
  assert.doesNotMatch(fs.readFileSync(path.join(root, ".product/PRD.md"), "utf8"), /S0001/);
});

test("a fix bumps the patch and --major the major", () => {
  const root = repo();
  aidd(root, "spec", "new", "fix", "crash", "Crash");
  accept(root, 0, "S0001");
  aidd(root, "eval", "verification", "green", "ok");
  aidd(root, "eval", "qualification", "green", "ok");
  assert.equal(aidd(root, "release").body.version, "0.1.1");
  aidd(root, "spec", "new", "refactor", "api", "API v2");
  accept(root, 0, "S0002");
  aidd(root, "eval", "verification", "green", "ok");
  aidd(root, "eval", "qualification", "green", "ok");
  assert.equal(aidd(root, "release", "--major").body.version, "1.0.0");
});

test("spec new refuses while another spec branch is still open", () => {
  const root = repo();
  aidd(root, "spec", "new", "feat", "fleet", "Fleet");
  git(root, "switch", "-q", "main");
  const refused = aidd(root, "spec", "new", "refactor", "types", "Types");
  assert.equal(refused.code, 1);
  assert.match(refused.body.error, /feat\/S0001-fleet is still in progress/);
});

test("log approved commits the spec definition after the approval", () => {
  const root = repo();
  aidd(root, "spec", "new", "feat", "offers", "Offers");
  write(root, ".product/specs/S0001-offers/spec.md", "# S0001-offers — Offers\n\n- **R01**: WHEN an offer is sent...\n");
  const approved = aidd(root, "log", "approved", "Offers", "--spec", "S0001");
  assert.equal(approved.code, 0, JSON.stringify(approved.body));
  assert.equal(approved.body.committed, true);
  assert.equal(git(root, "log", "-1", "--format=%s"), "docs(spec): define delivery");
  const journal = fs.readFileSync(path.join(root, ".aiddbot/journals", fs.readdirSync(path.join(root, ".aiddbot/journals"))[0]), "utf8");
  assert.ok(journal.indexOf(" approved ") < journal.indexOf("committed  INFO  docs(spec): define delivery"));
});
