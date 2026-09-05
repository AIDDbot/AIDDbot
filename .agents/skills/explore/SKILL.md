---
name: explore
description: Generate the agent rules, system architecture, conceptual model schema, and the PRD shell.
metadata:
  aiddbot-kind: primitive
user-invocable: true
disable-model-invocation: true
---
# explore

Your goal is to set the project up from the repository tree: agent rules, system architecture, conceptual model, and a PRD shell.

Read the tree and the guide files only — `README.md`, `CHANGELOG.md`, and manifests such as `package.json`. Stay out of the source. Document what exists and flag contradictions; do not redesign. Where evidence is missing, propose a default and confirm it with one closed question at a time.

Settle `{Product_Folder}` and `{Source_Folders}` with the human before writing; never assume the repository root. `{Agents_File}` is always `AGENTS.md` plus a `CLAUDE.md` linking `@AGENTS.md`. `{Agents_Folder}` is always `.agents/`. Keep `AGENTS.md` under 100 lines.

Replace the init seed in `AGENTS.md` with the [agent rules](./assets/AGENTS.template.md), preserving any project direction already settled with the human. Write `{Product_Folder}/arch/system.arch.md` from the [system architecture](./assets/system.arch.template.md), `{Product_Folder}/model/model.schema.md` from the [conceptual model](./assets/model.schema.template.md), and `{Product_Folder}/specs/PRD.md` from the [PRD](./assets/PRD.template.md) only if it is missing. These three files are empty shells: retain headings and placeholders, but do not add categories, entities, containers, requirements, or invented content.

The result is the first layer of project documentation.

Commit as `docs(explore): …`.
