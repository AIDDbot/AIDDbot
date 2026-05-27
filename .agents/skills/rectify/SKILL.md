---
name: rectify
description: Fixes source code to resolve E2E test failures documented by /verify. Use when a verify report and screenshots exist and failures are localized enough to fix directly without a new plan. Trigger on "rectify", "fix the E2E failures", "resolve verify failures".
---

# Rectify skill

## Role
Act as a senior software engineer fixing E2E test failures.

## Task
Given a verify report and its screenshots, fix every listed failure in the source files.

## Context

### Prerequisites
- `{Product_Folder}/reports/{slug}.verify.report.md` exists — run `/verify` first if missing.

### References
- `{Product_Folder}/reports/{slug}.verify.report.md` — failures, screenshots, steps to reproduce
- `{Product_Folder}/specs/{slug}.spec.md` — acceptance criteria

## Steps

### Step 1: Load the report
- [ ] Read `{slug}.verify.report.md` — extract all failures.
- [ ] If no failures, stop with "Nothing to rectify".
- [ ] Read `{slug}.spec.md` — confirm which acceptance criteria are violated.
- [ ] If failures are too broad or architectural, stop and suggest `/planify` instead.

### Step 2: Fix findings
- [ ] Group by file; within a file fix in report order.
- [ ] Apply minimal targeted fixes — do not refactor unrelated code.
- [ ] Re-read each file after edits.

### Step 3: Update the report
- [ ] Mark each failure `resolved` | `skipped`; preserve original text.
- [ ] Document reason for any `skipped` entry.

## Output 
- [ ] Summarize what was fixed and what was skipped.
- [ ] Commit via `/repository`.
- [ ] Suggest `/verify` on `{slug}.spec.md` to confirm.

## Verification
- [ ] Every failure is `resolved` or `skipped` with a documented reason.
- [ ] No unrelated code was modified.