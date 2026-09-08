---
name: codify
description: Implement a container or e2e plan, or fix a report, with tests.
metadata:
  aiddbot-kind: primitive
user-invocable: true
disable-model-invocation: true
---
# codify

Your goal is to implement supplied change tasks or resolve reported review and Craft findings.

One container at a time; if you were not given one, work it out or ask. Follow `{container}.rules.md`. Never weaken a failing assertion. Never run the e2e suite — in an e2e container, compile and lint only. When you write e2e tests, carry each criterion's id in its test title.

If no plan is required, implement directly from the supplied change scope and criteria without creating a plan artifact. Work on the current branch — never create or switch branches. Before writing source or test files, resolve the repository's default branch from `{Agents_File}`; if the current branch is the default branch, stop and ask the caller to establish a working branch. Respect shared-file ownership and do not overlap another writer or Git-index update. Write the smallest change that resolves each task and note deviations. Lint, build, unit-test, and perform the stated criterion checks where they apply. When qualification is skipped, return recorded evidence for every technical criterion. The delivery worker owns aggregate change status.

The result is code that compiles, lints, and unit-tests green.

Commit following the conventional commit for the kind of change.
