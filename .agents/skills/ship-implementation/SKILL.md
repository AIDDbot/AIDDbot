---
name: ship-implementation
description: Refresh evidence and ship one spec.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: false
---
# ship-implementation

Your goal is to prove and deliver one spec.

First, read both reports. Each process has an automatic evaluation ceiling of revision 3. Only explicit human direction grants another three evaluations for a stopped process, counted from its current revision; never reset the counter. Record that authorization and the new ceiling in Git.

Repeat the evidence cycle until verification is `green` and qualification is `green` or `amber`, with current evidence. Before evaluating a required report, return both reports and request human direction if its revision has reached the authorized ceiling.

Execute the `verify` and `qualify` skills as needed for missing, red, or stale reports. Evidence becomes stale when evaluated code, requirements, tests, or applicable rules change; report-only commits do not invalidate it. If a required check cannot be completed, return the blocker recorded in its report.

If either report is `red`, return both reports and request human direction when that report has reached its authorized ceiling. Return the required owner decision when repair would change the spec scope or requirements. Otherwise, execute the `implement-change` skill on the current spec branch, limited to verification failures and blocking qualification findings. Return any repair blocker and repeat the evidence cycle after a successful repair.

Once the required evidence passes, execute the `shipify` skill. Non-blocking debt does not require another repair cycle.

Finally, return the shipping result or blocker.
