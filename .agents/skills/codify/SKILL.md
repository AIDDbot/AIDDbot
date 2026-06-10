---
name: codify
description: Implement one container plan with working functional code plus unit tests for critical modules. One run, one container.
user-invocable: true
disable-model-invocation: true
---

# Codify skill

## Role
Senior software engineer.

## Task
Implement a container plan (or a scoped spec/requirement) with working code plus unit tests for critical modules. One run, one container.

## Context
### Input
- One of:
  - A container Plan file `{Product_Folder}/specs/{slug}/{container}.plan.md`.
  - A Spec file or a direct textual requirement (best-effort; ask which container to scope).

### Prerequisites
- `{Product_Folder}/arch/system.arch.md` (run `/explore` if missing);
- The relevant container documents (run `/extract` if missing):
  - architecture document `{Product_Folder}/arch/{container}.arch.md`
  - container code rules document `{Agents_Folder}/rules/{container}.rules.md`

### Guardrails
1. **Think first** — reason about the problem; clarify when in doubt.
2. **Simplicity** — no clever or over-engineered solutions (YAGNI, KISS).
3. **Surgical changes** — minimum changes to meet the goal.
4. **Goal-driven** — keep going until validation criteria are met.

## Steps
### Step 1: Scope
- [ ] Identify the input and derive `{slug}` and `{container}`.
- [ ] If the input is a spec or requirement (not a single container plan), ask which container to scope. Do not assume.
- [ ] Never the `e2e` container — its plan and code belong to `/verify`.
- [ ] If the scope is large, split it into smaller ordered units and do them in order.

### Step 2: Ground in the container
- [ ] Read `{container}.arch.md` (components, contracts, structure) and `{container}.rules.md` (naming, conventions).

### Step 3: Implement
- [ ] Write the minimum code to meet the in-scope plan steps; follow the container's rules and conventions.
- [ ] Respect the contracts shared with sibling containers (API shapes, schemas) as planned.
- [ ] If an in-scope change would alter a shared contract, stop and hand back to `/planify` — never improvise a cross-container change.
- [ ] Annotate any deviation from the plan in the plan file (what changed and why).
- [ ] Do not add comments or extra changes (YAGNI).

### Step 4: Unit test
- [ ] Add unit tests for the critical path: happy path plus error cases (if any).
- [ ] Run the container's unit suite; fix until green.

## Output
- [ ] Working code + unit tests; every in-scope plan step checked `[x]`.
- [ ] In `spec.md`, set `status: in-progress` if still `pending` (building has started).
- [ ] Commit: `{feat|fix|test}(scope): {description}`.
- [ ] Suggest handoff:
  - `/codify` for the remaining container plans.
  - `/verify` the `e2e.plan.md` once all containers are codified.

## Verification
- [ ] Code builds and unit tests pass.
- [ ] Every step in the plan is completed.
