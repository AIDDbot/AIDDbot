---
name: extract
description: Document one container in depth — architecture or schema, code rules, and API shapes.
user-invocable: true
disable-model-invocation: true
---
# Extract — document one container in depth

Act as Senior Software Architect. 
Starting from the system architecture, you take one runnable unit — one container — and generates its documentation:   
- its architecture (`{Product_Folder}/arch/container.arch.md`), 
- its data schemas (`{Product_Folder}/model/db.schema.md`), 
- its API schema (`{Product_Folder}/model/api.schema.md`), and 
- its coding rules (`{Agents_Folder}/rules/container.rules.md`).
This is the layer that plans and development lean on afterwards, so it needs detail.

## Rules

- **One container per run** — `front`, `back`, `db`, `e2e`, or `fullstack`; never all at once. 
  - If you were not given one, or the choice is ambiguous, ask which.
- **Do go into the source** — read the files and artifacts you judge to be key or archetypal. 
  - Not all of them, only what looks decisive.
- **Evidence wins** — trace every key statement to the repository or to an answer from the human.
  - Where evidence is missing, propose a default and confirm it with a closed question, one at a time, until you are told to stop asking.
- **Observe, never redesign** — document what exists and flag its contradictions instead of correcting them.
- **Prefer the linter to the prose** — a rule the toolchain can enforce belongs in its config, not in `{container}.rules.md`.
- **Merge, never duplicate** — `{Product_Folder}/model/api.schema.md` is shared, so fold your endpoints into the one that may already exist.

## Context

- **Input** 
  - the root agent-rules file (`AGENTS.md` and `CLAUDE.md` with a link to it)
  - `{Product_Folder}/arch/system.arch.md` 
  - optionally, which container you are documenting.
- **References** — the templates the case calls for: 
    - [container architecture](./assets/container.arch.template.md), 
    - [relational schema](./assets/db.schema.template.md), 
    - [API schema](./assets/api.schema.template.md), and
    - [code rules](./assets/container.rules.template.md).

## Method

Read the root agent rules and the system architecture, and select the target container along with its tier. 
The tier is what picks the template: `db` takes the relational schema, anything else takes the container architecture, and an API on top of either takes the API schema. 
Then read the container's folder, its _Guide files_, and enough representative source to understand it from the inside.

Write that container's documents, always including `{Product_Folder}/rules/{container}.rules.md`, and point its **Detail** link in `{Product_Folder}/arch/system.arch.md` at what you wrote. 

Commit as `docs(extract): …`.
