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
Run the e2e suite against the spec's acceptance criteria and write the defects report,
every defect triaged by kind and handed off.

## Guardrails
1. **Report-only** — never edit code, tests, or plans; the report is the deliverable.
2. **Distrust the implementation, trust the spec** — success is the defects found,
   not tests passing.
3. **Never soften the verdict** — a flaky or wrong test is a `test bug`, never a pass;
   a criterion without a test is a defect too.

## Context
- Listing only — read each item when needed.
- `{Arch}` = `{Product_Folder}/arch`; `{Specs}` = `{Product_Folder}/specs/{slug}`.

### Inputs
- The spec `{Specs}/spec.md`, with every container plan codified — `e2e.plan.md` included.
> Plans not codified? Stop: → `/codify` first — the system and the suite must exist.

### References
- The spec's acceptance criteria (read, always) — the contract under test.
- `{Specs}/e2e.plan.md` (read, always) — the scenario ↔ criterion mapping.
- Root `{Agents_File}` (read, always) — start/test commands and fixtures.
- `{Arch}/api.schema.md` / `{Arch}/db.schema.md` (read, if asserting API responses or
  persisted state) — expected field shapes.
- [`e2e.report.template.md`](./assets/e2e.report.template.md) (write-from, always).

### Glossary
- **Defect kind** — `code bug` | `test bug` (→ `/codify`, scoped to the container);
  `structural` (wrong contract, missing component, plan gap; → `/planify`).

## Steps
### 1. Research
- Derive `{slug}`; confirm every container plan's steps are checked `[x]`.
- Map each e2e test to its scenario and criterion; an uncovered criterion is a defect.

### 2. Plan
- Identify the fixtures and start/test commands from the root `{Agents_File}`.

### 3. Implement
- Start the system, run the suite, capture pass/fail per scenario, tear down.
- Write `{Specs}/e2e.report.md` from the template: one entry per defect — scenario,
  expected vs actual, container, severity, kind, handoff.
- In `spec.md`, mark each criterion `[x]` if its tests pass, `[ ]` otherwise.
- Commit (`docs(e2e): {slug} report`).
- Green: → `/review`, then `/release`.
- Defects: → `/codify` per affected container, `/planify` for structural; then `/verify` again.

## Verification
- [ ] Every acceptance criterion has a mapped test and a recorded result.
- [ ] The suite is green, or every defect is reported with kind and handoff.
- [ ] No code, test, or plan file was edited.
