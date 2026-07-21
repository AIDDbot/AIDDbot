---
name: planify
description: Turn a spec into one plan per container (e2e included), grounded in the arch.
user-invocable: true
disable-model-invocation: true
---
# Planify

## Role
Act as Senior Software Engineer.

## Task
Turn a spec (or an escalated report) into one plan per affected software container.
Also write `e2e.plan.md` — ordered and actionable for `/codify`.
On amend, always replan. Use checkpoints to keep, redo, or drop prior steps.

### Guardrails
- **Ground in the arch** — every step traces to the container's components and contracts.
- **Always replan after amend**: 
  — when the spec is `pending`, rewrite plans.
  — never skip `/planify` after create or amend.
- **Checkpoints control carry-forward**:  
  — on replan, mark each prior step keep / redo / drop.
  — classify before rewriting Implementation Steps.
- **Deprecated AC drops its scenario**: 
  — checkpoint it `drop`; that authorizes `/codify` to delete its test.

## Context

- `{Arch}` = `{Product_Folder}/arch`.
- `{Model}` = `{Product_Folder}/model`.
- `{Specs}` = `{Product_Folder}/specs/{spec_key}`.

### Inputs
- [ ] Required: a `pending` spec, a short requirement, or a structural-refactor goal.
- [ ] Structural refactor has no spec — behavior does not change.

### Glossary
- **Container** — a runnable unit in `system.arch.md` (`api`, `web`, `db`) — C4 L2.
- **Software container** — any container except `e2e`; planned from the solution overview.
- **e2e container**: 
  — transversal; planned via `e2e.plan.md` (one scenario per AC id).
  — written by `/codify`, judged by `/verify`.
- **Checkpoint** — a prior plan step classified `keep` | `redo` | `drop` on amend/replan.
- **Structural refactor** — acceptance criterion is the existing e2e suite.
- **{slug}** — from the input file name or derived from the requirement.
- **{spec_id}** — from the spec folder; if spec-less, next sequential under `specs/`.
- **{spec_key}** — `{spec_id}-{slug}`; the spec folder name.
- **AC id** — `AC-{spec_id}.{n}`; a numbered acceptance criterion from the spec.

## Steps
### 1. Research
- _identify_ the input type.
- _derive_ `{spec_id}`, `{slug}`, and `{spec_key}`.
- _read_ [system architecture]({Arch}/system.arch.md).
- _list_ the affected software containers and their solution outcomes (`e2e` excluded).
- _for-each_ non-`db` software container, _read_ [its architecture]({Arch}/{container}.arch.md).
- _if_ a `db` container is affected, _read_ [relational schema]({Model}/db.schema.md).
- _if_ prior plans exist (amend/replan):
  - _read_ each `{Specs}/{container}.plan.md`.
  - _read_ `{Specs}/e2e.plan.md` when present.
- _if_ ambiguous, _document_ assumptions and proceed best-effort.

### 2. Plan
- _if_ a structural refactor, _omit_ the e2e plan.
- _read_ [container plan template](./assets/plan.template.md).
- _if_ not a structural refactor, _read_ [e2e plan template](./assets/e2e.plan.template.md).
- _for-each_ software container:
  - _if_ a prior plan exists, _fill_ Checkpoints for every prior step (`keep` | `redo` | `drop`).
  - _if_ no prior plan, _note_ `none — first plan`.
  - _prepare_ Implementation Steps from keep/redo work plus new steps; all tasks `[ ]`.
- _if_ touching an API, _read_ [API field shapes]({Model}/api.schema.md).
- _if_ touching the store, _read_ [data field shapes]({Model}/db.schema.md).
- _state_ each shared contract in every sibling software plan, same wording.
- _if_ writing the e2e plan:
  - _derive_ it from the spec criteria and shared contracts, never from sibling code.
  - _map_ every **active** AC id to exactly one scenario.
  - _think_ as a QA engineer, not a developer.
  - _fill_ Checkpoints for prior scenarios when replanning.
  - _mark_ any deprecated AC's prior scenario as `drop`.

### 3. Implement
- _for-each_ software container, _write_ `{Specs}/{container}.plan.md`.
- _if_ not a structural refactor, _write_ `{Specs}/e2e.plan.md`.
- _update_ `spec.md` to `status: planned`.
- _commit_ the changes (`docs(planify): {description}`).
- _handoff_ to `/codify`.

## Verification
- [ ] One plan per affected software container.
- [ ] `e2e.plan.md` present unless structural refactor.
- [ ] Each plan is grounded in its arch or `db.schema.md`, ordered, actionable.
- [ ] On replan, Checkpoints cover every prior step.
- [ ] Implementation Steps match keep/redo.
- [ ] The e2e plan (if any) maps every active AC id to exactly one scenario step.
- [ ] Every deprecated AC's prior scenario is checkpointed `drop`.
- [ ] Spec `status` is `planned`.
