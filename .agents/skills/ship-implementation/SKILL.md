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

- _REPEAT_ until both reports have current passing evidence:
    - Execute [verify](../verify/SKILL.md) and [qualify](../qualify/SKILL.md), refreshing missing or stale evidence.
    - _IF_ a required check cannot be completed:
        - _RETURN_ the blocker recorded in its report.
    - _IF_ required checks failed:
        - _IF_ repair requires a different spec scope or requirements:
            - _RETURN_ the required owner decision before editing.
        - Execute [implement-change](../implement-change/SKILL.md) on the current spec branch, limited to the blocking findings.
        - _IF_ repair cannot proceed:
            - _RETURN_ the repair blocker.
- Execute [shipify](../shipify/SKILL.md). Non-blocking debt does not require another repair cycle.

_RETURN_ the shipping result or blocker.
