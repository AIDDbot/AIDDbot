---
name: planify
description: Turn a spec into one implementation plan per container plus a transversal e2e plan, each grounded in the container architecture.
disable-model-invocation: true
---

# Planify skill

## Role
Senior software engineer.

## Task
Given a spec (or bug/review report), produce **one implementation plan per affected container** plus **one transversal e2e plan**, each breaking the work into ordered, actionable steps ready for `/codify`.

## Context

### Input
- One of:
  - a specification file `{Product_Folder}/specs/{slug}/spec.md`
  - a bug or review report `{slug}.report.md`
  - a simple textual requirement for a minor improvement

### References
- `{Product_Folder}/arch/system.arch.md` — the list of containers the feature can touch.
- `{Product_Folder}/arch/{container}.arch.md` — the architecture of each container (run `/extract` if missing). Plan against the **architecture** (components, contracts, structure), not the code rules.
- [Container plan template](./plan.template.md)
- [E2E plan template](./e2e.plan.template.md)

### Conventions
- `{slug}` is inherited from the input file name or derived from the requirement description.
- `{container}` matches a container/tier in `system.arch.md` (e.g. `back`, `front`, `app`, `cli`, `db`).
- Container plan: `{Product_Folder}/specs/{slug}/{container}.plan.md`
- E2E plan: `{Product_Folder}/specs/{slug}/e2e.plan.md`

## Steps

### Step 1: Understand the input
- [ ] Identify the input type and derive `{slug}`.
- [ ] List the expected results per container from the spec.
- [ ] If incomplete or ambiguous, document assumptions clearly and proceed best-effort.

### Step 2: Identify containers
- [ ] From `system.arch.md`, determine which containers the feature touches.
- [ ] Read each `{container}.arch.md` to ground the plan in that container's components, contracts, and structure.

### Step 3: Draft a plan per container
- [ ] For each container, fill `plan.template.md` with ordered steps: clear titles, short descriptions, and affected file/folder paths.
- [ ] Align contracts shared across containers (e.g. API shapes, schemas) so the plans stay coherent.

### Step 4: Draft the transversal e2e plan
- [ ] Fill `e2e.plan.template.md` covering every acceptance criterion end-to-end across containers.
- [ ] Include steps to generate the tests, execute them, and produce a **defects report** of any failures found.

## Output
- [ ] Write one `{container}.plan.md` per affected container and one `e2e.plan.md`, using the templates and naming convention.
- [ ] Commit (`docs`); suggest `/codify`.

## Verification
- [ ] One plan per affected container, each grounded in its `{container}.arch.md`.
- [ ] An e2e plan exists covering all acceptance criteria and including defect-report generation.
- [ ] Each plan is ordered and actionable for a developer without additional context.
