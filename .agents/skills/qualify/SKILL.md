---
name: qualify
description: Review risk-relevant technical controls for one change and record evidence.
metadata:
  aiddbot-kind: primitive
user-invocable: true
disable-model-invocation: true
---
# qualify

Your goal is to review assigned technical controls for one change.

Read its Checks table and grade the complete diff from its base for controls assigned to review. Apply the [gates and severities](./references/qualify.gates.md), [clarity patterns](./references/clarity.patterns.md), and [UI patterns](./references/ui.patterns.md) where relevant. Do not edit code. Update only Review and Findings in `{Product_Folder}/changes/{change_key}/report.md`, recording revision, method, result, and evidence. A blocker, major, failed criterion, or unavailable required control prevents release.

The result is current review evidence.

Commit as `docs(qualify): …`.
