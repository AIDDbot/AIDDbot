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
Implement a container plan, or fix a defects report. Produce working code with unit
tests for the critical modules.

### Guardrails
- **Think before you code** — elaborate a couple of alternative solutions.
- **Simplicity first** — choose the simplest solution that meets the goal (KISS).
- **Surgical changes** — the minimum change that meets the goal (YAGNI).
- **Goal-driven** — keep going until the task is completed.

## Context

- `{Arch}` = `{Product_Folder}/arch`.
- `{Model}` = `{Product_Folder}/model`.
- `{Rules}` = `{Agents_Folder}/rules`.
- `{Specs}` = `{Product_Folder}/specs/{spec_key}`.

### Inputs
- [ ] Required: one of a container plan, e2e plan, defects report, review report, or
      a requirement/bug description to fix.

### References
- _read_ [naming and conventions]({Rules}/{container}.rules.md).

### Glossary
- **Container** — a runnable unit in `system.arch.md` (`api`, `web`, `db`) — C4 L2.
- **e2e container** — transversal; written by `/codify`, judged by `/verify`.

## Steps
### 1. Research
- _identify_ the input; _derive_ `{spec_id}`, `{slug}`, `{spec_key}`, and `{container}`.
- _if_ no single plan is given, _ask_ which container to scope.
- _read_ [system architecture]({Arch}/system.arch.md) — confirm the container **Tier**.
- _if_ the tier is not `db`, _read_ [container arch]({Arch}/{container}.arch.md).
- _if_ the tier is `db`, _read_ [relational schema]({Model}/db.schema.md).

### 2. Plan
- _if_ touching an API, _read_ [API field shapes]({Model}/api.schema.md).
- _if_ touching the store, _read_ [data field shapes]({Model}/db.schema.md).
- _map_ plan steps to code changes; respect contracts shared with sibling containers.

### 3. Implement
- _commit_ any pending changes so the session starts clean.
- _annotate_ plan deviations (what, why); check each in-scope step `[x]`.
- _if_ `spec.md` is `pending` or `failed`, _update_ `status: in-progress`.
- _if_ mode is e2e container:
  - _write_ code that compiles and runs (skip unit tests).
  - _commit_ the changes (`{feat|fix|test}(scope): {description}`).
  - _handoff_ to `/verify`.
- _if_ mode is another container:
  - _write_ code that compiles and runs.
  - _write_ unit tests for the critical path (happy path plus errors).
  - _run_ the unit tests until they pass.
  - _commit_ the changes (`{feat|fix|test}(scope): {description}`).
  - _handoff_ to `/codify` for the next container.
- _if_ mode is fix:
  - _if_ on the default branch, _create_ branch `fix/{slug}`.
  - _apply_ the minimal fix per defect.
  - _annotate_ fix deviations; check each in-scope step `[x]`.
  - _commit_ the changes (`{feat|fix|test}(scope): {description}`).
  - _handoff_ to `/verify`.

## Verification
- [ ] Code builds; unit tests pass (e2e: suite executes, red allowed).
- [ ] Every in-scope step is `[x]`, or every in-scope report entry is fixed.
- [ ] Related spec status is `in-progress` when a spec is in scope.
