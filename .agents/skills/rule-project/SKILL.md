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

Classify the real commands of the project by their effect, never by their script name:

| Slot | Effect |
| --- | --- |
| `lint` | Only checks of error level. |
| `format` | Rewrites the files with the formatter. |
| `upgrade` | Updates the dependencies and the lockfile. |
| `unit` | Fast tests, with no server or browser. |
| `start` | Starts the project. |
| `acceptance` | End-to-end behavior that starts the system. |
| `quality` | Each warning-denial, complexity, coverage, or other hardening check, as its own command. Never one aggregate that stops at its first failure: one scan must show each failing check. |

Register `path` and only the slots that have a clear command, with `node .agents/aidd/aidd.mjs config set projects.{project} <json>`. Never invent a missing slot. `quality` is always a list:

```json
{"path":"back","commands":{"lint":"npm run lint","unit":"npm test","quality":["npm run quality:warnings","npm run quality:coverage"]}}
```

## AGENTS.md

Write `{source_root}/AGENTS.md` from `assets/project.AGENTS.template.md`, and put a `CLAUDE.md` next to it that contains only `@AGENTS.md`. When the file exists, write its sections from the code again, but keep each row of its project rules and its shared primitives that still has a scope: shipping promoted them, and the code cannot make them again.

When an old `{Agents_Folder}/rules/{project}.rules.md` exists, move its code-rules rows to the project rules, then delete that file.

The result is the current `AGENTS.md` of the project and its classified commands.

Commit with `node .agents/aidd/aidd.mjs commit "docs(project): record {project} rules"`.
