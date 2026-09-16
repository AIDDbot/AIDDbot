---
name: implement-change
description: Implement one spec or its reported repairs.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: false
---
# implement-change

Implement one spec or its reported repairs.

First, read its spec, PRD or TDR edits, and project rules.

For each affected production project, execute the `codify` skill with that project's spec scope or supplied repair findings. 

Process the projects sequentially. Starting from lower to higher levels of abstraction.

If the spec assigns acceptance-test creation, updates, deletion, or repair, execute the `codify` skill for the E2E project with the complete acceptance-test change scope or findings.

Return missing work as a blocker; otherwise, return the implementation result summary.
