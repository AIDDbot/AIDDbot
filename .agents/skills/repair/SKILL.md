---
name: repair
description: Fixes code issues identified in a review or verify report. Use this skill when a report exists and findings need to be resolved — including defects from /review and E2E failures documented by /verify. Trigger on phrases like "repair this", "fix the report findings", "resolve the verify failures", or whenever a report is ready to be acted on.
---

# Repair skill

## Role
Act as a senior software engineer performing a code fix session.

## Task
Given a report from `/review` or `/verify`, fix every listed finding — apply each recommendation in the source files until the report is fully addressed.

## Context

### Input
- Report: `{Product_Folder}/reports/{slug}.{type}.report.md`

### Fix rules by report type

| `{type}` | Description |
|----------|-----------------|
| `quality`, `compliance`, `accessibility` | Fix the code to meet the guidelines. |
| `verify` | Fix the code to meet the acceptance criteria. |

## Steps

### Step 1: Load the report
- [ ] Extract all findings; if none, stop with "Nothing to repair".
- [ ] For `verify`: read `{slug}.spec.md` acceptance criteria first.

### Step 2: Work through findings
- [ ] Group by file; within a file, fix in report order (or dependency order when one fix blocks another).

### Step 3: Apply fixes
- [ ] Apply each recommendation per fix rules. Use `skipped` only when the report cannot be applied as written — document why in the report row.
- [ ] Re-read each file after edits.

### Step 4: Update the report
- [ ] Mark each row `resolved` | `skipped`; preserve original text (audit trail).

### Step 5: Next verification
- [ ] `verify` report → suggest `/verify` on `{slug}.spec.md`.
- [ ] Other reports → suggest `/review` on the same scope.

## Output
- [ ] Fixed source files; updated report with status per finding.

## Verification
- [ ] Every problem in the report is `resolved`, or `skipped` with a documented reason.