# Schema documents

## Conceptual model

Get the entities and the relations of `model.schema.md` from the entity definitions, the ORM models, or the migrations. When code defines entities, make the model agree with it, and keep each description that is still correct. Without working code, write a draft from the shipped specs and the human input. When neither names an entity, leave the model empty: never invent one.

## Physical schemas

Do this for each project in `{Source_Folders}`:

- When it owns relational persistence, write `{project}.db.schema.md` from the real migrations, DDL, ORM schema, or database configuration, never from the conceptual model. Include each physical table, also the necessary join tables, with the real column types, keys, nullability, defaults, constraints, indexes, and foreign references.
- When it exposes endpoints, write `{project}.api.schema.md` from the real routes, controllers, or OpenAPI document. Give each endpoint its success status and the error statuses that the code really returns.
- A backend project always gets both documents. Until evidence exists, their entries stay empty: never invent them.

## Timestamps

Replace a schema document only with what current evidence shows. Change its timestamp only when its content changes. Read the timestamp from the clock when you write it; never estimate it.
