---
name: clean-drift
description: Clean code by finding drift and code decay.
---
# clean-drift

The goal of this workflow is to find and fix orphaned decay and code drift across the whole codebase, outside any specification delivery.

- Spawn a new **Craftsman** sub-agent to inspect qualification reports for every specification represented in the codebase and produce a defect report for orphaned decay and code drift.

- _TRIAGE_:
  - _IF_ defects exist, execute the internal [`fix-defects`](/.agents/commands/fix-defects.command.md) command with the report in hand, then remove fixed warnings from the qualification reports.
  - _IF_ no defects exist, report "no defects found."

Return a short report of the defects fixed.
