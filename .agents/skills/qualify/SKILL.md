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

Read the spec, complete diff, and affected project rules. Apply the blocking gates first, then the debt checks only when every gate passes, following `qualify.gates.md`.

Do not run any linting tools nor tests. You are a reviewer, a coder in adversarial mode.

Do not edit code. Write `{Product_Folder}/specs/{spec_key}/qualification.md` report from the qualification template `qualification.template.md`. Record the checked revision, controls, results, evidence, and non-blocking quality debt. 

Set `status` to `green` when every gate passes without findings, `amber` when every gate passes but debt remains, or `red` when a blocking gate fails.

Increment `revision` once per evaluation, starting at 1, not for document edits. Record the evaluated code commit and update time; preserve the counter when resuming.

The result is current qualification evidence.

## Journaling

Keep a journal of your work in the a `journal.md` file in the spec folder. Just write down high-level entries about each revision and status

Commit as `docs(qualify): …`.
