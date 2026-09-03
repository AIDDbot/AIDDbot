---
name: clean-solution
description: Clean code by finding CRAP violations and lint issues.
---
# clean-solution

The goal of this workflow is to find and fix CRAP violations and lint issues across the whole codebase, outside any specification delivery.

- Spawn a new **Craftsman** sub-agent to produce a defect report:
  - Run lint scripts that detect cyclomatic complexity violations.
  - Run test coverage scripts that detect poor test coverage.
  - Run hard lint scripts that detect other warnings and errors.

- _TRIAGE_:
  - _IF_ defects exist, execute the internal [`fix-defects`](/.agents/commands/fix-defects.command.md) command with the report in hand.
  - _IF_ no defects exist, report "no defects found."

Return a short report of the defects fixed.
