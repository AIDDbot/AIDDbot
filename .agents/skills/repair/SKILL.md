---
name: repair
description: Fixes code issues identified in a review or verify report. Use this skill when a report exists and findings need to be resolved — including defects from /review and E2E failures documented by /verify. Trigger on phrases like "repair this", "fix the report findings", "resolve the verify failures", or whenever a report is ready to be acted on.
---

# Repair skill

## Role
Act as a senior software engineer performing a code fix session.

## Task
Given a report from `/review` or `/verify`, apply the recommended fixes directly to the source files, finding by finding, until all issues are resolved.

## Context

### Input
- A report file `{Product_Folder}/reports/{slug}.{type}.report.md` using the matching report template (verify reports include **Acceptance criterion**).
- [Artifact conventions](../repository/artifact-conventions.md)
- `{type}` is the report source: `quality`, `compliance`, `accessibility`, or `verify`.
- [Spec status lifecycle](../specify/spec-status.md) — do not change spec status; re-run `/verify` to advance lifecycle.

### Fix rules by report type

| `{type}` | Behavior change |
|----------|-----------------|
| `quality`, `compliance`, `accessibility` | Prefer fixes that preserve observable behavior; skip refactors that change UX unless the finding is a defect |
| `verify` | May change behavior when required to meet acceptance criteria in the linked spec; trace each fix to a failing criterion |

## Steps

### Step 1: Load the report
- [ ] Read the report and extract all findings across all sections.
- [ ] If the report has no findings, report "Nothing to repair" and stop.
- [ ] For `verify` reports, read `{slug}.spec.md` acceptance criteria before applying fixes.

### Step 2: Prioritize findings
- [ ] Group findings by file to minimize context switching.
- [ ] Within each file, apply fixes in order of severity — structural changes before surface-level ones.

### Step 3: Apply fixes
- [ ] For each finding, locate the reported issue in the target file.
- [ ] Apply the fix as recommended in the report, following the fix rules for `{type}` above.
- [ ] If a fix requires a judgment call beyond the report, skip it — document the reason, do not guess.
- [ ] After fixing all findings in a file, re-read it to confirm no regressions were introduced.

### Step 4: Update the report
- [ ] Add a **Status** column (or inline marker) per row: `resolved` | `skipped`.
- [ ] For skipped findings, document the reason in **Description** or a **Notes** column.
- [ ] Preserve original finding text; do not delete rows (audit trail).

### Step 5: Next verification
- [ ] For `verify` reports: suggest re-running `/verify` on `{slug}.spec.md`.
- [ ] For review reports: suggest targeted tests or `/review` on the same scope if the user wants confirmation.

## Output
- [ ] Fixed source files with all resolvable findings applied.
- [ ] Updated report with resolved/skipped status per finding.

## Verification
- [ ] Every finding is either fixed or explicitly skipped with a reason.
- [ ] Review-type repairs did not change observable behavior except to fix reported defects.
- [ ] Verify-type repairs align with spec acceptance criteria when behavior changed.
- [ ] The updated report reflects the final state accurately.

## Git (required)
- [ ] Read and follow [repository skill](../repository/SKILL.md) per [skill integrations](../repository/skill-integrations.md) — stay on `feat/{slug}` during a feature cycle; use `fix/{slug}` only for standalone fixes.
