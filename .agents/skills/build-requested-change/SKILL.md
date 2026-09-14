---
name: build-requested-change
description: Deliver one requested spec with its checks and evidence.
metadata:
  aiddbot-kind: orchestrator
user-invocable: true
disable-model-invocation: true
---
# build-requested-change

Your goal is to deliver one requested spec.

- _SPAWN_ an _Architect_ agent to read the PRD, relevant container rules, and current findings; reserve the spec ID and any requirement IDs in `counters.yaml`; define one small scope and type; create its branch; and execute [specify-spec](../specify-spec/SKILL.md).
- _SPAWN_ a _Builder_ agent to execute [implement-change](../implement-change/SKILL.md).
- _SPAWN_ a _Craftsman_ agent to execute [ship-implementation](../ship-implementation/SKILL.md).

_RETURN_ the shipped spec or its concrete blocker.
