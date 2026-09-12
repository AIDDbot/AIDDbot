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

Derive review coverage from the change introduction, related specs, complete diff from `base`, and applicable risk policy. Apply the [gates and severities](./references/qualify.gates.md), [clarity patterns](./references/clarity.patterns.md), and [UI patterns](./references/ui.patterns.md) where relevant. Consult `{container}.rules.md` when it exists. Do not edit code. Update only Review and Findings in `{Product_Folder}/changes/{change_key}/report.md`, recording required coverage, revision, method, result, and evidence; record unexecuted required coverage as `pending`. A blocker, major, failed, pending, or blocked required control prevents release.

The result is current review evidence.

Commit as `docs(qualify): …`.
