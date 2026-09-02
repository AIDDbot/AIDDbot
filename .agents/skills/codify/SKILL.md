---
name: codify
description: Implement a container or e2e plan, or fix a report, with tests.
user-invocable: true
disable-model-invocation: true
---
# codify

Your goal is to write the code a plan describes, or to resolve a reported defect, failed gate, or bug.

One container at a time; if you were not given one, work it out or ask. Follow `{container}.rules.md`. Never weaken a failing assertion. Never run the e2e suite — in an e2e container, compile and lint only. When you write e2e tests, carry each criterion's id in its test title.

If you were given no plan, make one on the fly. Work on the current branch — never create or switch branches. Before writing source or test files, resolve the repository's default branch from `{Agents_File}`; if the current branch is the default branch, stop and ask the caller to establish a working branch. Write the smallest change that resolves each task, check it off, and note any deviation. Lint, build, and unit-test where they apply. When a spec is in scope, set it to `in-progress`.

The result is code that compiles, lints, and unit-tests green.

Commit following the conventional commit for the kind of change.
