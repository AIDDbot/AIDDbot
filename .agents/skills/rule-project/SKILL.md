---
name: rule-project
description: Record one project's coding rules and classify its lint, unit, acceptance, and quality commands.
metadata:
  aiddbot-kind: primitive
user-invocable: true
---
# rule-project

Your goal is to record the code rules of one project, and to register the commands that `aidd run` executes for it.

Read only the decisive source files, the folder trees, the manifests, and the configuration that they refer to. Identify the project by its source folder, its responsibility, and its configuration. Never list skills or the actions that run them, and create no file other than the rules file.

## Commands

Classify the real commands of the project by their effect, never by their script name:

| Kind | Effect |
| --- | --- |
| `lint` | Only checks of error level. |
| `unit` | Fast tests, with no server or browser. |
| `acceptance` | End-to-end behavior that starts the system. |
| `quality` | Each warning-denial, complexity, coverage, or other hardening check, as its own command. Never one aggregate that stops at its first failure: one scan must show each failing check. |

Register `path` and only the kinds that have a clear command, with `node .agents/aidd/aidd.mjs config set projects.{project} <json>`. Never invent a missing kind. `quality` is always a list:

```json
{"path":"back","commands":{"lint":"npm run lint","unit":"npm test","quality":["npm run quality:warnings","npm run quality:coverage"]}}
```

## Rules file

Write `{Agents_Folder}/rules/{project}.rules.md` from `project.rules.template.md`. When it exists, write the sections from the code again, but keep each code-rules row: shipping promoted those lessons, and the code cannot make them again. Remove a row only when its scope no longer exists. Change its timestamp only when the content changes.

List the file under the project decisions in `AGENTS.md`.

The result is the current code rules of the project and its classified commands.

Commit with `node .agents/aidd/aidd.mjs commit "docs(project): record {project} rules"`.
