---
name: build-requested-change
description: Classify and deliver a requested change with only its applicable stages.
metadata:
  aiddbot-kind: orchestrator
user-invocable: true
disable-model-invocation: true
---
# build-requested-change

Your goal is to **classify and deliver one requested change**.

- Execute [scope-feature](../scope-feature/SKILL.md) with the request.
- Execute [deliver-change](../deliver-change/SKILL.md) with the classified scope.
- _RETURN_ the release, specification awaiting approval, or blocker.
