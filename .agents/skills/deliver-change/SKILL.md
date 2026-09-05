---
name: deliver-change
description: Specify, implement, review, and deliver a coordinated multi-spec change.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# deliver-change

_GOAL_: deliver coordinated specifications while owning their shared Git lifecycle.

_REQUIRE_ approved scope report's change key, base revision, and every specification's `key`, `kind`, and `action`.
_FROM_ base: _CREATE_ `change/{change_key}` _OR_ _REUSE_ it only when manifest, scope, and ancestry are compatible.
_IF_ divergence exists: _DIAGNOSE_ before writing; _STOP_.
_ON_ established branch: _FOLLOW_ [scope-change](../scope-change/SKILL.md) once to persist manifest.
_FOR-EACH_ specification in manifest order, _SEQUENTIALLY_:
  _FOLLOW_ [specify-spec](../specify-spec/SKILL.md).
_WHEN_ all specifications are validated _OR_ YOLO:
  _FOR-EACH_ specification in manifest order, _SEQUENTIALLY_:
    _FOLLOW_ [implement-spec](../implement-spec/SKILL.md).
_ALLOW_ one writer at a time for shared contracts and shared files.
_DELEGATE_ stage commits only sequentially and only for the current stage's files.
_WHEN_ every specification is implemented:
  _FOLLOW_ [ship-implementation](../ship-implementation/SKILL.md) once with complete manifest.
_KEEP_ final integration here; _EXPRESSLY-DELEGATE_ it to `shipify`.
_RETURN_ one atomically delivered coordinated change.
