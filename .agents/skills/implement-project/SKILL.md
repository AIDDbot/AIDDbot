---
name: implement-project
description: Implement supplied spec scope or repair findings.
metadata:
  aiddbot-kind: primitive
user-invocable: true
---
# implement-project

Your goal is to implement the share of one project in an approved spec. Or your goal is to repair the findings or the debt item that you get for that project.

Work on the spec branch or the patch branch of `craft-lasting-quality`. If you are on the default branch, stop. Read `{source_root}/AGENTS.md` of the project for technical data. When `{Product_Folder}/system.md` exists, also read `references/code-rules.md`. Do not explore code to learn the setup. Follow their folders, layers, and permitted imports.

Before the first edit, journal your plan one time: `node .agents/aidd/aidd.mjs log plan "{project}: <the units to change, in order>" --spec {id}`. A unit is one folder of `core`, one module, or one slice of a feature. A patch has no spec: leave out `--spec`.

## Build

- Build exactly the shape in the schema impact and `Expected URLs and APIs` of the spec, with each status code. Check it against the schemas of the project under `{Product_Folder}/model/`. If you need a shape that the spec does not declare, stop and return it for approval.
- Use the error mechanism of the project for client failures with their declared 4xx status. Never return an empty success or a 500.
- Build only the rules that the spec states, so that all projects apply the same rule. Never add your own validation, limit, or default, such as a minimum password length.
- When the spec asks for an upgrade, first run `node .agents/aidd/aidd.mjs run upgrade --project {project}`. Then repair what breaks. Add dependencies with the add command of the package manager. Never write versions by hand.

## Check

Check only your changes. The pre-commit hook formats, lints, checks types, and runs the affected unit tests on each commit. Never run the full `test`. Only `ship-spec` runs it.

- Write unit tests only for `logic`, `core`, and `shared`, never for UI code, data access, or E2E tests. Meet the coverage that the `crap` slot measures for each file, branch, and error path. Tests are fast and sit beside their modules. The code gets external effects as arguments. Tests give fakes, never real disk, database, network, or process access.
- When the scope has E2E tests, read `references/acceptance-tests.md` before you write them.
- Commit the complete code of each unit. Then commit its unit tests separately as `test({project})`. Commit both before you start the next unit.
- If the hook rejects a commit, fix all reported errors and retry. Never skip it.
- After the last unit, run `node .agents/aidd/aidd.mjs run layers --project {project}` and `run crap --project {project}`. Repair findings in the code you changed and the debt items or check that your scope names. Also repair what the checks show next, such as coverage that a failed limit hid. Commit each repair separately. Leave findings outside your scope for the next scan. Report each red check and what you could not repair.
- If a command is unavailable, say so in your result. Never make a replacement command.
- Never weaken an assertion. A repair never builds behavior that the spec does not declare.

Keep the `AGENTS.md` of the project current with your change. Update its slots, its dependencies, its folders, and its contract (port and variables). Also update the line of each `core` folder that you change. Never write what a feature does: its spec gives it. The core writes the index of `shared`.

Before you return, read the project rules of `AGENTS.md` again. Also read the code rules that apply and each sentence of the spec for this project. Check your diff against each one. A rule you did not apply fails the qualification.

The result is the code and the tests of the project for the given scope, committed through the hook.

Commit only this project with `node .agents/aidd/aidd.mjs commit "{feat|fix|refactor|test|chore}({project}): {description}" {project path}`.
