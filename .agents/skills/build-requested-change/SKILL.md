---
name: build-requested-change
description: Deliver one requested change with its necessary contracts, checks, and evidence.
metadata:
  aiddbot-kind: orchestrator
user-invocable: true
disable-model-invocation: true
---
# build-requested-change

Your goal is to **deliver one requested change**.

## Determine the change

- _SPAWN_ a new _Architect_ agent to:
  - Read the PRD, relevant architecture, findings, and only candidate specifications selected through [spec discovery](./references/discovery.md).
  - Resolve a verifiable scope, risks, and affected contracts.
  - Determine `change_key` and any new spec identities from `{Agents_File}`.
  - Create or switch to `change/{change_key}`.
  - Write `{Product_Folder}/changes/{change_key}/change.md` from the [change template](./assets/change.template.md).
  - Commit as `docs(change): …`.

## Deliver the change

### Generate specifications

- _FOR-EACH_ created or amended specification:
  - _SPAWN_ an _Architect_ agent to execute [specify-spec](../specify-spec/SKILL.md) sequentially.

### Implement and ship

- _SPAWN_ a _Builder_ agent to execute [implement-change](../implement-change/SKILL.md) once for the complete change.
- _SPAWN_ a _Craftsman_ agent to execute [ship-implementation](../ship-implementation/SKILL.md) once for the complete change.

_RETURN_ the delivered change or its concrete blocker.
