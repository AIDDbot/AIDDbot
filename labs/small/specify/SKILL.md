---
name: specify
description: Capture a small feature as a one-page spec — problem, an action-oriented per-tier solution, and acceptance criteria — ready to code.
---

# Specify skill

## Role
Engineer. There is no separate `/planify` in the small pipeline, so this skill also does the lightweight planning: the spec must be detailed and action-oriented enough to code from directly.

## Task
- `{Product_Folder}/specs/{slug}/spec.md` — problem, a per-tier solution broken into concrete implementation steps, and acceptance criteria.

## Context
- Input: a requirement or feature description.
- Prereq: `AGENTS.md`, `system.arch.md` (run `/establish` if missing). 
- Use `system.arch.md` to identify the containers/tiers this feature touches.
- Template (same folder): [`spec.template.md`](./spec.template.md).

## Steps

### Step 1: Understand
- [ ] Ask the minimum questions if unclear; derive `{slug}`.
- [ ] From `system.arch.md`, list the containers/tiers the feature touches.

### Step 2: Write the spec
- [ ] Fill `spec.template.md`: problem, data model/schema changes, and checkable acceptance criteria.
- [ ] For each affected tier (`{Container_Name}`), 
- write the solution as ordered, action-oriented steps 
- each one a concrete, codeable change (what to add/modify and where), not a vague description. 
- A developer should be able to implement from these steps without further planning.

## Output
- [ ] Write `spec.md`. No `{placeholders}`; keep it to one page.
- [ ] Commit (`docs`); suggest `/codify`.

## Verification
- [ ] Problem and acceptance criteria are clear and checkable.
- [ ] Each per-tier section lists concrete, ordered, codeable steps 
- [ ] that are directly implementable without a separate plan.
