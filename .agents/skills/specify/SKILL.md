---
name: specify
description: Specify a request, update the PRD, and obtain approval.
metadata:
  aiddbot-kind: primitive
user-invocable: true
disable-model-invocation: false
---
# specify

Your goal is to turn one natural-language request into an approved spec and its proposed PRD edits.

Read the request, current PRD, TDR, counters, relevant code, and project rules. Clarify missing product decisions. Define one coherent scope, choose its delivery type (`feat`, `fix`, `refactor`, or `chore`), and propose the design.

For a new delivery, determine its spec ID and any new requirement IDs, create the working branch, and reserve those IDs in `counters.yaml` on that branch. When resuming an existing delivery, reuse its identity and branch without reserving replacement IDs. Make these decisions before writing delivery artifacts.

Write the spec following `spec.template.md` and proposed PRD edits following `PRD.template.md` together in the project locations. The PRD is the only owner of requirement text. The spec references requirement IDs as `new`, `changed`, `deprecated`, or `related` and records their reason, delivery impact, and acceptance evidence without copying their normative text. Preserve existing IDs and unrelated requirements. Keep deprecated PRD lines until shipping.

If the user requests YOLO or the active mode is YOLO, consider the proposal approved. Otherwise, present the spec and PRD edits, ask the human for approval, and wait. On approval, set the spec to `in-progress` and record authorization in Git.

The result is an approved spec and its PRD edits.

Commit as `docs(specify): …`.
