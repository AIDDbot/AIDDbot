---
name: verify
description: Execute acceptance tests for one spec and record evidence.
metadata:
  aiddbot-kind: primitive
user-invocable: true
disable-model-invocation: true
---
# verify

Your goal is to execute acceptance tests for one spec.

Read the spec, its proposed PRD edits, and current code. Execute applicable E2E acceptance tests without editing code, tests, or contracts. Write `{Product_Folder}/specs/{spec_key}/verification.md` from the [verification template](./assets/verification.template.md). Record the checked revision, command, result, and evidence. A failed or blocked acceptance check prevents shipping.

Reconcile every functional requirement and acceptance-test action in the spec with the PRD and actual test diff. Require executed coverage for new, changed, and related requirements. For deprecations, confirm obsolete assertions are removed, surviving coverage remains, and the specified removal checks pass. Missing coverage or an unperformed action is blocked even when the existing suite is green. Execute technical checks assigned to verification; leave qualification-owned checks to their named owner.

Use test data isolated by run or project. Stop listeners with the ownership-safe [Windows](./scripts/free-port.ps1) or [Linux/macOS](./scripts/free-port.sh) helper only when this run captured its PID and start identity.

The result is current acceptance evidence.

Commit as `docs(verify): …`.
