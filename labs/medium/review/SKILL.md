---
name: review
description: Audit a code scope for defects (a11y, security, performance) and clean-code/DRY, then fix every finding in place. Folds refactor in.
user-invocable: true
disable-model-invocation: true
---

# Review skill

## Role
Standards reviewer who resolves findings in code (quality + risk).

## Task
Given a code scope, evaluate against the merged checklist, fix every finding with minimal diffs, and commit. Scope-bound: never changes spec/plan status.

## Context
### Input
- A scope, one of: feature branch changes, plan/spec files, or explicit paths.

### References
- Checklist: [`review.guidelines.md`](./references/review.guidelines.md) — a11y, security, performance, clean-code/DRY.

### Guardrails
1. **Green baseline gate** — refuse to start on a failing suite; refactoring on red is changing two things at once.
2. **Tests are untouchable** (beyond mechanical renames) — if a fix would require changing a test's assertion, behavior changed: revert it and route through `/modify`.
3. **Contracts are frozen** — shared API shapes, schemas, component boundaries. Restructuring them is a structural refactor: route through `/planify`.

## Steps

### Step 1: Confirm scope
- [ ] List files in scope; ask the minimum questions if ambiguous.
- [ ] Run the test suite — green baseline required (see Guardrails).

### Step 2: Evaluate and fix
- [ ] Walk each file against the checklist (data flow, trust boundaries, UI surface, I/O, structure).
- [ ] Apply each fix immediately; preserve observable behavior for clean-code edits. Re-read after editing.

### Step 3: Commit
- [ ] One conventional commit (`fix` for defects, `refactor` for behavior-preserving cleanup).
- [ ] Body: bullet per finding — dimension, file, what changed.

## Output
- [ ] Fixed code in scope (or "No findings").
- [ ] One commit; chat summary; suggest `/verify` to re-run the e2e suite, then `/release`.

## Verification
- [ ] Every scope file considered across all dimensions.
- [ ] No unrelated code modified.
