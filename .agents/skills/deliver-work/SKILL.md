---
name: deliver-work
description: Route scoped work through one specification or a coordinated change.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# deliver-work

Your goal is to deliver scoped work through the normal specification pipeline.

- Read and execute [scope-feature](../scope-feature/SKILL.md) with the requirement in hand.
- _IF_ the scope report affects one specification, read and execute [deliver-spec](../deliver-spec/SKILL.md).
- _IF_ the scope report affects coordinated specifications, read and execute [deliver-change](../deliver-change/SKILL.md).

Return the delivered specification or coordinated change.
