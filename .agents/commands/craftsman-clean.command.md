---
name: craftsman-clean
description: Craftsman (C) — clean code by finding CRAP violations and lint issues
agent: craftsman
---
# craftsman-clean

Your goal is to clean code by finding CRAP violations and lint issues and generates a report of defects to fix them. Not for a specification, but for the whole codebase.

Run lint scripts that search for Cyclomatic Complexity violations.
Run test coverage scripts that search for poor test coverage.
Run hard lint scripts that search for other warnings and errors.

The result is a report with found defects to be fixed or a clean sheet when no defects are found.

Use the result as an input to be fixed by the Builder agent in a new session, running [`/builder-fix`](./builder-fix.command.md) command and passing the report in hand.
