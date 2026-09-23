---
name: document-system
description: Set the system documentation from repository evidence.
metadata:
  aiddbot-kind: primitive
user-invocable: true
---
# document-system

Your goal is to document the system — its root instructions and conceptual model — from repository evidence.

Document what exists; never redesign. Read source code only to find domain entities. Take `{Product_Folder}` and `{Source_Folders}` from the existing `AGENTS.md`, and settle them with the human only when they are missing.

Write `AGENTS.md` from `AGENTS.template.md`, filled with findings and human input. When it exists, change only what the repository contradicts and keep human-written content. Keep every template section, above all `## Delegation` and the `.aiddbot/efforts.yaml` path: a section without repository evidence is copied from the template as written, never dropped or summarized, because an `AGENTS.md` silent on efforts leaves every later spawn on the harness default. Record important paths and product records, but never inventory skills, commands, or the actions that run them; the orchestrators own that routing.

Write `{Product_Folder}/model/model.schema.md` from `model.schema.template.md`, deriving entities and relations from entity definitions, ORM models, or migrations. Without functional code, draft it from the PRD and human input, and leave it empty rather than invent an entity neither names. When code defines entities, make the model match it, keeping descriptions that still hold.

When a documented project no longer exists, delete its rules and schema files and its `AGENTS.md` entries. Create no file outside these templates.

Journal the documentation result.

The result is current root instructions and a conceptual model of the product.

Commit as `docs(system): document foundation`.
