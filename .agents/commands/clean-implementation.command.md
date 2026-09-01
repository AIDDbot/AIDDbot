---
name: clean-implementation
description: Clean code by finding CRAP violations and lint issues

---
# clean-implementation

The goal of this command is to clean code by finding CRAP violations and lint issues and generate a report of defects to fix them. Not for a specification, but for the whole codebase.

- Spawn a new **Craftsman** sub-agent to run the following steps and generate a report of defects to fix them:
  - Run lint scripts that search for Cyclomatic Complexity violations.
  - Run test coverage scripts that search for poor test coverage.
  - Run hard lint scripts that search for other warnings and errors.

- _Triage_:
    - _IF_ there are defects, spawn a new **Builder** sub-agent to run the [`/fix-defects`](./fix-defects.command.md) command to fix the defects by passing the report in hand.
    - _IF_ there are no defects, return a short report of "no defects found".