---
name: outline-system
description: Set the system's shared documentation and every project's physical schema, from repository evidence.
metadata:
  aiddbot-kind: primitive
user-invocable: true
---
# outline-system

Your goal is to set the shared documentation of the system from repository evidence. This is the root `AGENTS.md`, the conceptual model, and the physical schemas of each project.

Document what exists. Never redesign. Read the source code only to find the domain entities and the physical shape. When `.product/system.md` exists, take the purpose, the users, and the needs of the product from it. Where it and the code disagree, the code wins.

| Document | Template | Rules | Commit |
| --- | --- | --- | --- |
| `AGENTS.md` | `assets/AGENTS.template.md` | `references/agents-md.md` | `docs(system): outline foundation` |
| `.product/model/model.schema.md` | `assets/model.schema.template.md` | `references/schemas.md` | `docs(system): outline model` |
| `.product/model/{project}.db.schema.md` | `assets/db.schema.template.md` | `references/schemas.md` | `docs(system): outline {project} schemas` |
| `.product/model/{project}.api.schema.md` | `assets/api.schema.template.md` | `references/schemas.md` | `docs(system): outline {project} schemas` |

Read the rules of a document before you write it. When the caller asks only for some documents, write only those. Create no file outside these templates.

When a documented project no longer exists, delete its schema documents and its entries in `AGENTS.md`.

The result is a current root `AGENTS.md`, the conceptual model, and the evidenced physical schemas of each project.

Commit each document immediately after you write it, so that the journal records its time. Use `node .agents/aidd/aidd.mjs commit "<message>" <paths>` with the message of its row. Commit the two schema documents of a project together. Commit all other changes with `AGENTS.md`.
