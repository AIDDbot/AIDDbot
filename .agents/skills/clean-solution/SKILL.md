---
name: clean-solution
description: Find durable CRAP violations and lint findings.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# clean-solution

Your goal is to find CRAP violations and lint issues across the whole codebase.

- Spawn a new **Craftsman** sub-agent to produce a defect report:
  - Run lint scripts that detect cyclomatic complexity violations.
  - Run test coverage scripts that detect poor test coverage.
  - Run hard lint scripts that detect other warnings and errors.
- Write durable, evidence-backed findings for every defect. Do not fix code or create a branch.

Return a short report of the findings discovered.
