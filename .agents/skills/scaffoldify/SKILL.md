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

Before suggesting technologies, run `node .agents/skills/scaffoldify/scripts/materialize.mjs --list` as the catalog authority.

- For each tier in `back`, `front`, `e2e`, and `cli`, 
    - discuss that tier (responibility, language, framework, destination)
    - offer the the actual arquetype solution, plus an alternative or omit the tier  
    - let user have the final say
- Show a table with the proposed scaffolding and wait for user confirmation.

**Git process**: Commit pending changes and switch to a new branch `chore/scaffold` before materializing.

Resolve each container independently. A solution may combine both sources.

Then run one confirmed invocation with `--name {solution_name}` and one flag per selected catalog tier. 

For example, when the user selects the catalog's Express backend and standard frontend, run:

```text
node .agents/skills/scaffoldify/scripts/materialize.mjs --name "My solution" --back express --front standard
```

For non-catalogued technologies, search for their official scaffolding support on the internet.

After all containers are materialized, reconcile the root documentation and metadata using the [reconciliation guide](./references/root-reconciliation.md) and fill the [solution README template](./assets/solution-readme.template.md). The script supplies minimal metadata; you supply the grounded project narrative and authorship.

The result is an installable, smoke-tested solution scaffold with coherent root documentation and metadata.

**Git process**: Commit and merge to default branch after materializing.

Return a short summary of the tiers materialized or pending.
