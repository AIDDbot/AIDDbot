// End-to-end tests of the aidd core: run, config, debt, and quality.
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { test } from "node:test";
import { git, write, repo, aidd, readJson } from "./helpers.mjs";

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
  aidd(root, "config", "set", "projects.e2e.commands.acceptance", '"npm run acceptance"');
  assert.equal(aidd(root, "run", "acceptance", "--spec").body.runs[0].command, "npm run acceptance -- --grep @S0001-");
  aidd(root, "config", "set", "projects.e2e.commands.acceptance", '"npm run acceptance --"');
  assert.equal(aidd(root, "run", "acceptance", "--spec").body.runs[0].command, "npm run acceptance -- --grep @S0001-");
});

test("run refuses while another run is alive, and a dead run leaves no lock", () => {
  const root = repo();
  fs.mkdirSync(path.join(root, "back"));
  aidd(root, "config", "set", "projects.back", JSON.stringify({ path: "back", commands: { unit: 'node -e "process.exit(0)"' } }));
  const lock = path.resolve(root, git(root, "rev-parse", "--git-path", "aidd-run.lock"));
  fs.writeFileSync(lock, JSON.stringify({ pid: process.ppid, kind: "acceptance", started: "2026-10-08T14:36:01Z" }));
  const refused = aidd(root, "run", "unit");
  assert.equal(refused.code, 1);
  assert.match(refused.body.error, /'acceptance' is still running since 2026-10-08T14:36:01Z .*Never start it again/);
  fs.writeFileSync(lock, JSON.stringify({ pid: 999999, kind: "acceptance", started: "2026-10-08T14:36:01Z" }));
  assert.equal(aidd(root, "run", "unit").code, 0);
  assert.ok(!fs.existsSync(lock));
});

