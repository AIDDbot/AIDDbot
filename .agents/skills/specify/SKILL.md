---
name: specify
description: Specify a request, update the PRD, and obtain approval.
metadata:
  aiddbot-kind: primitive
user-invocable: true
disable-model-invocation: false
---
# specify

Your goal is to formalize a request and propose its solution.

Use the supplied spec identity and branch. Read the request, current PRD, and relevant code and rules. Clarify missing product decisions; propose the design.

Write the [spec](./assets/spec.template.md) and [PRD edits](./assets/PRD.template.md) in the project locations. The PRD owns requirement text; the spec references its IDs. Preserve existing IDs and unrelated requirements. Keep deprecated PRD lines until shipping.

If the user requests YOLO or the active mode is YOLO, consider the proposal approved. Otherwise, present the spec and PRD edits, ask the human for approval, and wait. On approval, set the spec to `in-progress` and record authorization in Git.

The result is an approved spec and its PRD edits.

Commit as `docs(specify): …`.
