---
name: ship-implementation
description: Verify, qualify, and deliver an implemented specification, change, or findings scope.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# ship-implementation

GOAL: review and deliver complete implemented scope without stale evidence or endless repair loops.

LOOP:
  SPAWN Craftsman => FOLLOW [verify](../verify/SKILL.md) for complete specification, change, or findings scope.
  IF verify is blocked:
    RETURN recorded impediment to caller; KEEP status no later than `in-progress`.
  IF verify is red:
    SEND correctable findings to [fix-defects](../fix-defects/SKILL.md) sequentially by container.
    IF any write: RESTART LOOP.
    RETURN unresolved verification findings to caller.
  IF verify is green:
    SPAWN Craftsman => FOLLOW [qualify](../qualify/SKILL.md) for same scope.
    IF qualify is blocked: RETURN recorded impediment to caller.
    IF qualify is red AND criteria or behavior must change:
      RETURN to delivery caller for new scope decision.
    IF qualify is red:
      SEND correctable findings to [fix-defects](../fix-defects/SKILL.md) sequentially by container.
      IF any write: RESTART LOOP.
      RETURN unresolved qualification findings to caller.
    IF both reports are green and current:
      EXPRESSLY DELEGATE final integration to Craftsman => FOLLOW [shipify](../shipify/SKILL.md).
      IF integration changes content: RESTART LOOP.
      IGNORE report-only and expressly identified non-semantic closure metadata.
      RETURN delivery outcome.
DO NOT invent defects or retry identical evidence with identical corrective hypothesis.
