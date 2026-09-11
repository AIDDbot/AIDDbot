---
name: scaffoldify
description: Resolve solution archetypes, materialize the scaffold, and reconcile root documentation and metadata.
metadata:
  aiddbot-kind: primitive
user-invocable: true
disable-model-invocation: true
---
# scaffoldify

Your goal is to determine the archetypes a solution needs and materialize an installable and runnable scaffold (no business logic).

Resolve and obtain confirmation for the material choices in the [scaffold contract](./references/scaffold.contract.md).

Commit pending changes and switch to a new branch `chore/scaffold`

Resolve each container independently: run the local modern-Node [materializer](./scripts/materialize.mjs) for catalogued tiers; for technologies outside the catalog, research and use official scaffolding tools or instructions as the contract requires. A solution may combine both sources.

After all containers are materialized, reconcile the root documentation and metadata using the [reconciliation guide](./references/root-reconciliation.md) and fill the [solution README template](./assets/solution-readme.template.md). The script supplies minimal metadata; you supply the grounded project narrative and authorship.

The result is an installable, smoke-tested solution scaffold with coherent root documentation and metadata.

Commit and merge to default branch.
