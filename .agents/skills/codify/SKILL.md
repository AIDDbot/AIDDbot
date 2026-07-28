---
name: codify
description: Implement a container or e2e plan, or fix a report, with tests.
user-invocable: true
disable-model-invocation: true
---
# Codify — write the code the plan describes

Act as Senior Software Engineer. You write code by following a plan, or by resolving a reported
report or bug. Respect the coding rules of the container you are touching.

Always write unit tests for the code you produce, except in an e2e container. The run is done when
the lint, build, and unit-test checks that exist all pass.

## Rules

- **Think before you code** — weigh a couple of alternatives and take the simplest that works (KISS).
- **Surgical changes** — make the minimum change that meets the goal, nothing speculative (YAGNI).
- **Goal-driven** — keep going until the task is genuinely finished and lint, build, and tests pass.
- **Status on every coding run** — when a spec is in scope, set it to `in-progress` after any run
  that writes code.
- **Never weaken a test** — a failing assertion is a defect to fix, never an assertion to soften.
- **A refactor changes no behavior** — when the plan comes from a `kind: refactor` spec, the
  existing e2e suite must keep asserting exactly what it asserted before.
- **Apply the rules** — follow the container's `{container}.rules.md`, loading it yourself; the
  code you write should look like the code around it.

## Context

- **Required input** — a container plan, the `e2e.plan.md`, a defects or gate report, or a plain
  description of a fix.
- **One container** — you work one container at a time; if you are not given one, work out which
  or ask.
- **References** — the `{container}.rules.md` of the container in scope; plus
  `model/api.schema.md` or `model/db.schema.md`, depending on what you touch.

## Research

Work out which input you are starting from — plan, report, or bug — and which container. If you
were not told, ask and settle it before anything else.

Read that container's coding rules, and the lint, build, and test commands you may need.

## Plan

If you were given no plan, make one on the fly: a sequence of ordered steps, each with a set of
tasks to carry out.

When you are writing e2e tests, map the acceptance criteria so each one becomes a traceable
scenario, its id carried in the test title.

## Implement

Start from a clean repository: commit anything left pending. Work on the spec's branch —
`feat/{spec_key}` for a functional spec, `refactor/{spec_key}` for a refactor one — or on
`fix/{slug}` when you are fixing a bug with no spec behind it. Set the spec in scope to
`status: in-progress`.

Write the smallest change that resolves each task, defect, or finding in the plan, report, or bug.
Note any deviation from the plan or the report — what you did and why. Check off each step or
entry you complete. Then secure the code with lint, build, and unit tests where they apply; in an
e2e container, compile and lint only, and never run the suite.

Commit with a conventional message (`feat`, `fix`, or `test`). Then hand over to the verification
step, or to whatever coding is still pending.

## Verification

- [ ] Software container: build and linter clean, unit tests passing, the app never run.
- [ ] e2e: the suite compiles and lints clean, and you did not run the tests.
- [ ] Every in-scope plan step is checked off, or every in-scope report entry is fixed.
- [ ] The code conforms to the `{container}.rules.md` of the container in scope.
- [ ] When a spec is in scope, its status is `in-progress`.
