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
1. **Fix-or-feature gate** — if the request can be satisfied while every green e2e test
   stays green, it is a fix, not a spec: route to `/codify`.
2. **Write-once** — a new change is a new spec; never edit an existing one.
3. **Outcome level only** — no implementation steps, file paths, or technology choices.

## Context
- CAUTION: This is a listing. Read only when necessary.
- `{Arch}` = `{Product_Folder}/arch`; `{Specs}` = `{Product_Folder}/specs/{slug}`.

### Inputs
- A requirement or feature description — new behavior, or a change to released behavior.

### References
- Root `{Agents_File}` and `{Arch}/system.arch.md` — the containers this
  feature touches.
> Run `/explore` first if missing.
- `{Arch}/ER.md` — the domain ER diagram; grounds the conceptual data model.
- `{Product_Folder}/docs/{feature}.md` (if changing released behavior) — the current
  behavior to quote as baseline.
- [`spec.template.md`](./assets/spec.template.md).

### Glossary
- **Expected result** — an observable outcome a container must deliver; never a step.
- **{slug}** — short feature identifier; names the spec folder.

## Steps
### 1. Research
- Apply the fix-or-feature gate: no green e2e test needs to change → hand to `/codify`, stop.
- Ask the minimum questions if unclear; derive `{slug}`.
- From `system.arch.md`, list the containers this feature touches.

### 2. Plan
- Read the `spec.template.md` template.
- Prepare the problem, user stories, and a conceptual data model (entities/relationships
  this feature touches, per `ER.md`).
- Prepare per-container **expected results**.
- When changing released behavior, quote the current behavior (from `docs/{feature}.md`)
  as the baseline in the problem definition — plain prose, no special mechanics.

### 3. Implement
- Write `{Specs}/spec.md` with `status: pending`; one page, no empty `{placeholders}`.
- Leave no `e2e` section in the solution overview — verification lives in the criteria.
- Commit the changes (`docs:`).
- Suggest handoff to the `/planify` skill.

## Verification
- [ ] `{Specs}/spec.md` exists, is in the correct format, and contains no empty placeholders.
- [ ] Problem and acceptance criteria are clear and checkable.
- [ ] Each container section lists expected results (outcomes), not implementation details.
