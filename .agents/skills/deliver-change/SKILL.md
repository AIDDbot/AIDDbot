---
name: deliver-change
description: Specify, implement, review, and deliver a coordinated multi-spec change.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# deliver-change

Your goal is to **deliver coordinated specifications** while owning their shared Git lifecycle.

- Require the approved scope report change key, base revision, and every specification `key`, `kind`, and `action`.
- From base, create `change/{change_key}` or reuse it only when manifest, scope, and ancestry are compatible.
- _IF_ divergence exists:
  - Diagnose it before writing.
  - _RETURN_ the branch divergence to caller.
- On the established branch, execute [scope-change](../scope-change/SKILL.md) once to persist the manifest.
- _FOR-EACH_ specification in manifest order:
  - Execute [specify-spec](../specify-spec/SKILL.md) sequentially.
- _IF_ all specifications are validated or YOLO applies:
  - _FOR-EACH_ specification in manifest order:
    - Execute [implement-spec](../implement-spec/SKILL.md) sequentially.
- Allow one writer at a time for shared contracts and shared files.
- Delegate stage commits only sequentially and only for the current stage files.
- _IF_ every specification is implemented:
  - Execute [ship-implementation](../ship-implementation/SKILL.md) once with the complete manifest.
- Keep final integration here and expressly delegate it to `shipify`.

_RETURN_ one atomically delivered coordinated change.
