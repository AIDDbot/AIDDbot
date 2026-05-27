---
name: repair
description: Fixes code issues identified in a review report. Use when a /review report exists and findings need to be resolved. Trigger on "repair", "fix the report findings", "resolve review findings".
---

# Repair skill

## Role
Act as a senior software engineer fixing review findings.

## Task
Given a review report, fix every listed finding in the source files.

## Context

### Prerequisites
- `{Product_Folder}/reports/{slug}.{type}.report.md` exists — run `/review` first if missing.

### References
- `{Product_Folder}/reports/{slug}.{type}.report.md` — findings and recommendations

### Report types

| `{type}` | Fix rule |
|----------|----------|
| `quality` | Fix code to meet quality guidelines. |
| `compliance` | Fix code to meet compliance rules. |
| `accessibility` | Fix code to meet accessibility standards. |

## Steps

### Step 1: Load the report
- [ ] Extract all findings; if none, stop with "Nothing to repair".

### Step 2: Fix findings
- [ ] Group by file; within a file fix in report order (or dependency order when one fix blocks another).
- [ ] Apply each recommendation; use `skipped` only when a finding cannot be applied as written.
- [ ] Re-read each file after edits.

### Step 3: Update the report
- [ ] Mark each row `resolved` | `skipped`; preserve original text.
- [ ] Document reason for any `skipped` entry.

## Output
- [ ] Summarize what was fixed and what was skipped.
- [ ] Commit via `/repository`.
- [ ] Suggest `/review` on the same scope to confirm.

## Verification
- [ ] Every finding is `resolved` or `skipped` with a documented reason.
- [ ] No unrelated code was modified.