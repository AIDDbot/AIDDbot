// End-to-end tests of the aidd core: each test drives the CLI in a throwaway git repository.
import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const CORE = fileURLToPath(new URL("../.agents/aidd/aidd.mjs", import.meta.url));

function git(cwd, ...args) {
  return execFileSync("git", args, { cwd, encoding: "utf8" }).trim();
}

function write(root, file, text) {
  fs.mkdirSync(path.dirname(path.join(root, file)), { recursive: true });
  fs.writeFileSync(path.join(root, file), text);
}

function repo() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "aidd-core-"));
  git(root, "init", "-q", "-b", "main");
  git(root, "config", "user.email", "test@example.com");
  git(root, "config", "user.name", "Test");
  write(root, ".aiddbot/counters.yaml", "spec: 0\ndebt: 0\n");
  write(root, ".aiddbot/config.json", '{ "projects": {} }\n');
  write(root, ".product/quality/debt.json", '{ "items": [] }\n');
  write(root, "package.json", '{ "name": "demo", "version": "0.1.0", "private": true }\n');
  git(root, "add", "-A");
  git(root, "commit", "-q", "-m", "chore: init");
  return root;
}

function aidd(root, ...args) {
  const result = spawnSync(process.execPath, [CORE, ...args], { cwd: root, encoding: "utf8" });
  let body = null;
  try {
    body = JSON.parse(result.stdout);
  } catch {
    body = result.stdout;
  }
  return { code: result.status, body };
}

/** Configure an e2e project whose acceptance command exits with `code`, tag `specs`' R01, then run it. */
function accept(root, code = 0, ...specs) {
  write(root, "e2e/tags.spec.ts", specs.map((id) => `test("@${id}-R01", () => {});\n`).join(""));
  const project = { path: "e2e", commands: { acceptance: `node -e "process.exit(${code})"` } };
  aidd(root, "config", "set", "projects.e2e", JSON.stringify(project));
  return aidd(root, "run", "acceptance");
}

