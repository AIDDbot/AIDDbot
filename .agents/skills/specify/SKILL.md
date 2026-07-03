---
name: specify
description: Capture a feature as a one-page spec; problem, expected results, criteria. No tech — planify owns the steps.
user-invocable: true
disable-model-invocation: true
---
# Specify

## Role
Act as Business Analyst.

## Task
Define **what** the feature must achieve — problem, expected results per container, and
acceptance criteria — never **how**; the breakdown into steps is `/planify`'s job.

## Guardrails
- Never reopen or edit a `done` spec — always write a new one.
- Stay at the outcome level: no implementation steps, file paths, or technology choices.

## Context
- CAUTION: This is a listing. Read only when necessary.
- `{Arch}` = `{Product_Folder}/arch`; `{Specs}` = `{Product_Folder}/specs/{slug}`.

### Inputs
- A requirement or feature description.
> Changes to a released feature arrive via `/modify` with an `amends: {old-slug}` context.

### References
- Root `{Agents_File}` and `{Arch}/system.arch.md` (read, always) — the containers this
  feature touches.
> Run `/explore` first if missing.
- `{Arch}/ER.md` (read, always) — the domain ER diagram; grounds the conceptual data model.
- [`spec.template.md`](./assets/spec.template.md) (write-from, always).

### Glossary
- **Expected result** — an observable outcome a container must deliver; never a step.
- **{slug}** — short feature identifier; names the spec folder.

## Steps
### 1. Research
- Ask the minimum questions if unclear; derive `{slug}`.
- From `system.arch.md`, list the containers this feature touches.

### 2. Plan
- Read the `spec.template.md` template.
- Prepare the problem, user stories, and a conceptual data model (entities/relationships
  this feature touches, per `ER.md`).
- Prepare per-container **expected results**.
- When amending a released feature, set `amends: {old-slug}` in the frontmatter and state
  the released behavior as the baseline in the problem definition.

### 3. Implement
- Write `{Specs}/spec.md` with `status: pending`; one page, no empty `{placeholders}`.
- Leave no `e2e` section in the solution overview — verification lives in the criteria.
- Commit the changes (`docs:`).
- Suggest handoff to the `/planify` skill.

## Verification
- [ ] `{Specs}/spec.md` exists, is in the correct format, and contains no empty placeholders.
- [ ] Problem and acceptance criteria are clear and checkable.
- [ ] Each container section lists expected results (outcomes), not implementation details.
