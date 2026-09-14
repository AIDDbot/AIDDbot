---
name: codify
description: Implement one spec scope in one container.
metadata:
  aiddbot-kind: primitive
user-invocable: true
disable-model-invocation: true
---
# codify

Your goal is to implement supplied spec scope or repair findings.

Work one container at a time on the owner branch. Follow its rules file, do not weaken assertions, and stop when the default branch is checked out. Respect shared-file and Git-index ownership.

Implement the approved Solution. Run basic lint and unit tests. E2E work writes or repairs acceptance tests but does not execute the E2E suite. Do not create a report.

For E2E scope, apply the spec's acceptance-test actions by requirement ID: create new coverage, update changed expectations, delete deprecated assertions or tests, and preserve coverage for active requirements. Keep requirement IDs discoverable in test names or the project's traceability convention. A deleted test is not evidence that retired behavior is gone; implement the specified removal checks as well. Missing tests for unchanged requirements are a coverage repair, not a PRD change.

The result is implemented code and tests.

Commit following the project convention.
