---
name: rule-project
description: Record one project's coding rules and classify its lint, unit, acceptance, and quality commands.
metadata:
  aiddbot-kind: primitive
user-invocable: true
---
# rule-project

Your goal is to record one project's coding rules and register the commands `aidd run` executes on its behalf.

Read only decisive source files, folder trees, manifests, and referenced configuration. Never inventory skills or the actions that run them beyond the four command kinds below, and create no file beyond this template. Identify the project by its source folder, responsibility, and configuration.

Classify the project's real commands by their effect, never their script name: `lint` runs only error-level checks; `unit` runs fast tests with no server or browser; `acceptance` runs end-to-end behavior that starts the system; `quality` lists every warning-denial, complexity, coverage, or other hardening check, one aggregate command when it already subsumes the rest. Register `path` and only the kinds with an unambiguous command, with `node .agents/aidd/aidd.mjs config set projects.{project} <json>`; never invent a missing kind. The JSON value looks like `{"path":"back","commands":{"lint":"npm run lint","unit":"npm test","quality":["npm run quality"]}}`, with `quality` always a list.

Write `{Agents_Folder}/rules/{project}.rules.md` from `project.rules.template.md`. When it exists, rewrite the code-derived sections to match the code but keep every coding-rules row, because shipping promoted those lessons and code cannot regenerate them; drop a row only when its scope no longer exists. Touch its timestamp only when content changes.

List the written file under the project decisions in `AGENTS.md`.

The result is the project's current coding rules and its classified commands.

Commit as `docs(project): record {project} rules`.
