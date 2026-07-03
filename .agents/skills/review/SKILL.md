---
name: review
description: Audit a code scope for defects (a11y, security, performance) and clean-code/DRY, then fix every finding in place. Folds refactor in.
user-invocable: true
disable-model-invocation: true
---
# Review

## Role
Act as Standards Reviewer.

## Task
Evaluate a code scope against the merged checklist (quality + risk), fix every finding with minimal diffs, and commit — never changing spec or plan status.

## Guardrails
1. **Green baseline gate** — refuse to start on a failing suite; reviewing on red is changing two things at once.
2. **Tests are untouchable** (beyond mechanical renames) — if a fix would require changing a test's assertion, behavior changed: revert it and route through `/modify`.
3. **Contracts are frozen** — shared API shapes, schemas, component boundaries. Restructuring them is a structural refactor: route through `/planify`.

## Context
- CAUTION: This is a listing. Read only when necessary.

### Inputs
- A scope, one of: feature branch changes, plan/spec files, or explicit paths.
> Ask the minimum questions if the scope is ambiguous.

### References
- [`review.guidelines.md`](./references/review.guidelines.md) (read, always) — the merged checklist: a11y, security, performance, clean-code/DRY.

### Glossary
- **Finding** — a checklist violation in one of the four dimensions.
- **Behavior-preserving** — observable behavior unchanged; the proof is the existing test suite staying green, untouched.

## Steps
### 1. Research
- List the files in scope; ask the minimum questions if ambiguous.
- Run the test suite — a green baseline is required (see Guardrails).

### 2. Plan
- Walk each file against the checklist (data flow, trust boundaries, UI surface, I/O, structure).
- Collect the findings per dimension before touching code.

### 3. Implement
- Apply each fix immediately with a minimal diff; preserve observable behavior for clean-code edits; re-read each file after editing.
- One conventional commit (`fix` for defects, `refactor` for behavior-preserving cleanup) with a body of one bullet per finding — dimension, file, what changed.
- Report findings in chat (or "No findings"); suggest `/verify` to re-run the e2e suite, then `/release`.

## Verification
- [ ] Every scope file was considered across all four dimensions.
- [ ] No unrelated code and no tests (beyond mechanical renames) were modified.
- [ ] The suite is green.
