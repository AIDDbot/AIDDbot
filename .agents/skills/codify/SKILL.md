---
name: codify
description: Implement a container or e2e plan, or fix a report, with tests.
user-invocable: true
disable-model-invocation: true
---
# Codify

## Role
Act as Senior Software Engineer.

## Task
Implement a software-container plan, the e2e plan, or fix a report that needs
corrections. Produce working code; smoke-test and unit-test software containers;
for e2e, only verify the suite compiles.

### Guardrails
- **Think before you code** — elaborate a couple of alternative solutions.
- **Simplicity first** — choose the simplest solution that meets the goal (KISS).
- **Surgical changes** — the minimum change that meets the goal (YAGNI).
- **Goal-driven** — keep going until the task is completed.
- **Status on every code step** — after each Implement run that writes code, set
  the related spec to `status: in-progress`.

## Context

- `{Arch}` = `{Product_Folder}/arch`.
- `{Model}` = `{Product_Folder}/model`.
- `{Rules}` = `{Agents_Folder}/rules`.
- `{Specs}` = `{Product_Folder}/specs/{spec_key}`.

### Inputs
- [ ] Required: one of a software-container plan, `e2e.plan.md`, a defects report,
      a review report, or a requirement/bug description to fix.

### References
- _read_ [naming and conventions]({Rules}/{container}.rules.md).

### Glossary
- **Container** — a runnable unit in `system.arch.md` (`api`, `web`, `db`) — C4 L2.
- **Software container** — any container except `e2e`; planned by `/planify`.
- **e2e container** — transversal; planned via `e2e.plan.md`, written here, judged
  by `/verify`.
- **Smoke test** — a minimal compile-and-run check that the container starts or
  builds cleanly.

## Steps
### 1. Research
- _identify_ the input.
- _derive_ `{spec_id}`, `{slug}`, `{spec_key}`, and `{container}`.
- _if_ no single plan is given, _ask_ which container to scope.
- _read_ [system architecture]({Arch}/system.arch.md) — confirm the container
  **Tier**.
- _if_ the tier is not `db`, _read_ [container arch]({Arch}/{container}.arch.md).
- _if_ the tier is `db`, _read_ [relational schema]({Model}/db.schema.md).
- _if_ mode is e2e:
  - _read_ [e2e plan]({Specs}/e2e.plan.md).
  - _read_ [criteria]({Specs}/spec.md).

### 2. Plan
- _if_ touching an API, _read_ [API field shapes]({Model}/api.schema.md).
- _if_ touching the store, _read_ [data field shapes]({Model}/db.schema.md).
- _map_ plan steps to code changes; respect contracts shared with sibling
  containers.
- _if_ mode is e2e, _map_ every AC id to its scenario from the e2e plan.

### 3. Implement
- _commit_ any pending changes so the session starts clean.
- _annotate_ plan deviations (what, why).
- _check_ each in-scope plan step `[x]` when a plan exists.
- _update_ `spec.md` to `status: in-progress` after this code step.
- _if_ mode is e2e container:
  - _write_ the suite from `e2e.plan.md` (no unit tests).
  - _run_ a compile check only — do not run the tests.
  - _commit_ the changes (`{feat|fix|test}(scope): {description}`).
  - _handoff_ to `/verify`.
- _if_ mode is a software container:
  - _write_ code that compiles and runs.
  - _write_ unit tests for the critical path (happy path plus errors).
  - _run_ a smoke test until it passes.
  - _run_ the unit tests until they pass.
  - _commit_ the changes (`{feat|fix|test}(scope): {description}`).
  - _handoff_ to `/codify`.
- _if_ mode is fix:
  - _create_ branch `fix/{slug}` when on the default branch.
  - _apply_ the minimal fix per defect or finding.
  - _annotate_ fix deviations.
  - _check_ each in-scope step `[x]` when applicable.
  - _run_ a smoke test and unit tests until they pass.
  - _run_ a compile check only when the fix is e2e — do not run e2e tests.
  - _commit_ the changes (`{feat|fix|test}(scope): {description}`).
  - _handoff_ to `/verify`.

## Verification
- [ ] Software container: smoke test passes; unit tests pass.
- [ ] e2e: suite compiles; tests were not run.
- [ ] Every in-scope plan step is `[x]`, or every in-scope report entry is fixed.
- [ ] Related spec status is `in-progress` when a spec is in scope.
