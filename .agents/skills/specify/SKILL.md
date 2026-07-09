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
Capture a feature as a one-page spec:
- problem,
- expected results per container, and
- acceptance criteria.

## Guardrails
- **Write-once** — a new change is a new spec; never edit an existing one.
- **Single writer** — only this skill creates or edits the PRD.

## Context

- `{Arch}` = `{Product_Folder}/arch`.
- `{Model}` = `{Product_Folder}/model`.
- `{Specs}` = `{Product_Folder}/specs/{NNN}-{slug}`.
- `{PRD}` = `{Product_Folder}/specs/PRD.md`.

### Inputs
- A requirement or feature description.

### Glossary
- **Expected result** — an observable outcome a container must deliver.
- **{slug}** — short feature identifier; names the spec folder with `{NNN}`.
- **{NNN}** — 3-digit sequential spec number; highest under `specs/` plus one.
- **AC id** — `AC-{NNN}.{n}`; numbers each acceptance criterion, referenced by plans, tests, and reports.
- **PRD** — functional log of specs grouped by feature area; append-only index written at spec creation.

## Steps
### 1. Research
- _ask_ me to clarify the context one question at a time with closed-ended answers.
- Derive `{slug}`; derive `{NNN}` from the `specs/` folder listing.
- _if_ present, _read_ [the PRD, specs already logged]({PRD}) — spot overlap with the new requirement.
- _read_ [system architecture]({Arch}/system.arch.md).
- List the containers this feature touches.

### 2. Plan
- _read_ [spec template](./assets/spec.template.md).
- _if_ present, _read_ [domain ER diagram]({Model}/ER.md).
- _read_ [model design convention](./references/model.conventions.md).
- Prepare the problem, user stories, business rules (in RuleSpeak), and out of scope.
- Prepare the conceptual data model from the domain ER diagram.
- Prepare per-container expected results.
- The `e2e` container lives in the verification criteria section.
- Prepare the PRD line: feature area and one-line outcome.

### 3. Implement
- _if_ on the default branch, create branch `feat/{NNN}-{slug}`.
- _write_ `{Specs}/spec.md` with `status: pending`; one page; number criteria `AC-{NNN}.{n}`.
- _if_ `{PRD}` is missing, _read_ [PRD template](./assets/PRD.template.md) and create it.
- Append the spec's line to `{PRD}` under its feature-area heading (create the heading if new).
- Commit (`docs: {description}`).
- _handoff_ to `/planify`.

## Verification
- [ ] `{Specs}/spec.md` exists, correct format, no empty placeholders.
- [ ] Problem and acceptance criteria are clear and checkable; criteria numbered `AC-{NNN}.{n}`.
- [ ] Container sections list outcomes, not implementation details.
- [ ] `{PRD}` lists the spec under a feature area; no status there — status lives in the spec.
