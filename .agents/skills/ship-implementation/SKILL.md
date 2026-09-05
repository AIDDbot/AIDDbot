---
name: ship-implementation
description: Verify, qualify, and deliver an implemented specification, change, or findings scope.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# ship-implementation

_GOAL_: review and deliver complete implemented scope without stale evidence or endless repair loops.

_LOOP_:
  _SPAWN_ Craftsman => _FOLLOW_ [verify](../verify/SKILL.md) for complete specification, change, or findings scope.
  _IF_ verify is blocked:
    _RETURN_ recorded impediment to caller; _KEEP_ status no later than `in-progress`.
  _IF_ verify is red:
    _SEND_ correctable findings to [fix-defects](../fix-defects/SKILL.md) sequentially by container.
    _IF_ any write: _RESTART_ _LOOP_.
    _RETURN_ unresolved verification findings to caller.
  _IF_ verify is green:
    _SPAWN_ Craftsman => _FOLLOW_ [qualify](../qualify/SKILL.md) for same scope.
    _IF_ qualify is blocked: _RETURN_ recorded impediment to caller.
    _IF_ qualify is red _AND_ criteria or behavior must change:
      _RETURN_ to delivery caller for new scope decision.
    _IF_ qualify is red:
      _SEND_ correctable findings to [fix-defects](../fix-defects/SKILL.md) sequentially by container.
      _IF_ any write: _RESTART_ _LOOP_.
      _RETURN_ unresolved qualification findings to caller.
    _IF_ both reports are green and current:
      _EXPRESSLY-DELEGATE_ final integration to Craftsman => _FOLLOW_ [shipify](../shipify/SKILL.md).
      _IF_ integration changes content: _RESTART_ _LOOP_.
      _IGNORE_ report-only and expressly identified non-semantic closure metadata.
      _RETURN_ delivery outcome.
_DO-NOT_ invent defects or retry identical evidence with identical corrective hypothesis.
