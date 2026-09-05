---
name: deliver-spec
description: Specify, implement, review, and deliver a requirement represented by one specification.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# deliver-spec

_GOAL_: deliver a one-specification requirement while owning its Git lifecycle.

_REQUIRE_ scope report's `key`, `kind`, `action`, and base revision.
_IF_ work is functional: USE `feat/{spec_key}`.
_IF_ work is technical: USE `chore/{spec_key}`.
_FROM_ recorded base: _CREATE_ branch _OR_ _REUSE_ it only when scope and ancestry are compatible.
_IF_ active or existing branch diverges:
  _REPORT_ conflict before writing.
  PRESERVE existing work.
  _STOP_.
_PASS_ fixed identity => _FOLLOW_ [specify-spec](../specify-spec/SKILL.md).
_AFTER_ validation _OR_ YOLO: _FOLLOW_ [implement-spec](../implement-spec/SKILL.md), _THEN_ [ship-implementation](../ship-implementation/SKILL.md) for same scope.
_DELEGATE_ stage commits one at a time and only for files produced in that stage.
_KEEP_ final integration here; _EXPRESSLY-DELEGATE_ it to `shipify`.
_RETURN_ delivered specification and release identity.
