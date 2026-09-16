---
name: qualify
description: Review technical quality for one spec implementation.
metadata:
  aiddbot-kind: primitive
user-invocable: true
disable-model-invocation: false
---
# qualify

Review technical quality for one spec implementation.

Read the spec, complete diff, and affected project rules. Apply the gates and severities from `qualify.gates.md`.

Do not edit code. Write `{Product_Folder}/specs/{spec_key}/qualification.md` report from the qualification template `qualification.template.md`. Record the checked revision, controls, results, evidence, and non-blocking quality debt. 

Set `status` to `green` when all required controls pass without open findings, `amber` when only minor findings remain, or `red` for blocking findings that prevent shipping.

Increment `revision` once per evaluation, starting at 1, not for document edits. Record the evaluated code commit and update time; preserve the counter when resuming.

The result is current qualification evidence.

## Journaling

Keep a journal of your work in the a `journal.md` file in the spec folder. Just write down high-level entries about each revision and status

Commit as `docs(qualify): …`.
