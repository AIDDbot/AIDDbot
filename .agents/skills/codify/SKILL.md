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
Implement a software-container plan, the e2e plan, or fix a report that needs corrections.
Produce working code. Smoke-test and unit-test software containers.
For e2e, only verify the suite compiles and lints clean.

### Guardrails
- **Think before you code** — weigh a couple of alternatives, then pick the simplest (KISS).
- **Surgical changes** — the minimum change that meets the goal (YAGNI).
- **Goal-driven** — keep going until the task is completed.
- **Status on code** — set the spec to `in-progress` after each code-writing run.
- **Apply the rules** — follow the in-scope `{container}.rules.md`; the harness may not inject it.

## Context

- `{Arch}` = `{Product_Folder}/arch`.
- `{Model}` = `{Product_Folder}/model`.
- `{Rules}` = `{Agents_Folder}/rules`.
- `{Specs}` = `{Product_Folder}/specs/{spec_key}`.

### Inputs
- [ ] Required: a container plan, `e2e.plan.md`, a defects/review/refactor/redesign report, or a fix description.

### References
- _read_ [naming and conventions]({Rules}/{container}.rules.md).

### Glossary
- **Software container** — any container except `e2e`; planned by `/planify`.
- **e2e container** — transversal; planned via `e2e.plan.md`, written here, judged by `/verify`.
- **Refactor report** — `{Product_Folder}/refactors/{slug}/refactor.report.md` from `/refactor`; apply each opportunity in fix mode.
- **Redesign report** — `{Product_Folder}/redesigns/{slug}/redesign.report.md` from `/redesign`; apply each opportunity in fix mode.
- **Smoke test** — a minimal compile-and-lint check that the container builds cleanly; do not run the app.

## Steps
### 1. Research
- _identify_ the input, then derive `{spec_id}`, `{slug}`, `{spec_key}`, `{container}`.
- _if_ no single plan is given, _ask_ which container to scope.
- _read_ [system architecture]({Arch}/system.arch.md) — confirm the container Tier.
- _read_ its `{Arch}/{container}.arch.md`, or `{Model}/db.schema.md` when the tier is `db`.
- _if_ mode is e2e, _read_ [e2e plan]({Specs}/e2e.plan.md) and [criteria]({Specs}/spec.md).

### 2. Plan
- _if_ touching an API, _read_ [API shapes]({Model}/api.schema.md).
- _if_ touching the store, _read_ [data shapes]({Model}/db.schema.md).
- _map_ plan steps to code changes; respect contracts shared with sibling containers.
- _if_ mode is e2e, _map_ every AC id to its scenario from the e2e plan.

### 3. Implement
- _commit_ any pending changes so the session starts clean.
- _if_ mode is fix and on the default branch, _create_ branch `fix/{slug}`.
- _annotate_ any plan or fix deviations (what, why).
- _if_ mode is e2e, _write_ the suite from `e2e.plan.md`.
- _if_ mode is a software container, _write_ code and unit tests for the critical path.
- _if_ mode is fix, _apply_ the minimal change per defect or finding.
- _check_ each in-scope plan step or report entry `[x]`.
- _if_ the tier is e2e, _run_ compile and lint, not the tests.
- _if_ the tier is not e2e, _run_ compile, lint, and unit tests until they pass; do not run the app.
- _update_ `spec.md` to `status: in-progress` after writing code.
- _commit_ the changes (`{feat|fix|test}(scope): {description}`).
- _handoff_ to `/verify` — coding is always followed by verification.

## Verification
- [ ] Software container: compile and lint clean; unit tests pass (app not run).
- [ ] e2e: suite compiles and lints clean; tests were not run.
- [ ] Every in-scope plan step is `[x]`, or every in-scope report entry is fixed.
- [ ] Related spec status is `in-progress` when a spec is in scope.
- [ ] The code conforms to the in-scope container's `{container}.rules.md`.
