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
Capture a feature as a one-page spec — or amend an existing one: problem, solution,
and criteria. Any amend resets the pipeline gate to `pending`.

### Guardrails
- **Amendable** — edit an existing spec at any status; never invent a parallel ticket
  for the same `{spec_key}` when amending.
- **Gate on amend** — every amend sets `status: pending`, unchecks all AC boxes, and
  hands off to `/planify` (always replan — software containers and e2e).
- **PRD append-only** — on create, append the spec's line; never rewrite the shell
  (`/explore`). On amend, do not duplicate the PRD line.

## Context

- `{Arch}` = `{Product_Folder}/arch`.
- `{Model}` = `{Product_Folder}/model`.
- `{Specs}` = `{Product_Folder}/specs/{spec_key}`.
- `{PRD}` = `{Product_Folder}/specs/PRD.md`.

### Inputs
- [ ] Required: A requirement or feature description — or an existing `{spec_key}` /
      `{slug}` to amend, plus what changed.

### Glossary
- **{spec_id}** — 3-digit sequential id; highest under `specs/` plus one (create only).
- **{slug}** — kebab-case feature label.
- **{spec_key}** — `{spec_id}-{slug}`; folder name and branch suffix.
- **{title}** — short human name for the spec.
- **{category}** — PRD grouping, like a blog post category.
- **Solution** — per-container outcomes in the Solution overview (`e2e` excluded).
- **AC id** — `AC-{spec_id}.{n}`; referenced by plans, tests, and reports.
- **PRD** — category index; shell from `/explore`, lines appended here.
- **Amend** — edit in place; keep `{spec_id}` / `{spec_key}`; keep `released-version`
  if previously shipped.

## Steps
### 1. Research
- _ask_ me to clarify the context one question at a time with closed-ended answers.
- _identify_ create vs amend.
- _if_ create:
  - _derive_ `{slug}`.
  - _derive_ `{spec_id}` from `specs/`.
  - _set_ `{spec_key}`.
- _if_ amend:
  - _resolve_ `{Specs}/spec.md`.
  - _keep_ `{spec_id}`, `{slug}`, and `{spec_key}`.
- _read_ [the PRD]({PRD}) — spot overlap with the new or amended requirement.
- _if_ `{PRD}` is missing, _handoff_ to `/explore`.
- _read_ [system architecture]({Arch}/system.arch.md).
- _list_ the software containers this feature touches (`e2e` excluded).

### 2. Plan
- _read_ [spec template](./assets/spec.template.md).
- _if_ present, _read_ [model schema]({Model}/model.schema.md).
- _prepare_ problem, user stories, RuleSpeak rules, and out of scope.
- _prepare_ the conceptual data model from the model schema when present.
- _prepare_ the solution overview — one section per software container
  (`e2e` stays in verification criteria).
- _if_ create, _prepare_ the PRD line: `{category}` and `{title}`.

### 3. Implement
- _if_ create and on the default branch, _create_ branch `feat/{spec_key}`.
- _if_ amend and on the default branch, _create_ branch `feat/{spec_key}`.
- _if_ create:
  - _write_ `{Specs}/spec.md` with `status: pending`.
  - _number_ criteria `AC-{spec_id}.{n}` all `[ ]`.
- _if_ amend:
  - _update_ `{Specs}/spec.md` with `status: pending`.
  - _uncheck_ all criteria `[ ]`; keep `released-version` if set.
- _if_ create, _append_ the spec's line to `{PRD}` under its category
  (create heading if new):

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
- [ ] Criteria are checkable and numbered `AC-{spec_id}.{n}`; all `[ ]`
      after create/amend.
- [ ] Solution sections list outcomes, not implementation details; no `e2e` section.
- [ ] Status is `pending`; amend did not duplicate the PRD line.
- [ ] On create, `{PRD}` lists the spec under a category.
