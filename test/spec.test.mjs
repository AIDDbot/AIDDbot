// End-to-end tests of the aidd core: spec new and the release of a spec.
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { test } from "node:test";
import { git, write, repo, aidd, accept, readJson, approve, journalText } from "./helpers.mjs";

test("a spec goes from new to shipped with version, changelog, index, and tag", () => {
  const root = repo();
  const created = aidd(root, "spec", "new", "feat", "user-login", "User login", "--domain", "auth");
  assert.equal(created.code, 0);
  assert.equal(created.body.branch, "feat/S0001-user-login");
  assert.equal(git(root, "branch", "--show-current"), "feat/S0001-user-login");
  assert.equal(created.body.file, ".product/specs/feat/S0001-user-login.md");
  assert.match(fs.readFileSync(path.join(root, created.body.file), "utf8"), /# S0001-user-login — User login/);
  approve(root);

  write(root, "src/login.js", "export {};\n");
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
  assert.match(fs.readFileSync(path.join(root, ".product/PRD.md"), "utf8"), /## auth\r?\n\r?\n- \[S0001\]\(specs\/feat\/S0001-user-login\.md\) User login/);
  assert.equal(aidd(root, "spec", "show", "S0001").body.status, "shipped");
  assert.doesNotMatch(git(root, "branch"), /feat\/S0001/);
});

test("spec new --from writes a spec from a file: no leading comment, the frontmatter, and the ID for {id}", () => {
  const root = repo();
  write(root, "foundation/about.spec.md", "<!--\nInstance of about for Archetype CLI.\n-->\n# {id}-about — About\n\n## Problem\n\nShow what it is. See {id}-R01.\n");
  write(root, "foundation/bad.spec.md", "# About\n");
  assert.equal(aidd(root, "spec", "new", "feat", "about", "About", "--from", "foundation/missing.spec.md").code, 2);
  assert.match(aidd(root, "spec", "new", "feat", "bad", "Bad", "--from", "foundation/bad.spec.md").body.error, /must start with the heading/);
  const created = aidd(root, "spec", "new", "feat", "about", "About", "--domain", "foundation", "--from", "foundation/about.spec.md");
  assert.equal(created.code, 0, JSON.stringify(created.body));
  const text = fs.readFileSync(path.join(root, created.body.file), "utf8");
  assert.match(text, /^---\nid: S0\d{3}\nslug: about\n/);
  assert.match(text, /domain: foundation\n---\n# S0\d{3}-about — About\n/);
  assert.match(text, /See S0\d{3}-R01\./);
  assert.doesNotMatch(text, /Instance of about|\{id\}/);
  assert.equal(approve(root, created.body.spec).code, 0, "the caller approves it, and the core checks its size");
});

test("spec new works with pending changes and never needs a clean tree", () => {
  const root = repo();
  write(root, "notes.txt", "draft");
  const created = aidd(root, "spec", "new", "fix", "typo", "Fix typo");
  assert.equal(created.code, 0);
  assert.ok(fs.existsSync(path.join(root, "notes.txt")));
  assert.equal(aidd(root, "spec", "show", "S0001").body.domain, "general");
  assert.equal(git(root, "status", "--short", "--", ".aiddbot/counters.yaml"), "");
  assert.match(git(root, "log", "-1", "--format=%s"), /reserve S0001/);
});

test("spec new numbers after the specs of an archetype, with no counter", () => {
  const root = repo();
  write(root, ".product/specs/feat/S0008-record-views.md", "# S0008-record-views\n");
  const created = aidd(root, "spec", "new", "feat", "catalog", "Catalog");
  assert.equal(created.code, 0, JSON.stringify(created.body));
  assert.equal(created.body.branch, "feat/S0009-catalog");
});

test("a non-green evaluation needs its report file", () => {
  const root = repo();
  aidd(root, "spec", "new", "feat", "search", "Search");
  approve(root);
  const refused = aidd(root, "eval", "verification", "red", "two failures");
  assert.equal(refused.code, 1);
  assert.match(refused.body.error, /verification\.md/);
  write(root, ".aiddbot/logs/S0001-search.verification.md", "# Failures\n");
  assert.equal(aidd(root, "eval", "verification", "red", "two failures").code, 0);
});

test("the PRD lists shipped features only", () => {
  const root = repo();
  aidd(root, "spec", "new", "fix", "auth", "Auth", "--domain", "auth");
  approve(root);
  accept(root, 0, "S0001");
  aidd(root, "eval", "verification", "green", "ok");
  aidd(root, "eval", "qualification", "green", "ok");
  assert.equal(aidd(root, "release").code, 0);
  assert.doesNotMatch(fs.readFileSync(path.join(root, ".product/PRD.md"), "utf8"), /S0001/);
});

test("a fix bumps the patch and --major the major", () => {
  const root = repo();
  aidd(root, "spec", "new", "fix", "crash", "Crash");
  approve(root);
  accept(root, 0, "S0001");
  aidd(root, "eval", "verification", "green", "ok");
  aidd(root, "eval", "qualification", "green", "ok");
  assert.equal(aidd(root, "release").body.version, "0.1.1");
  aidd(root, "spec", "new", "chore", "api", "API v2");
  approve(root, "S0002");
  accept(root, 0);
  aidd(root, "eval", "qualification", "green", "ok");
  assert.equal(aidd(root, "release", "--major").body.version, "1.0.0");
});

test("spec new refuses while another spec branch is still open", () => {
  const root = repo();
  aidd(root, "spec", "new", "feat", "fleet", "Fleet");
  git(root, "switch", "-q", "main");
  const refused = aidd(root, "spec", "new", "chore", "types", "Types");
  assert.equal(refused.code, 1);
  assert.match(refused.body.error, /feat\/S0001-fleet is still in progress/);
});

test("spec debt makes the minimal spec of a debt item, defined and approved at once: a refactor or a fix", () => {
  const root = repo();
  aidd(root, "config", "set", "projects.e2e", JSON.stringify({ type: "e2e", path: "e2e", commands: { test: "node suite.js" } }));
  aidd(root, "debt", "add", "Duplicated price rule!", "medium", "cart.ts:4 and order.ts:9", "--project", "e2e");
  aidd(root, "debt", "add", "SQL injection in search", "high", "search.ts:12");
  aidd(root, "debt", "add", "Complex parser", "low");
  assert.equal(aidd(root, "spec", "new", "refactor", "types", "Types").code, 2, "a refactor comes only from debt");
  assert.match(aidd(root, "spec", "debt", "D0003").body.error, /low debt: repair it as a patch/);
  assert.equal(aidd(root, "spec", "debt", "D0009").code, 1);
  assert.equal(aidd(root, "spec", "debt").code, 2);
  const refactor = aidd(root, "spec", "debt", "D0001");
  assert.equal(refactor.code, 0, JSON.stringify(refactor.body));
  assert.equal(refactor.body.branch, "refactor/S0001-duplicated-price-rule");
  assert.equal(refactor.body.approved, true);
  assert.equal(git(root, "log", "-1", "--format=%s"), "docs(spec): define delivery");
  const text = fs.readFileSync(path.join(root, refactor.body.file), "utf8");
  assert.match(text, /# S0001-duplicated-price-rule — Duplicated price rule!/);
  assert.match(text, /## Problem\n\ncart\.ts:4 and order\.ts:9/);
  assert.match(text, /## Technical debt\n\n- D0001 — Duplicated price rule!/);
  assert.equal(aidd(root, "spec", "show").body.type, "refactor");
  accept(root, 0);
  assert.equal(aidd(root, "release").code, 0);
  const fix = aidd(root, "spec", "debt", "D0002");
  assert.equal(fix.body.branch, "fix/S0002-sql-injection-in-search");
  assert.equal(fix.body.approved, true);
  assert.doesNotMatch(aidd(root, "spec", "show").body.blockers.join(" "), /not approved/);
});

test("log approved commits the spec definition after the approval", () => {
  const root = repo();
  aidd(root, "spec", "new", "feat", "offers", "Offers");
  write(root, ".product/specs/feat/S0001-offers.md", "# S0001-offers — Offers\n\n- **R01**: WHEN an offer is sent...\n");
  const unknown = aidd(root, "log", "approved", "Offers", "--spec", "0001");
  assert.equal(unknown.code, 1, "an ID that names no spec approves nothing (from web-2)");
  assert.match(unknown.body.error, /needs the ID of an existing spec, such as --spec S0001; no spec is 0001/);
  assert.match(aidd(root, "log", "approved", "Offers").body.error, /no --spec was given/);
  assert.doesNotMatch(journalText(root), / approved /, "a refused approval writes no journal line");
  const approved = aidd(root, "log", "approved", "Offers", "--spec", "S0001");
  assert.equal(approved.code, 0, JSON.stringify(approved.body));
  assert.equal(approved.body.committed, true);
  assert.equal(git(root, "log", "-1", "--format=%s"), "docs(spec): define delivery");
  const journal = journalText(root);
  assert.ok(journal.indexOf(" approved ") < journal.indexOf("committed  INFO  docs(spec): define delivery"));
});

test("log approved refuses a spec over the size limits and names each one", () => {
  const root = repo();
  aidd(root, "spec", "new", "feat", "offers", "Offers");
  const stories = Array.from({ length: 4 }, (_, index) => `- As a buyer, I want **offer ${index}** so that I save.`);
  const requirements = Array.from({ length: 10 }, (_, index) => `- **R${String(index + 1).padStart(2, "0")}**: WHEN an offer is sent, the api SHALL answer 201.`);
  const text = ["# S0001-offers — Offers", "", "### User Stories", "", ...stories, "", "### Requirements", "", ...requirements, ""].join("\n");
  write(root, ".product/specs/feat/S0001-offers.md", text);
  const refused = aidd(root, "log", "approved", "Offers", "--spec", "S0001");
  assert.equal(refused.code, 1);
  assert.match(refused.body.error, /S0001 has 10 requirements; the limit is 9/);
  assert.match(refused.body.error, /S0001 has 4 stories; the limit is 3/);
  assert.notEqual(git(root, "log", "-1", "--format=%s"), "docs(spec): define delivery");
});

test("an unapproved spec takes no commit, no evaluation, and no release", () => {
  const root = repo();
  aidd(root, "spec", "new", "feat", "offers", "Offers");
  write(root, "notes.md", "draft\n");
  const commit = aidd(root, "commit", "feat(back): offers", "notes.md");
  assert.equal(commit.code, 1);
  assert.match(commit.body.error, /S0001 is not approved[\s\S]*aidd log approved "Offers" --spec S0001/);
  assert.equal(aidd(root, "eval", "verification", "red", "early").code, 1);
  assert.match(aidd(root, "spec", "show").body.blockers[0], /not approved/);
  assert.equal(approve(root).code, 0);
  assert.equal(aidd(root, "commit", "feat(back): offers", "notes.md").code, 0);
  assert.doesNotMatch(aidd(root, "spec", "show").body.blockers.join(" "), /not approved/);
});

test("spec debt groups the open items of the priority and the project of the given item", () => {
  const root = repo();
  aidd(root, "config", "set", "projects.cli", JSON.stringify({ type: "cli", path: "projects/cli", commands: { test: "npm test" } }));
  aidd(root, "config", "set", "projects.e2e", JSON.stringify({ type: "e2e", path: "projects/e2e", commands: { test: "npm test" } }));
  aidd(root, "debt", "add", "Health presentation imports its repository", "medium", "src/features/health/health.command.ts:2", "--project", "cli");
  aidd(root, "debt", "add", "Suites repeat the CLI client", "medium", "features/shell/shell.test.ts:4", "--project", "e2e");
  aidd(root, "debt", "add", "Composition imports health outside the manifest", "medium", "src/app.compose.ts:3", "--project", "cli");
  aidd(root, "debt", "add", "Leaked token in a log", "high", "src/core/app.logger.ts:9", "--project", "cli");
  aidd(root, "debt", "add", "Unit coverage of the parser", "medium", "src/core/app.arguments.ts", "--project", "cli");
  assert.equal(aidd(root, "debt", "add", "No project", "medium", "src/a.ts").code, 2, "a medium item names its project");
  assert.equal(aidd(root, "debt", "add", "Unknown project", "medium", "src/a.ts", "--project", "web").code, 2);
  const refactor = aidd(root, "spec", "debt", "D0003");
  assert.deepEqual(refactor.body.debt, ["D0003", "D0001", "D0005"], "the given item first, then the other medium items of cli; never e2e or high");
  const text = fs.readFileSync(path.join(root, refactor.body.file), "utf8");
  assert.match(text, /— Composition imports health outside the manifest and 2 more/);
  assert.match(text, /- D0001: src\/features\/health\/health\.command\.ts:2/);
  assert.match(text, /The check that reported D0003, D0001, D0005 passes/);
  assert.match(text, /## Technical debt\n\n- D0003 — .*\n- D0001 — .*\n- D0005 — /);
  const other = repo();
  aidd(other, "config", "set", "projects.cli", JSON.stringify({ type: "cli", path: "cli", commands: { test: "npm test" } }));
  aidd(other, "debt", "add", "Leaked token in a log", "high", "cli/src/core/app.logger.ts:9", "--project", "cli");
  aidd(other, "debt", "add", "Missing setting check", "medium", "cli/src/core/app.config.ts:7", "--project", "cli");
  aidd(other, "debt", "add", "Unsafe path in a setting", "high", "cli/src/core/app.config.ts:4", "--project", "cli");
  aidd(other, "debt", "add", "Crash with no project", "high", "cli/src/app.ts:1");
  const fix = aidd(other, "spec", "debt", "D0001");
  assert.deepEqual(fix.body.debt, ["D0001", "D0003"], "one fix for the high items of cli; never the medium one or an item with no project");
  assert.equal(fix.body.approved, true);
  assert.match(fs.readFileSync(path.join(other, fix.body.file), "utf8"), /The review of this fix shows that D0001, D0003 are gone/);
});