test("a log says RUNNING until its command ends", () => {
  const root = repo();
  fs.mkdirSync(path.join(root, "back"));
  const peek = `node -e "console.log(require('fs').readFileSync('../.aiddbot/runs/unit-back.log', 'utf8').split('\\n')[0])"`;
  aidd(root, "config", "set", "projects.back", JSON.stringify({ path: "back", commands: { unit: peek } }));
  const unit = aidd(root, "run", "unit");
  assert.match(unit.body.runs[0].tail, /^RUNNING since .*no result until this line is gone/);
  const log = fs.readFileSync(path.join(root, ".aiddbot/runs/unit-back.log"), "utf8");
  assert.equal(log.match(/RUNNING/g).length, 1, "the header is gone, and only the output of the command keeps its copy");
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

test("run journals the last output line of each project and leaves out n/a projects", () => {
  const root = repo();
  for (const name of ["back", "e2e"]) fs.mkdirSync(path.join(root, name));
  const tool = `node -e "console.log('npm notice run tool'); console.log('3 passed (2s)'); console.log('npm notice done')"`;
  aidd(root, "config", "set", "projects.back", JSON.stringify({ path: "back", commands: { acceptance: { na: "e2e owns acceptance" } } }));
  aidd(root, "config", "set", "projects.e2e", JSON.stringify({ path: "e2e", commands: { acceptance: tool } }));
  assert.equal(aidd(root, "run", "acceptance").code, 0);
  const journal = fs.readdirSync(path.join(root, ".aiddbot/journals"))[0];
  const line = fs.readFileSync(path.join(root, ".aiddbot/journals", journal), "utf8").split("\n").find((entry) => entry.includes("acceptance:"));
  assert.match(line, /acceptance: e2e ok \d+s \(3 passed \(2s\)\)$/);
  assert.doesNotMatch(line, /n\/a/);
  const failing = `node -e "console.log('1 failed'); console.log('99 passed (5s)'); process.exit(1)"`;
  aidd(root, "config", "set", "projects.e2e", JSON.stringify({ path: "e2e", commands: { acceptance: failing } }));
  assert.equal(aidd(root, "run", "acceptance").code, 1);
  const last = fs.readFileSync(path.join(root, ".aiddbot/journals", journal), "utf8").trim().split("\n").at(-1);
  assert.match(last, /acceptance: e2e exit 1 \d+s \(1 failed\)$/);
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

test("a quality run reports each shared or features folder over the size limit, and it never fails the run", () => {
  const root = repo();
  for (let index = 0; index < 17; index++) write(root, `back/src/shared/file${index}.ts`, "");
  for (let index = 0; index < 4; index++) write(root, `back/src/features/auth/file${index}.ts`, "");
  for (let index = 0; index < 20; index++) write(root, `back/src/core/file${index}.ts`, "");
  for (let index = 0; index < 20; index++) write(root, `back/node_modules/shared/file${index}.ts`, "");
  aidd(root, "config", "set", "projects.back", JSON.stringify({ path: "back", commands: { quality: "node -e \"process.exit(0)\"" } }));
  const scan = aidd(root, "run", "quality");
  assert.equal(scan.code, 0);
  assert.deepEqual(scan.body.folders, [{ project: "back", folder: "back/src/shared", entries: 17, limit: 16 }]);
  aidd(root, "config", "set", "quality", '{"folderEntries":3}');
  assert.deepEqual(aidd(root, "run", "quality").body.folders.map((entry) => entry.folder), ["back/src/features/auth", "back/src/shared"]);
});

test("a quality run reports each subfolder inside a feature, and only there", () => {
  const root = repo();
  write(root, "back/src/features/auth/auth.api.ts", "");
  write(root, "back/src/features/auth/logic/auth.service.ts", "");
  write(root, "back/src/features/auth/logic/deep/more.ts", "");
  write(root, "back/src/shared/http/body.middleware.ts", "");
  write(root, "back/src/core/migrations/001-init.sql", "");
  aidd(root, "config", "set", "projects.back", JSON.stringify({ path: "back", commands: { quality: "node -e \"process.exit(0)\"" } }));
  const scan = aidd(root, "run", "quality");
  assert.equal(scan.code, 0);
  assert.deepEqual(scan.body.subfolders, [{ project: "back", folder: "back/src/features/auth/logic" }]);
});

test("config set refuses a project with files of two package managers", () => {
  const root = repo();
  write(root, "back/package-lock.json", "{}\n");
  write(root, "back/pnpm-workspace.yaml", "packages: []\n");
  const project = JSON.stringify({ path: "back", commands: { lint: "npm run lint" } });
  const refused = aidd(root, "config", "set", "projects.back", project);
  assert.equal(refused.code, 1);
  fs.rmSync(path.join(root, "back/pnpm-workspace.yaml"));
  assert.equal(aidd(root, "config", "set", "projects.back", project).code, 0);
});

test("a spec keeps the latest run of each kind per project", () => {
  const root = repo();
  fs.mkdirSync(path.join(root, "back"));
  fs.mkdirSync(path.join(root, "front"));
  aidd(root, "config", "set", "projects.back", JSON.stringify({ path: "back", commands: { lint: "node -e \"process.exit(0)\"" } }));
  aidd(root, "config", "set", "projects.front", JSON.stringify({ path: "front", commands: { lint: "node -e \"process.exit(1)\"" } }));
  aidd(root, "spec", "new", "feat", "fleet", "Fleet");
  aidd(root, "run", "lint", "--project", "back");
  aidd(root, "run", "lint", "--project", "front");
  const lint = readJson(root, ".product/specs/S0001-fleet/control.json").runs.lint;
  assert.deepEqual(Object.keys(lint).sort(), ["back", "front"]);
  assert.equal(lint.back.ok, true);
  assert.equal(lint.front.ok, false);
});

test("a slot that does not apply needs its reason, and run reports it as ok; format is never evidence", () => {
  const root = repo();
  fs.mkdirSync(path.join(root, "e2e"));
  const project = { path: "e2e", commands: { unit: { na: "no own logic" }, format: "node -e \"process.exit(0)\"" } };
  assert.equal(aidd(root, "config", "set", "projects.e2e", JSON.stringify(project)).code, 0);
  assert.equal(aidd(root, "config", "set", "projects.e2e.commands.lint", '{ "na": "" }').code, 2);
  assert.equal(aidd(root, "config", "set", "projects.e2e.commands.lint", '{ "skip": true }').code, 2);
  assert.equal(aidd(root, "config", "set", "projects.e2e.commands.lint", "[]").code, 2);
  const unit = aidd(root, "run", "unit");
  assert.equal(unit.code, 0);
  assert.deepEqual(unit.body.runs, [{ project: "e2e", ok: true, na: "no own logic" }]);
  aidd(root, "spec", "new", "feat", "rockets", "Rockets");
  assert.equal(aidd(root, "run", "format").code, 0);
  assert.equal(readJson(root, ".product/specs/S0001-rockets/control.json").runs?.format, undefined);
  aidd(root, "config", "set", "projects.e2e.commands.upgrade", JSON.stringify("node -e \"process.exit(0)\""));
  assert.equal(aidd(root, "run", "upgrade").code, 0);
  assert.equal(readJson(root, ".product/specs/S0001-rockets/control.json").runs?.upgrade, undefined);
  assert.equal(aidd(root, "run", "lint").code, 3);
});

test("a quality run reports each block of logic lines that two places repeat, for DRY", () => {
  const root = repo();
  const block = ["const total = items.length;", "if (total === 0) return [];", "const first = items[0];", "const last = items[total - 1];", "const middle = items.slice(1, -1);", "return [first, ...middle, last];"];
  write(root, "back/src/features/a/a.service.ts", ['import { x } from "./x.ts";', "export function a(items) {", ...block, "}", ""].join("\n"));
  write(root, "back/src/features/b/b.service.ts", ['import { y } from "./y.ts";', "// another feature", "export function b(items) {", "", ...block.map((line) => `    ${line}`), "}", ""].join("\n"));
  write(root, "back/src/shared/short.ts", block.slice(0, 5).join("\n"));
  aidd(root, "config", "set", "projects.back", JSON.stringify({ path: "back", commands: { quality: 'node -e "process.exit(0)"' } }));
  const scan = aidd(root, "run", "quality");
  assert.equal(scan.code, 0, "duplication is debt, never a failed run");
  assert.equal(scan.body.duplicates.length, 1);
  assert.deepEqual(scan.body.duplicates[0].locations.map((entry) => `${entry.file}:${entry.from}-${entry.to}`),
    ["back/src/features/a/a.service.ts:3-8", "back/src/features/b/b.service.ts:5-10"]);
  aidd(root, "config", "set", "quality", '{"duplicateLines":5}');
  assert.equal(aidd(root, "run", "quality").body.duplicates[0].locations.length, 3);
});
