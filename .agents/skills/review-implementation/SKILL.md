---
name: review-implementation
description: Review technical quality for one spec implementation.
metadata:
  aiddbot-kind: primitive
user-invocable: true
disable-model-invocation: false
---
# review-implementation

Review technical quality for one spec implementation.

Read the spec, complete diff, and affected project rules. Apply the blocking gates first, then the debt checks only when every gate passes, following `qualify.gates.md`.

Do not run any linting tools nor tests. You are a reviewer, a coder in adversarial mode.

Do not edit code. Write `{Product_Folder}/specs/{spec_key}/qualification.md` report from the qualification template `qualification.template.md`. Record the checked revision, controls, results, evidence, and non-blocking quality debt. 

Set `status` to `green` when every gate passes without findings, `amber` when every gate passes but debt remains, or `red` when a blocking gate fails.

Increment `revision` once per evaluation, starting at 1, not for document edits. Record the evaluated code commit and update time; preserve the counter when resuming.

The result is current qualification evidence.

## Journaling

Append one high-level event for each qualification revision and status to `journal.jsonl` in the spec folder. Each line is one valid JSON object with `timestamp`, `stage`, `revision`, `event`, `status`, and `summary`; use `stage: "qualify"`. Read the current system time immediately before each append and write it as complete ISO 8601 with an offset or `Z`. The file is append-only: never edit, delete, reorder, or backdate existing lines. Physical line order is canonical even if a timestamp is wrong. Do not convert or extend a legacy `journal.md`.

Commit as `docs(review): qualify implementation`.
