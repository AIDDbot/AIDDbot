---
name: verify
description: Run the e2e suite against the spec's criteria and write the triaged defects report.
user-invocable: true
disable-model-invocation: true
---
# verify

Your goal is to run the e2e suite against a specification's acceptance criteria and write a defects report.

Report only — never edit code, tests, or plans. A flaky or wrong test is a `test` finding, not a pass. Active criteria only; ignore `Deprecated criteria`. A green suite means `verified`; anything red means `in-progress`. Tick each active criterion `[x]` or `[ ]` in the spec.

A functional spec maps scenarios from `e2e.plan.md`. A technical spec has no functional e2e: run the suite as a regression net and do not map its criteria to tests.

Free the ports ([Windows](./scripts/free-port.ps1) · [Linux/macOS](./scripts/free-port.sh)), clean the data, start what is under test, then write `{Product_Folder}/specs/{spec_key}/e2e.report.md` from the [defects report](./assets/e2e.report.template.md).

The result is the e2e verdict.

Commit as `docs(verify): …`.
