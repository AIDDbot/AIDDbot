---
name: ship-implementation
description: Refresh evidence and ship one spec.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# ship-implementation

Your goal is to prove and deliver one spec.

- _REPEAT_ until delivery or a blocker:
  - Read the spec, PRD edits, diff, and reports; 
  - run [verify](../verify/SKILL.md) to report functional defects
  - and [qualify](../qualify/SKILL.md) to report technical defects
  - _IF_ a required control is blocked:
    - Record the impediment in the relevant report and _RETURN_ it.
  - _IF_ correctable findings fail a required control:
    - Execute [fix-defects](../fix-defects/SKILL.md).
    - _IF_ the repair changes spec scope or requirements:
      - _RETURN_ the required owner decision.
    - Repeat affected checks after repair.
  - _IF_ approval and every required control have current passing evidence:
    - Delegate final integration to [shipify](../shipify/SKILL.md).
    - _RETURN_ the shipping outcome.

_RETURN_ the blocker.
