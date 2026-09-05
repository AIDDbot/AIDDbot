---
name: clean-solution
description: Find durable CRAP violations and lint findings.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# clean-solution

_GOAL_: produce evidence-backed whole-codebase quality findings.

_SPAWN_ Craftsman:
  _RUN_ available complexity, coverage, and strict-lint checks.
  _REPORT_ each CRAP violation, insufficient-coverage result, warning, or error with evidence.
  _DO-NOT_ edit code, update the finding ledger, create a branch, or relax lint rules.
_RETURN_ current quality report.
