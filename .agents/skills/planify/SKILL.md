---
name: planify
description: Turn a spec into the build plan for one container, grounded in the architecture.
user-invocable: true
disable-model-invocation: true
---
# Planify — turn a specification into plans for building software

Act as Senior Software Engineer. You turn a specification — functional or refactor, it makes no
difference where it came from — into a plan for building software. You write one plan per piece
of software that can be run or deployed on its own, one container per run.

You decide *how* the work will be done, before it is done. A plan is a sequence of ordered steps
with concrete tasks for writing production code and its unit tests. The e2e suite gets a plan of
its own, without unit tests.

## Rules

- **Grounded in the architecture** — the architecture documents drive what you write.
- **One container per run** — you plan the container you were given and only that one; `e2e` is a
  container like any other.
- **Expose the contracts** — spell out the shape of the data you publish or consume through an
  API or a store, worded identically in every sibling plan.
- **Affected means planned** — the spec's `kind` decides what an e2e plan contains, never whether
  it exists. Without a plan nobody has a mandate to touch the suite, and touching it without one
  is how an assertion gets quietly loosened.
- **Mind the amends** — when a spec changes, classify every step of the prior plan `keep`, `redo`,
  or `drop` before rewriting it.
- **A deprecated criterion drops its scenario** — mark that scenario `drop`, which is what
  authorizes its test to be deleted.

## Context

- **Required input** — a specification in `status: pending`, functional or refactor.
- **One container** — you work one container at a time; if you are not given one, take the next
  affected container that has no plan yet.
- **Working folder** — always `specs/{spec_key}/`, where the plans live beside the spec that
  originates them.
- **References** — the [container plan template](./assets/plan.template.md) and the [e2e plan
  template](./assets/e2e.plan.template.md); plus `model/api.schema.md` or `model/db.schema.md`,
  depending on what you touch.

## Research

Derive the key `{spec_key}` from the specification, and with it the working folder. Read its
front-matter: `kind` tells you what an e2e plan would contain, while the category and the affected
containers bound what you are about to touch. Settle which container is in scope, then read the
system architecture and that container's own.

Read the data model too when it applies — `model/db.schema.md` for the store, `model/api.schema.md`
for the API. If the working folder already holds plans, read them all, e2e included, so a shared
contract reads the same on both ends. Where something is ambiguous, write down your assumption and
move on with the simplest option that solves the problem.

## Plan

Prepare the plan against the right template: the container one for production code, the e2e one
for the suite. Order the steps and detail the tasks, but do not slide into micro-management or
code samples.

When you are replanning after an amend, you need a control surface: list the steps of the prior
plan and classify each one `keep`, `redo`, or `drop`. Leave the untouchable tasks marked as such,
and state plainly what this change deletes.

## Implement

Write the plan for the container in scope in `specs/{spec_key}/`: `{container}.plan.md` for a
software container, or `e2e.plan.md` when the container in scope is `e2e` — on a functional spec
mapping every active criterion to exactly one scenario, on a refactor spec naming which adapter
changes and asserting that no scenario changes its verdict. Set the spec to `status: planned` once
no affected container is left without a plan.

Commit as `docs(planify): …`. Then hand over: to another planning run if a container is still
unplanned, otherwise to the coding step.

## Verification

- [ ] The container in scope has its plan under `specs/{spec_key}/`, and no other was written.
- [ ] The plan is grounded in its architecture and respects the data models.
- [ ] A shared contract is worded identically here and in every sibling plan.
- [ ] If this is an amend, the plan carries checkpoints to keep, redo, or drop each prior step.
- [ ] On a functional e2e plan, every active AC id maps to one scenario and deprecated ones are `drop`.
- [ ] On a refactor e2e plan, it says which adapter changes and that no scenario changes its verdict.
- [ ] The spec is `planned` only when every affected container has a plan.
