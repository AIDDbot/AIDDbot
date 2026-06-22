---
name: Codify
description: Implement one container plan with working functional code plus unit tests for critical modules. One run, one container.
user-invocable: true
disable-model-invocation: true
---
# Codify

Implement one container plan with working code plus unit tests for agents.

## Role
Act as Senior Software Engineer.

## Task
Implement a container plan (or a scoped spec/requirement) with working functional code plus unit tests for critical modules. One run, one container.

## Context
- CAUTION: This is a listing. Read only when necessary.

### Input
- One of: a container plan `{Product_Folder}/specs/{slug}/{container}.plan.md`, or a spec file / direct textual requirement (best-effort).
> Ask which container to scope if not given by a single container plan; never assume.

### References
- `{Product_Folder}/arch/system.arch.md`.
- `{Product_Folder}/arch/{container}.arch.md` — components, contract surface, and structure.
- `{Product_Folder}/arch/api.schema.md` / `{Product_Folder}/arch/db.schema.md` — system-wide contract detail (endpoint and data shapes), linked from the container arch; read when implementing against an API or the persistence store.
- `{Agents_Folder}/rules/{container}.rules.md` — naming and conventions.
> Run `/explore` / `/extract` first if missing.

### Glossary
- **Container** — a named runnable unit in `system.arch.md` (`api`, `web`, `db`...) — C4 L2.
- **e2e container** — transversal; its plan and code belong to `/verify`, never `/codify`.

### Guardrails
1. **Think first** — reason about the problem; clarify when in doubt.
2. **Simplicity** — no clever or over-engineered solutions (YAGNI, KISS).
3. **Surgical changes** — minimum changes to meet the goal.
4. **Goal-driven** — keep going until validation criteria are met.

## Steps
### Step 1: Research
- Identify the input and derive `{slug}` and `{container}`.
- If the input is a spec or requirement (not a single container plan), ask which container to scope — never the `e2e` container.
- Read `{container}.arch.md` (components, contract surface, structure) and `{container}.rules.md` (naming, conventions); follow its links to `api.schema.md` / `db.schema.md` for the field-level shapes when the scope touches an API or the store.

### Step 2: Plan the Content
- If the scope is large, split it into smaller ordered units and do them in order.
- Map the in-scope plan steps to the code to write or change, respecting the contracts shared with sibling containers (API shapes, schemas).
- If an in-scope change would alter a shared contract, stop and hand back to `/planify` — never improvise a cross-container change.

## Implementation Output
- Write the minimum code to meet the in-scope plan steps, following the container's rules and conventions; no extra comments or changes (YAGNI).
- Add unit tests for the critical path (happy path plus error cases); run the container's unit suite and fix until green.
- Annotate any deviation from the plan in the plan file (what changed and why); check each in-scope plan step `[x]`.
- In `spec.md`, set `status: in-progress` if still `pending` (building has started).
- Commit: `{feat|fix|test}(scope): {description}`.
- Suggest handoff: `/codify` for the remaining container plans; `/verify` the `e2e.plan.md` once all containers are codified.

## Verification
- [ ] Code builds and unit tests pass.
- [ ] Every in-scope plan step is completed and checked `[x]`.
