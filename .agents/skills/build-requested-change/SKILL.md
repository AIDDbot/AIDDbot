---
name: build-requested-change
description: Classify and deliver a requested change with only its applicable stages.
metadata:
  aiddbot-kind: orchestrator
user-invocable: true
disable-model-invocation: true
---
# build-requested-change

Your goal is to **deliver one classified change**.

## Determine the scope
- _SPAWN_ a new _Architect_ agent to:
### Resolve change properties
  - Read the PRD, relevant specifications, findings, and architecture.
  - Follow [the classification triage contract](./references/triage.md).
  - Resolve the change properties:
    - `origin`, `kind`, `intent`, `complexity`, derived stages, criteria, and scope.
  - Determine `change_key` = `{change_id}-{slug}`.
### Generate Branch and Change Manifest
  - Create or switch to `change/{change_key}`.
  - Write `{Product_Folder}/changes/{change_key}/change.md` from the [change template](./assets/change.manifest.template.md).
  - Commit as `docs(change): …`.
  
## Deliver the change with the determined scope.
### Generate Specifications
- _FOR-EACH_ referenced specification in manifest:
  - _SPAWN_ an _Architect_ agent to execute [specify-spec](../specify-spec/SKILL.md) sequentially.
### Implement and Ship
- _SPAWN_ a _Builder_ agent to execute [implement-spec](../implement-spec/SKILL.md) once for the complete change.
- _SPAWN_ a _Craftsman_ agent to execute [ship-implementation](../ship-implementation/SKILL.md) once for the complete change.

_RETURN_ the delivered change or its concrete blocker.
