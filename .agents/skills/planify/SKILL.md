---
name: planify
description: Turn a spec into one plan per container plus a transversal e2e plan, grounded in the container arch.
user-invocable: true
disable-model-invocation: true
---
# Planify

## Role
Act as Senior Software Engineer.

## Task
Turn a spec (or an escalated e2e report) into **one plan per affected container** plus **one
transversal e2e plan**, grounded in the container architecture, ordered and actionable for
`/codify` and `/verify`.

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
- [e2e plan](./assets/e2e.plan.template.md) (write-from, unless structural-refactor).

### Glossary
- **Container** — a named runnable unit in `system.arch.md` (`api`, `web`, `db`...) — C4 L2.
- **Tier** — the layer a container belongs to (`front | back | db | e2e | fullstack`);
  classifies containers, never identifies one.
- **e2e container** — transversal; verifies the others. Gets `e2e.plan.md`, never a
  `{container}.plan.md`; owned by `/verify`, not `/codify`.
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
- Prepare the e2e plan covering every acceptance criterion end-to-end: steps to generate and
  run the tests, and to produce a **defects report**.

### 3. Implement
- Write one `{Specs}/{container}.plan.md` per affected container and one `{Specs}/e2e.plan.md`.
- For a structural-refactor goal: skip the e2e plan; make running the existing e2e suite the
  final step of the last container plan (the criterion needs an owner).
- After `/codify`, suggest `/extract` (brownfield) on the affected containers, then a patch
  `/release`.
- Commit the changes (`docs:`).
- Suggest `/codify` per container plan, then `/verify` the e2e plan.

## Verification
- [ ] One `{container}.plan.md` per affected container and one `e2e.plan.md` exist, in the
      correct format, with no empty placeholders.
- [ ] Each container plan is grounded in its `{container}.arch.md`, ordered, and actionable
      without extra context.
- [ ] The e2e plan covers all acceptance criteria and includes defect-report generation.
