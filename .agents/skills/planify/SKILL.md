---
name: planify
description: Turn a spec into one plan per affected container — the transversal e2e container included — grounded in the container arch.
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
- `{Specs}` = `{Product_Folder}/specs/{id}-{slug}`

### Inputs
- One of:
  - [a spec]({Specs}/spec.md)
  - A short textual requirement.
  - A structural-refactor goal (no spec — behavior doesn't change).

### Glossary
- **Container** — a runnable unit in `system.arch.md` (`api`, `web`, `db`...) — C4 L2.
- **e2e container** — transversal; verifies the others.
- **Structural refactor** — its acceptance criterion is the existing e2e suite.
- **{slug}** — inherited from the input file name or derived from the requirement.
- **{id}** — inherited from the spec folder; if spec-less, next sequential under `specs/`.
- **AC id** — `AC-{id}.{n}`; a numbered acceptance criterion from the spec.

## Steps
### 1. Research
- Identify the input type; derive `{id}` and `{slug}`.
- _read_ [system architecture]({Arch}/system.arch.md).
- List the affected containers and their expected results.
- Foreach container, _read_ [its architecture]({Arch}/{container}.arch.md).
- If ambiguous, document assumptions and proceed best-effort.
- _read_ [container plan template](./assets/plan.template.md).
- If not a structural refactor, _read_ [e2e plan template](./assets/e2e.plan.template.md).

### 2. Plan
- Prepare one plan per container: ordered vertical slices — title, description, paths.
- If touching an API, _read_ [API field shapes]({Arch}/api.schema.md); 
- If touching the store, _read_ [data field shapes]({Arch}/db.schema.md); 
- State each shared contract in every sibling plan's **Contracts** section, same wording.
- Derive the e2e plan from the spec and shared contracts, never from sibling implementations;
  map every AC id to exactly one scenario.

### 3. Implement
- If a structural refactor, skip the e2e plan. 
- Write one `{Specs}/{container}.plan.md` per affected container.
- Commit (`docs: {description}`); → `/codify` per plan .

## Verification
- [ ] One plan per affected container — no empty placeholders.
- [ ] Each plan is grounded in its `{container}.arch.md`, ordered, actionable standalone.
- [ ] The e2e plan (if any) maps every AC id to exactly one scenario step.
