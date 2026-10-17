---
name: rule-project
description: Write one existing project's AGENTS.md and classify its commands.
metadata:
  aiddbot-kind: primitive
user-invocable: true
---
# rule-project

Your goal is to write the `AGENTS.md` of one existing project, and to register the commands that `aidd run` executes for it.

Read only the decisive source files, the folder trees, the manifests, and the configuration that they refer to. Identify the project by its source folder, its responsibility, and its configuration. Never list skills or the actions that run them.

## Commands

Set the type of the project by the interface that it gives: `api`, `web`, `cli`, or `e2e` for the project of the end-to-end tests. Then classify its real commands by their effect, never by their script name:

| Slot | Effect |
| --- | --- |
| `upgrade` | Updates the dependencies and the lockfile. |
| `test` | In an `e2e` project: all the end-to-end tests that start the system, headless. In other projects: all the unit tests. |
| `test:spec` | Only in an `e2e` project: the end-to-end tests, ending in the filter flag of the runner (such as `-t` or `--grep`), so that the core adds only a tag such as `@S0001-`. |
| `start` | Starts the project. In an `e2e` project: the runner for a human only, in watch mode or with its UI; never a package added only for it. |
| `layers` | The checks of medium debt: the dependency rules between layers. Never the lint of the pre-commit hook. |
| `crap` | The checks of low debt: the complexity and size rules of the linter and the test coverage, the inputs of CRAP as separate thresholds; never compute the CRAP formula. Each finding shows its rule. |

Lint, format and the affected unit tests are no slots: the pre-commit hook of the technology runs them at each commit. Record the hook in the `AGENTS.md`, and register no command for it.

Register `type`, `path` and only the slots that have a clear command, with `node .agents/aidd/aidd.mjs config set projects.{project} <json>`. Never invent a missing slot. `layers` and `crap` are each a list with one command for each check, never one aggregate that stops at its first failure: one scan must show each failing check.

```json
{"type":"cli","path":"projects/cli","commands":{"test":"npm test","test:spec":{"na":"no end-to-end tests"},"layers":["npm run layers"],"crap":["npm run crap:complexity","npm run crap:coverage"]}}
```

## AGENTS.md

Write `{source_root}/AGENTS.md` from `assets/project.AGENTS.template.md`, and put a `CLAUDE.md` next to it that contains only `@AGENTS.md`. When the file exists, write its sections from the code again, but keep each row of its project rules and its shared primitives that still has a scope: shipping promoted them, and the code cannot make them again.

When an old `{Agents_Folder}/rules/{project}.rules.md` exists, move its code-rules rows to the project rules, then delete that file.

The result is the current `AGENTS.md` of the project and its classified commands.

Commit with `node .agents/aidd/aidd.mjs commit "docs(project): record {project} rules"`.
