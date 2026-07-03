---
name: verify
description: Verify a spec end-to-end: write/run the e2e tests from the plan, report defects, fix them in a loop until green.
user-invocable: true
disable-model-invocation: true
---
# Verify

## Role
Act as QA Engineer.

## Task
Given the e2e plan (first run) or an e2e report (resume), write and run the end-to-end
tests, produce the defects report, and fix defects in a loop until the suite is green or
a blocker is escalated.

## Context
- CAUTION: This is a listing. Read only when necessary.
- `{Arch}` = `{Product_Folder}/arch`; `{Rules}` = `{Agents_Folder}/rules`.
- `{Specs}` = `{Product_Folder}/specs/{slug}`.

### Inputs
- One of (this selects the entry point):
  - The transversal e2e plan `{Specs}/e2e.plan.md` → first run: write, run, report, then fix.
  - An e2e report `{Specs}/e2e.report.md` → resume: triage and fix.

### References
- `{Arch}/system.arch.md` (read, always).
- For each affected container, `{Arch}/{container}.arch.md` and
  `{Rules}/{container}.rules.md` (read, always).
- `{Arch}/api.schema.md` / `{Arch}/db.schema.md` — endpoint/data shapes (read, if
  asserting API responses or persisted state).
- The `e2e` container is yours: ground the test code in `e2e.arch.md` / `e2e.rules.md`
  (read, optional) — when they exist.
> Run `/explore` / `/extract` first if missing.
> All container plans must be codified (`/codify`) — the system must be runnable.

Mode guides:
- [`First-run Guide`](./references/first-run.guide.md) (if first run) — write, run, report.
- [`Resume Guide`](./references/resume.guide.md) (if resume) — e2e report; triage and fix.

### Glossary
- **Defect kind** — `code bug` (implementation wrong), `test bug` (test wrong), or
  `structural` (wrong contract, missing component, or plan-level gap → escalate to `/planify`).

## Steps
### 1. Research
- Identify the entry point from the input (e2e plan → first run; e2e report → resume).
- Read and follow the appropriate reference guide.

### 2. Plan
- First run: map each plan scenario to one acceptance criterion and to one e2e test.
- Identify the fixtures and the start/test commands (from the root `{Agents_File}`).
- Resume: triage the report — order defects by severity and mark the `structural` ones
  for escalation instead of fixing.

### 3. Implement
- Follow the reference guide: write, run, and report (first run), or triage and fix in
  the loop (resume).
- Commit (`test(scope)` for the suite, `fix(scope)` for each rectification round).
- Suggest `/verify` the `e2e.report.md` to resume while defects remain.
- Suggest `/planify` the report for structural defects.
- Suggest `/review` once the suite is green, then `/release`.

## Verification
- [ ] Every acceptance criterion has a test and the suite has been run.
- [ ] The suite is green, or every remaining defect is documented in `e2e.report.md`
      with a reason and a handoff.
- [ ] No test was weakened or deleted to force a pass.
