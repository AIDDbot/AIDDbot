---
name: deliver-spec
description: Specify, implement, review, and deliver a requirement represented by one specification.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# deliver-spec

GOAL: deliver a one-specification requirement while owning its Git lifecycle.

REQUIRE scope report's `key`, `kind`, `action`, and base revision.
IF work is functional: USE `feat/{spec_key}`.
IF work is technical: USE `chore/{spec_key}`.
FROM recorded base: CREATE branch OR REUSE it only when scope and ancestry are compatible.
IF active or existing branch diverges:
  REPORT conflict before writing.
  PRESERVE existing work.
  STOP.
PASS fixed identity => FOLLOW [specify-spec](../specify-spec/SKILL.md).
AFTER validation OR YOLO: FOLLOW [implement-spec](../implement-spec/SKILL.md), THEN [ship-implementation](../ship-implementation/SKILL.md) for same scope.
DELEGATE stage commits one at a time and only for files produced in that stage.
KEEP final integration here; EXPRESSLY DELEGATE it to `shipify`.
RETURN delivered specification and release identity.
