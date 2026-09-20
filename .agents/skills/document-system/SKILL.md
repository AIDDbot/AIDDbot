---
name: document-system
description: Set the system documentation from repository evidence.
metadata:
  aiddbot-kind: primitive
user-invocable: true
disable-model-invocation: false
---
# document-system

Set the system documentation from repository evidence.

Read the tree, guide files, and manifests. Do not redesign or read source code. 
Settle `{Product_Folder}` and `{Source_Folders}` with the human. 
Run `node .agents/skills/document-system/scripts/initialize-product-docs.mjs --product-folder "{Product_Folder}"` to create missing counters, PRD, and TDR from the exact empty templates. Never replace existing product documents.
Generate or improve the `AGENTS.md` file with the `AGENTS.template.md`,filled with founds and human input.

Classify cross-project commands by their configured behavior, never by the script name. Error-level static diagnostics and ordinary builds belong to `Build`; E2E requirement checks belong to `Acceptance`; warning denial, complexity, coverage, strict analysis, and hardening belong to `Quality`. Record only cross-project commands in `AGENTS.md`; project-specific commands belong in project rules. Do not merge the phases or invent a command when one is missing.

Write model documentation based on repository evidence following the `model.schema.template` at `{Product_Folder}/model/model.schema.md`

Do not create any non templated files.

The result is root project instructions and product high level overview.

Git commit as `docs(system): document foundation`.
