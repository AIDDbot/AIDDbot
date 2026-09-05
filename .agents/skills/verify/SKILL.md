---
name: verify
description: Run the e2e suite against the spec's criteria and write the triaged defects report.
metadata:
  aiddbot-kind: primitive
user-invocable: true
disable-model-invocation: true
---
# verify

Your goal is to run the E2E suite against functional criteria or accepted findings and write a revision-bound report.

Report only—never edit code, tests, or plans. Record the delivery base, evaluated revision, commands, and results. A flaky or wrong test is a `test` finding, not a pass. Evaluate active functional criteria only and ignore `Deprecated criteria`; never tick a technical criterion. A green suite verifies the scope. A failed assertion is red. An absent suite, unavailable environment, uncovered functional criterion, or other check that cannot run is blocked. Red or blocked returns every spec in scope to `in-progress` so earlier evidence cannot ship; blocked is a report outcome, never a spec status.

**Single spec:** map functional scenarios from `e2e.plan.md`; write `{Product_Folder}/specs/{spec_key}/e2e.report.md` from the [defects report](./assets/e2e.report.template.md). A technical spec has no functional E2E: run the existing suite as a regression net and leave its criteria for `qualify`.

**Change manifest:** read `{Product_Folder}/changes/{change_key}/change.md` and every listed spec; run the suite once; write `{Product_Folder}/changes/{change_key}/e2e.report.md` from the [change report](./assets/change.e2e.report.template.md). Tick only functional criteria. Set every listed spec to `verified` on green; technical criteria remain unticked until qualification.

**Accepted findings:** read `{Product_Folder}/findings.md`, require every finding in scope to be `accepted` with the same `{fix_key}`, and require `fix/{fix_key}` as the active branch. Run the complete existing E2E suite once as a regression net; do not add, map, tick, or invent acceptance criteria. Write `{Product_Folder}/findings/{fix_key}.e2e.report.md` from the [findings report](./assets/findings.e2e.report.template.md). A green run advances review only.

Use test data isolated by run or project and delete only that namespace; verify cleanup succeeded. Stop a listener with the ownership-safe helpers ([Windows](./scripts/free-port.ps1) · [Linux/macOS](./scripts/free-port.sh)) only when its PID and process-start identity were captured from this run. If ownership is not provable, select a configured alternative port or report blocked without stopping the listener.

The result is the e2e verdict.

Commit as `docs(verify): …`.
