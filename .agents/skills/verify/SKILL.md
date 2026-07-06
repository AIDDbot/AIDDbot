---
name: verify
description: Run the e2e suite against the spec's criteria and write the defects report with triage and handoffs. Report-only — fixes belong to codify.
user-invocable: true
disable-model-invocation: true
---
# Verify

## Role
Act as QA Engineer.

## Task
Run the end-to-end suite against the spec's acceptance criteria and write the defects
report — every defect triaged by kind and handed off. Report-only: fixes belong to
`/codify` (code/test bugs) or `/planify` (structural).

## Guardrails
1. **Report-only** — never edit code, tests, or plans; the report is the deliverable.
2. **Distrust the implementation, trust the spec** — success is measured by the defects
   found, not by tests passing.
3. **Never soften the verdict** — a flaky or wrong test is a `test bug` defect, never a
   pass; an acceptance criterion without a test is a defect too.

## Context
- CAUTION: This is a listing. Read only when necessary.
- `{Arch}` = `{Product_Folder}/arch`; `{Specs}` = `{Product_Folder}/specs/{slug}`.

### Inputs
- The spec `{Specs}/spec.md`, with every container plan — `e2e.plan.md` included —
  codified by `/codify`.
> Plans not codified yet? Stop and hand back: `/codify` the missing plans first — the
> system must be runnable and the suite must exist.

### References
- The spec's acceptance criteria (read, always) — the contract under test.
- `{Specs}/e2e.plan.md` (read, always) — the scenario ↔ criterion mapping.
- Root `{Agents_File}` (read, always) — start/test commands and fixtures.
- `{Arch}/api.schema.md` / `{Arch}/db.schema.md` (read, if asserting API responses or
  persisted state) — the expected field-level shapes.
- [`e2e.report.template.md`](./assets/e2e.report.template.md) (write-from, always).

### Glossary
- **Defect kind** — `code bug` (implementation wrong) or `test bug` (test wrong), handoff
  `/codify` scoped to the affected container; `structural` (wrong contract, missing
  component, or plan-level gap), handoff `/planify`.

## Steps
### 1. Research
- Derive `{slug}`; confirm every container plan's steps are checked `[x]`.
- Map each e2e test to its plan scenario and acceptance criterion; record any uncovered
  criterion as a defect.

### 2. Plan
- Identify the fixtures and the start/test commands from the root `{Agents_File}`.

### 3. Implement
- Start the system, run the e2e suite, capture pass/fail per scenario, tear down.
- Write `{Specs}/e2e.report.md` from the template: one entry per defect — scenario,
  expected vs actual, affected container, severity, kind, handoff.
- In `spec.md`, mark each acceptance criterion `[x]` when its tests pass, `[ ]` otherwise.
- Commit the report (`docs(e2e): {slug} report`).
- Green: suggest `/review`, then `/release`.
- Defects: suggest `/codify` with the report, once per affected container (code/test
  bugs), and `/planify` with the report (structural); then `/verify` again to re-run.

## Verification
- [ ] Every acceptance criterion has a mapped test and a recorded result.
- [ ] The suite is green, or every defect is in `e2e.report.md` with kind and handoff.
- [ ] No code, test, or plan file was edited.
