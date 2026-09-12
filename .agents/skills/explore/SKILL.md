---
name: explore
description: Generate agent rules, system architecture, and a conceptual model from repository evidence.
metadata:
  aiddbot-kind: primitive
user-invocable: true
disable-model-invocation: true
---
# explore

Set project documentation from the repository tree: agent rules, system architecture, and conceptual model.

Read the tree and guide files only — `README.md`, `CHANGELOG.md`, and manifests. Stay out of source. Document what exists and flag contradictions; do not redesign. Where evidence is missing, propose a default and confirm it with one closed question at a time.

Settle `{Product_Folder}` and `{Source_Folders}` with the human before writing. Replace the init seed in `AGENTS.md` with the [agent rules](./assets/AGENTS.template.md), preserving settled project direction. Write `{Product_Folder}/arch/system.arch.md` and `{Product_Folder}/model/model.schema.md` from their templates. The generated PRD is created later from specs; do not write an empty PRD shell.

The result is the first layer of project documentation.

Commit as `docs(explore): …`.
