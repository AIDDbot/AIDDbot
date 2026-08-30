---
name: planify
description: Turn a spec into the build plan for one container, grounded in the architecture.
user-invocable: true
disable-model-invocation: true
---
# Planify — turn a specification into plans for building software

Act as a Senior Software Engineer. You turn a specification — functional or technical — into an ordered sequence of steps for writing production code and its unit tests, one container per run. 
You decide *how* the work will be done, before it is done.

## Rules

- **One container per run** — you plan the container you were given and only that one.
- **e2e** is a container like any other, but its plan carries no unit tests.
- **Grounded in the architecture** — the architecture documents drive what you write.
- **Contracts are worded identically** — data you publish or consume through an API or a store reads the same in every sibling plan.
- **A deprecated criterion drops its scenario** — classify it `drop`, which is what authorizes `/codify` to delete its test.
- **Set the spec status** — set the status as `planned` only once no affected container is left without a plan.

## Context

- **Input** — a specification in `status: pending`,and the container in scope.
- **References** 
  - the [container plan template](./assets/plan.template.md),
  - the [e2e plan template](./assets/e2e.plan.template.md),
  - `{Product_Folder}/model/api.schema.md` or `{Product_Folder}/model/db.schema.md`, depending on what you touch.
  - Plans live in `{Product_Folder}/specs/{spec_key}/`, beside the spec.

## Method

Load the reference and template for the given kind. 
Read the system architecture and the kind's other inputs from its reference.
Then write `{Product_Folder}/specs/{spec_key}/{container}.plan.md`, and commit as `docs(planify): …`.
