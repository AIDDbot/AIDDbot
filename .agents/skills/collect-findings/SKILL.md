---
name: collect-findings
description: Normalize durable solution findings into one traceable remediation scope.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# collect-findings

GOAL: collect durable findings without changing application code.

SPAWN Craftsman:
  READ every `e2e.report.md`, `qualify.report.md`, accumulated-debt entry, and current `clean-solution` report.
  NORMALIZE durable evidence into `{Product_Folder}/findings.md` using the [finding contract](./references/finding.contract.md).
  RETAIN source links and evidence.
  DEDUPLICATE only findings with identical violated state and scope; NEVER infer product priority.
  KEEP `pending`, `accepted`, `delivered`, `rejected`, and `stale` distinct.
  DO NOT accept a finding, assign its `Fix`, create a branch, or mark delivery.
RETURN normalized remediation scope.
