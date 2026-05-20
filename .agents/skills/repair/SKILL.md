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
- `{Product_Folder}/reports/{slug}.{type}.report.md` (`quality` | `compliance` | `accessibility` | `verify`)
- `AGENTS.md` — report paths; do not change spec `status` (see **Spec status** in `AGENTS.md`)

### Fix rules by report type

| `{type}` | Behavior change |
|----------|-----------------|
| `quality`, `compliance`, `accessibility` | Preserve observable behavior unless fixing a defect |
| `verify` | May change behavior to meet acceptance criteria; trace each fix to a failing criterion |

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
- [ ] Review report → suggest tests or `/review` on same scope if needed.

## Output
- [ ] Fixed source files; updated report with status per finding.

## Verification
- [ ] Every row is `resolved`, or `skipped` with a documented reason; verify fixes align with acceptance criteria when behavior changed.

## Git
- [ ] [repository/SKILL.md](../repository/SKILL.md) — `/repair` row in [skill-integrations.md](../repository/skill-integrations.md).
