---
name: document-system
description: Set the system documentation from repository evidence.
metadata:
  aiddbot-kind: primitive
user-invocable: true
---
# document-system

Set the system documentation from repository evidence.

Read the tree and guide files. Do not redesign. Read source code only to find the domain entities for the model.
Settle `{Product_Folder}` and `{Source_Folders}` with the human. 
Run `node .agents/skills/document-system/scripts/initialize-product-docs.mjs --product-folder "{Product_Folder}"` to create missing `.aiddbot/counters.yaml`, PRD, and TDR from the exact empty templates. Never replace existing product documents.
Generate or improve the `AGENTS.md` file with the `AGENTS.template.md`,filled with founds and human input.

Document the important repository paths and product records. Do not inventory skills, commands, or the model actions that execute them; the orchestrator skills own that routing.

Write the conceptual model at `{Product_Folder}/model/model.schema.md` following `model.schema.template.md`, deriving entities and relations from entity definitions, ORM models, or migrations. When no functional code exists yet, draft it from the PRD and human input instead; when neither names an entity, leave the diagram and entity list empty rather than inventing any. Preserve an existing model and only correct what the evidence contradicts. Later specs keep it current.

Do not create any non templated files.

Execute `record-journal` for the documentation result with `stage: document`.

The result is root project instructions and product high level overview.

Git commit as `docs(system): document foundation`.
