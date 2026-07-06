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
Turn a spec (or an escalated e2e report) into **one plan per affected container** — the
transversal `e2e` container included — grounded in the container architecture, ordered and
actionable for `/codify`.

## Context
- CAUTION: This is a listing. Read only when necessary.
- `{Arch}` = `{Product_Folder}/arch`; `{Specs}` = `{Product_Folder}/specs/{slug}`.

### Inputs
- One of:
  - A spec `{Specs}/spec.md`.
  - An e2e report `{Specs}/e2e.report.md` escalated by `/verify` (structural defects).
  - A short textual requirement.
> A **structural-refactor goal** is also valid (no spec — behavior doesn't change): the
> acceptance criterion is the existing e2e suite, unmodified and green.

### References
- `{Arch}/system.arch.md` (read, always) — the containers the feature can touch.
- each `{Arch}/{container}.arch.md` (read, always) — components, contracts, structure.
- `{Arch}/api.schema.md` / `{Arch}/db.schema.md` — endpoint/data shapes (read, if touching
  an API or the store), linked from the container arch.
> Run `/extract` first if missing.
- [container plan](./assets/plan.template.md) (write-from, always).
- [e2e container plan](./assets/e2e.plan.template.md) (write-from, unless
  structural-refactor) — the same plan shape, specialized: one scenario step per
  acceptance criterion.

### Glossary
- **Container** — a named runnable unit in `system.arch.md` (`api`, `web`, `db`...) — C4 L2.
- **Tier** — the layer a container belongs to (`front | back | db | e2e | fullstack`);
  classifies containers, never identifies one.
- **e2e container** — transversal; verifies the others. Planned (`e2e.plan.md`) and
  codified like any container; only its verdict belongs to `/verify`.
- **Component** — an internal building block of one container — C4 L3.
- **Expected result** — an observable outcome from the spec; never an implementation step.
- **{slug}** — inherited from the input file name or derived from the requirement.

## Steps
### 1. Research
- Identify the input type; derive `{slug}`; list the expected results per container.
- From `system.arch.md`, determine which containers the feature touches.
- Read each `{container}.arch.md` to ground the plan in its components, contracts, structure.
- If ambiguous, document assumptions and proceed best-effort.

### 2. Plan
- Read the `plan.template.md` and `e2e.plan.template.md` templates.
- Prepare one plan per affected container: ordered steps as vertical slices, each with a
  title, short description, and affected paths.
- Align contracts shared across containers, reading `api.schema.md` / `db.schema.md` for
  the field-level shapes.
- State each shared contract in the plan's **Contracts** section, with identical wording in
  every sibling plan that provides or consumes it.
- Prepare the e2e container plan like the others — one test-scenario step per acceptance
  criterion, derived from the spec and the shared contracts, never from sibling
  implementations.
- When the change alters released behavior, list the e2e scenarios it replaces (governing
  spec + scenario) in the e2e plan's **Replaces** section — old tests retire by plan,
  never silently.

### 3. Implement
- Write one `{Specs}/{container}.plan.md` per affected container — `e2e.plan.md` included.
- For a structural-refactor goal: skip the e2e plan (no new tests — the criterion is the
  existing suite, unmodified and green, judged by `/verify` at the end).
- After `/codify`, suggest `/extract` (brownfield) on the affected containers, then a patch
  `/release`.
- Commit the changes (`docs:`).
- Suggest `/codify` per container plan (e2e included), then `/verify` to run and report.

## Verification
- [ ] One `{container}.plan.md` per affected container — `e2e.plan.md` included — exists,
      in the correct format, with no empty placeholders.
- [ ] Each container plan is grounded in its `{container}.arch.md`, ordered, and actionable
      without extra context.
- [ ] The e2e plan maps every acceptance criterion to exactly one scenario step.
