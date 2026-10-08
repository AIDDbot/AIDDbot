---
name: outline-system
description: Set the system's shared documentation and every project's physical schema, from repository evidence.
metadata:
  aiddbot-kind: primitive
user-invocable: true
---
# outline-system

Your goal is to set the system's shared documentation — root instructions, conceptual model, and every project's physical schemas — from repository evidence.

Document what exists; never redesign. Read source code only to find domain entities and physical shape. When `{Product_Folder}/system.md` exists, take the product purpose, users, and needs from it, and let the code win wherever they disagree. Take `{Product_Folder}` and `{Source_Folders}` from the existing `AGENTS.md`, and settle them with the human only when they are missing.

Write `AGENTS.md` from `AGENTS.template.md`, filled with findings and human input. When it exists, change only what the repository contradicts and keep human-written content. Keep every template section: one without repository evidence is copied from the template as written, never dropped or summarized. Keep it to system-wide facts: list each project with its type and point to its `{source_root}/AGENTS.md`, which owns the project's technology, tooling, architecture, and coding rules; never copy them here. The Blueprint section is the one exception: keep it as written when `.product/system.md` exists, and remove it otherwise. Record important paths and product records, but never inventory skills, commands, or the actions that run them; the orchestrators own that routing.

Write `{Product_Folder}/model/model.schema.md` from `model.schema.template.md`, deriving entities and relations from entity definitions, ORM models, or migrations. Without functional code, draft it from the shipped specs and human input, and leave it empty rather than invent an entity neither names. When code defines entities, make the model match it, keeping descriptions that still hold.

For every project in `{Source_Folders}`: when it owns relational persistence, write `{Product_Folder}/model/{project}.db.schema.md` from `db.schema.template.md`, derived from the real migrations, DDL, ORM schema, or database configuration rather than the conceptual model — every physical table including required join tables, with real column types, keys, nullability, defaults, constraints, indexes, and foreign references. When it exposes endpoints, write `{Product_Folder}/model/{project}.api.schema.md` from `api.schema.template.md`, derived from the real routes, controllers, or OpenAPI document, with each endpoint's success status and the error statuses the code actually returns. A backend project always gets both documents, with empty entries rather than invented ones until evidence exists. Replace a schema document only with what current evidence shows, and touch its timestamp only when content changes. Read each timestamp from the clock when you write the document; never estimate it.

When a documented project no longer exists, delete its schema files and its `AGENTS.md` entries. Create no file outside these templates.

The result is current root instructions, the conceptual model, and every project's evidenced physical schemas.

Commit as you go with `node .agents/aidd/aidd.mjs commit "<message>" <paths>`, right after each of these is written, so the journal times them: `docs(system): outline {project} schemas` for that project's schema documents, `docs(system): outline model` for `model.schema.md`, and `docs(system): outline foundation` for `AGENTS.md` and anything left.
