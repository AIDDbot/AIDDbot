---
name: ship-implementation
description: Verify, qualify, and deliver an implemented specification, change, or findings scope.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# ship-implementation

Your goal is to **review and deliver complete implemented scope** without stale evidence or endless repair loops.

- _REPEAT_ until a delivery outcome or blocking return is produced:
  - Spawn Craftsman and execute [verify](../verify/SKILL.md) for the complete specification, change, or findings scope.
  - _IF_ verify is blocked:
    - Keep status no later than `in-progress`.
    - _RETURN_ the recorded impediment to caller.
  - _IF_ verify is red:
    - Send correctable findings to [fix-defects](../fix-defects/SKILL.md) sequentially by container.
    - _IF_ any write occurred:
      - Restart the cycle.
    - _RETURN_ unresolved verification findings to caller.
  - _IF_ verify is green:
    - Spawn Craftsman and execute [qualify](../qualify/SKILL.md) for the same scope.
    - _IF_ qualify is blocked:
      - _RETURN_ the recorded impediment to caller.
    - _IF_ qualify is red and criteria or behavior must change:
      - _RETURN_ to the delivery caller for a new scope decision.
    - _IF_ qualify is red:
      - Send correctable findings to [fix-defects](../fix-defects/SKILL.md) sequentially by container.
      - _IF_ any write occurred:
        - Restart the cycle.
      - _RETURN_ unresolved qualification findings to caller.
    - _IF_ both reports are green and current:
      - Expressly delegate final integration to Craftsman via [shipify](../shipify/SKILL.md).
      - _IF_ integration changes content:
        - Restart the cycle.
      - Ignore report-only and expressly identified non-semantic closure metadata.
      - _RETURN_ delivery outcome.
- Do not invent defects or retry identical evidence with identical corrective hypothesis.
