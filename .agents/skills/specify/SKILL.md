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
Capture a feature as a one-page spec — or amend an existing one.
Cover problem, solution, and criteria. Any amend resets the gate to `pending`.

### Guardrails
- **Amendable** : 
 — edit an existing spec at any status.
 — never invent a parallel ticket for the same `{spec_key}`.
- **Gate on amend**: 
  — every amend sets `status: pending` and unchecks all **active** AC boxes.
  — hand off to `/planify` (always replan — software containers and e2e).
- **Stable ids** — never renumber or reuse an `AC-{spec_id}.{n}`; plans and tests point at it.
- **Deprecate, never delete** — a retired criterion moves to `Deprecated criteria`, id kept.
- **PRD append-only**: 
  — on create, append the spec's line; never rewrite the shell (`/explore`).
  — on amend, do not duplicate the PRD line.

## Context

- `{Arch}` = `{Product_Folder}/arch`.
- `{Model}` = `{Product_Folder}/model`.
- `{Specs}` = `{Product_Folder}/specs/{spec_key}`.
- `{PRD}` = `{Product_Folder}/specs/PRD.md`.

### Inputs
- [ ] Required: a requirement or feature description.
- [ ] Or: an existing `{spec_key}` / `{slug}` to amend, plus what changed.

### Glossary
- **{spec_id}** — 3-digit sequential id; highest under `specs/` plus one (create only).
- **{slug}** — kebab-case feature label.
- **{spec_key}** — `{spec_id}-{slug}`; folder name and branch suffix.
- **{title}** — short human name for the spec.
- **{category}** — PRD grouping, like a blog post category.
- **Solution** — per-container outcomes in the Solution overview (`e2e` excluded).
- **AC id** — `AC-{spec_id}.{n}`; referenced by plans, tests, and reports.
- **PRD** — category index; shell from `/explore`, lines appended here.
- **Amend** — edit in place; keep `{spec_id}` / `{spec_key}`.
- **Deprecated criterion** — a retired AC moved out of the active list; keeps its id.

## Steps
### 1. Research
- _ask_ me to clarify the context one question at a time with closed-ended answers.
- _read_ [the PRD]({PRD}) — match `{category}` and `{tags}` to spot overlap with the requirement.
- _if_ `{PRD}` is missing, _handoff_ to `/explore`.
- _identify_ create vs amend.
- _if_ create:
  - _derive_ `{slug}`.
  - _derive_ `{spec_id}` from `specs/`.
  - _set_ `{spec_key}`.
- _if_ amend:
  - _resolve_ `{Specs}/spec.md`.
  - _keep_ `{spec_id}`, `{slug}`, and `{spec_key}`.
- _read_ [system architecture]({Arch}/system.arch.md).
- _list_ the software containers this feature touches (`e2e` excluded).

### 2. Plan
- _read_ [spec template](./assets/spec.template.md).
- _if_ present, _read_ [model schema]({Model}/model.schema.md).
- _prepare_ problem, user stories, RuleSpeak rules, and out of scope.
- _prepare_ the conceptual data model from the model schema when present.
- _prepare_ the solution overview — one section per software container.
- _prepare_ verification criteria for `e2e` (no Solution section for `e2e`).
- _if_ create, _prepare_ the PRD line: `{category}` and `{title}`.

### 3. Implement
- _if_ create and on the default branch, _create_ branch `feat/{spec_key}`.
- _if_ amend and on the default branch, _create_ branch `feat/{spec_key}`.
- _if_ create:
  - _write_ `{Specs}/spec.md` with `status: pending`.
  - _number_ criteria `AC-{spec_id}.{n}` all `[ ]`.
- _if_ amend:
  - _update_ `{Specs}/spec.md` with `status: pending`.
  - _uncheck_ every active criterion to `[ ]`.
  - _add_ new criteria with the next unused `AC-{spec_id}.{n}` id.
  - _move_ any criterion that no longer applies to `Deprecated criteria`, with a date and reason.
  - _keep_ `released-version` if set.
- _if_ create, _append_ the spec's line to `{PRD}` under its category (create heading if new):

  ```markdown
  ## {category}
  {short line description of the category}
  ### [{spec_id} {title}](./{spec_key}/spec.md)

    - **Tags**: `{tag1, tag2}`
  ```

- _commit_ the changes (`docs: {description}`).
- _handoff_ to `/planify`.

## Verification
- [ ] `{Specs}/spec.md` exists, correct format, no empty placeholders.
- [ ] Criteria are checkable and numbered `AC-{spec_id}.{n}`; no id was renumbered or reused.
- [ ] All active criteria are `[ ]` after create/amend.
- [ ] Any retired criterion sits under `Deprecated criteria` with its id, a date, and a reason.
- [ ] Solution sections list outcomes, not implementation details.
- [ ] No `e2e` Solution section.
- [ ] Status is `pending`; amend did not duplicate the PRD line.
- [ ] On create, `{PRD}` lists the spec under a category.
