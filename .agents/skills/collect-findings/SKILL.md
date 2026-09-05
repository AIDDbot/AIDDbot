---
name: collect-findings
description: Normalize durable solution findings into one traceable remediation scope.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# collect-findings

_GOAL_: collect durable findings without changing application code.

_SPAWN_ Craftsman:
  _READ_ every `e2e.report.md`, `qualify.report.md`, accumulated-debt entry, and current `clean-solution` report.
  _NORMALIZE_ durable evidence into `{Product_Folder}/findings.md` using the [finding contract](./references/finding.contract.md).
  _RETAIN_ source links and evidence.
  _DEDUPLICATE_ only findings with identical violated state and scope; _NEVER_ infer product priority.
  _KEEP_ `pending`, `accepted`, `delivered`, `rejected`, and `stale` distinct.
  _DO-NOT_ accept a finding, assign its `Fix`, create a branch, or mark delivery.
_RETURN_ normalized remediation scope.
