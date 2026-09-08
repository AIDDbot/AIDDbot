---
name: deliver-change
description: Own and deliver any classified change through its applicable stages.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# deliver-change

Your goal is to deliver one classified change while owning its Git lifecycle.

- Require change key, base revision, classification, derived stages, criteria, scope, and any specification or finding references.
- Create `change/{change_key}` from base or reuse it only when manifest, scope, and ancestry agree.
- _IF_ divergence exists:
  - Diagnose it before writing.
  - _RETURN_ the divergence to caller.
- Execute [scope-change](../scope-change/SKILL.md) on the branch to persist the manifest; set it `in-progress` before the first delivery write.
- _FOR-EACH_ referenced specification in manifest order, execute [specify-spec](../specify-spec/SKILL.md) sequentially.
- _IF_ every referenced specification is validated or YOLO applies:
  - Execute [implement-spec](../implement-spec/SKILL.md) once for the complete change.
- _IF_ no specification is referenced:
  - Execute [implement-spec](../implement-spec/SKILL.md) from the manifest criteria.
- Allow one writer at a time for shared files and the Git index.
- Execute [ship-implementation](../ship-implementation/SKILL.md) once for the complete change.
- Keep final integration here and expressly delegate it to `shipify`.

_RETURN_ one atomically delivered change.
