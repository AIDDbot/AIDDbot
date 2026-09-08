---
name: verify
description: Run one revision-bound E2E verification for a change that requires it.
metadata:
  aiddbot-kind: primitive
user-invocable: true
disable-model-invocation: true
---
# verify

Your goal is to run the E2E suite once against a change whose persisted policy requires verification.

Read `{Product_Folder}/changes/{change_key}/change.md`; reject invocation when `stages.verify` is false. Report only—never edit code, tests, plans, criteria, or classification. Run the complete applicable suite once for the whole change and write `{Product_Folder}/changes/{change_key}/e2e.report.md` from the [change report](./assets/change.e2e.report.template.md). Record base, evaluated revision, commands, results, covered functional criteria, and every finding reference in a Craft batch.

A flaky or wrong test is a `test` finding. A green suite verifies the scope. A failed assertion is red. An absent suite, unavailable environment, uncovered functional criterion, or check that cannot run is blocked. Red or blocked keeps the change `in-progress`; never represent a skipped verification as pass.

Use test data isolated by run or project and delete only that namespace. Stop listeners with the ownership-safe helpers ([Windows](./scripts/free-port.ps1) · [Linux/macOS](./scripts/free-port.sh)) only when this run captured their PID and process-start identity.

The result is the change E2E verdict.

Commit as `docs(verify): …`.
