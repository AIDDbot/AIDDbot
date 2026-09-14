---
name: scaffoldify
description: Resolve solution archetypes, materialize the scaffold, and reconcile root documentation and metadata.
metadata:
  aiddbot-kind: primitive
user-invocable: true
disable-model-invocation: true
---
# scaffoldify

Determine the archetypes a solution needs and materialize an installable and runnable scaffold (no business logic).

Clarify the solution name, problem, intended users, and proposed solution.

Before proposing containers or technologies, run `node .agents/skills/scaffoldify/scripts/materialize.mjs --list` as the catalog authority. Start from its available archetypes. Justify non-catalogued alternatives with a concrete need the catalog does not cover or an explicit user preference, and verify their official scaffolding support.

For each tier in `back`, `front`, `e2e`, and `cli`, discuss its responsibility, language, framework, and destination. Offer the catalogued archetype, any justified alternative, or omission of the tier; let the user have the final say. Show a table with the proposed scaffolding and wait for user confirmation.

**Git process**: Commit pending changes and switch to a new branch `chore/scaffold` before materializing.

Resolve each container independently. A solution may combine both sources.

Then run one confirmed invocation with `--name {solution_name}` and one flag per selected catalog tier. 

For example, when the user selects the catalog's Express backend and standard frontend, run:

```text
node .agents/skills/scaffoldify/scripts/materialize.mjs --name "My solution" --back express --front standard
```

For non-catalogued technologies, search for their official scaffolding support on the internet.

Install and run smoke tests (or e2e if available) for each container.

After all containers are materialized, reconcile the root documentation and metadata using the [reconciliation guide](./references/root-reconciliation.md) and fill the [solution README template](./assets/solution-readme.template.md). 

The result is a smoke-tested solution scaffold with coherent root documentation and metadata.

**Git process**: Commit changes and merge to `main` or `master` branch after materializing.


Return a short summary of the tiers materialized or pending.
