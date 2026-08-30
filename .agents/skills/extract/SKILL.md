---
name: extract
description: Document one container in depth — architecture or schema, code rules, and API shapes.
user-invocable: true
disable-model-invocation: true
---
# extract

Your goal is to document one container in depth — its architecture or schema, coding rules, and API shapes.

One container per run (`front`, `back`, `db`, `e2e`, or `fullstack`); if you were not given one, ask. Read the source, but only the files that look decisive. Document what exists and flag contradictions; do not redesign. Where evidence is missing, propose a default and confirm it with one closed question at a time. A rule the toolchain can enforce belongs in its config, not in the coding rules.

Read `AGENTS.md` and `{Product_Folder}/arch/system.arch.md`. The tier picks the template: `db` takes the [relational schema](./assets/db.schema.template.md) into `{Product_Folder}/model/db.schema.md`; anything else takes the [container architecture](./assets/container.arch.template.md) into `{Product_Folder}/arch/{container}.arch.md`; an API on top of either folds into the shared `{Product_Folder}/model/api.schema.md` from the [API schema](./assets/api.schema.template.md). Point the container's **Detail** link in `system.arch.md` at what you wrote.

Write `{Agents_Folder}/rules/{container}.rules.md` from the [code rules](./assets/container.rules.template.md). Copy a pointer into `.claude/rules/{container}.rules.md` (`paths: "**"`), `.cursor/rules/{container}.rules.mdc` (`globs: "**"`), and `.github/instructions/{container}.instructions.md` (`applyTo: "**"`). Each body is a link to the source of truth.

The result is that container's documentation.

Commit as `docs(extract): {container}`.
