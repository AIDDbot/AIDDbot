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

Read the tree and guide files. Do not redesign or read source code.
Settle `{Product_Folder}` and `{Source_Folders}` with the human. 
Run `node .agents/skills/document-system/scripts/initialize-product-docs.mjs --product-folder "{Product_Folder}"` to create missing `.aiddbot/counters.yaml`, PRD, and TDR from the exact empty templates. Never replace existing product documents.
Generate or improve the `AGENTS.md` file with the `AGENTS.template.md`,filled with founds and human input.

Document the important repository paths and product records. Do not inventory skills, commands, or the model actions that execute them; the orchestrator skills own that routing.

Write model documentation based on repository evidence following the `model.schema.template` at `{Product_Folder}/model/model.schema.md`

Do not create any non templated files.

Execute `record-journal` for the documentation result with `stage: document`.

The result is root project instructions and product high level overview.

Git commit as `docs(system): document foundation`.
