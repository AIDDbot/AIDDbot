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
Evaluate a code scope against the merged checklist (quality + risk) and write the
findings report — each finding with severity, kind, and handoff.

## Guardrails
- **Green baseline gate** — refuse to start on a failing suite; run `/verify` first.
- **Report-only by default** — no code edits; fixes → `/codify`. With `--fix`, apply
  only mechanical findings, minimal diffs, never touching tests or shared contracts.
- **Behavior findings are not yours** — a fix that changes observable behavior →
  `/specify`; restructuring contracts or component boundaries → `/planify`.

## Context

- `{Specs}` = `{Product_Folder}/specs/{id}-{slug}`.

### Inputs
- A scope, one of: feature branch changes, plan/spec files, or explicit paths.
- Optional `--fix` — also apply the mechanical findings.

### Glossary
- **Finding** — a checklist violation in one of the four dimensions.
- **Mechanical finding** — behavior-preserving and local (rename, dead code, extraction);
  the only kind `--fix` may apply, proven by the untouched suite staying green.

## Steps
### 1. Research
- If the scope is ambiguous, ask the minimum questions.
- List the files in scope.
- Run the test suite, applying the **Green baseline gate**.

### 2. Plan
- _read_ [checklist: a11y, security, perf, clean-code/DRY](./references/review.guidelines.md).
- Walk each file against it — data flow, trust boundaries, UI surface, I/O, structure.
- Collect findings per dimension, each with severity, kind, and handoff.

### 3. Implement
- If the scope maps to a spec, _read_
  [findings report template](./assets/review.report.template.md) and write
  `{Specs}/review.report.md`; else report in chat (or "No findings").
- If `--fix`, apply each mechanical finding, re-run the suite, mark it `fixed`.
- Commit (`docs(review): {description}`).
- If `--fix`, commit (`refactor(scope): {description}`) — body one bullet per finding.
- If findings remain, → `/codify` per affected container; then `/verify`, then `/release`.

## Verification
- [ ] Every scope file was considered across all four dimensions.
- [ ] Every finding has a dimension, severity, kind, and handoff.
- [ ] No edits beyond `--fix` mechanical findings; the suite is green.
