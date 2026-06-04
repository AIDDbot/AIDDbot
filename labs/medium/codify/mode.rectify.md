# Codify mode: rectify

Fix the defects listed in an e2e report and re-run until the suite is green.

## Input
- An e2e report `{Product_Folder}/specs/{slug}/e2e.report.md` (and its `e2e.plan.md`).

## Steps

### Step 1: Triage
- [ ] List the defects from the report; for each, identify the affected container from its entry.
- [ ] Decide test bug vs code bug. Order fixes by severity.

### Step 2: Fix (loop)
- [ ] For each defect: read the affected `{container}.arch.md` / `{container}.rules.md`, then apply a minimal, targeted fix.
- [ ] Re-run the failing e2e test(s); widen to the full suite once the targeted ones pass.
- [ ] Repeat until green or no further progress; then stop and report blockers.
- [ ] Tear down servers/apps.

### Step 3: Update report and criteria
- [ ] In `e2e.report.md`, mark each defect resolved or remaining (with reason).
- [ ] In `spec.md`, update acceptance criteria `[x]/[ ]` to match the new run.

## Done when
- [ ] Suite is green (or remaining defects are documented as blockers), report and criteria are up to date.
