---
name: document-project
description: Document one project or subdomain folder.
metadata:
  aiddbot-kind: primitive
user-invocable: true
---
# document-project

Document one project or subdomain folder with its boundary, structure, dependencies, and coding rules.

Read only decisive source files, folder trees, manifests, and referenced configuration.

Identify the project/domain by its source folder, responsibility, and configuration. 

Document important project paths and files. Do not inventory skills, commands, or the model actions that execute them; the orchestrator skills own that routing.

Write one rules file named `{Agents_Folder}/rules/{project}.rules.md` following the `project.rules.template.md`. Example: `./agents/rules/front.rules.md` or `./agents/rules/invoicing.rules.md`

When the rules file already exists, rewrite the sections derived from code to match it, but keep every coding-rules row: shipping promotes those lessons and code cannot regenerate them. Drop a row only when its scope no longer exists. Update the timestamp only when the content changes.

When repository evidence shows relational persistence owned by this project, write `{Product_Folder}/model/{project}.db.schema.md` from `db.schema.template.md`. Derive it from the real migrations, DDL, ORM schema, or database configuration, rather than from the entity-relationship model. Record every physical table, its real columns and physical types, keys, nullability, defaults, constraints, indexes, and foreign references. Include every required many-to-many join table as a table in its own right. This is documentation, not generated executable SQL.

When the project exposes endpoints to other projects or clients, write `{Product_Folder}/model/{project}.api.schema.md` from `api.schema.template.md`. Derive it from the real route definitions, controllers, or OpenAPI document, recording every endpoint with its method, URL, request, and response types.

For a backend project, always write both schema documents, even before it has tables or endpoints: keep the template headings and leave the entries empty rather than inventing any, so later deliveries only update them. One file per project keeps projects from overwriting each other. Replace an existing schema document only with what the current evidence shows.

Do not create system architecture or separate project architecture files other than the templates from assets.

Execute `record-journal` for the documentation result with `stage: document` and the project name.

The result is current project/domain rules and the project's evidenced schemas.

List every written rules and schema file under the project decisions in `AGENTS.md`.

Commit as `docs(project): document {project}`.
