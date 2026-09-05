---
name: scope-change
description: Resolve specification identity and persist an approved coordinated change scope when needed.
metadata:
  aiddbot-kind: primitive
user-invocable: true
disable-model-invocation: true
---
# scope-change

Your goal is to resolve which specifications a requirement touches and, only for an approved multi-spec delivery, persist its manifest.

Read the PRD, every functional and technical spec, and the architecture. Follow [the triage contract](./references/triage.md). Resolve `key`, `kind`, and `action` before any branch or artifact is created; reserve new spec IDs together so later stages cannot choose different identities.

Clarify ambiguity with the human one closed question at a time. Initial triage is read-only and returns the repository base revision plus the impact map. For one specification, return without a manifest. For several, also reserve the next change ID and return `{change_key}`. After the delivery owner has established `change/{change_key}`, a second call with the approved report writes `{Product_Folder}/changes/{change_key}/change.md` from the [change template](./assets/change.manifest.template.md). Never create or switch branches.

The result is either a read-only scope report or the manifest for an approved coordinated delivery.

Commit as `docs(scope-change): …`.
