---
name: rule-project
description: Record one project's coding rules from repository evidence.
metadata:
  aiddbot-kind: primitive
user-invocable: true
---
# rule-project

Your goal is to record one project's coding rules: its boundary, structure, dependencies, and the non-automatable restrictions evidence supports.

Read only decisive source files, folder trees, manifests, and referenced configuration. Never inventory skills, commands, or the actions that run them, and create no file beyond this template. Identify the project by its source folder, responsibility, and configuration.

Write `{Agents_Folder}/rules/{project}.rules.md` from `project.rules.template.md`. When it exists, rewrite the code-derived sections to match the code but keep every coding-rules row, because shipping promoted those lessons and code cannot regenerate them; drop a row only when its scope no longer exists. Touch its timestamp only when content changes.

List the written file under the project decisions in `AGENTS.md`, and journal the result, naming the project.

The result is the project's current coding rules.

Commit as `docs(project): record {project} rules`.
