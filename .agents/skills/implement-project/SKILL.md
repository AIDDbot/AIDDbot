---
name: implement-project
description: Implement supplied spec scope or repair findings.
metadata:
  aiddbot-kind: primitive
user-invocable: true
---
# implement-project

Your goal is to implement the share of one project in an approved spec, or to repair the findings or the debt item that you get for it.

Work on the spec branch, or on the task branch of a patch of `craft-lasting-quality`. If the default branch is checked out, stop. The Architecture and the Code of the root `AGENTS.md`, when they exist, and the `{source_root}/AGENTS.md` of the project give all the technical data: do not explore the code to learn the setup. Put code in the folder and the layer that they name, and import only what the architecture permits.

Before the first edit, journal your plan one time: `node .agents/aidd/aidd.mjs log plan "{project}: <the files or parts to change>" --spec {id}`. A patch has no spec: leave out `--spec`.

## Build

- Build exactly the shape that the spec declares in its schema impact and in its `Expected URLs and APIs`, with each status code, against the schema documents of the project under `{Product_Folder}/model/`.
- Return a client failure with its declared 4xx status, through the error mechanism of the project. Never return it as a success with an empty body, or as a 500.
- If the work needs a shape that the spec does not declare, stop and return it for approval.
- Build only the rules that the spec states. Never add a validation, a limit, or a default of your own, such as a minimum password length: all projects must apply the same rule.
- When the spec asks for an upgrade, run `node .agents/aidd/aidd.mjs run upgrade --project {project}` first, then repair what breaks. Add a dependency with the add command of the package manager; never write a version by hand.

## Check

Check only what you change: fewer tests, and each failure near its cause. The pre-commit hook of the technology checks each commit: it formats, lints, type-checks, and runs the unit tests that the commit affects. Never run the full `test`: only `ship-spec` runs all the tests.

- Write unit tests for `logic`, `core`, and `shared`, up to the coverage that the `crap` slot of the project measures (each file, each branch, each error path), so that no coverage debt follows the spec. Never for UI code, data access, or E2E tests. A unit test is fast and touches no disk, database, network, or process: the code gets them as an argument, and the test gives a fake. Put each test beside its module.
- When the scope has E2E tests, read `references/acceptance-tests.md` before you write them.
- When the hook refuses a commit, fix each error that it shows and commit again. Never skip the hook.
- Before you return, run `node .agents/aidd/aidd.mjs run layers --project {project}` and `run crap --project {project}`, and repair until both are green: first what they show, then what they show next, such as the test coverage that a failing limit hid. Thus no medium or low debt follows the spec. A `refactor` repairs at least its debt items; a red check that you cannot repair stays in your result.
- If a command is unavailable, say so in your result. Never make a replacement command.
- Never weaken an assertion. A repair never builds behavior that the spec does not declare.

Keep the `AGENTS.md` of the project current with your change: its slots, its dependencies, its folders, its contract (port and variables) and the line of each `core` folder that you change. Never write what a feature does: its spec gives it. The core writes the index of `shared`.

Before you return, read again the project rules of that `AGENTS.md`, the Architecture and the Code of the root `AGENTS.md`, and each sentence of the spec for this project. Check your diff against each one: a rule that you had and did not apply fails the qualification.

The result is the code and the tests of the project for the given scope, committed through the hook.

Commit only this project with `node .agents/aidd/aidd.mjs commit "{feat|fix|refactor|test|chore}({project}): {description}" {project path}`.
