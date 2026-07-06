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
1. **Green baseline gate** — refuse to start on a failing suite; run `/verify` first.
2. **Report-only by default** — no code edits; fixes → `/codify`. With `--fix`, apply
   only mechanical findings, minimal diffs, never touching tests or shared contracts.
3. **Behavior findings are not yours** — a fix that changes observable behavior →
   `/specify`; restructuring contracts or component boundaries → `/planify`.

## Context
- Listing only — read each item when needed.
- `{Specs}` = `{Product_Folder}/specs/{slug}`.

### Inputs
- A scope, one of: feature branch changes, plan/spec files, or explicit paths.
- Optional `--fix` — also apply the mechanical findings.
> Ambiguous scope? Ask the minimum questions.

### References
- [checklist: a11y, security, performance, clean-code/DRY](./references/review.guidelines.md)
  _read_ **always**
- [findings report template](./assets/review.report.template.md) _write-from_ **always**

### Glossary
- **Finding** — a checklist violation in one of the four dimensions.
- **Mechanical finding** — behavior-preserving and local (rename, dead code, extraction);
  the only kind `--fix` may apply, proven by the untouched suite staying green.

## Steps
### 1. Research
- List the files in scope.
- Run the test suite (Guardrail 1).

### 2. Plan
- Walk each file against the checklist: data flow, trust boundaries, UI surface, I/O,
  structure.
- Collect findings per dimension, each with severity, kind, and handoff.

### 3. Implement
- Scope maps to a spec: write `{Specs}/review.report.md` from the template; otherwise
  report in chat (or "No findings").
- With `--fix`: apply each mechanical finding, re-run the suite, mark it `fixed`.
- Commit — `docs(review)` for the report; one `refactor(scope)` commit for `--fix`,
  body one bullet per finding.
- → `/codify` per affected container for remaining findings; `/verify`; then `/release`.

## Verification
- [ ] Every scope file was considered across all four dimensions.
- [ ] Every finding has a dimension, severity, kind, and handoff.
- [ ] No edits beyond `--fix` mechanical findings; the suite is green.
