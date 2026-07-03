---
name: codify
description: Implement one container plan with working functional code plus unit tests for critical modules. One run, one container.
user-invocable: true
disable-model-invocation: true
---
# Codify

## Role
Act as Senior Software Engineer.

## Task
Implement a container plan (or a scoped spec/requirement) with working functional code plus unit tests for critical modules. One run, one container.

## Guardrails
1. **Surgical changes** — minimum changes to meet the goal.
2. **Goal-driven** — keep going until validation criteria are met.

## Context
- CAUTION: This is a listing. Read only when necessary.
- `{Arch}` = `{Product_Folder}/arch`; `{Rules}` = `{Agents_Folder}/rules`; `{Specs}` = `{Product_Folder}/specs/{slug}`.

### Inputs
- One of: a container plan `{Specs}/{container}.plan.md`, or a spec file / direct textual requirement (best-effort).
> Ask which container to scope if not given by a single container plan; never assume.

### References
- `{Arch}/system.arch.md` (read, always).
- `{Arch}/{container}.arch.md` (read, always) — components, contract surface, and structure.
- `{Arch}/api.schema.md` / `{Arch}/db.schema.md` (read, if the scope touches an API or the persistence store) — system-wide contract detail (endpoint and data shapes), linked from the container arch.
- `{Rules}/{container}.rules.md` (read, always) — naming and conventions.
> Run `/explore` / `/extract` first if missing.

### Glossary
- **Container** — a named runnable unit in `system.arch.md` (`api`, `web`, `db`...) — C4 L2.
- **e2e container** — transversal; its plan and code belong to `/verify`, never `/codify`.

## Steps
### 1. Research
- Identify the input and derive `{slug}` and `{container}`.
- If the input is a spec or requirement (not a single container plan), ask which container to scope — never the `e2e` container.
- Read `{container}.arch.md` (components, contract surface, structure) and `{container}.rules.md` (naming, conventions); follow its links to `api.schema.md` / `db.schema.md` for the field-level shapes when the scope touches an API or the store.

### 2. Plan
- If the scope is large, split it into smaller ordered units and do them in order.
- Map the in-scope plan steps to the code to write or change, respecting the contracts shared with sibling containers (API shapes, schemas).
- If an in-scope change would alter a shared contract, stop and hand back to `/planify` — never improvise a cross-container change.

### 3. Implement
- Write the minimum code to meet the in-scope plan steps, following the container's rules and conventions; no extra comments or changes (YAGNI).
- Add unit tests for the critical path (happy path plus error cases); run the container's unit suite and fix until green.
- Annotate any deviation from the plan in the plan file (what changed and why); check each in-scope plan step `[x]`.
- In `spec.md`, set `status: in-progress` if still `pending` (building has started).
- Commit: `{feat|fix|test}(scope): {description}`.
- Suggest handoff: `/codify` for the remaining container plans; `/verify` the `e2e.plan.md` once all containers are codified.

## Verification
- [ ] Code builds and unit tests pass.
- [ ] Every in-scope plan step is completed and checked `[x]`.
