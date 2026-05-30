---
name: rectify
description: Fixes source code to resolve E2E test failures documented in the verify.md report by /verify. Use when failures are localized enough to fix directly without a new plan. Trigger on "rectify", "fix the E2E failures", "resolve verify failures".
---

# Rectify skill

## Role
Act as a senior software engineer fixing E2E test failures.

## Task
Given a `verify.md` report with a Rectify guide from `/verify`, fix every listed failure in the source files.

## Context

### Prerequisites
- `{Product_Folder}/specs/{slug}/verify.md` exists with `status: fail` and a Rectify guide — run `/verify` first if missing.

### References
- `{Product_Folder}/specs/{slug}/verify.md` — run summary and Rectify guide (failures, expected vs actual, suggested fixes, evidence links)
- `{Product_Folder}/specs/{slug}/spec.md` — acceptance criteria (the `[ ]` items reflect the failures)
- Latest test run output from `/verify` (in session or from the user)

## Steps

### Step 1: Load failures
- [ ] Read `verify.md` — extract all failures from the Rectify guide.
- [ ] If no failures (`status: pass` or no guide), stop with "Nothing to rectify".
- [ ] Confirm which acceptance criteria in `spec.md` are violated.
- [ ] If failures are too broad or architectural, stop and suggest `/planify` instead.

### Step 2: Fix failures
- [ ] Apply minimal targeted fixes — do not refactor unrelated code.
- [ ] Re-read each file after edits.

### Step 3: Update the report
- [ ] Clear or trim the Rectify guide in `verify.md` for resolved items.
- [ ] Document reason for any failure left unfixed.
- [ ] Do not re-mark the spec's acceptance criteria — the next `/verify` run owns that.

## Output 
- [ ] Summarize in chat what was fixed and what was skipped.
- [ ] Keep spec as `in-progress`.
- [ ] Commit with conventional message (`fix`; scope `{slug}` or tier).
- [ ] Suggest `/verify` on `specs/{slug}/` to confirm.

## Verification
- [ ] Every failure in the Rectify guide is fixed or skipped with a documented reason.
- [ ] No unrelated code was modified.
