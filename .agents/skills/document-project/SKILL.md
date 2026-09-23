---
name: document-project
description: Document one project or subdomain folder.
metadata:
  aiddbot-kind: primitive
user-invocable: true
---
# document-project

Your goal is to document one project or subdomain folder: its boundary, structure, dependencies, coding rules, and evidenced schemas.

Read only decisive source files, folder trees, manifests, and referenced configuration. Never inventory skills, commands, or the actions that run them, and create no architecture file beyond these templates.

Write `{Agents_Folder}/rules/{project}.rules.md` from `project.rules.template.md`. When it exists, rewrite the code-derived sections to match the code but keep every coding-rules row, because shipping promoted those lessons and code cannot regenerate them; drop a row only when its scope no longer exists.

When the project owns relational persistence, write `{Product_Folder}/model/{project}.db.schema.md` from `db.schema.template.md`, derived from the real migrations, DDL, ORM schema, or database configuration rather than the conceptual model: every physical table including required join tables, with real column types, keys, nullability, defaults, constraints, indexes, and foreign references. When it exposes endpoints, write `{Product_Folder}/model/{project}.api.schema.md` from `api.schema.template.md`, derived from the real routes, controllers, or OpenAPI document, with each endpoint's success status and the error statuses the code actually returns. A backend project always gets both documents, with empty entries rather than invented ones until evidence exists. Replace a schema document only with what current evidence shows.

Touch a timestamp only when content changes. List every written rules and schema file under the project decisions in `AGENTS.md`, and journal the result, naming the project.

The result is current rules and evidenced schemas for the project.

Commit as `docs(project): document {project}`.
