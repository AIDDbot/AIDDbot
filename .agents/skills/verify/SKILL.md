---
name: verify
description: Run the e2e suite against the spec's criteria and write the triaged defects report.
user-invocable: true
disable-model-invocation: true
---
# Verify — run the e2e suite and report the truth

Act as QA Engineer. You run the end-to-end suite against a specification's acceptance criteria and
write a defects report. What you write has to make those defects easy to fix.

If there are no defects the spec becomes `verified` and the work moves on to the quality review.
Otherwise the spec becomes `failed` and goes back to the coding step.

## Rules

- **Report only** — never edit code, tests, or plans; you touch the report, the checkboxes, and
  the status, nothing else.
- **Mark the acceptance criteria** — set every active criterion `[x]` or `[ ]` in the spec itself.
- **Active criteria only** — never run, report, or mark anything under `Deprecated criteria`.
- **Mark the spec** — green suite means `verified`, anything red means `failed`.
- **Never soften the verdict** — a flaky or wrong test is a `test` finding, not a pass.
- **On a refactor spec you are the non-regression** — mark only its green-suite criterion; the
  rest name a gate and belong to the quality review.

## Context

- **Optional input** — the key of the specification to verify; on a refactor spec the whole suite
  is its test.
- **References** — the [defects report template](./assets/e2e.report.template.md) and the
  OS-matched port-freeing helper ([Windows PowerShell](./scripts/free-port.ps1) ·
  [Linux/macOS](./scripts/free-port.sh)).

## Research

Identify whether there is a specification to verify, and read its `kind` and its acceptance
criteria — the active list only — along with the scenario-to-criterion mapping in `e2e.plan.md`
when one exists.

## Plan

Select the tests that have to run to verify the specification. On a refactor spec there are no new
scenarios to map, so the whole suite runs as a regression.

Read the start-up commands and the helpers you will need — freeing ports, seeding data, and the like.

## Implement

Clear the ground first: run the port-freeing and data-cleanup commands, then start the programs or
services under test. Now run the affected tests, or the whole suite.

Write `specs/{spec_key}/e2e.report.md` with a verdict per AC id and one entry per defect, each
classified by kind — `functional` or `test`, both of which route to the coding step. On a
functional spec, set each criterion's checkbox `[x]` or `[ ]` from the result; on a refactor spec,
mark only its non-regression criterion and leave the gate-judged ones untouched. Set the spec to
`status: verified` if the whole suite passes, or `failed` if anything fails.

Commit as `docs(verify): …`. Then hand over: verified goes to the quality review, failed goes back
to the coding step.

## Verification

- [ ] On a functional spec, every active AC id has a mapped test, a report verdict, and its `[x]`/`[ ]` in the spec.
- [ ] On a refactor spec, the non-regression criterion is the only one you marked.
- [ ] No deprecated AC id was run, given a verdict, or checked.
- [ ] The spec status is `verified` or `failed`, matching the suite outcome.
- [ ] The suite is green, or every defect carries a kind and a handoff.
- [ ] No code, test, plan, or corrective edit was made — report, checkboxes, and status only.
