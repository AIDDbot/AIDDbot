---
name: verify
description: Run required end-to-end checks for one change and record their evidence.
metadata:
  aiddbot-kind: primitive
user-invocable: true
disable-model-invocation: true
---
# verify

Your goal is to run E2E checks assigned to one change.

Derive functional coverage from the change introduction, related specs, diff from `base`, and applicable risk policy. Run the complete applicable suite when E2E is required; justify exclusions that are not evident from the scope. Never edit code, tests, criteria, or contracts. Update only the E2E and Findings sections of `{Product_Folder}/changes/{change_key}/report.md`; preserve other sections. At the start of evaluation, record required coverage that remains unexecuted as `pending`. Record evaluated revision, command, result, coverage, and evidence. A missing suite, unavailable environment, or uncovered required criterion is `blocked`.

Use test data isolated by run or project. Stop listeners with the ownership-safe [Windows](./scripts/free-port.ps1) or [Linux/macOS](./scripts/free-port.sh) helper only when this run captured its PID and start identity.

The result is current E2E evidence.

Commit as `docs(verify): …`.
