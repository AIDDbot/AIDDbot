---
name: implement-change
description: Coordinate implementation for one spec.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: false
---
# implement-change

Your goal is to implement one spec or its reported repairs.

First, read its spec, PRD edits, and project rules.

For each affected application project, execute the `codify` skill with that project's spec scope or supplied repair findings. Process the projects sequentially.

If the spec assigns acceptance-test creation, updates, deletion, or repair, execute the `codify` skill for E2E with the complete acceptance-test change scope or findings.

Finally, reconcile the implementation and test diff with every action in the approved spec. Return missing work as a blocker; otherwise, return the implementation result.
