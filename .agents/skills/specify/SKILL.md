---
name: specify
description: Capture or amend a one-page spec; problem, solution, and criteria.
user-invocable: true
disable-model-invocation: true
---
# Specify

## Role
Act as Business Analyst.

## Task
Capture a feature as a one-page spec, or amend an existing one.
Cover problem, solution, and criteria.

### Guardrails
- **Amendable** — edit a spec at any status; never fork a parallel ticket for its `{spec_key}`.
- **Gate on amend** — every amend sets `status: pending` and hands off to `/planify`.
- **Stable ids** — never renumber or reuse an `AC-{spec_id}.{n}`; plans and tests point at it.
- **Deprecate, never delete** — a retired criterion moves to `Deprecated criteria`, id kept.
- **PRD append-only** — append the spec's line; never rewrite the shell or duplicate a line.
- **Fresh branch per cycle** — branch from current default; never reopen a merged branch.

## Context

- `{Arch}` = `{Product_Folder}/arch`.
- `{Model}` = `{Product_Folder}/model`.
- `{Specs}` = `{Product_Folder}/specs/{spec_key}`.
- `{PRD}` = `{Product_Folder}/specs/PRD.md`.

### Inputs
- [ ] Required: a requirement or feature description.
- [ ] Or: an existing `{spec_key}` / `{slug}` to amend, plus what changed.

### Glossary
- **{spec_key}** — `{spec_id}-{slug}`; a sequential id plus kebab slug; folder and branch name.
- **AC id** — `AC-{spec_id}.{n}`; referenced by plans, tests, and reports.
- **Solution** — per-container outcomes in the Solution overview (`e2e` excluded).
- **PRD** — category index; shell from `/explore`, lines appended here.

## Steps
### 1. Research
- _ask_ me to clarify the context one question at a time with closed-ended answers.
- _read_ [the PRD]({PRD}) — match `{category}` and `{tags}` to spot overlap.
- _if_ `{PRD}` is missing, _handoff_ to `/explore`.
- _identify_ create vs amend, then derive or keep `{spec_id}`, `{slug}`, `{spec_key}`.
- _read_ [system architecture]({Arch}/system.arch.md).
- _list_ the software containers this feature touches (`e2e` excluded).

### 2. Plan
- _read_ [spec template](./assets/spec.template.md).
- _if_ present, _read_ [model schema]({Model}/model.schema.md) for the conceptual data model.
- _prepare_ problem, user stories, RuleSpeak rules, and out of scope.
- _prepare_ the solution overview — one section per software container.
- _prepare_ acceptance criteria, including `e2e` scenarios (`e2e` has no Solution section).

### 3. Implement
- _if_ already on `feat/{spec_key}`, _keep_ it — an in-flight cycle stays on its branch.
- _if_ on the default branch:
  - _require_ default is current.
  - _if_ a stale `feat/{spec_key}` exists, _delete_ it — a prior release orphaned it.
  - _create_ branch `feat/{spec_key}` from default.
- _write_ or _update_ `{Specs}/spec.md` with `status: pending`; keep `released-version` if set.
- _number_ active criteria `AC-{spec_id}.{n}`, all `[ ]`.
- _if_ amend, _move_ obsolete criteria to `Deprecated criteria` with a date and reason.
- _if_ create, _append_ the spec's line to `{PRD}` under its category.
- _commit_ the changes (`docs: {description}`).
- _handoff_ to `/planify`.

## Verification
- [ ] `{Specs}/spec.md` exists, correct format, no empty placeholders.
- [ ] Criteria are numbered `AC-{spec_id}.{n}`, all active `[ ]`, none renumbered or reused.
- [ ] Any retired criterion sits under `Deprecated criteria` with its id, date, and reason.
- [ ] Solution sections list outcomes, not implementation; no `e2e` Solution section.
- [ ] Status is `pending`; on create `{PRD}` lists the spec and no line was duplicated.
- [ ] Work sits on `feat/{spec_key}` from current default; no merged branch was reopened.
