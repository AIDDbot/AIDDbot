---
name: collect-findings
description: Normalize durable solution findings into one traceable remediation scope.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# collect-findings

Your goal is to **collect durable findings** without changing application code.

- Spawn Craftsman.
  - Read every `e2e.report.md`, `qualify.report.md`, accumulated-debt entry, current `clean-solution` report, and any concrete defect evidence supplied by the caller.
  - Normalize durable evidence into `{Product_Folder}/findings.md` using the [finding contract](./references/finding.contract.md).
  - Retain source links and evidence.
  - Record the approved criterion, valid test, or applicable documented rule when evidence says a defect violates an existing contract.
  - Deduplicate only findings with identical violated state and scope.
  - Do not infer product priority.
  - Keep `pending`, `accepted`, `delivered`, `rejected`, and `stale` distinct.
  - Do not accept a finding, assign its `Fix`, create a branch, or mark delivery.

_RETURN_ normalized remediation scope.
