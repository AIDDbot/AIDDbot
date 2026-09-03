---
name: build-requested-change
description: Build a requested change through one specification or a coordinated change.
metadata:
  aiddbot-kind: orchestrator
user-invocable: true
disable-model-invocation: true
---
# build-requested-change

Your goal is to take a requested change from initial analysis through delivery.

Read and execute [scope-feature](../scope-feature/SKILL.md) with the requested change in hand.

- _IF_ the scope report affects one specification, read and execute [deliver-spec](../deliver-spec/SKILL.md).
- _IF_ the scope report affects several coordinated specifications, read and execute [deliver-change](../deliver-change/SKILL.md).

Return a short report of the delivered specification or coordinated change.