function readJson(root, file) {
  return JSON.parse(fs.readFileSync(path.join(root, file), "utf8"));
}

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
  assert.match(fs.readFileSync(path.join(root, ".product/PRD.md"), "utf8"), /## auth\n\n- \[S0001\]\(specs\/S0001-user-login\/spec\.md\) User login/);
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

test("a non-green evaluation needs its report file", () => {
  const root = repo();
  aidd(root, "spec", "new", "feat", "search", "Search");
  const refused = aidd(root, "eval", "verification", "red", "two failures");
  assert.equal(refused.code, 1);
  assert.match(refused.body.error, /verification\.md/);
  write(root, ".product/specs/S0001-search/verification.md", "# Failures\n");
  assert.equal(aidd(root, "eval", "verification", "red", "two failures").code, 0);
});

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

test("the PRD lists shipped features only", () => {
  const root = repo();
  aidd(root, "spec", "new", "fix", "auth", "Auth", "--domain", "auth");
  accept(root, 0, "S0001");
  aidd(root, "eval", "verification", "green", "ok");
  aidd(root, "eval", "qualification", "green", "ok");
  assert.equal(aidd(root, "release").code, 0);
  assert.doesNotMatch(fs.readFileSync(path.join(root, ".product/PRD.md"), "utf8"), /S0001/);
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
  assert.equal(control.runs.acceptance.commit, git(root, "rev-parse", "HEAD"));
  assert.equal(aidd(root, "eval", "verification", "green", "ok").code, 0);
});

test("a scoped acceptance run filters by spec, lists untested requirements, and is never evidence", () => {
  const root = repo();
  aidd(root, "spec", "new", "feat", "fleet", "Fleet");
  write(root, ".product/specs/S0001-fleet/spec.md", "- **R01**: WHEN a list is asked...\n- **R02**: WHEN a rocket is added...\n");
  write(root, "e2e/tags.spec.ts", 'test("@S0001-R01", () => {});\n');
  write(root, "e2e/ok.js", "");
  aidd(root, "config", "set", "projects.e2e", JSON.stringify({ path: "e2e", commands: { acceptance: "node ok.js" } }));
  const scoped = aidd(root, "run", "acceptance", "--spec");
  assert.equal(scoped.code, 0);
  assert.deepEqual(scoped.body.untested, ["R02"]);
  assert.match(scoped.body.runs[0].command, /--grep @S0001-$/);
  assert.equal(readJson(root, ".product/specs/S0001-fleet/control.json").runs, undefined);
});

test("commit records the paths it is given and journals the milestone", () => {
  const root = repo();
  write(root, "a/one.txt", "1\n");
  write(root, "b/two.txt", "2\n");
  assert.equal(aidd(root, "commit", "feat(a): one", "a").body.committed, true);
  assert.equal(git(root, "log", "-1", "--format=%s"), "feat(a): one");
  assert.match(git(root, "status", "--short"), /b\//);
  assert.equal(aidd(root, "commit", "nothing", "a").body.committed, false);
  assert.equal(aidd(root, "commit").code, 2);
  assert.match(fs.readFileSync(path.join(root, ".aiddbot/journals", fs.readdirSync(path.join(root, ".aiddbot/journals"))[0]), "utf8"), /committed  INFO  feat\(a\): one/);
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

test("spec new refuses while another spec branch is still open", () => {
  const root = repo();
  aidd(root, "spec", "new", "feat", "fleet", "Fleet");
  git(root, "switch", "-q", "main");
  const refused = aidd(root, "spec", "new", "refactor", "types", "Types");
  assert.equal(refused.code, 1);
  assert.match(refused.body.error, /feat\/S0001-fleet is still in progress/);
});

test("run keeps the whole output in a log, journals it, and stops at the timeout", () => {
  const root = repo();
  fs.mkdirSync(path.join(root, "back"));
  const noisy = `node -e "console.log('x'.repeat(5000) + 'END')"`;
  const hang = `node -e "setTimeout(() => {}, 30000)"`;
  aidd(root, "config", "set", "projects.back", JSON.stringify({ path: "back", commands: { lint: noisy, unit: hang } }));
  const lint = aidd(root, "run", "lint");
  assert.equal(lint.code, 0);
  assert.equal(lint.body.runs[0].log, ".aiddbot/runs/lint-back.log");
  assert.ok(lint.body.runs[0].tail.length <= 1500);
  assert.equal(fs.readFileSync(path.join(root, ".aiddbot/runs/lint-back.log"), "utf8").trim().length, 5003);
  aidd(root, "config", "set", "run", '{ "timeoutMinutes": 0.02 }');
  const unit = aidd(root, "run", "unit");
  assert.equal(unit.code, 1);
  assert.match(unit.body.runs[0].timedOut, /killed after/);
  const journal = fs.readdirSync(path.join(root, ".aiddbot/journals"))[0];
  assert.match(fs.readFileSync(path.join(root, ".aiddbot/journals", journal), "utf8"), / run +INFO +lint: back ok \d+s/);
});

test("debt is added with the next D ID, listed by priority, and removed", () => {
  const root = repo();
  assert.equal(aidd(root, "debt", "add", "Slow query", "low").body.id, "D0001");
  const high = aidd(root, "debt", "add", "SQL injection", "high", "search.ts:12");
  assert.equal(high.body.id, "D0002");
  assert.equal(high.body.origin, "scan");
  assert.deepEqual(aidd(root, "debt", "list").body.map((item) => item.id), ["D0002", "D0001"]);
  assert.equal(aidd(root, "debt", "add", "Oops", "urgent").code, 2);
  assert.equal(aidd(root, "debt", "remove", "D0002").code, 0);
  assert.equal(git(root, "log", "-1", "--format=%s"), "docs(quality): remove D0002");
  assert.equal(git(root, "status", "--short", "--", ".product", ".aiddbot/counters.yaml"), "");
  assert.equal(aidd(root, "debt", "remove", "D0002").code, 1);
  assert.match(fs.readFileSync(path.join(root, ".aiddbot/counters.yaml"), "utf8"), /debt: 2/);
});

test("config set and get, then run executes the configured commands", () => {
  const root = repo();
  fs.mkdirSync(path.join(root, "back"));
  const project = JSON.stringify({ path: "back", commands: { unit: "node -e \"process.exit(0)\"", quality: ["node -e \"process.exit(3)\""] } });
  assert.equal(aidd(root, "config", "set", "projects.back", project).code, 0);
  assert.equal(aidd(root, "config", "get", "projects.back.path").body, "back");
  assert.equal(aidd(root, "config", "set", "projects.front", "{}").code, 2);
  const unit = aidd(root, "run", "unit");
  assert.equal(unit.code, 0);
  assert.equal(unit.body.runs[0].project, "back");
  assert.equal(aidd(root, "run", "quality").code, 1);
  assert.equal(aidd(root, "run", "acceptance").code, 3);
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
  assert.equal(aidd(root, "log", "scaffolded", "back, front, e2e").code, 0);
  assert.equal(aidd(root, "log", "started", "nope").code, 2);
  const journal = fs.readdirSync(path.join(root, ".aiddbot/journals"));
  const lines = fs.readFileSync(path.join(root, ".aiddbot/journals", journal[0]), "utf8").trim().split("\n");
  const verdict = lines.find((line) => line.includes(" verdict "));
  assert.match(verdict, /model +- +verdict +INFO +greenfield: x+…$/);
  assert.ok(verdict.split(" INFO ").pop().trim().length <= 128);
  assert.match(lines.at(-2), /model +S0001 +approved +INFO +S0001 Rocket fleet$/);
  assert.match(lines.at(-1), /model +- +scaffolded +INFO +back, front, e2e$/);
});

test("commands outside an initialized repository explain what to do", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "aidd-bare-"));
  const result = aidd(root, "debt", "list");
  assert.equal(result.code, 1);
  assert.match(result.body.error, /aiddbot init/);
});
