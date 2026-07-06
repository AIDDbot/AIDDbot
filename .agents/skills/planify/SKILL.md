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
Turn a spec (or an escalated e2e report) into one plan per affected container —
`e2e.plan.md` included — ordered and actionable for `/codify`.

## Guardrails
1. **Ground in the arch** — every step traces to the container's components and contracts.
2. **Green tests change by plan, never silently** — list every scenario the change alters
   or retires, per feature suite, in the e2e plan's **Changes to existing scenarios**.

## Context
- Listing only — read each item when needed.
- `{Arch}` = `{Product_Folder}/arch`; `{Specs}` = `{Product_Folder}/specs/{slug}`.

### Inputs
- One of:
  - [a spec]({Specs}/spec.md)
  - [an e2e report escalated by `/verify`]({Specs}/e2e.report.md) **if structural defects**
  - A short textual requirement.
  - A structural-refactor goal (no spec — behavior doesn't change).

### References
- [the containers the feature can touch]({Arch}/system.arch.md) _read_ **always**
- [components, contracts, structure]({Arch}/{container}.arch.md) _read_
  **one per affected container**
- [API field shapes]({Arch}/api.schema.md) _read_ **if touching an API**
- [data field shapes]({Arch}/db.schema.md) _read_ **if touching the store**
- [container plan template](./assets/plan.template.md) _write-from_ **always**
- [e2e plan template, one scenario step per criterion](./assets/e2e.plan.template.md)
  _write-from_ **if not a structural refactor**

### Glossary
- **Container** — a runnable unit in `system.arch.md` (`api`, `web`, `db`...) — C4 L2.
- **e2e container** — transversal; verifies the others. Planned and codified like any
  container; only its verdict belongs to `/verify`.
- **Structural refactor** — its acceptance criterion is the existing e2e suite,
  unmodified and green.
- **{slug}** — inherited from the input file name or derived from the requirement.

## Steps
### 1. Research
- Identify the input type; derive `{slug}`.
- From `system.arch.md`, list the affected containers and their expected results.
- Read each affected `{container}.arch.md`.
- If ambiguous, document assumptions and proceed best-effort.

### 2. Plan
- Read the two plan templates.
- Prepare one plan per container: ordered vertical slices — title, description, paths.
- Align shared contracts via `api.schema.md` / `db.schema.md`.
- State each shared contract in every sibling plan's **Contracts** section, same wording.
- Derive the e2e plan from the spec and shared contracts, never from sibling implementations.
- If released behavior changes, apply Guardrail 2.

### 3. Implement
- Write one `{Specs}/{container}.plan.md` per affected container — `e2e.plan.md` included.
- Structural refactor: skip the e2e plan; after `/codify`, → `/extract` on the affected
  containers, then a patch `/release`.
- Commit (`docs:`); → `/codify` per plan (e2e included), then `/verify`.

## Verification
- [ ] One plan per affected container — `e2e.plan.md` included — no empty placeholders.
- [ ] Each plan is grounded in its `{container}.arch.md`, ordered, actionable standalone.
- [ ] The e2e plan maps every acceptance criterion to exactly one scenario step.
