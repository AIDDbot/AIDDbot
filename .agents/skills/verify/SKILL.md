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

Read its Checks table and run the complete applicable suite when E2E is required. Never edit code, tests, plans, criteria, or contracts. Update only the E2E and Findings sections of `{Product_Folder}/changes/{change_key}/report.md`; preserve other sections. Record evaluated revision, command, result, coverage, and evidence. A missing suite, unavailable environment, or uncovered required criterion is `blocked`.

Use test data isolated by run or project. Stop listeners with the ownership-safe [Windows](./scripts/free-port.ps1) or [Linux/macOS](./scripts/free-port.sh) helper only when this run captured its PID and start identity.

The result is current E2E evidence.

Commit as `docs(verify): …`.
