---
name: codify
description: Execute a plan or report — write functional code (+unit tests), write and run e2e tests, or fix defects reported by the e2e run.
---

# Codify skill

## Role
Senior software engineer.

## Task
Given a plan or an e2e report, do exactly one of:
- **code** — implement a container plan with working code plus unit tests for critical modules.
- **e2e** — write and run the e2e tests from the e2e plan, and produce the defects report.
- **rectify** — fix the defects listed in an e2e report.
One run, one stack.

## Context
### Input
- One of (this selects the mode):
  - A container Plan file `{Product_Folder}/specs/{slug}/{container}.plan.md` → **code** mode.
  - The transversal e2e Plan file `{Product_Folder}/specs/{slug}/e2e.plan.md` → **e2e** mode.
  - An e2e report `{Product_Folder}/specs/{slug}/e2e.report.md` → **rectify** mode.
  - A Spec file or a direct textual requirement → **code** mode (best-effort, ask what to scope).

### Prerequisites
- `{Product_Folder}/arch/system.arch.md` (run `/establish` if missing); 
- The relevant container documents:
  - architecture document `{container}.arch.md` 
  - container code rules document `{container}.rules.md` 
  - (run `/extract` if missing).

### Reference
- Mode guide (read the one matching the selected mode and follow it):
  - [`mode.code.md`](./mode.code.md) — functional code + unit tests from a container plan or spec.
  - [`mode.e2e.md`](./mode.e2e.md) — write and run e2e tests; generate the defects report.
  - [`mode.rectify.md`](./mode.rectify.md) — fix defects from an e2e report; 

### Principles
1. **Think first** — reason about the problem; clarify when in doubt.
2. **Simplicity** — no clever or over-engineered solutions (YAGNI, KISS).
3. **Surgical changes** — minimum changes to meet the goal.
4. **Goal-driven** — keep going until validation criteria are met.

## Steps
### Step 1: Scope and select mode
- [ ] Identify the input type and derive `{slug}`; select the mode (**code** / **e2e** / **rectify**).
- [ ] In **code** mode, if the input is a spec (not a single container plan), ask which container to scope. 
- [ ] Read the matching `mode.*.md` and follow it.

### Step 2: Execute the mode
- [ ] Read the relevant `{container}.arch.md` and `{container}.rules.md` first.
- [ ] Follow the steps in the selected mode file end to end.

## Output
- [ ] **code**: working code + unit tests for the in-scope plan.
- [ ] **e2e**: e2e tests written and run; `e2e.report.md` written; spec criteria marked `[x]/[ ]`.
- [ ] **rectify**: defects fixed, e2e re-run; `e2e.report.md` and spec criteria updated.
- [ ] Commit (`feat|fix|chore|test)(scope): {description}`).
- [ ] Suggest handoff:
  - `/codify` for the remaining container plans, then the `e2e.plan.md`.
  - `/codify` the `e2e.report.md` (rectify) while defects remain.
  - `/review` once code and e2e are green.
  - `/release` when the spec is fully codified and verified.

## Verification
- [ ] Code builds and the relevant tests pass.
- [ ] Every step in the plan (or every defect in the report) is addressed.
