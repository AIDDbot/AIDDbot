---
name: review
description: >-
  Audits code for objective defects — accessibility (WCAG-oriented), security, and performance — and fixes every finding in place. Does not cover clean-code or DRY (use `/refactor`). Trigger on "review this", "accessibility audit", "security review", "performance review", "check a11y", or before release.
---

# Review skill

## Role

Act as a standards and risk reviewer (a11y, security, performance) who resolves findings in code.

## Task

Given a code scope, evaluate against the guidelines below, fix every finding, and commit.

## Context

### Input

Scope-bound (discretionary): pick one scope selector. No spec/plan `status` is changed — traceability is the commit.

- Feature branch: all changed files
- Plan file: files listed in plan
- Path: recent changes on current branch
- Spec slug (optional): scope = files across that spec's plan(s) under `{Product_Folder}/specs/{slug}/`

### Guidelines (load all)

| Dimension | Reference |
|-----------|-----------|
| Accessibility | [accessibility.guidelines.md](./accessibility.guidelines.md)  |
| Security | [security.guidelines.md](./security.guidelines.md) |
| Performance | [performance.guidelines.md](./performance.guidelines.md) |

### Scope

- List only issues that should be fixed.
- Omit informational items, style preferences, and clean-code nits (those belong in `/refactor`).

## Steps

### Step 1: Confirm scope

- [ ] Identify files in scope; if ambiguous, ask the minimum clarifying questions.

### Step 2: Load guides

- [ ] Open all guideline files above.

### Step 3: Evaluate and fix

- [ ] Per file: data flow, trust boundaries, UI surface, I/O and query patterns.
- [ ] For each finding: apply the fix immediately with minimal diffs.
- [ ] Re-read each file after edits.

### Step 4: Commit (required)

- [ ] Commit with conventional message (`fix`) — **one** commit when fixes were applied.
- [ ] Commit **subject**: concise imperative (e.g. `fix(front): resolve a11y labels on checkout`).
- [ ] Commit **body** (mandatory when fixes were applied): bullet list of every defect fixed — dimension (a11y/security/performance), file, and what changed.

## Output

- [ ] Fixed code in scope (or confirmation of no findings).
- [ ] One detailed conventional commit when fixes were applied.
- [ ] Chat summary of what was fixed, or "No findings".

## Verification

- [ ] All scope files considered for a11y, security, and performance.
- [ ] No subjective clean-code edits.
- [ ] No unrelated code was modified.
