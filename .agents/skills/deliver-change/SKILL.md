---
name: deliver-change
description: Own and deliver any classified change through its applicable stages.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# deliver-change

Deliver one classified change while owning its Git lifecycle.

- _FOR-EACH_ referenced specification in manifest:
  - _SPAWN_ a _Architect_ agent to execute [specify-spec](../specify-spec/SKILL.md) sequentially.
- _SPAWN_ a _Builder_ agent to execute [implement-spec](../implement-spec/SKILL.md) once for the complete change.
- _SPAWN_ a _Craftasman_ agent to execute [ship-implementation](../ship-implementation/SKILL.md) once for the complete change.

_RETURN_ one atomically delivered change.
