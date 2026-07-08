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

## Guardrails
- **Ground in the arch** — every step traces to the container's components and contracts.

## Context

- `{Arch}` = `{Product_Folder}/arch`
- `{Specs}` = `{Product_Folder}/specs/{NNN}-{slug}`

### Inputs
- One of:
  - [a spec]({Specs}/spec.md)
  - A short textual requirement.
  - A structural-refactor goal (no spec — behavior doesn't change).

### Glossary
- **Container** — a runnable unit in `system.arch.md` (`api`, `web`, `db`...) — C4 L2.
- **e2e container** — transversal; verifies the others; written by `/codify`, judged by `/verify`.
- **Structural refactor** — its acceptance criterion is the existing e2e suite.
- **{slug}** — inherited from the input file name or derived from the requirement.
- **{NNN}** — inherited from the spec folder; if spec-less, next sequential under `specs/`.
- **AC id** — `AC-{NNN}.{n}`; a numbered acceptance criterion from the spec.

## Steps
### 1. Research
- Identify the input type; derive `{NNN}` and `{slug}`.
- _read_ [system architecture]({Arch}/system.arch.md).
- List the affected containers and their expected results.
- _for_each_ container, _read_ [its architecture]({Arch}/{container}.arch.md).
- _if_ ambiguous, document assumptions and proceed best-effort.

### 2. Plan
- _read_ [container plan template](./assets/plan.template.md).
- _if_ not a structural refactor, _read_ [e2e plan template](./assets/e2e.plan.template.md).
- Prepare the content for the templates' placeholders: one ordered plan per container —
  title, description, paths.
- _if_ touching an API, _read_ [API field shapes]({Arch}/{container}.api.schema.md).
- _if_ touching the store, _read_ [data field shapes]({Arch}/{container}.db.schema.md).
- State each shared contract in every sibling plan's **Contracts** section, same wording.
- Derive the e2e plan from the spec and shared contracts, never from sibling implementations;
  map every AC id to exactly one scenario.

### 3. Implement
- _if_ a structural refactor, skip the e2e plan.
- _write_ one `{Specs}/{container}.plan.md` per affected container.
- Commit (`docs: {description}`).
- _handoff_ to `/codify` per plan.

## Verification
- [ ] One plan per affected container — no empty placeholders.
- [ ] Each plan is grounded in its `{container}.arch.md`, ordered, actionable standalone.
- [ ] The e2e plan (if any) maps every AC id to exactly one scenario step.
