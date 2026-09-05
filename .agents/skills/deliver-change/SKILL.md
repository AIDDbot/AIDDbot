---
name: deliver-change
description: Specify, implement, review, and deliver a coordinated multi-spec change.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# deliver-change

GOAL: deliver coordinated specifications while owning their shared Git lifecycle.

REQUIRE approved scope report's change key, base revision, and every specification's `key`, `kind`, and `action`.
FROM base: CREATE `change/{change_key}` OR REUSE it only when manifest, scope, and ancestry are compatible.
IF divergence exists: DIAGNOSE before writing; STOP.
ON established branch: FOLLOW [scope-change](../scope-change/SKILL.md) once to persist manifest.
FOR EACH specification in manifest order, SEQUENTIALLY:
  FOLLOW [specify-spec](../specify-spec/SKILL.md).
WHEN all specifications are validated OR YOLO:
  FOR EACH specification in manifest order, SEQUENTIALLY:
    FOLLOW [implement-spec](../implement-spec/SKILL.md).
ALLOW one writer at a time for shared contracts and shared files.
DELEGATE stage commits only sequentially and only for the current stage's files.
WHEN every specification is implemented:
  FOLLOW [ship-implementation](../ship-implementation/SKILL.md) once with complete manifest.
KEEP final integration here; EXPRESSLY DELEGATE it to `shipify`.
RETURN one atomically delivered coordinated change.
