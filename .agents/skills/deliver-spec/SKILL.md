---
name: deliver-spec
description: Specify, implement, review, and deliver a requirement represented by one specification.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# deliver-spec

Your goal is to deliver **a requirement that affects one specification**.

- Determine `{spec_key}` from the scope report.
- Create and checkout `feat/{spec_key}`.
- Execute [specify-spec](../specify-spec/SKILL.md) for the requirement.
- _ONCE_ the specification is validated or YOLO, 
  - Execute [implement-spec](../implement-spec/SKILL.md) for that specification.
  - Execute [ship-implementation](../ship-implementation/SKILL.md) with the specification in scope.

_RETURN_ a short report of the delivered specification.
