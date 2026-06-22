---
name: planify
description: Turn a spec into one implementation plan per container plus a transversal e2e plan, each grounded in the container architecture.
user-invocable: true
disable-model-invocation: true
---
# Planify

## Role
Act as Senior Software Engineer.

## Task
Turn a spec (or an escalated e2e report) into **one implementation plan per affected container** plus **one transversal e2e plan**, each grounded in the container architecture and broken into ordered, actionable steps ready for `/codify` and `/verify`.

## Context
- CAUTION: This is a listing. Read only when necessary.

### Inputs
- One of: a spec `{Product_Folder}/specs/{slug}/spec.md`, an e2e report `{Product_Folder}/specs/{slug}/e2e.report.md` escalated by `/verify` (structural defects), or a short textual requirement.
> A **structural-refactor goal** is also valid input (no spec — behavior doesn't change): the acceptance criterion is the existing e2e suite, unmodified and green.

### References
- `{Product_Folder}/arch/system.arch.md` (read) — the containers the feature can touch.
- each `{Product_Folder}/arch/{container}.arch.md` (read) — components, contract surface, and structure.
- `{Product_Folder}/arch/api.schema.md` / `{Product_Folder}/arch/db.schema.md` (read) — system-wide contract detail (endpoint and data shapes), linked from the container arch; read whenever a plan touches an API or the persistence store.
> Run `/extract` first if missing.
- [container plan](./assets/plan.template.md) (write-from) — output file template.
- [e2e plan](./assets/e2e.plan.template.md) (write-from) — output file template.

### Glossary
- **Container** — a named runnable unit in `system.arch.md` (`api`, `web`, `db`...) — C4 L2. Units are always identified by container name.
- **Tier** — the physical/technological layer a container belongs to (`front | back | db | e2e | fullstack`); it classifies containers, never identifies one.
- **e2e container** — runnable like any container, but transversal: it verifies the others. It gets the `e2e.plan.md`, never a `{container}.plan.md`, and is owned by `/verify`, not `/codify`.
- **Component** — an internal building block of one container — C4 L3.
- **Expected result** — an observable outcome from the spec; never an implementation step.
- **{slug}** — inherited from the input file name or derived from the requirement.

## Steps
### Step 1: Research
- Identify the input type; derive `{slug}`; list the expected results per container.
- From `system.arch.md`, determine which containers the feature touches; read each `{container}.arch.md` to ground the plan in its components, contracts, and structure.
- If ambiguous, document assumptions and proceed best-effort.

### Step 2: Plan
- Read the `plan.template.md` and `e2e.plan.template.md` templates.
- Prepare one plan per affected functional container: ordered steps by vertical slices, each with a title, short description, and affected paths.
- Align contracts shared across containers, reading `api.schema.md` / `db.schema.md` for the field-level shapes, and state each in the plan's **Contracts** section with identical wording in every sibling plan that provides or consumes it.
- Prepare the e2e plan covering every acceptance criterion end-to-end, including steps to generate and run the tests and produce a **defects report**.

### Step 3: Implement the Output
- Write one `{Product_Folder}/specs/{slug}/{container}.plan.md` per affected container and one `{Product_Folder}/specs/{slug}/e2e.plan.md`.
- For a structural-refactor goal: skip the e2e plan and make running the existing e2e suite the final step of the last container plan (the criterion needs an owner); after `/codify`, suggest `/extract` (brownfield) to re-document the affected containers, then a patch `/release`.
- Commit the changes (`docs:`).
- Suggest `/codify` per container plan, then `/verify` the e2e plan.

## Verification
- [ ] One `{container}.plan.md` per affected container and one `e2e.plan.md` exist, are in the correct format, and contain no empty placeholders.
- [ ] Each container plan is grounded in its `{container}.arch.md`, ordered, and actionable without extra context.
- [ ] The e2e plan covers all acceptance criteria and includes defect-report generation.
