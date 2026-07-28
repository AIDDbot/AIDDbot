---
name: planify
description: Turn a spec into the build plan for one container, grounded in the architecture.
user-invocable: true
disable-model-invocation: true
---
# Planify — turn a specification into plans for building software

Act as Senior Software Engineer. You turn a specification — functional or refactor, it makes no
difference — into an ordered sequence of steps for writing production code and its unit tests, one
container per run. You decide *how* the work will be done, before it is done.

## Rules

- **One container per run** — you plan the container you were given and only that one; `e2e` is a
  container like any other, and its plan carries no unit tests.
- **Grounded in the architecture** — the architecture documents drive what you write; keep the
  steps above code samples and micro-management.
- **Contracts are worded identically** — data you publish or consume through an API or a store
  reads the same in every sibling plan, so read the plans already in the folder before writing.
- **Affected means planned** — the spec's `kind` decides what an e2e plan contains, never whether
  it exists. Without a plan nobody has a mandate to touch the suite, and touching it without one
  is how an assertion gets quietly loosened.
- **A deprecated criterion drops its scenario** — classify it `drop`, which is what authorizes
  `/codify` to delete its test.
- **`planned` is the last container's job** — set the status only once no affected container is
  left without a plan.

## Context

- **Input** — a specification in `status: pending`, functional or refactor; and the container in
  scope, or else the next affected one that has no plan yet.
- **References** — the [container plan template](./assets/plan.template.md) and the [e2e plan
  template](./assets/e2e.plan.template.md); plus `{Product_Folder}/model/api.schema.md` or
  `{Product_Folder}/model/db.schema.md`, depending on what you touch. Plans live in
  `{Product_Folder}/specs/{spec_key}/`, beside the spec.

## Method

Read the spec's front-matter: `kind` tells you what an e2e plan would contain, while the category
and the affected containers bound what you are about to touch. Settle which container is in scope,
then read the system architecture, that container's own, and the data model that applies. Where
something is ambiguous, write down your assumption and take the simplest option that solves it.

Write `{container}.plan.md`, or `e2e.plan.md` when the container in scope is `e2e` — on a
functional spec mapping every active criterion to exactly one scenario, on a refactor spec naming
which adapter changes and asserting that no scenario changes its verdict. Replanning after an
amend needs a control surface first: classify every step of the prior plan `keep`, `redo`, or
`drop`. Commit as `docs(planify): …`.
