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

### Prerequisites

- `{Product_Folder}/reports/{slug}.review.report.md` exists — run `/review` first if missing.

### References

- `{Product_Folder}/reports/{slug}.review.report.md` — findings and recommendations (Accessibility, Security, Performance sections).

### Report format

| Section | Fix rule |
|---------|----------|
| Accessibility | Meet WCAG-oriented recommendations and linked guidelines. |
| Security | Meet [security.guidelines.md](../review/security.guidelines.md). |
| Performance | Meet [performance.guidelines.md](../review/performance.guidelines.md). |

## Steps

### Step 1: Load the report

- [ ] Extract all findings from every section and table; if no rows filled, stop with "Nothing to repair".

### Step 2: Fix findings

- [ ] Group by file; within a file fix in report order (or dependency order when one fix blocks another).
- [ ] Apply each recommendation; use `skipped` only when a finding cannot be applied as written.
- [ ] Re-read each file after edits.

### Step 3: Update the report

- [ ] Mark each row `resolved` \| `skipped`; preserve original text.
- [ ] Document reason for any `skipped` entry.

## Output

- [ ] Summarize what was fixed and what was skipped.
- [ ] Commit via `/repository`.
- [ ] Suggest `/review` on the same scope to confirm, and **run tests** (unit and E2E per `AGENTS.md`); suggest `/verify` when acceptance criteria need E2E proof.

## Verification

- [ ] Every finding is `resolved` or `skipped` with a documented reason.
- [ ] No unrelated code was modified.
