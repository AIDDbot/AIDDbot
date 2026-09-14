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

For E2E scope, use the spec's requirement IDs: `new` creates tests, `changed` updates them, `deprecated` removes obsolete tests, and `related` preserves regression coverage. Preserve assertions for active requirements in shared tests.

The result is implemented code and tests.

Commit following the project convention.
