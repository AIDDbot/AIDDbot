---
name: deliver-spec
description: Specify, implement, review, and deliver a requirement represented by one specification.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# deliver-spec

Your goal is to deliver a requirement that affects one specification.

- Determine `{spec_key}` from the scope report.
- Create and checkout `feat/{spec_key}`.
- Read and execute [specify-spec](../specify-spec/SKILL.md) _ONCE_ for the requirement.
- _ONCE_ the specification is validated, read and execute [implement-spec](../implement-spec/SKILL.md) _ONCE_ for that specification.
- _ONCE_ implementation finishes, read and execute [ship-implementation](../ship-implementation/SKILL.md) _ONCE_ with the specification in scope.

Return a short report of the delivered specification.
