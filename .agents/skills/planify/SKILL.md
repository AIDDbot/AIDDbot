---
name: planify
description: Turn a spec into the build plan for one container, grounded in the architecture.
user-invocable: true
disable-model-invocation: true
---
# planify

Your goal is to turn a specification into the build plan for one container.

One container per run; if you were not given one, ask. Ground the plan in that container's architecture. Data you publish or consume through an API or a store is worded the same in every sibling plan. On amend, classify every prior step `keep`, `redo`, or `drop`; a deprecated criterion is `drop`.

A functional spec's `e2e` container uses the [e2e plan](./assets/e2e.plan.template.md) and carries no unit tests. A technical spec does not get an e2e scenario plan. Everything else uses the [container plan](./assets/plan.template.md).

Write `{Product_Folder}/specs/{spec_key}/{container}.plan.md`. Set the spec to `planned` only when no affected container is left without a plan.

The result is that container's plan.

Commit as `docs(planify): …`.
