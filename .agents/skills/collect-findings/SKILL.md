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

- Spawn a new **Craftsman** agent to
  - Read every `e2e.report.md` and `qualify.report.md`, including their accumulated-debt entries, plus the current `clean-solution` report. 
  - Normalize their durable evidence into `{Product_Folder}/findings.md` using the [finding contract](./references/finding.contract.md). 
  - Retain source links and evidence, deduplicate only findings with the same violated state and scope, and never infer product priority.
  - Keep `pending`, `accepted`, `delivered`, `rejected`, and `stale` findings distinct. 
  - Do not accept a finding, assign its `Fix`, create a branch, or mark delivery.

_RETURN_ the normalized remediation scope.
