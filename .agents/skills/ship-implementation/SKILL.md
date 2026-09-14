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

- Read both reports. Each process has an automatic evaluation ceiling of revision 3. Only explicit human direction grants another three evaluations for a stopped process, counted from its current revision; never reset the counter. Record that authorization and the new ceiling in Git.
- _REPEAT_ until verification is `green` and qualification is `green` or `amber`, with current evidence:
    - _FOR-EACH_ report requiring evaluation:
        - _IF_ its revision has reached its authorized ceiling:
            - _RETURN_ both reports and request human direction before further repairs or evaluations.
    - Execute [verify](../verify/SKILL.md) and [qualify](../qualify/SKILL.md) as needed for missing, red, or stale reports. Evidence becomes stale when evaluated code, requirements, tests, or applicable rules change; report-only commits do not invalidate it.
    - _IF_ a required check cannot be completed:
        - _RETURN_ the blocker recorded in its report.
    - _IF_ either report is `red`:
        - _IF_ a red report has reached its authorized ceiling:
            - _RETURN_ both reports and request human direction before further repairs or evaluations.
        - _IF_ repair requires a different spec scope or requirements:
            - _RETURN_ the required owner decision before editing.
        - Execute [implement-change](../implement-change/SKILL.md) on the current spec branch, limited to verification failures and blocking qualification findings.
        - _IF_ repair cannot proceed:
            - _RETURN_ the repair blocker.
- Execute [shipify](../shipify/SKILL.md). Non-blocking debt does not require another repair cycle.

_RETURN_ the shipping result or blocker.
