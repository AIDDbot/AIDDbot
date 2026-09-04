---
name: build-requested-change
description: Build a requested change through one specification or a coordinated change.
metadata:
  aiddbot-kind: orchestrator
user-invocable: true
disable-model-invocation: true
---
# build-requested-change

Your goal is to **build a requested change** from initial analysis through delivery.

- Execute [scope-feature](../scope-feature/SKILL.md) command with the requested change in hand.
- _IF_ the scope report affects one specification, 
  - _THEN_ execute [deliver-spec](../deliver-spec/SKILL.md) command.
- _IF_ the scope report affects several coordinated specifications, 
  - _THEN_ execute [deliver-change](../deliver-change/SKILL.md) command.

- _RETURN_ a released change implemented and verified.
