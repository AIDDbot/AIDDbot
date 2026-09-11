---
name: build-requested-change
description: Classify and deliver a requested change with only its applicable stages.
metadata:
  aiddbot-kind: orchestrator
user-invocable: true
disable-model-invocation: true
---
# build-requested-change

Your goal is to **deliver one requested change**.

- Determine the scope of the change using [scope-change](../scope-change/SKILL.md).
- Execute [deliver-change](../deliver-change/SKILL.md) with the determined scope.

Suggests continue with [build-requested-change workflow](../build-requested-change/SKILL.md) for another feature or perform a craft revision running the [craft-lasting-quality workflow](../craft-lasting-quality/SKILL.md).
