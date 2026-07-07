---
name: review
description: Audit a code scope for defects (a11y, security, perf) and clean-code/DRY; report findings with handoffs. Report-only unless --fix.
user-invocable: true
disable-model-invocation: true
---
# Review

## Role
Act as Standards Reviewer.

## Task
Evaluate a code scope against the merged checklist (quality + risk).
Write the findings report — each finding with severity, kind, and handoff.

## Guardrails
- **Report-only by default** — no code edits.
- **Green baseline** — refuse to start on a failing suite; run `/verify` first.
- **Behavior findings are not yours** — look only for implementation smells;
  behavior findings hand off to `/specify`, contract/structural moves to `/planify`.

## Context

- `{Specs}` = `{Product_Folder}/specs/{NNN}-{slug}`.

### Inputs
- A scope, one of: feature branch changes, plan/spec files, or explicit paths.

### Glossary
- **Finding** — a checklist violation in one of the four dimensions.

## Steps
### 1. Research
- Run the test suite; if red, stop: → /verify.
- If the scope is ambiguous, ask the minimum questions.
- List the files in scope.

### 2. Plan
- _read_ [checklist: a11y, security, perf, clean-code/DRY](./references/review.guidelines.md).
- Walk each file against it — data flow, trust boundaries, UI surface, I/O, structure.
- Collect findings per dimension, each with severity, kind, and handoff.

### 3. Implement
- _read_ [findings report template](./assets/review.report.template.md) and write `{Specs}/review.report.md`.
- If `--fix`, apply each mechanical finding and mark it fixed in the report.
- If `--fix`, Commit (`refactor(scope): {description}`).
- Commit (`docs(review): {description}`).
- If findings remain, `/codify` the report; else `/release`.

## Verification
- [ ] Every scope file was considered across all four dimensions.
- [ ] Every finding has a dimension, severity, kind, and handoff.
