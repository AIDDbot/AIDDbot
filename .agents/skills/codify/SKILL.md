---
name: codify
description: Implement a container plan: code and unit tests for critical modules. One run, one container.
user-invocable: true
disable-model-invocation: true
---
# Codify

## Role
Act as Senior Software Engineer.

## Task
Implement a container plan (or a scoped spec/requirement): working code plus unit tests for
critical modules. One run, one container.

## Guardrails
1. **Surgical changes** — minimum changes to meet the goal.
2. **Goal-driven** — keep going until validation criteria are met.

## Context
- CAUTION: This is a listing. Read only when necessary.
- `{Arch}` = `{Product_Folder}/arch`; `{Rules}` = `{Agents_Folder}/rules`.
- `{Specs}` = `{Product_Folder}/specs/{slug}`.

### Inputs
- One of: a container plan `{Specs}/{container}.plan.md`, or a spec/requirement (best-effort).
> Ask which container to scope if not given a single plan; never assume.

### References
- `{Arch}/system.arch.md` (read, always).
- `{Arch}/{container}.arch.md` (read, always) — components, contracts, structure.
- `{Arch}/api.schema.md` / `{Arch}/db.schema.md` — endpoint/data shapes (read, if API or store).
- `{Rules}/{container}.rules.md` (read, always) — naming and conventions.
> Run `/explore` / `/extract` first if missing.

### Glossary
- **Container** — a named runnable unit in `system.arch.md` (`api`, `web`, `db`...) — C4 L2.
- **e2e container** — transversal; its plan and code belong to `/verify`, never `/codify`.

## Steps
### 1. Research
- Identify the input and derive `{slug}` and `{container}`.
- Given a spec/requirement (not a single plan), ask which container to scope — never `e2e`.
- Read `{container}.arch.md` (components, contracts, structure) and `{container}.rules.md`.
- Follow links to `api.schema.md` / `db.schema.md` for field shapes when touching an API or store.

### 2. Plan
- If the scope is large, split it into smaller ordered units and do them in order.
- Map plan steps to code changes, respecting contracts shared with sibling containers.
- If a change would alter a shared contract, hand back to `/planify` instead of improvising.

### 3. Implement
- Write the minimum code for the in-scope steps, per the container's rules (YAGNI: no extras).
- Add unit tests for the critical path (happy path plus errors); run until the suite is green.
- Annotate plan deviations (what changed, why); check each in-scope step `[x]`.
- In `spec.md`, set `status: in-progress` if still `pending`.
- Commit: `{feat|fix|test}(scope): {description}`.
- Suggest `/codify` for remaining plans; `/verify` the `e2e.plan.md` once all are codified.

## Verification
- [ ] Code builds and unit tests pass.
- [ ] Every in-scope plan step is completed and checked `[x]`.
