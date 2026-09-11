---
name: collect-findings
description: Normalize current automated quality evidence into durable findings.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# collect-findings

Improve the solution by **collecting durable findings** without changing application behavior.

- _SPAWN_ a _Craftasman_ agent to
  - Read every `qualify.report.md`, accumulated-debt entry.
  - Normalize durable evidence into `{Product_Folder}/findings.md` using the [finding contract](./references/finding.contract.md).
  - Retain source links and evidence.
  - Deduplicate only findings with identical violated state and scope.
  - Infer finding priority.
  - Keep `pending`, `selected`, `delivered`, `rejected`, and `stale` distinct.

_RETURN_ normalized findings.
