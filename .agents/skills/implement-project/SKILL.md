---
name: implement-project
description: Implement supplied spec scope or repair findings.
metadata:
  aiddbot-kind: primitive
user-invocable: true
---
# implement-project

Your goal is to implement one project's share of an approved spec, or repair the findings supplied for it.

Work on the spec's branch and stop if the default branch is checked out. Follow the project's rules file, never weaken an assertion, and commit only this project's changes.

Build exactly the shape the spec's schema impact declares against this project's schema documents under `{Product_Folder}/model/`, including every declared status code. Return client failures with their declared 4xx status through the project's error mechanism, never as a success with an empty body or as a 500. When the work needs a shape the spec does not declare, stop and return it for approval instead of building it.

Write unit tests for the critical production code and make them pass; do not unit-test UI code or E2E tests. When the scope includes E2E tests, write or repair them from the spec's requirement IDs and their state, but never execute them or any other command classified as `Acceptance`, not even while repairing a red verification: `verify-acceptance` runs them. Each E2E test creates its own data with unique identifiers and never depends on test order, pre-existing data, or global counts, because the suite runs in parallel against one shared database.

After each change, run only the project's error-level lint and fix its errors. Confirm from its effective flags and configuration, not its script name, that it adds no warning denial, complexity, coverage, or other hardening; those are `Quality` commands, which you never run. If no unambiguous error-level lint exists, journal it as unavailable, amber, instead of constructing one.

Journal each coding, testing, linting, and failure milestone, naming the project.

The result is the project's code and tests for the supplied scope, lint-clean.

Commit as a conventional commit: `{feat|fix|refactor|test|chore}({project}): {description}`.
