---
name: specify
description: Turn one natural-language request into an approved spec and its proposed PRD edits.
metadata:
  aiddbot-kind: primitive
user-invocable: true
disable-model-invocation: false
---
# specify

Turn one natural-language request into an approved spec and its proposed PRD edits.

Read or create the current PRD, TDR, counters, follow the assetes templates. Clarify missing product decisions. Define one coherent scope, choose its delivery type (`feat`, `fix`, `refactor`, or `chore`), and determine its spec ID, name, and slug to generate a spec key. 

Use them to compose the branch name. `{type}/{spec_key}`. Example: `feat/implement-user-authentication` or `fix/incorrect-tax-calculation`. Create the git branch.

The spec ID and any new requirement IDs, must be reserved in `counters.yaml` on that branch.

Write the spec following `spec.template.md` and proposed PRD edits following `PRD.template.md` together in the project locations. 
The PRD is the only owner of requirement text. The spec references requirement IDs as `new`, `changed`, `deprecated`, or `related` and records their reason, delivery impact, and acceptance evidence without copying their normative text. 
Preserve existing IDs and unrelated requirements. Keep deprecated PRD lines until shipping.

If the user requests YOLO or the active mode is YOLO, consider the proposal approved. Otherwise, present the spec and PRD edits, ask the human for approval, and wait. On approval, set the spec to `in-progress` .

Commit as `docs(specify): …`.
