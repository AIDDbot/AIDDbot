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
- **Distrust the implementation, trust the spec** — finding defects is a kind of success.
- **Never soften the verdict** — a flaky or wrong test is a `test bug`.

## Context

- `{Arch}` = `{Product_Folder}/arch`
- `{Specs}` = `{Product_Folder}/specs/{NNN}-{slug}`

### Inputs
- Optional: the spec `{slug}` to verify.

### Glossary
- **Defect kind** — `code bug` | `test bug` (→ `/codify`); `structural` (→ `/planify`).
- **AC id** — `AC-{NNN}.{n}`; a numbered criterion from the spec, carried by test titles.

## Steps
### 1. Research
- Identify the spec; if ambiguous, ask.
- _read_ [acceptance criteria, the contract under test]({Specs}/spec.md).
- _read_ [scenario ↔ AC id mapping]({Specs}/e2e.plan.md).

### 2. Plan
- Discover the tests that must be run to verify the spec.
- _read_ [start/test commands and fixtures]({Agents_File}).
- If asserting API responses, _read_ [expected API field shapes]({Arch}/api.schema.md);
  if asserting persisted state, _read_ [expected stored shapes]({Arch}/db.schema.md).

### 3. Implement
- Run the affected test or all tests as a last resort.
- Start the system, run the suite, capture pass/fail per scenario, tear down.
- _read_ [defects report template](./assets/e2e.report.template.md).
- Write `{Specs}/e2e.report.md`: a verdict per AC id, then one entry per defect —
  scenario, expected vs actual, container, severity, kind, handoff.
- In `spec.md`, mark each AC id `[x]` if its tests pass, `[ ]` otherwise.
- Commit (`docs(e2e): {NNN}-{slug} report`).
- If green, → `/review`.
- If red, → `/codify` the report.

## Verification
- [ ] Every AC id has a mapped test, a verdict in the report, and its `[x]/[ ]` in the spec.
- [ ] The suite is green, or every defect is reported with kind and handoff.
- [ ] No code, test, or plan file was edited.
