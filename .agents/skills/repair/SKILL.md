---
name: repair
description: Fixes code issues identified in any review report. Use this skill when a review report exists and the findings need to be resolved. Trigger on phrases like "repair this", "fix the report findings", "resolve the report issues", or whenever a review report is ready to be acted on.
---

# Repair skill

## Role
Act as a senior software engineer performing a code fix session.

## Task
Given a review report, apply the recommended fixes directly to the source files, finding by finding, until all issues are resolved.

## Context

### Input
- A review report file `{slug}.{type}.report.md` with findings tables (File / Issue / Description / Recommendation).

## Steps

### Step 1: Load the report
- [ ] Read the report and extract all findings across all sections.
- [ ] If the report has no findings, report "Nothing to repair" and stop.

### Step 2: Prioritize findings
- [ ] Group findings by file to minimize context switching.
- [ ] Within each file, apply fixes in order of severity — structural changes before surface-level ones.

### Step 3: Apply fixes
- [ ] For each finding, locate the reported issue in the target file.
- [ ] Apply the fix as recommended in the report.
- [ ] If a fix would alter observable behavior or requires a judgment call, skip it — document the reason, do not guess.
- [ ] After fixing all findings in a file, re-read it to confirm no regressions were introduced.

### Step 4: Update the report
- [ ] Mark each finding as resolved or skipped.
- [ ] For skipped findings, document the reason.

## Output
- [ ] Fixed source files with all resolvable findings applied.
- [ ] Updated report with resolved/skipped status per finding.

## Verification
- [ ] Every finding is either fixed or explicitly skipped with a reason.
- [ ] No fix alters the observable behavior of the code.
- [ ] The updated report reflects the final state accurately.