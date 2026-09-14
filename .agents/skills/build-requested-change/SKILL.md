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
    - Read [the specify skill](../specify/SKILL.md) and follow its instructions with the request, scope, and id.
- Wait for the approved spec before starting implementation.
- _SPAWN_ a _Builder_ agent to read [the implement-change skill](../implement-change/SKILL.md) and follow its instructions with the approved spec and PRD delta; wait for its result.
- _SPAWN_ a _Craftsman_ agent to read [the ship-implementation skill](../ship-implementation/SKILL.md) and follow its instructions with the implemented spec; wait for its result.

_RETURN_ the shipped spec or its concrete blocker.
