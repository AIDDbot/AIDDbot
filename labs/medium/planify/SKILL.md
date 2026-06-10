---
name: planify
description: Turn a spec into one implementation plan per container plus a transversal e2e plan, each grounded in the container architecture.
user-invocable: true
disable-model-invocation: true
---

# Planify skill

Acting as a senior software engineer, turn a spec (or bug/review report) into **one implementation plan per affected container** plus **one transversal e2e plan**, each broken into ordered, actionable steps ready for `/codify`.

## Input
- One of: a spec `{Product_Folder}/specs/{slug}/spec.md`, a bug/review report `{slug}.report.md`, or a short textual requirement.
- References: `{Product_Folder}/arch/system.arch.md` (containers the feature can touch) and each `{Product_Folder}/arch/{container}.arch.md` (run `/extract` if missing).
- Templates: [container plan](./assets/plan.template.md), [e2e plan](./assets/e2e.plan.template.md).

## Glossary
- **Container** — a runnable unit in `system.arch.md` (`back`, `front`, `db`...). Never "tier".
- **Component** — an internal building block of one container (C4 L3).
- **Expected result** — an observable outcome from the spec; never an implementation step.

## Conventions
- `{slug}` inherited from the input file name or derived from the requirement.
- `{container}` matches a container in `system.arch.md` (e.g. `back`, `front`, `app`, `cli`, `db`).
- Container plan: `{Product_Folder}/specs/{slug}/{container}.plan.md`; e2e plan: `{Product_Folder}/specs/{slug}/e2e.plan.md`.

## Steps
1. **Understand**: identify the input type, derive `{slug}`, and list the expected results per container. If ambiguous, document assumptions and proceed best-effort.
2. **Identify containers**: from `system.arch.md`, determine which containers the feature touches; read each `{container}.arch.md` to ground the plan in its components, contracts, and structure.
3. **Plan per container**: fill `plan.template.md` with ordered steps by vertical slices — each step has a title, short description, and affected paths. Align contracts shared across containers (API shapes, schemas) so plans stay coherent.
4. **E2E plan**: fill `e2e.plan.template.md` covering every acceptance criterion end-to-end, including steps to generate and run the tests and produce a **defects report**.

## Output
- Write one `{container}.plan.md` per affected container and one `e2e.plan.md`, using the templates and naming convention.
- Commit (`docs`); suggest `/codify`.

## Verification
- One plan per affected container, each grounded in its `{container}.arch.md`, ordered and actionable without extra context.
- An e2e plan covers all acceptance criteria and includes defect-report generation.
