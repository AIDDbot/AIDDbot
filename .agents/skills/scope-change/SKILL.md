---
name: scope-change
description: Classify and persist the common delivery change.
metadata:
  aiddbot-kind: primitive
user-invocable: true
disable-model-invocation: true
---
# scope-change

Your goal is to classify one delivery and persist its common change manifest.

Read the PRD, relevant specifications, findings, and architecture. Follow [the classification contract](./references/triage.md). Resolve the change key, `origin`, `kind`, `intent`, `complexity`, derived stages, criteria, scope, and any specification identities before a branch or artifact is created.

For requested work, clarify material ambiguity with the human one closed question at a time. Craft input comes only from its current finding review. Initial classification is read-only and returns the base revision and complete scope. After the owner establishes `change/{change_key}`, write `{Product_Folder}/changes/{change_key}/change.md` from the [change template](./assets/change.manifest.template.md). Never create or switch branches.

The result is either a read-only classification or the manifest for one delivery.

Commit as `docs(scope-change): …`.
