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

- Determine the scope of the change using [scope-feature](../scope-feature/SKILL.md).
- Execute [deliver-change](../deliver-change/SKILL.md) with the determined scope.
