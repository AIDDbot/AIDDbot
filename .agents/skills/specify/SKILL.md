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
- **Outcome level only** — no steps, file paths, or tech choices.
- **Write-once** — a new change is a new spec; never edit an existing one.

## Context

- `{Arch}` = `{Product_Folder}/arch`; `{Specs}` = `{Product_Folder}/specs/{slug}`.

### Inputs
- A requirement or feature description.

### Glossary
- **Expected result** — an observable outcome a container must deliver.
- **{slug}** — short feature identifier; names the spec folder.

## Steps
### 1. Research
- Ask me to clarify the context one question at a time with closed-ended answers.
- Derive `{slug}`.
- _read_ [system architecture]({Arch}/system.arch.md).
- List the containers this feature touches.

### 2. Plan
- _read_ [spec template](./assets/spec.template.md).
- _read_ [domain ER diagram]({Arch}/ER.md).
- Prepare the problem, user stories, business rules (in RuleSpeak), and out of scope.
- Prepare the conceptual data model from the domain ER diagram.
- Prepare per-container expected results.
- The `e2e` container lives in the verification criteria section.

### 3. Implement
- Write `{Specs}/spec.md` with `status: pending`; one page.
- Commit (`docs: {description}`); → `/planify`.

## Verification
- [ ] `{Specs}/spec.md` exists, correct format, no empty placeholders.
- [ ] Problem and acceptance criteria are clear and checkable.
- [ ] Container sections list outcomes, not implementation details.
