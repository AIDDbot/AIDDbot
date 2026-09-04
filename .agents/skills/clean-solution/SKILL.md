---
name: clean-solution
description: Find durable CRAP violations and lint findings.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# clean-solution

Your goal is to produce evidence-backed **whole-codebase quality findings**.

- Spawn a new **Craftsman** agent to run the available complexity, coverage, and strict-lint checks.
  - Report each CRAP violation, insufficient coverage result, warning, or error with its evidence. 
  - Do not edit code, update the finding ledger, or create a branch.
  - Avoid fixing by relaxing lint rules.

_RETURN_ the current quality report.
