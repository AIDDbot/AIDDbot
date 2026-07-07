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
- **Report-only** — never edit code, tests, or plans; the report is the deliverable.
- **Distrust the implementation, trust the spec** — success is the defects found,
  not tests passing.
- **Never soften the verdict** — a flaky or wrong test is a `test bug`, never a pass;
  a criterion without a test is a defect too.

## Context

- `{Arch}` = `{Product_Folder}/arch`; `{Specs}` = `{Product_Folder}/specs/{id}-{slug}`.

### Inputs
- Optional: the spec `{slug}` to verify.

### Glossary
- **Defect kind** — `code bug` | `test bug` (→ `/codify`, scoped to the container);
  `structural` (wrong contract, missing component, plan gap; → `/planify`).
- **AC id** — `AC-{id}.{n}`; a numbered criterion from the spec, carried by test titles.

## Steps
### 1. Research
- Derive `{id}` and `{slug}`; confirm every container plan's steps are checked `[x]`.
- If plans are not codified, stop: → `/codify` — the system and the suite must exist.
- _read_ [acceptance criteria, the contract under test]({Specs}/spec.md).
- _read_ [scenario ↔ AC id mapping]({Specs}/e2e.plan.md).
- Match each e2e test to its AC id via the test title; an uncovered AC id is a defect.

### 2. Plan
- _read_ [start/test commands and fixtures]({Agents_File}).
- If asserting API responses, _read_ [expected API field shapes]({Arch}/api.schema.md);
  if asserting persisted state, _read_ [expected stored shapes]({Arch}/db.schema.md).

### 3. Implement
- Start the system, run the suite, capture pass/fail per scenario, tear down.
- _read_ [defects report template](./assets/e2e.report.template.md).
- Write `{Specs}/e2e.report.md`: a verdict per AC id, then one entry per defect —
  scenario, expected vs actual, container, severity, kind, handoff.
- In `spec.md`, mark each AC id `[x]` if its tests pass, `[ ]` otherwise.
- Commit (`docs(e2e): {id}-{slug} report`).
- If green, → `/review`, then `/release`.
- If defects, → `/codify` per affected container — `/planify` for structural —
  then `/verify` again.

## Verification
- [ ] Every AC id has a mapped test, a verdict in the report, and its `[x]/[ ]` in the spec.
- [ ] The suite is green, or every defect is reported with kind and handoff.
- [ ] No code, test, or plan file was edited.
