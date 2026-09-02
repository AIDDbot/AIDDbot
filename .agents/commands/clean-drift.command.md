---
name: clean-drift
description: Clean code by finding drift and code decay

---
# clean-drift

The goal of this command is to clean code by finding drift and code decay and generate a report of defects to fix them. Not for a specification, but for the whole codebase.

- Spawn a new **Craftsman** sub-agent to look for orphaned decay and code drift in qualify reports at any spec featured in the codebase.

- _Triage_:
    - _IF_ there are defects, spawn a new **Builder** sub-agent to run the [`/fix-defects`](./fix-defects.command.md) command to fix the defects by passing the report in hand and remove warnings fixed from the reports.
    - _IF_ there are no defects, return a short report of "no defects found".

Return a short report of the defects fixed.