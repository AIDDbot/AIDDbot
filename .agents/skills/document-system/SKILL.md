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
Take `{Product_Folder}` and `{Source_Folders}` from an existing `AGENTS.md`; settle them with the human only when they are missing.
Run `node .agents/skills/document-system/scripts/initialize-product-docs.mjs --product-folder "{Product_Folder}"` to create missing `.aiddbot/counters.yaml`, PRD, and TDR from the exact empty templates. The script resolves the repository root itself, so a relative `{Product_Folder}` lands there whatever the working directory is. Never replace existing product documents.
Generate `AGENTS.md` from `AGENTS.template.md`, filled with findings and human input. When it already exists, update only what the repository contradicts and keep human-written content.

Document the important repository paths and product records. Do not inventory skills, commands, or the model actions that execute them; the orchestrator skills own that routing.

Write the conceptual model at `{Product_Folder}/model/model.schema.md` following `model.schema.template.md`, deriving entities and relations from entity definitions, ORM models, or migrations. When no functional code exists yet, draft it from the PRD and human input instead; when neither names an entity, leave the diagram and entity list empty rather than inventing any. When the model already exists and code defines entities, make it match the code: add missing entities and relations, remove those the code no longer has, and keep existing descriptions that still hold. Later specs keep it current between runs.

When a project documented earlier no longer exists, delete its rules and schema files and its `AGENTS.md` entries.

Do not create any non templated files.

Execute `record-journal` for the documentation result with `stage: document`.

The result is root project instructions and product high level overview.

Git commit as `docs(system): document foundation`.
