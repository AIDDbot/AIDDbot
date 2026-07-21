# Codify — write the code the plan describes

`/codify` is the only skill in the pipeline that writes application code. It implements
one plan at a time — a software-container plan, the e2e plan, or a fix described by a
report — producing working code with tests. For software containers it smoke-tests and
unit-tests; for e2e it only checks that the suite compiles and lints, leaving the actual
run to `/verify`.

It plays a Senior Software Engineer who thinks before typing and changes as little as
possible.

## What it's for

Plans and specs describe intent; `/codify` makes it real. It maps plan steps to code
changes, honors the contracts shared with sibling containers, and keeps the spec's status
current. It also handles corrective work: fixing defects from a `/verify` report or
findings from a `/review` report, in a dedicated fix mode.

## When to use it

- To implement a container plan or the e2e plan after `/planify`.
- To fix a report — a `/verify` defects report or a `/review` gate report — in fix mode.

Position: it follows `/planify` (and loops with `/verify` until the suite is green). It
is run once per plan; software-container runs can happen in parallel, e2e is its own run.

## What you give it

- **Required:** a container plan, the `e2e.plan.md`, a defects/review report, or a plain
  fix description.

## What it produces

- **Working source code** for the container in scope.
- **Unit tests** for the critical path (happy path plus errors) on software containers.
- **The e2e test suite**, written from `e2e.plan.md`, when in e2e mode — compiled and
  linted but *not run* here (test titles carry their AC ids).
- Updated **plan checkboxes** (`[x]` for each in-scope step) and the spec set to
  **`status: in-progress`** after any code-writing step.

## How it behaves (the rules it never breaks)

- **Think before you code.** It elaborates a couple of alternative solutions first.
- **Simplicity first (KISS).** It picks the simplest solution that meets the goal.
- **Surgical changes (YAGNI).** It makes the minimum change that meets the goal.
- **Goal-driven.** It keeps going until the task is actually complete.
- **Status on every code step.** After each code-writing implement run it sets the spec
  to `in-progress`.
- **e2e is compile-only here.** It writes the e2e suite and checks it compiles and lints,
  but never runs the e2e tests — running them is `/verify`'s job.

## How it works, step by step

1. **Research.** It identifies the input, derives the spec and container ids, and — if no
   single plan is given — asks which container to scope. It reads `system.arch.md` to
   confirm the tier, then the container architecture (non-`db`) or relational schema
   (`db`). In e2e mode it reads the e2e plan and the spec's criteria.
2. **Plan.** It reads API and data field shapes when touching an API or the store, maps
   plan steps to code changes while respecting shared contracts, and — in e2e mode — maps
   every criterion id to its scenario.
3. **Implement.** It commits any pending changes to start clean, annotates any plan
   deviations, checks off in-scope plan steps, and sets the spec to `in-progress`. Then,
   by mode:
   - **e2e:** write the suite from the plan (no unit tests), run a compile check and the
     linter (not the tests), commit, and hand off to `/verify`.
   - **software container:** write code that compiles and runs, write unit tests for the
     critical path, run the smoke test and unit tests until they pass, commit, and hand
     off to another `/codify`.
   - **fix:** create a `fix/{slug}` branch when on the default branch, apply the minimal
     fix per defect or finding, annotate deviations, check off steps, run smoke and unit
     tests until green (for an e2e fix, compile and lint only — don't run e2e tests),
     commit, and hand off to `/verify`.

## How you know it worked

- Software container: the smoke test passes and unit tests pass.
- e2e: the suite compiles and lints clean, and the tests were *not* run.
- Every in-scope plan step is checked, or every in-scope report entry is fixed.
- The related spec's status is `in-progress` when a spec is in scope.

## Where it hands off

To `/verify` for e2e and fix modes (so the suite gets run and judged), or to another
`/codify` run when more software containers remain.
