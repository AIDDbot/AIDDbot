---
name: clean-solution
description: Find durable CRAP violations and lint findings.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# clean-solution

Clean the codebase and **produce evidence-backed code-smells and quality findings**.

- _SPAWN_ a _Craftasman_ agent to
  - Run available complexity, coverage, and strict-lint checks.
  - Report each CRAP violation, insufficient-coverage, warning, or error with evidence.
  - Do not edit code, update the finding ledger, create a branch, or relax lint rules.
  - Normalize durable evidence into `{Product_Folder}/findings.md` using the [finding contract](./references/finding.contract.md).
  
_RETURN_ current quality report.
