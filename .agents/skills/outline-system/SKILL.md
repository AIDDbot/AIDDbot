---
name: outline-system
description: Set the system's shared documentation and every project's physical schema, from repository evidence.
metadata:
  aiddbot-kind: primitive
user-invocable: true
---
# outline-system

Your goal is to set the shared documentation of the system from repository evidence: the root `AGENTS.md`, the conceptual model, and the physical schemas of each project.

Document what exists; never redesign. Read the source code only to find the domain entities and the physical shape. When `{Product_Folder}/system.md` exists, take the purpose, the users, and the needs of the product from it; where it and the code disagree, the code wins. Take `{Product_Folder}` and `{Source_Folders}` from the existing `AGENTS.md`. Ask the human only when they are missing.

| Document | Template | Rules |
| --- | --- | --- |
| `AGENTS.md` | `AGENTS.template.md` | `references/agents-md.md` |
| `{Product_Folder}/model/model.schema.md` | `model.schema.template.md` | `references/schemas.md` |
| `{Product_Folder}/model/{project}.db.schema.md` | `db.schema.template.md` | `references/schemas.md` |
| `{Product_Folder}/model/{project}.api.schema.md` | `api.schema.template.md` | `references/schemas.md` |

Read the rules of a document before you write it. When the caller asks only for some documents, write only those. Create no file outside these templates.

When a documented project no longer exists, delete its schema documents and its entries in `AGENTS.md`.

The result is a current root `AGENTS.md`, the conceptual model, and the evidenced physical schemas of each project.

Commit each document right after you write it, with `node .agents/aidd/aidd.mjs commit "<message>" <paths>`, so that the journal times it: `docs(system): outline {project} schemas` for the schema documents of that project, `docs(system): outline model` for `model.schema.md`, and `docs(system): outline foundation` for `AGENTS.md` and all that remains.
