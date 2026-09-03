---
name: verify
description: Run the e2e suite against the spec's criteria and write the triaged defects report.
metadata:
  aiddbot-kind: primitive
user-invocable: true
disable-model-invocation: true
---
# verify

Your goal is to run the e2e suite against acceptance criteria or accepted findings and write a defects report.

Report only — never edit code, tests, or plans. A flaky or wrong test is a `test` finding, not a pass. Active criteria only; ignore `Deprecated criteria`. A green suite means `verified`; anything red means `in-progress`. Tick each active criterion `[x]` or `[ ]` in every spec in scope.

**Single spec:** map scenarios from `e2e.plan.md`; write `{Product_Folder}/specs/{spec_key}/e2e.report.md` from the [defects report](./assets/e2e.report.template.md). A technical spec has no functional e2e: run the suite as a regression net and do not map its criteria to tests.

**Change manifest:** read `{Product_Folder}/changes/{change_key}/change.md` and every listed spec; run the suite once; write `{Product_Folder}/changes/{change_key}/e2e.report.md` from the [change report](./assets/change.e2e.report.template.md). Tick criteria in each listed spec. Set every listed spec to `verified` on green.

**Accepted findings:** read `{Product_Folder}/findings.md`, require every finding in scope to be `accepted` with the same `{fix_key}`, and require `fix/{fix_key}` as the active branch. Run the complete existing E2E suite once as a regression net; do not add, map, tick, or invent acceptance criteria. Write `{Product_Folder}/findings/{fix_key}.e2e.report.md` from the [findings report](./assets/findings.e2e.report.template.md). A green run advances review only.

Free the ports ([Windows](./scripts/free-port.ps1) · [Linux/macOS](./scripts/free-port.sh)), clean the data, start what is under test.

The result is the e2e verdict.

Commit as `docs(verify): …`.
