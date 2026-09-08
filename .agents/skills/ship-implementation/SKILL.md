---
name: ship-implementation
description: Run the applicable proof stages and deliver one classified change.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# ship-implementation

Your goal is to prove and deliver a complete change from its persisted policy.

- _REPEAT_ until a delivery outcome or blocking return is produced:
  - Recheck the classification; future stages may be enabled but never disabled.
  - _IF_ `stages.verify` is true:
    - Spawn Craftsman and execute [verify](../verify/SKILL.md) once for the complete change.
    - _IF_ verification is blocked:
      - _RETURN_ the recorded impediment.
    - _IF_ verification is red:
      - Execute [fix-defects](../fix-defects/SKILL.md) for correctable findings.
      - _IF_ any write occurred, repeat from classification.
      - _RETURN_ unresolved findings.
  - _IF_ `stages.qualify` is true:
    - Spawn Craftsman and execute [qualify](../qualify/SKILL.md) once for the complete change.
    - _IF_ qualification is blocked:
      - _RETURN_ the recorded impediment.
    - _IF_ qualification is red:
      - Execute [fix-defects](../fix-defects/SKILL.md) for correctable findings.
      - _IF_ any write occurred, repeat from classification.
      - _RETURN_ unresolved findings or the required scope decision.
  - Confirm every criterion has current passing evidence from implementation, verification, or qualification as assigned by policy.
  - Set the change `ready` and expressly delegate final integration to Craftsman via [shipify](../shipify/SKILL.md).
  - _IF_ integration changes semantic content, repeat the applicable proof cycle.
  - _RETURN_ the delivery outcome.
- Do not create reports for skipped stages or retry identical evidence with the same corrective hypothesis.
