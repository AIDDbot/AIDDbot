---
name: planify
description: Turn a spec into one plan per affected container, grounded in the container arch.
user-invocable: true
disable-model-invocation: true
---
# Planify

## Role
Act as Senior Software Engineer.

## Task
Turn a spec (or an escalated report) into one plan per affected container —
`e2e.plan.md` included — ordered and actionable for `/codify`.

### Guardrails
- **Ground in the arch** — every step traces to the container's components and contracts.

## Context

- `{Arch}` = `{Product_Folder}/arch`.
- `{Model}` = `{Product_Folder}/model`.
- `{Specs}` = `{Product_Folder}/specs/{spec_key}`.

### Inputs
- [ ] Required: a spec, a short textual requirement, or a structural-refactor goal
      (no spec — behavior does not change).

### Glossary
- **Container** — a runnable unit in `system.arch.md` (`api`, `web`, `db`) — C4 L2.
- **e2e container** — transversal; written by `/codify`, judged by `/verify`.
- **Structural refactor** — acceptance criterion is the existing e2e suite.
- **{slug}** — from the input file name or derived from the requirement.
- **{spec_id}** — from the spec folder; if spec-less, next sequential under `specs/`.
- **{spec_key}** — `{spec_id}-{slug}`; the spec folder name.
- **AC id** — `AC-{spec_id}.{n}`; a numbered acceptance criterion from the spec.

## Steps
### 1. Research
- _identify_ the input type; _derive_ `{spec_id}`, `{slug}`, and `{spec_key}`.
- _read_ [system architecture]({Arch}/system.arch.md).
- _list_ the affected containers and their expected results.
- _for-each_ non-`db` container, _read_ [its architecture]({Arch}/{container}.arch.md).
- _if_ a `db` container is affected, _read_ [relational schema]({Model}/db.schema.md).
- _if_ ambiguous, _document_ assumptions and proceed best-effort.

### 2. Plan
- _if_ a structural refactor, _omit_ the e2e plan.
- _read_ [container plan template](./assets/plan.template.md).
- _if_ not a structural refactor, _read_ [e2e plan template](./assets/e2e.plan.template.md).
- _for-each_ container, _prepare_ the title, description, paths, and placeholders.
- _if_ touching an API, _read_ [API field shapes]({Model}/api.schema.md).
- _if_ touching the store, _read_ [data field shapes]({Model}/db.schema.md).
- _state_ each shared contract in every sibling plan, same wording.
- _if_ writing the e2e plan:
  - _derive_ it from the spec and shared contracts, never from sibling code.
  - _map_ every AC id to exactly one scenario.
  - _think_ as a QA engineer, not a developer.

### 3. Implement
- _for-each_ container, _write_ `{Specs}/{container}.plan.md`.
- _commit_ the changes (`docs(planify): {description}`).
- _handoff_ to `/codify` per plan.

## Verification
- [ ] One plan per affected container — no empty placeholders.
- [ ] Each plan is grounded in its arch or `db.schema.md`, ordered, actionable.
- [ ] The e2e plan (if any) maps every AC id to exactly one scenario step.
