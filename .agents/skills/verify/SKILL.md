---
name: Verify
description: Verify a spec end-to-end — write and run the e2e tests from the e2e plan, report defects, and fix them in a loop until the suite is green.
user-invocable: true
disable-model-invocation: true
---
# Verify

Write and run the e2e tests from the e2e plan, then fix defects in a loop until the suite is green for agents.

## Role
Act as QA Engineer.

## Task
Given the e2e plan (first run) or an e2e report (resume), write and run the end-to-end tests, produce the defects report, and fix defects in a loop until the suite is green or a blocker is escalated.

## Context
- CAUTION: This is a listing. Read only when necessary.

### Input
- One of (this selects the entry point):
  - The transversal e2e plan `{Product_Folder}/specs/{slug}/e2e.plan.md` → first run: write, run, report, then fix.
  - An e2e report `{Product_Folder}/specs/{slug}/e2e.report.md` → resume: triage and fix.

### References
- `{Product_Folder}/arch/system.arch.md` and, for each affected container, `{Product_Folder}/arch/{container}.arch.md` and `{Agents_Folder}/rules/{container}.rules.md`.
- `{Product_Folder}/arch/api.schema.md` / `{Product_Folder}/arch/db.schema.md` — system-wide contract detail (endpoint and data shapes); assert against these when checking API responses or persisted state.
- The `e2e` container is yours: ground the test code in `e2e.arch.md` / `e2e.rules.md` when they exist.
> Run `/explore` / `/extract` first if missing. All container plans must be codified (`/codify`) — the system must be runnable.

### Glossary
- **Defect kind** — `code bug` (implementation wrong), `test bug` (test wrong), or `structural` (wrong contract, missing component, or plan-level gap → escalate to `/planify`).

### Guardrails
1. **Distrust the implementation, trust the spec** — success is measured by the defects you find, not by tests passing.
2. **Independence** — derive tests from the spec's acceptance criteria and the e2e plan; do not mirror the implementation.
3. **Never weaken a test to make it pass** — if a test is wrong, flag it as a test bug and fix it for correctness, not for green.
4. **Surgical fixes** — minimal, targeted changes grounded in the affected container's arch and rules.
5. **Escalate structural defects** — stop, document in the report, and hand off to `/planify`.

## Steps
### Step 1: Research
- Identify the entry point from the input (e2e plan → first run; e2e report → resume).
- Read the spec's acceptance criteria and the e2e plan (or the report when resuming); ground the test code in `e2e.arch.md` / `e2e.rules.md` when they exist.

### Step 2: Plan the Content
- First run: map each plan scenario to one acceptance criterion and to one e2e test; identify the fixtures and the start/test commands (from the root `{Agents_File}`).
- Resume: triage the report — order defects by severity and mark the `structural` ones for escalation instead of fixing.

## Implementation Output
- Write one e2e test per scenario, mapped to an acceptance criterion: Arrange-Act-Assert, descriptive names, grouped by feature/flow, using the planned fixtures. (Skip when resuming from a report.)
- Start the system and run the e2e suite; capture pass/fail per scenario; tear down servers/apps after the run.
- Write `{Product_Folder}/specs/{slug}/e2e.report.md`: one entry per failing scenario — expected vs actual, affected container, severity, and kind. In `spec.md`, mark each acceptance criterion `[x]` when its tests pass, `[ ]` otherwise.
- Fix loop: escalate `structural` defects (do not fix); for each other defect read the affected `{container}.arch.md` / `{container}.rules.md` and apply a minimal, targeted fix; re-run the failing test(s), then widen to the full suite; update the report and criteria. Repeat until green or no further progress, then document blockers. Annotate any fix that deviates from the plan.
- Commit (`test(scope)` for the suite, `fix(scope)` for each rectification round).
- Suggest handoff: `/verify` the `e2e.report.md` to resume while defects remain; `/planify` the report for structural defects; `/review` once the suite is green, then `/release`.

## Verification
- [ ] Every acceptance criterion has a test and the suite has been run.
- [ ] The suite is green, or every remaining defect is documented in `e2e.report.md` with a reason and a handoff.
- [ ] No test was weakened or deleted to force a pass.
