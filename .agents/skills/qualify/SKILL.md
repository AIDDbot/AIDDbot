---
name: qualify
description: Qualify one complex change against technical criteria and six quality gates.
metadata:
  aiddbot-kind: primitive
user-invocable: true
disable-model-invocation: true
---
# qualify

Your goal is to grade a complex change whose persisted policy requires qualification.

Read `{Product_Folder}/changes/{change_key}/change.md`; reject invocation when `stages.qualify` is false. Report only—never edit code. Grade the complete diff from its recorded base and write `{Product_Folder}/changes/{change_key}/qualify.report.md` from the [change report](./assets/change.qualify.report.template.md). Record base, evaluated revision, methods, commands, results, and evidence for every technical criterion.

Apply exactly the six [gates and severities](./references/qualify.gates.md): blocker or major findings fail; minor findings do not. Use `n/a` only with an evidence-backed reason. An unavailable check is blocked. Red or blocked keeps the change `in-progress`. Follow the [code-clarity catalog](./references/clarity.patterns.md) and [UI and accessibility catalog](./references/ui.patterns.md).

The result is the change quality verdict.

Commit as `docs(qualify): …`.
