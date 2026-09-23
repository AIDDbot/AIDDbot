---
name: outline-system
description: Set the system's shared documentation and every project's physical schema, from repository evidence.
metadata:
  aiddbot-kind: primitive
user-invocable: true
---
# outline-system

Your goal is to set the system's shared documentation — root instructions, conceptual model, and every project's physical schemas — from repository evidence.

Document what exists; never redesign. Read source code only to find domain entities and physical shape. Take `{Product_Folder}` and `{Source_Folders}` from the existing `AGENTS.md`, and settle them with the human only when they are missing.

Write `AGENTS.md` from `AGENTS.template.md`, filled with findings and human input. When it exists, change only what the repository contradicts and keep human-written content. Keep every template section: one without repository evidence is copied from the template as written, never dropped or summarized. Record important paths and product records, but never inventory skills, commands, or the actions that run them; the orchestrators own that routing.

Write `{Product_Folder}/model/model.schema.md` from `model.schema.template.md`, deriving entities and relations from entity definitions, ORM models, or migrations. Without functional code, draft it from the PRD and human input, and leave it empty rather than invent an entity neither names. When code defines entities, make the model match it, keeping descriptions that still hold.

For every project in `{Source_Folders}`: when it owns relational persistence, write `{Product_Folder}/model/{project}.db.schema.md` from `db.schema.template.md`, derived from the real migrations, DDL, ORM schema, or database configuration rather than the conceptual model — every physical table including required join tables, with real column types, keys, nullability, defaults, constraints, indexes, and foreign references. When it exposes endpoints, write `{Product_Folder}/model/{project}.api.schema.md` from `api.schema.template.md`, derived from the real routes, controllers, or OpenAPI document, with each endpoint's success status and the error statuses the code actually returns. A backend project always gets both documents, with empty entries rather than invented ones until evidence exists. Replace a schema document only with what current evidence shows, and touch its timestamp only when content changes.

When a documented project no longer exists, delete its schema files and its `AGENTS.md` entries. Create no file outside these templates.

Journal the documentation result.

The result is current root instructions, the conceptual model, and every project's evidenced physical schemas.

Commit as `docs(system): outline foundation`.
