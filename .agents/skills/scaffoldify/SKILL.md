---
name: scaffoldify
description: Materialize an explicitly chosen, installable solution scaffold.
metadata:
  aiddbot-kind: primitive
user-invocable: true
disable-model-invocation: true
---
# scaffoldify

Your goal is to materialize an installable solution scaffold.

Resolve and obtain confirmation for the material choices in the [scaffold contract](./references/scaffold.contract.md). Run the local [materializer](./scripts/materialize.js) for catalogued tiers; use confirmed official tooling outside that catalog. After materialization, reconcile the root README yourself as the contract requires.

Never create or switch a branch, commit, overwrite a non-empty project directory, or proceed over unresolved conflicts or unrelated changes.

The result is an installable, smoke-tested solution scaffold.

Commit: never; the caller owns commits.
