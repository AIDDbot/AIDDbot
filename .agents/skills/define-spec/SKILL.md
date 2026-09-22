---
name: define-spec
description: Turn one natural-language request into an approved spec and its proposed PRD edits.
metadata:
  aiddbot-kind: primitive
user-invocable: true
---
# define-spec

Turn one natural-language request into an approved spec and its proposed PRD edits.

Read the current PRD, quality TDR, counters, and `{Product_Folder}/model/` schemas. If any initialization document is missing, return the need to execute `document-system`; do not invent its contents. Clarify missing product decisions. Define one coherent scope, choose its delivery type (`feat`, `fix`, `refactor`, or `chore`), and determine its spec ID, name, and slug to generate a spec key.

Use them to compose the branch name. `{type}/{spec_key}`. Example: `feat/implement-user-authentication` or `fix/incorrect-tax-calculation`. Create the git branch.

The spec ID and any new requirement IDs, must be reserved in `.aiddbot/counters.yaml` on that branch.

Write the spec following `spec.template.md` and proposed PRD edits following `PRD.template.md` together in the project locations. 
The PRD is the only owner of requirement text. The spec references requirement IDs as `new`, `changed`, `deprecated`, or `related` and records their reason, delivery impact, and acceptance evidence without copying their normative text. 
Write each new or changed requirement as one observable EARS line. Keep the EARS keywords `IF`, `WHEN`, `WHILE`, `WHERE`, and `SHALL` in uppercase.
Preserve existing IDs and unrelated requirements. Keep deprecated PRD lines until shipping.

When the scope adds, changes, or removes an entity, relation, table, column, or endpoint, declare each one in the spec's schema impact against the current schema documents. Do not edit the schema documents; shipping reconciles them.

If the user requests YOLO or the active mode is YOLO, consider the proposal approved. Otherwise, present the spec and PRD edits, ask the human for approval, and wait. On approval, set the spec to `in-progress` .

Execute `record-journal` for each high-level creation and approval event with `stage: define` and the spec ID.

Commit as `docs(spec): define delivery`.
