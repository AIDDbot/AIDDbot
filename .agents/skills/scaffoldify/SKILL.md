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

Resolve every missing material choice and obtain confirmation using the [scaffold contract](./references/scaffold.contract.md) before writing files. For catalogued tiers, run `aiddbot-scaffold` with the confirmed name and technologies. Research, propose, and obtain confirmation before using official tooling for a technology outside that catalog.

Never create or switch a branch, commit, overwrite a non-empty project directory, or proceed over unresolved conflicts or unrelated changes.

The result is an installable, smoke-tested solution scaffold.
