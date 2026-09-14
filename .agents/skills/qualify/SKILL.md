---
name: qualify
description: Review technical quality for one spec and record evidence.
metadata:
  aiddbot-kind: primitive
user-invocable: true
disable-model-invocation: true
---
# qualify

Your goal is to review technical quality for one spec.

Read the spec, complete diff, and affected project rules. Apply the [gates and severities](./references/qualify.gates.md), [clarity patterns](./references/clarity.patterns.md), and [UI patterns](./references/ui.patterns.md) where relevant. Do not edit code. Write `{Product_Folder}/specs/{spec_key}/qualification.md` from the [qualification template](./assets/qualification.template.md). Record the checked revision, controls, results, evidence, and non-blocking quality debt. A blocker, major, failed, pending, or blocked control prevents shipping.

Verify the spec's technical outcomes and record their evidence under Controls.

Always save the spec's report, including failed or blocked evaluations. Set `status` to `green` when all required controls pass without open findings, `amber` when only minor findings remain, or `red` for blocking findings or incomplete or failed controls. Increment `revision` once per evaluation, starting at 1, not for document edits. Record the evaluated code commit and update time; preserve the counter when resuming.

The result is current qualification evidence.

Commit as `docs(qualify): …`.
