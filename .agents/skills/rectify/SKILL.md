---
name: rectify
description: Fixes source code to resolve E2E test failures documented in the spec by /verify. Use when failures are localized enough to fix directly without a new plan. Trigger on "rectify", "fix the E2E failures", "resolve verify failures".
---

# Rectify skill

## Role
Act as a senior software engineer fixing E2E test failures.

## Task
Given a spec with failed acceptance criteria and a Rectify section from `/verify`, fix every listed failure in the source files.

## Context

### Prerequisites
- `{Product_Folder}/specs/{slug}.spec.md` has unchecked acceptance criteria and a Rectify section — run `/verify` first if missing.

### References
- `{Product_Folder}/specs/{slug}.spec.md` — acceptance criteria and Rectify section
- Latest test run output from `/verify` (in session or from the user)

## Steps

### Step 1: Load failures
- [ ] Read `{slug}.spec.md` — extract all failures from the Rectify section.
- [ ] If no failures, stop with "Nothing to rectify".
- [ ] Confirm which acceptance criteria are violated.
- [ ] If failures are too broad or architectural, stop and suggest `/planify` instead.

### Step 2: Fix failures
- [ ] Apply minimal targeted fixes — do not refactor unrelated code.
- [ ] Re-read each file after edits.

### Step 3: Update the spec
- [ ] Clear or trim the Rectify section for resolved items.
- [ ] Document reason for any failure left unfixed.

## Output 
- [ ] Summarize in chat what was fixed and what was skipped.
- [ ] Keep spec as `in-progress`.
- [ ] Commit via `/repository`.
- [ ] Suggest `/verify` on `{slug}.spec.md` to confirm.

## Verification
- [ ] Every failure is fixed or skipped with a documented reason.
- [ ] No unrelated code was modified.
