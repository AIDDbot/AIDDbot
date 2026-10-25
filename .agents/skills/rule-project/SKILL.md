---
name: rule-project
description: Write one existing project's AGENTS.md and classify its commands.
metadata:
  aiddbot-kind: primitive
user-invocable: true
---
# rule-project

Your goal is to write the `AGENTS.md` of one existing project. You also register the commands that `aidd run` executes for it.

Read only the important source files, the folder trees, the manifests, and the configuration that they refer to. Identify the project by its source folder, its responsibility, and its configuration. Never list skills or the actions that run them.

## Commands

Set the type of the project from the interface that it gives: `api`, `web`, or `cli`. The project of the end-to-end tests is `e2e`. Then classify its real commands by their effect, never by their script name:

| Slot | Effect |
| --- | --- |
| `upgrade` | Updates the dependencies and the lockfile. |
| `test` | In an `e2e` project: all the end-to-end tests, headless. They start the system. In other projects: all the unit tests. |
| `test:spec` | Only in an `e2e` project: the end-to-end tests. The command ends with the filter flag of the runner, such as `-t` or `--grep`. The core then adds only a tag, such as `@S0001-`. |
| `start` | Starts the project. In an `e2e` project: the runner in watch mode or with its UI, for a human only. Never add a package only for it. |
| `layers` | The checks of medium debt: the dependency rules between layers. Never the lint of the pre-commit hook. |
| `crap` | The checks of low debt: the complexity and size rules of the linter, and the test coverage. These are the inputs of CRAP, each with its own threshold. Never calculate the CRAP formula. Each finding shows its rule. |

Lint, format, and the affected unit tests are not slots. The pre-commit hook of the technology runs them at each commit. Record the hook in the `AGENTS.md`. Register no command for it.

Register `type`, `path`, and only the slots that have a clear command. Use `node .agents/aidd/aidd.mjs config set projects.{project} <json>`. Never invent a missing slot. Register `layers` and `crap` as the project gives them. When its checks are separate, register a list of commands. When the project runs them in an order, register its one script. An example is a `crap` script that runs the complexity and then the coverage.

```json
{"type":"cli","path":"projects/cli","commands":{"test":"npm test","test:spec":{"na":"no end-to-end tests"},"layers":"npm run layers","crap":"npm run crap"}}
```

## AGENTS.md

Write `{source_root}/AGENTS.md` from `assets/project.AGENTS.template.md`. Put a `CLAUDE.md` next to it that contains only `@AGENTS.md`.

When the file exists, write its sections again from the code. But keep each project rule that still has a scope. Shipping added that rule, and the code cannot give it again.

Then run `node .agents/aidd/aidd.mjs agents check`. Repair each problem that it shows.

The result is the current `AGENTS.md` of the project and its classified commands.

Commit with `node .agents/aidd/aidd.mjs commit "docs(project): record {project} rules"`.
