---
name: review
description: Audit a code scope against the merged checklist and report findings with handoffs.
user-invocable: true
disable-model-invocation: true
---
# Review

## Role
Act as Standards Reviewer.

## Task
Run linting and type checking tools.
Evaluate a code scope against the merged checklist (quality + risk).
Write the findings report — each finding with severity, kind, and handoff.

## Guardrails
- **Report-only by default** — no code edits.
- **Green baseline** — refuse to start on a failing suite; run `/verify` first.

## Context

- `{Specs}` = `{Product_Folder}/specs/{NNN}-{slug}`.

### Inputs
- A scope, one of: feature branch changes, plan/spec files, or explicit paths.

### Glossary
- **Finding** — a checklist violation in one of the four dimensions.

## Steps
### 1. Research
- Run the test suite. _if_ red, stop; _handoff_ to `/verify`.
- _if_ the scope is ambiguous, ask the minimum questions.
- List the files in scope.

### 2. Plan
- Run linting and type checking tools.
- _if_ defects found are false positives, tune tooling rules, _else_ add them to the report.
- _read_ [checklist: a11y, security, perf, clean-code/DRY](./references/review.guidelines.md).
- _read_ [findings report template](./assets/review.report.template.md).
- Walk each file against it — data flow, trust boundaries, UI surface, I/O, structure.
- Collect findings per dimension, each with severity, kind, and handoff.
- Prepare the content for the template's placeholders.

### 3. Implement
- _write_ `{Specs}/review.report.md`.
- _if_ `--fix`, apply each mechanical finding and mark it fixed in the report.
- _if_ `--fix`, Commit (`refactor(scope): {description}`).
- Commit (`docs(review): {description}`).
- _if_ findings remain, _handoff_ to `/codify` with the report; else _handoff_ to `/release`.

## Verification
- [ ] Every scope file was considered across all four dimensions.
- [ ] Every finding has a dimension, severity, kind, and handoff.
