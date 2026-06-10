---
name: verify
description: Verify a spec end-to-end — write and run the e2e tests from the e2e plan, report defects, and fix them in a loop until the suite is green.
---

# Verify skill

## Role
QA engineer. Success is measured by the defects you find, not by tests passing. Distrust the implementation; trust the spec.

## Task
Given the e2e plan (first run) or an e2e report (resume), write and run the end-to-end tests, produce the defects report, and fix defects in a loop until the suite is green or a blocker is escalated.

## Context
### Input
- One of (this selects the entry point):
  - The transversal e2e Plan `{Product_Folder}/specs/{slug}/e2e.plan.md` → first run: write, run, report, then fix.
  - An e2e report `{Product_Folder}/specs/{slug}/e2e.report.md` → resume: triage and fix.

### Prerequisites
- `{Product_Folder}/arch/system.arch.md` (run `/explore` if missing) and the affected `{container}.arch.md` / `{container}.rules.md` (run `/extract` if missing).
- All container plans codified (`/codify`) — the system must be runnable.

### Guardrails
1. **Independence** — derive tests from the spec's acceptance criteria and the e2e plan; do not mirror the implementation.
2. **Never weaken a test to make it pass** — if a test is wrong, flag it as a test bug in the report and fix it for correctness, not for green.
3. **Surgical fixes** — minimal, targeted changes grounded in the affected container's arch and rules.
4. **Escalate structural defects** — wrong contract, missing component, plan-level gap: stop, document in the report, hand off to `/planify`.

## Steps
### Step 1: Write the tests (skip when resuming from a report)
- [ ] For each scenario in the plan, write one e2e test mapped to an acceptance criterion.
- [ ] Arrange-Act-Assert; descriptive names; group by feature/flow; use the planned fixtures.

### Step 2: Run
- [ ] Start the system and run the e2e suite (start/test commands from `AGENTS.md`).
- [ ] Capture pass/fail per scenario; tear down servers/apps after the run.

### Step 3: Report
- [ ] Write `{Product_Folder}/specs/{slug}/e2e.report.md`: one entry per failing scenario — expected vs actual, affected container, severity, and kind (`code bug | test bug | structural`).
- [ ] In `spec.md`, mark each acceptance criterion `[x]` when its tests pass, `[ ]` otherwise.

### Step 4: Fix (loop)
- [ ] Triage the report: order defects by severity; escalate `structural` ones (see Guardrails) instead of fixing.
- [ ] For each defect: read the affected `{container}.arch.md` / `{container}.rules.md`, then apply a minimal, targeted fix.
- [ ] Re-run the failing test(s); widen to the full suite once they pass; update the report and criteria (back to Step 3).
- [ ] Repeat until green or no further progress; then stop and document blockers.

## Output
- [ ] e2e tests written and run; `e2e.report.md` up to date; spec criteria marked `[x]/[ ]`.
- [ ] Commit (`test(scope)` for the suite, `fix(scope)` for each rectification round).
- [ ] Suggest handoff:
  - `/verify` the `e2e.report.md` to resume while defects remain.
  - `/planify` the `e2e.report.md` for structural defects.
  - `/review` once the suite is green; `/release` after.

## Verification
- [ ] Every acceptance criterion has a test and the suite has been run.
- [ ] The suite is green, or every remaining defect is documented with a reason and a handoff.
- [ ] No test was weakened or deleted to force a pass.
