---
name: collect-findings
description: Normalize durable solution findings into one traceable remediation scope.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# collect-findings

Your goal is to collect durable findings without changing application code.

Read pending reports and write `{Product_Folder}/findings.md` using the [finding contract](./references/finding.contract.md). Retain source links and evidence, deduplicate only findings with the same violated state and scope, and never infer product priority. Keep `pending`, `accepted`, `delivered`, `rejected`, and `stale` findings distinct.

The result is the normalized remediation scope.
