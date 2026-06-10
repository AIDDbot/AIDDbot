---
name: specify
description: Capture a feature as a one-page spec — problem, per-container expected results, and acceptance criteria. No technical details; planify owns the steps.
user-invocable: true
disable-model-invocation: true
---

# Specify skill

## Role
Analyst. Define **what** the feature must achieve, not **how**. The breakdown into steps and tasks is delegated to `/planify`.

## Task
- `{Product_Folder}/specs/{slug}/spec.md` — problem, a per-container list of expected results, and acceptance criteria.

## Context
### Input
- A requirement or feature description; changes to a released feature arrive via `/modify` with an `amends: {old-slug}` context.

### Prerequisites
- Root `{Agents_File}` and `{Product_Folder}/arch/system.arch.md` (run `/explore` if missing) — it identifies the containers this feature touches.

### Assets
- [`spec.template.md`](./assets/spec.template.md).

### Guardrails
1. Never reopen or edit a `done` spec — always write a new one.

## Steps

### Step 1: Understand
- [ ] Ask the minimum questions if unclear; derive `{slug}`.
- [ ] From `system.arch.md`, list the containers this feature touches.

### Step 2: Write the spec
- [ ] Fill `spec.template.md`: problem, user stories, a conceptual data model, and checkable acceptance criteria.
- [ ] When amending a released feature, set `amends: {old-slug}` in the frontmatter and state the released behavior as the baseline in the problem definition.
- [ ] For each affected container (`{Container_Name}`), list the **expected results** — observable outcomes that container must deliver.
- [ ] Stay at the outcome level: no implementation steps, file paths, or technology choices (that is `/planify`'s job).
- [ ] No `e2e` section in the solution overview — verification lives in the acceptance criteria.

## Output
- [ ] Write `spec.md` with `status: pending`. No `{placeholders}`; keep it to one page.
- [ ] Commit (`docs`); suggest `/planify`.

## Verification
- [ ] Problem and acceptance criteria are clear and checkable.
- [ ] Each container section lists expected results (outcomes), not implementation steps.
- [ ] No technical solution details leak into the spec.
