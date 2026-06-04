# Codify mode: e2e

Write and run the end-to-end tests from the e2e plan, then produce the defects report.

## Input
- The transversal e2e plan `{Product_Folder}/specs/{slug}/e2e.plan.md`.

## Steps

### Step 1: Write the tests
- [ ] For each scenario in the plan, write one e2e test mapped to an acceptance criterion.
- [ ] Arrange-Act-Assert; descriptive names; group by feature/flow; use the planned fixtures.

### Step 2: Run
- [ ] Start the system and run the e2e suite (start/test commands from `AGENTS.md`).
- [ ] Capture pass/fail per scenario.
- [ ] Tear down servers/apps after the run.

### Step 3: Report
- [ ] Write `{Product_Folder}/specs/{slug}/e2e.report.md`: one entry per failing scenario — expected vs actual, affected container, severity.
- [ ] In `spec.md`, mark each acceptance criterion `[x]` when its tests pass, `[ ]` otherwise.

## Done when
- [ ] Every acceptance criterion has a test; the suite has been run; `e2e.report.md` reflects the result.
- [ ] If defects remain, hand off to **rectify** mode (`/codify` the `e2e.report.md`).
