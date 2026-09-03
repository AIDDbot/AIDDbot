---
name: clean-solution
description: Clean code by finding CRAP violations and lint issues.
metadata:
  aiddbot-kind: orchestrator
user-invocable: true
disable-model-invocation: true
---
# clean-solution

Your goal is to find and fix CRAP violations and lint issues across the whole codebase, outside any specification delivery.

- Spawn a new **Craftsman** sub-agent to produce a defect report:
  - Run lint scripts that detect cyclomatic complexity violations.
  - Run test coverage scripts that detect poor test coverage.
  - Run hard lint scripts that detect other warnings and errors.
- _TRIAGE_:
  - _IF_ defects exist, read and execute the internal [fix-defects worker](../fix-defects/SKILL.md) with the report in hand.
  - _IF_ no defects exist, report "no defects found."

Return a short report of the defects fixed.
