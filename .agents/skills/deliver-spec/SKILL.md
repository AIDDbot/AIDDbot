---
name: deliver-spec
description: Forward a legacy one-spec delivery into the common change lifecycle.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# deliver-spec

Your goal is to preserve compatibility for callers that still name one-spec delivery.

- Require the caller to classify and reserve a change through [scope-change](../scope-change/SKILL.md).
- Execute [deliver-change](../deliver-change/SKILL.md) with that change and its single referenced specification.

_RETURN_ the common change delivery outcome.
