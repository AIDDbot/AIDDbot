---
name: planify
description: Write one lean implementation plan for a complete change.
metadata:
  aiddbot-kind: primitive
user-invocable: true
disable-model-invocation: true
---
# planify

Your goal is to turn one change into its implementation plan.

Read its change, related specs, and affected architecture. Use the [plan template](./assets/plan.template.md). Agree shared contracts and their single writer before tasks begin. Cover all affected containers and E2E work in one plan; do not copy spec text or classify prior plans.

Write only `{Product_Folder}/changes/{change_key}/plan.md` on the owner branch.

The result is the change plan.

Commit as `docs(planify): …`.
