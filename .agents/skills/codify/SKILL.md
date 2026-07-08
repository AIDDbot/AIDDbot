---
name: codify
description: Implement a container plan or fix a defects report, with unit tests.
user-invocable: true
disable-model-invocation: true
---
# Codify

## Role
Act as Senior Software Engineer.

## Task
Implement a container plan, or fix a defects report.
Produce working code with unit tests for the critical modules.

## Guardrails
- **Think before you code** — elaborate a couple of alternative solutions.
- **Simplicity first** — choose the simplest solution that meets the goal (KISS principle).
- **Surgical changes** — the minimum change that meets the goal (YAGNI, no extras).
- **Goal-driven** — keep going until the task is completed.

## Context

- `{Arch}` = `{Product_Folder}/arch`.
- `{Rules}` = `{Agents_Folder}/rules`.
- `{Specs}` = `{Product_Folder}/specs/{NNN}-{slug}`.

### Inputs
- One of:
  - [a container plan]({Specs}/{container}.plan.md)
  - [an e2e plan]({Specs}/e2e.plan.md)
  - [a defects report]({Specs}/e2e.report.md)
  - [a review report]({Specs}/review.report.md)
  - A requirement or bug report description to fix.

### References
- _read_ [naming and conventions]({Rules}/{container}.rules.md)

### Glossary
- **Container** — a runnable unit in `system.arch.md` (`api`, `web`, `db`...) — C4 L2.
- **e2e container** — transversal; verifies the others; written by `/codify`, judged by `/verify`.

## Steps
### 1. Research
- Identify the input; derive `{NNN}`, `{slug}`, and `{container}`.
- _if_ no single plan is given, ask which container to scope.
- _read_ [components, contracts, structure]({Arch}/{container}.arch.md).

### 2. Plan
- _read_ [system architecture]({Arch}/system.arch.md).
- _if_ touching an API, _read_ [API field shapes]({Arch}/{container}.api.schema.md).
- _if_ touching the store, _read_ [data field shapes]({Arch}/{container}.db.schema.md).
- Map plan steps to code changes; respect contracts shared with sibling containers.

### 3. Implement
- **Commit any pending changes**, so the coding session starts from a clean state.
- Annotate plan deviations (what, why); check each in-scope step `[x]`.
- _if_ `spec.md` is still `pending`, set `status: in-progress`.
- Commit (`{feat|fix|test}(scope): {description}`).

#### 3.1 for e2e container
- Skip the unit-test bullet.
- _write_ correct code (it should compile and run).
- _handoff_ to `/verify`.

#### 3.2 for other containers
- Ensure the code is correct (it should compile and run).
- _write_ unit tests for the critical path (happy path plus errors).
- Ensure tests pass (rewrite tests if needed).
- _handoff_ to `/codify` for the next container.

#### 3.3 when in fix mode
- _if_ on the default branch, create branch `fix/{slug}`.
- Apply the minimal fix per defect.
- Annotate fix deviations (what, why); check each in-scope step `[x]`.
- _handoff_ to `/verify`.

## Verification
- [ ] Code builds; unit tests pass (e2e container: suite executes, red allowed).
- [ ] Every in-scope step is checked `[x]`, or every in-scope report entry is fixed.
- [ ] _if_ related to a spec, ensure its status is `in-progress`.
