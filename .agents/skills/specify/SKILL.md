---
name: specify
description: Capture a feature as a one-page spec; problem, expected results, criteria.
user-invocable: true
disable-model-invocation: true
---
# Specify

## Role
Act as Business Analyst.

## Task
Capture a feature as a one-page spec: problem, expected results per container, and
acceptance criteria.

### Guardrails
- **Write-once** — a new change is a new spec; never edit an existing one.
- **PRD append-only** — append the spec's line; never rewrite the shell (`/explore`).

## Context

- `{Arch}` = `{Product_Folder}/arch`.
- `{Model}` = `{Product_Folder}/model`.
- `{Specs}` = `{Product_Folder}/specs/{spec_key}`.
- `{PRD}` = `{Product_Folder}/specs/PRD.md`.

### Inputs
- [ ] Required: A requirement or feature description.

### Glossary
- **{spec_id}** — 3-digit sequential id; highest under `specs/` plus one.
- **{slug}** — kebab-case feature label.
- **{spec_key}** — `{spec_id}-{slug}`; folder name and branch suffix.
- **{title}** — short human name for the spec.
- **{category}** — PRD grouping, like a blog post category.
- **Expected result** — an observable outcome a container must deliver.
- **AC id** — `AC-{spec_id}.{n}`; referenced by plans, tests, and reports.
- **PRD** — category index; shell from `/explore`, lines appended here.

## Steps
### 1. Research
- _ask_ me to clarify the context one question at a time with closed-ended answers.
- _derive_ `{slug}`; _derive_ `{spec_id}` from `specs/`; set `{spec_key}`.
- _read_ [the PRD]({PRD}) — spot overlap with the new requirement.
- _if_ `{PRD}` is missing, _handoff_ to `/explore`.
- _read_ [system architecture]({Arch}/system.arch.md).
- _list_ the containers this feature touches.

### 2. Plan
- _read_ [spec template](./assets/spec.template.md).
- _if_ present, _read_ [model schema]({Model}/model.schema.md).
- _prepare_ problem, user stories, RuleSpeak rules, and out of scope.
- _prepare_ the conceptual data model from the model schema when present.
- _prepare_ per-container expected results (`e2e` stays in verification criteria).
- _prepare_ the PRD line: `{category}` and `{title}`.

### 3. Implement
- _if_ on the default branch, _create_ branch `feat/{spec_key}`.
- _write_ `{Specs}/spec.md` with `status: pending`; criteria `AC-{spec_id}.{n}`.
- _append_ the spec's line to `{PRD}` under its category (create heading if new):

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
- [ ] Criteria are checkable and numbered `AC-{spec_id}.{n}`.
- [ ] Container sections list outcomes, not implementation details.
- [ ] `{PRD}` lists the spec under a category; status stays in the spec.
