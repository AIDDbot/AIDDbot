# Codify — write the code the plan describes

`/codify` is the only skill that writes application code. It implements one plan at a time
— a software-container plan, the e2e plan, or a fix described by a report — producing
working code with tests. For software containers it smoke- and unit-tests; for e2e it only
checks the suite compiles and lints, leaving the run to `/verify`. It plays a Senior
Software Engineer who thinks before typing and changes as little as possible.

## What it's for

Plans and specs describe intent; `/codify` makes it real. It maps plan steps to code,
honors contracts shared with sibling containers, and keeps the spec's status current. It
also handles corrective work in a dedicated **fix mode**: defects from a `/verify` report
or findings from a `/review` report.

Use it after `/planify` to implement a container plan or the e2e plan, or to fix a report.
It runs once per plan; software-container runs can go in parallel, e2e is its own run and
loops with `/verify` until the suite is green.

Position: it follows `/planify`. Software-container runs hand off to another `/codify`
(next container, then the e2e run); e2e and fix runs hand off to `/verify`.

## In and out

- **Input:** a container plan, `e2e.plan.md`, a defects/review report, or a fix
  description.
- **Working source code** for the container in scope.
- **Unit tests** for the critical path on software containers; **the e2e suite** (from
  `e2e.plan.md`) in e2e mode — compiled and linted but *not run* here.
- Updated plan checkboxes and the spec set to `status: in-progress` after any code step.

## The rules it never breaks

- **Think before you code** — weigh a couple of alternatives, then pick the simplest (KISS).
- **Surgical changes** — the minimum change that meets the goal (YAGNI).
- **Goal-driven** — keep going until the task is complete.
- **Status on every code step** — set the spec to `in-progress` after writing code.
- **e2e is compile-only here** — write and compile/lint the suite, never run it; that's
  `/verify`'s job.

See [SKILL.md](./SKILL.md) for the exact steps and verification checklist.
