---
name: ship-implementation
description: Refresh necessary evidence and release one complete change.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# ship-implementation

Your goal is to prove and deliver one complete change.

- _REPEAT_ until delivery or a blocker:
  - Read the change, related specs, diff from `base`, and report; derive the required coverage and run [verify](../verify/SKILL.md) and [qualify](../qualify/SKILL.md) for each required owner with missing or stale evidence.
  - _IF_ a required control is blocked:
    - Record the impediment in the change and _RETURN_ it.
  - _IF_ correctable findings fail a required control:
    - Execute [fix-defects](../fix-defects/SKILL.md).
    - _IF_ repair changes scope or contracts:
      - _RETURN_ the required owner decision.
    - Repeat the affected checks after repair.
  - _IF_ every required obligation derived from scope, specs, diff, and risk policy has current passing evidence and applicable approval:
    - Delegate final integration to [shipify](../shipify/SKILL.md).
    - _IF_ integration changes semantics, repeat affected checks.
    - _RETURN_ the delivery outcome.

Do not repeat current evidence without a change or a reason.
