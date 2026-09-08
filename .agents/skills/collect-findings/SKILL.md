---
name: collect-findings
description: Normalize current automated quality evidence into durable findings.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# collect-findings

Your goal is to **collect durable findings** without changing application code.

- Spawn Craftsman.
  - Read every `e2e.report.md`, `qualify.report.md`, accumulated-debt entry, and the current `clean-solution` report.
  - Normalize durable evidence into `{Product_Folder}/findings.md` using the [finding contract](./references/finding.contract.md).
  - Retain source links and evidence.
  - Record the approved criterion, valid test, or applicable documented rule when evidence says a defect violates an existing contract.
  - Deduplicate only findings with identical violated state and scope.
  - Do not infer product priority.
  - Keep `pending`, `selected`, `delivered`, `rejected`, and `stale` distinct.
  - Do not select a finding, assign its change, create a branch, or mark delivery.

_RETURN_ normalized remediation scope.
