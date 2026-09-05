---
name: clean-solution
description: Find durable CRAP violations and lint findings.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# clean-solution

GOAL: produce evidence-backed whole-codebase quality findings.

SPAWN Craftsman:
  RUN available complexity, coverage, and strict-lint checks.
  REPORT each CRAP violation, insufficient-coverage result, warning, or error with evidence.
  DO NOT edit code, update the finding ledger, create a branch, or relax lint rules.
RETURN current quality report.
