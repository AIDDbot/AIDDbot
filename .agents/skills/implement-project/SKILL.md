---
name: implement-project
description: Implement supplied spec scope or repair findings.
metadata:
  aiddbot-kind: primitive
user-invocable: true
---
# implement-project

Your goal is to implement the share of one project in an approved spec, or to repair the findings that you get for it.

Work on the spec branch. If the default branch is checked out, stop. The Blueprint of the root `AGENTS.md`, when it exists, and the `{source_root}/AGENTS.md` of the project give all the technical data: do not explore the code to learn the setup. Put code in the folder and the layer that they name, and import only what the architecture permits.

Before the first edit, journal your plan one time: `node .agents/aidd/aidd.mjs log plan "{project}: <the files or parts to change>" --spec {id}`.

## Build

- Build exactly the shape that the spec declares in its schema impact and in its `Expected URLs and APIs`, with each status code, against the schema documents of the project under `{Product_Folder}/model/`.
- Return a client failure with its declared 4xx status, through the error mechanism of the project. Never return it as a success with an empty body, or as a 500.
- If the work needs a shape that the spec does not declare, stop and return it for approval.
- Build only the rules that the spec states. Never add a validation, a limit, or a default of your own, such as a minimum password length: all projects must apply the same rule.
- When the spec asks for an upgrade, run `node .agents/aidd/aidd.mjs run upgrade --project {project}` first, then repair what breaks. Add a dependency with the add command of the package manager; never write a version by hand.

## Check

- Write unit tests for the critical production code, not for UI code or E2E tests. Run `node .agents/aidd/aidd.mjs run unit --project {project}` until they pass.
- When the scope has E2E tests, read `references/acceptance-tests.md` before you write them.
- After each change, run `node .agents/aidd/aidd.mjs run lint --project {project}` and fix each error. A layer-boundary error blocks like all other errors.
- Run `node .agents/aidd/aidd.mjs run quality --project {project}` only to check a repair of recorded debt. Otherwise `quality` belongs to `scan-quality`.
- If a command is unavailable, say so in your result. Never make a replacement command.
- Never weaken an assertion. A repair never builds behavior that the spec does not declare.

Before you return, read again the project rules and the technology rules of that `AGENTS.md`, the code rules of the Blueprint, and each sentence of the spec for this project. Check your diff against each one: a rule that you had and did not apply fails the qualification.

The result is the code and the tests of the project for the given scope, with no lint errors.

Commit only this project with `node .agents/aidd/aidd.mjs commit "{feat|fix|refactor|test|chore}({project}): {description}" {project path}`.
