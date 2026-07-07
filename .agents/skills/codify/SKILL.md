---
name: codify
description: Implement a container plan or fix a defects report; code and unit tests for critical modules. One run, one container — e2e included.
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

- `{Arch}` = `{Product_Folder}/arch`; `{Rules}` = `{Agents_Folder}/rules`.
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
- If no single plan is given, ask which container to scope.
- _read_ [components, contracts, structure]({Arch}/{container}.arch.md).

### 2. Plan
- _read_ [system architecture]({Arch}/system.arch.md).
- If touching an API, _read_ [API field shapes]({Arch}/api.schema.md); 
- If touching the store, _read_ [data field shapes]({Arch}/db.schema.md).
- Map plan steps to code changes; respect contracts shared with sibling containers.

### 3. Implement
- Commit any pending changes, so the coding session starts from a clean state.
- Annotate plan deviations (what, why); check each in-scope step `[x]`.
- In `spec.md`, set `status: in-progress` if still `pending`.
- Commit (`{feat|fix|test}(scope): {description}`).

#### 3.1 for other containers
- Ensure the code is correct (it should compile and run)
- Write unit tests for the critical path (happy path plus errors)
- Ensure tests pass (rewrite tests if needed)
- → /codify next container

#### 3.2 for e2e container
- Skip the unit-test bullet.
- Write correct code (it should compile and run)
- → /verify

#### 3.3 when in fix mode
- Apply the minimal fix per defect.
- Annotate fix deviations (what, why); check each in-scope step `[x]`.
- → /verify

## Verification
- [ ] Code builds; unit tests pass (e2e container: suite executes, red allowed).
- [ ] Every in-scope step is checked `[x]`, or every in-scope report entry is fixed.
- [ ] If related to a spec, ensure its status is `in-progress`.
