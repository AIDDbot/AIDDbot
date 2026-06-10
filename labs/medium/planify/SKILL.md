---
name: planify
description: Turn a spec into one implementation plan per container plus a transversal e2e plan, each grounded in the container architecture.
user-invocable: true
disable-model-invocation: true
---

# Planify skill

## Role
Senior software engineer.

## Task
Turn a spec (or an escalated e2e report) into **one implementation plan per affected container** plus **one transversal e2e plan**, each broken into ordered, actionable steps ready for `/codify` (container plans) and `/verify` (e2e plan).

## Context
### Input
- One of: a spec `{Product_Folder}/specs/{slug}/spec.md`, an e2e report `{Product_Folder}/specs/{slug}/e2e.report.md` escalated by `/verify` (structural defects), or a short textual requirement.

### References
- `{Product_Folder}/arch/system.arch.md` (containers the feature can touch) and each `{Product_Folder}/arch/{container}.arch.md` (run `/extract` if missing).

### Assets
- Templates: [container plan](./assets/plan.template.md), [e2e plan](./assets/e2e.plan.template.md).

### Glossary
- **Container** — a named runnable unit in `system.arch.md` (`api`, `web`, `db`...) — C4 L2. Units are always identified by container name.
- **Tier** — the physical/technological layer a container belongs to (`front | back | db | e2e | fullstack`) — corporate jargon. A tier classifies containers, never identifies one; several containers can share a tier.
- **e2e container** — runnable like any container, but transversal: it verifies the others instead of delivering features. It gets the `e2e.plan.md`, never a `{container}.plan.md`, and is owned by `/verify`, not `/codify`.
- **Component** — an internal building block of one container (C4 L3).
- **Expected result** — an observable outcome from the spec; never an implementation step.

### Conventions
- `{slug}` inherited from the input file name or derived from the requirement.
- `{container}` matches a container name in `system.arch.md` (e.g. `api`, `web`, `db`, `cli`).
- Container plan: `{Product_Folder}/specs/{slug}/{container}.plan.md`; e2e plan: `{Product_Folder}/specs/{slug}/e2e.plan.md`.

## Steps
### Step 1: Understand
- [ ] Identify the input type; derive `{slug}`; list the expected results per container.
- [ ] If ambiguous, document assumptions and proceed best-effort.

### Step 2: Identify containers
- [ ] From `system.arch.md`, determine which containers the feature touches.
- [ ] Read each `{container}.arch.md` to ground the plan in its components, contracts, and structure.

### Step 3: Plan per container
- [ ] Fill `plan.template.md` with ordered steps by vertical slices — each step has a title, short description, and affected paths.
- [ ] Align contracts shared across containers (API shapes, schemas) so plans stay coherent.
- [ ] State each shared contract in the plan's **Contracts** section — identical wording in every sibling plan that provides or consumes it.
- [ ] Functional containers only — the e2e container is covered by the e2e plan.

### Step 4: E2E plan
- [ ] Fill `e2e.plan.template.md` covering every acceptance criterion end-to-end.
- [ ] Include steps to generate and run the tests and produce a **defects report**.

## Output
- [ ] Write one `{container}.plan.md` per affected container and one `e2e.plan.md`, using the templates and naming convention.
- [ ] Commit (`docs`); suggest `/codify` per container plan, then `/verify` the e2e plan.

## Verification
- [ ] One plan per affected container, each grounded in its `{container}.arch.md`, ordered and actionable without extra context.
- [ ] The e2e plan covers all acceptance criteria and includes defect-report generation.
