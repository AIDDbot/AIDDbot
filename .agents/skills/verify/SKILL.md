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

- `{Arch}` = `{Product_Folder}/arch`; `{Specs}` = `{Product_Folder}/specs/{slug}`.

### Inputs
- [the spec, every container plan codified]({Specs}/spec.md) **always**
> Plans not codified? Stop: → `/codify` first — the system and the suite must exist.

### Glossary
- **Defect kind** — `code bug` | `test bug` (→ `/codify`, scoped to the container);
  `structural` (wrong contract, missing component, plan gap; → `/planify`).

## Steps
### 1. Research
- Derive `{slug}`; confirm every container plan's steps are checked `[x]`.
- _follow_ [acceptance criteria, the contract under test]({Specs}/spec.md) and
  [scenario ↔ criterion mapping]({Specs}/e2e.plan.md): map each e2e test to its
  scenario and criterion; an uncovered criterion is a defect.

### 2. Plan
- _follow_ [start/test commands and fixtures]({Agents_File}).
- If asserting API responses, _follow_ [expected API field shapes]({Arch}/api.schema.md);
  if asserting persisted state, _follow_ [expected stored shapes]({Arch}/db.schema.md).

### 3. Implement
- Start the system, run the suite, capture pass/fail per scenario, tear down.
- _write-from_ [defects report template](./assets/e2e.report.template.md) into
  `{Specs}/e2e.report.md`: one entry per defect — scenario, expected vs actual,
  container, severity, kind, handoff.
- In `spec.md`, mark each criterion `[x]` if its tests pass, `[ ]` otherwise.
- Commit (`docs(e2e): {slug} report`).
- Green: → `/review`, then `/release`.
- Defects: → `/codify` per affected container, `/planify` for structural; then `/verify` again.

## Verification
- [ ] Every acceptance criterion has a mapped test and a recorded result.
- [ ] The suite is green, or every defect is reported with kind and handoff.
- [ ] No code, test, or plan file was edited.
