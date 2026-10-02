---
name: implement-project
description: Implement supplied spec scope or repair findings.
metadata:
  aiddbot-kind: primitive
user-invocable: true
---
# implement-project

Your goal is to implement one project's share of an approved spec, or repair the findings supplied for it.

Work on the spec's branch and stop if the default branch is checked out. Follow the project's `{source_root}/AGENTS.md`, which gives all its technical data, so never explore the code to learn the setup: put code in the folder and layer it names and import only what its architecture allows. Never weaken an assertion, and commit only this project's changes.

Build exactly the shape the spec's schema impact declares against this project's schema documents under `{Product_Folder}/model/`, including every declared status code. Return client failures with their declared 4xx status through the project's error mechanism, never as a success with an empty body or as a 500. When the work needs a shape the spec does not declare, stop and return it for approval instead of building it. Build only the rules the spec states: never add a validation, a limit, or a default of your own, such as a minimum password length, so that every project enforces the same rule.

Write unit tests for the critical production code and run `node .agents/aidd/aidd.mjs run unit --project {project}` until they pass; do not unit-test UI code or E2E tests. When the scope includes E2E tests, write or repair them from the spec's requirements, and give every page, endpoint, and command in its `Expected URLs and APIs` at least one basic test of the expected answer: put the global ID of every requirement a test proves on the test, as `@S0042-R03`: as a test tag when the framework has tags (Playwright: `test("title", { tag: "@S0042-R03" }, …)`), otherwise in its title; the core filters by it with `--grep`. Do this in addition to any tag or naming convention of the project's `AGENTS.md`, never in place of it, and never edit a test tagged with another spec, which is a regression check, unless a requirement of this spec contradicts it: then update or remove that test and name the requirement it contradicts in your result. Every requirement needs at least one test that proves it. Check them with `node .agents/aidd/aidd.mjs run acceptance --spec`, which runs only this spec's tests, lists requirements still without one, and is never evidence; the full run that counts is `verify-behavior`'s. Repair a failure it shows in the tests or in production code, at most three run-and-repair cycles, then return what still fails. Repair never weakens an assertion or builds behavior the spec does not declare. Each E2E test creates its own data with unique identifiers and never depends on test order, pre-existing data, or global counts, because the suite runs in parallel against one shared database.

When the spec asks to upgrade dependencies, run `node .agents/aidd/aidd.mjs run upgrade --project {project}` first, then repair what breaks. Add any dependency with the package manager's add command, never by writing a version.

After each change, run `node .agents/aidd/aidd.mjs run lint --project {project}` and fix every reported error, layer-boundary violations included: they block like any other lint error. When the spec repairs recorded debt, you may run `node .agents/aidd/aidd.mjs run quality --project {project}` to check that repair; otherwise never run `quality`, which belongs to `scan-quality`. When either command exits unavailable, report it as such in your result instead of constructing one.

The result is the project's code and tests for the supplied scope, lint-clean.

Commit only this project with `node .agents/aidd/aidd.mjs commit "{feat|fix|refactor|test|chore}({project}): {description}" {project path}`.
