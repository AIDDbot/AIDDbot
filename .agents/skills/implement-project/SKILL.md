---
name: implement-project
description: Implement supplied spec scope or repair findings.
metadata:
  aiddbot-kind: primitive
user-invocable: true
---
# implement-project

Implement supplied spec scope or repair findings.

## Coding
Work one project at a time on the owner branch. Follow its rules file, do not weaken assertions, and stop when the default branch is checked out. Respect shared-file and Git-index ownership.

Implement the approved plan from the solution section in order. Read the spec's schema impact and this project's schema documents under `{Product_Folder}/model/`; build exactly the declared entity, table, and endpoint shape, including every declared status code. Return client failures with their declared 4xx status through the project's error mechanism; never answer them with a success status and an empty body, or with a 500. When the work needs an undeclared shape change, stop and return it for spec approval instead of making it. For E2E scope, use the spec's requirement IDs and respect their state (new, changed, deprecated, related).

## Testing
For production code write unit tests for the critical section and make them pass. Do not write unit tests for UI-related code.
When the scope includes E2E tests, write or repair them from the spec and reported evidence, but do not enumerate or execute commands classified as `Acceptance`, including E2E runs. This prohibition also applies while repairing a red verification report: return the code and test changes for a later `verify-acceptance` run. Do not unit-test E2E tests.
E2E tests run in parallel against one shared database per run. Make each test create the data it needs with unique identifiers, and never depend on test order, pre-existing data, or global counts.

## Linting
Use only the command classified as error-level lint in the project rules. Confirm from its effective flags and referenced configuration that it reports error-severity diagnostics without denying warnings or enabling complexity, coverage, strict analysis, full-repository checks, or other hardening. The script name alone is not evidence of its severity.

Run that soft lint after each change and fix its errors. Never enumerate or execute commands classified as `Quality`. If no unambiguous error-level lint is configured, record it as unavailable in the journal instead of substituting or constructing a command.

Execute `record-journal` for each high-level coding, testing, linting, and failure event with `stage: build`, the spec ID when there is one, and the project name.

Commit following the conventional commit `{feat|fix|chore|test|docs:message}`.
