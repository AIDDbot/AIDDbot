---
name: repair
description: Fixes code issues identified in a review report. Use when a `/review` report exists and findings need to be resolved. Trigger on "repair", "fix the report findings", "resolve review findings".
---

# Repair skill

## Role

Act as a senior software engineer fixing review findings.

## Task

Given a review report, fix every listed finding in the source files.

## Context

### References

- `{Product_Folder}/reports/review.report.md` — findings and recommendations (Accessibility, Security, Performance sections).

## Steps

### Step 1: Load the report

- [ ] Extract all findings from every section and table; if no rows filled, stop with "Nothing to repair".

### Step 2: Fix findings

- [ ] Group by file; within a file fix in report order (or dependency order when one fix blocks another).


### Step 3: Apply the recommendations
- [ ] Apply each recommendation; use `skipped` only when a finding cannot be applied as written.
- [ ] Write minimal diffs to fix the findings.
- [ ] Re-read each file after edits.

### Step 4: Update the report

- [ ] Mark each row `resolved` | `skipped`; preserve original text.
- [ ] Document reason for any `skipped` entry.

## Output

- [ ] Summarize what was fixed and what was skipped.
- [ ] Commit via `/repository`.
- [ ] Suggest `/review` on the same scope to confirm the fixes.

## Verification

- [ ] Every finding is `resolved` or `skipped` with a documented reason.
- [ ] No unrelated code was modified.
