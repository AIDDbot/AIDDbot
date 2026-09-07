---
name: deliver-spec
description: Specify, implement, review, and deliver a requirement represented by one specification.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# deliver-spec

Your goal is to **deliver a one-specification requirement** while owning its Git lifecycle.

- Require scope report `key`, `kind`, `action`, and base revision.
- _IF_ work is functional:
  - Use `feat/{spec_key}`.
- _IF_ work is technical:
  - Use `chore/{spec_key}`.
- From the recorded base, create the branch or reuse it only when scope and ancestry are compatible.
- _IF_ the active or existing branch diverges:
  - Report the conflict before writing.
  - Preserve existing work.
  - _RETURN_ the branch conflict to caller.
- Pass fixed identity and execute [specify-spec](../specify-spec/SKILL.md).
- After validation or YOLO:
  - Execute [implement-spec](../implement-spec/SKILL.md).
  - Execute [ship-implementation](../ship-implementation/SKILL.md) for the same scope.
- Delegate stage commits one at a time and only for files produced in that stage.
- Keep final integration here and expressly delegate it to `shipify`.

_RETURN_ delivered specification and release identity.
