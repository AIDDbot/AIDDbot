---
name: build-requested-change
description: Deliver one requested spec with its checks and evidence.
metadata:
  aiddbot-kind: orchestrator
user-invocable: true
disable-model-invocation: true
---
# build-requested-change

Your goal is to **turn a natural-language request into one spec** formally.

- _SPAWN_ an _Architect_ agent  to:
    - Read the PRD, container rules, and findings.
    - Identify one coherent scope, its delivery type.
    - Select requirements to change, deprecate, or preserve.
    - Reserve the spec ID and any new requirement IDs; create or resume its branch.
    - Execute [specify](../specify/SKILL.md) with the request, scope, and id.
- Wait for the approved spec before starting implementation.
- _SPAWN_ a _Builder_ agent to execute [implement-change](../implement-change/SKILL.md) with the approved spec and PRD delta; wait for its result.
- _SPAWN_ a _Craftsman_ agent to execute [ship-implementation](../ship-implementation/SKILL.md) with the implemented spec; wait for its result.

_RETURN_ the shipped spec or its concrete blocker.
