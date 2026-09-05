---
name: ship-implementation
description: Verify, qualify, and deliver an implemented specification, change, or findings scope.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# ship-implementation

Your goal is to review and deliver the complete implemented scope without stale evidence or endless repair loops.

Have a Craftsman follow [verify](../verify/SKILL.md) for the complete specification, change, or findings scope. Continue only on green. On red, send correctable findings to [fix-defects](../fix-defects/SKILL.md) sequentially by container and restart from verify after any write. On blocked, return the recorded impediment to the caller without inventing a defect or changing spec status beyond `in-progress`.

After green verification, have a Craftsman follow [qualify](../qualify/SKILL.md) for the same scope. Treat red and blocked the same way, except that a required change to criteria or behavior returns to the delivery caller for a new scope decision rather than being repaired here. Never retry identical evidence with the same corrective hypothesis.

When both reports are green and current for the content being delivered, expressly delegate final integration to a Craftsman following [shipify](../shipify/SKILL.md). A content change during integration returns to verify; report-only and expressly identified non-semantic closure metadata do not.

The result is the delivery outcome or one explicit blocker with its evidence and owner.
