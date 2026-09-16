---
name: codify
description: Implement supplied spec scope or repair findings.
metadata:
  aiddbot-kind: primitive
user-invocable: true
disable-model-invocation: false
---
# codify

Implement supplied spec scope or repair findings.

## Coding
Work one project at a time on the owner branch. Follow its rules file, do not weaken assertions, and stop when the default branch is checked out. Respect shared-file and Git-index ownership.

Implement the approved plan from the solution section in order. For E2E scope, use the spec's requirement IDs and respect their state (new, changed, deprecated, related).

## Testing
For production code write unit tests for the critical section and make them pass. Do not write unit test for UI-related code. 
If writing E2E tests, do not unit-testing those tests.

## Linting
Run basic lint (`bun lint`, errors only) after each change and fix what it reports. Do not look for hard checks (warnings, complexity, coverage) at this stage.

## Journaling

Keep a journal of your work in the a `journal.md` file in the spec folder. Just write down high-level entries about each project implmentation work (coded, tested, linted... failures)

Commit following the conventional commit `{feat|fix|chore|test|docs:message}`.
