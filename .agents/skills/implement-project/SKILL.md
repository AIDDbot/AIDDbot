---
name: implement-project
description: Implement supplied spec scope or repair findings.
metadata:
  aiddbot-kind: primitive
user-invocable: true
disable-model-invocation: false
---
# implement-project

Implement supplied spec scope or repair findings.

## Coding
Work one project at a time on the owner branch. Follow its rules file, do not weaken assertions, and stop when the default branch is checked out. Respect shared-file and Git-index ownership.

Implement the approved plan from the solution section in order. For E2E scope, use the spec's requirement IDs and respect their state (new, changed, deprecated, related).

## Testing
For production code write unit tests for the critical section and make them pass. Do not write unit tests for UI-related code.
If writing E2E tests, do not unit-test those tests.

## Linting
Use only the command classified as error-level lint in the project rules. Confirm from its effective flags and referenced configuration that it reports error-severity diagnostics without denying warnings or enabling complexity, coverage, strict analysis, full-repository checks, or other hardening. The script name alone is not evidence of its severity.

Run that soft lint after each change and fix its errors. Never enumerate or execute commands classified as `Acceptance` or `Quality`. If no unambiguous error-level lint is configured, record it as unavailable in the journal instead of substituting or constructing a command.

## Journaling

Keep a journal of your work in the a `journal.md` file in the spec folder. Just write down high-level entries about each project implmentation work (coded, tested, linted... failures)

Commit following the conventional commit `{feat|fix|chore|test|docs:message}`.
