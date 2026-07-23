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
Turn a spec (or a refactor report) into one plan per affected software container.
For a spec, also write `e2e.plan.md`, ordered and actionable for `/codify`.

### Guardrails
- **Ground in the arch** — every step traces to the container's components and contracts.
- **Always replan after amend** — a `pending` spec means rewrite every plan.
- **Checkpoints** — on replan, classify each prior step keep / redo / drop before rewriting.
- **Deprecated AC** — checkpoint its scenario `drop`; that authorizes `/codify` to delete its test.

## Context

- `{Arch}` = `{Product_Folder}/arch`.
- `{Model}` = `{Product_Folder}/model`.
- `{Specs}` = `{Product_Folder}/specs/{spec_key}`.
- `{Refactors}` = `{Product_Folder}/refactors`.
- `{Work}` = `{Specs}` for a spec, or `{Refactors}/{slug}` for a refactor — this cycle's folder.

### Inputs
- [ ] Required: a `pending` spec, a short requirement, or a `refactor.report.md`.
- [ ] A refactor has no spec; its acceptance criterion is the existing e2e suite (no `e2e.plan.md`),
      and its plans live under `{Refactors}/{slug}/`.

### Glossary
- **Software container** — any container except `e2e`; planned from the solution overview.
- **e2e container** — transversal; planned via `e2e.plan.md`, one scenario per AC id.
- **Checkpoint** — a prior plan step classified `keep` | `redo` | `drop` on replan.
- **AC id** — `AC-{spec_id}.{n}`; a numbered acceptance criterion from the spec.

## Steps
### 1. Research
- _identify_ the input type, then derive `{spec_key}` (spec) or `{slug}` (refactor) — hence `{Work}`.
- _if_ the input is a refactor, _read_ `{Work}/refactor.report.md` — its findings are the work.
- _read_ [system architecture]({Arch}/system.arch.md).
- _list_ the affected software containers and their solution outcomes (`e2e` excluded).
- _for-each_ affected container, _read_ its `{Arch}/{container}.arch.md` or `{Model}/db.schema.md`.
- _if_ prior plans exist, _read_ each `{Work}/{container}.plan.md` and `{Work}/e2e.plan.md`.
- _if_ ambiguous, _document_ assumptions and proceed best-effort.

### 2. Plan
- _read_ [container plan template](./assets/plan.template.md).
- _if_ the input is a spec, _read_ [e2e plan template](./assets/e2e.plan.template.md).
- _if_ touching an API, _read_ [API shapes]({Model}/api.schema.md).
- _if_ touching the store, _read_ [data shapes]({Model}/db.schema.md).
- _for-each_ software container:
  - _if_ a prior plan exists, _fill_ its Checkpoints; _else_ _note_ `none — first plan`.
  - _prepare_ Implementation Steps from keep/redo work plus new steps, all tasks `[ ]`.
- _state_ each shared contract in every sibling software plan, same wording.
- _if_ writing the e2e plan:
  - _derive_ it from the spec criteria and shared contracts, never from sibling code.
  - _map_ every active AC id to exactly one scenario; _think_ as a QA engineer.
  - _fill_ Checkpoints on replan and _mark_ any deprecated AC's scenario `drop`.

### 3. Implement
- _for-each_ software container, _write_ `{Work}/{container}.plan.md`.
- _if_ the input is a spec, _write_ `{Work}/e2e.plan.md`.
- _if_ the input is a spec, _update_ `spec.md` to `status: planned`.
- _commit_ the changes (`docs(planify): {description}`).
- _handoff_ to `/codify`.

## Verification
- [ ] One plan per affected software container; `e2e.plan.md` present unless the input is a refactor.
- [ ] Plans live under `{Work}` — `specs/{spec_key}/` for a spec, `refactors/{slug}/` for a refactor.
- [ ] Each plan is grounded in its arch or `db.schema.md`, ordered, actionable.
- [ ] On replan, Checkpoints cover every prior step and Implementation Steps match keep/redo.
- [ ] The e2e plan maps every active AC id to one scenario; deprecated ACs are checkpointed `drop`.
- [ ] Spec `status` is `planned` when the input is a spec.
