---
name: define-spec
description: Turn one natural-language request into an approved spec and its proposed PRD edits.
metadata:
  aiddbot-kind: primitive
user-invocable: true
---
# define-spec

Your goal is to turn one natural-language request into an approved spec and its proposed PRD edits.

Read the PRD, the TDR, the counters, and the `{Product_Folder}/model/` schemas before defining anything. If the PRD, TDR, or counters is missing, return the need to run `aiddbot init`; if the model schemas are missing, return the need to execute `outline-system`. Never invent their contents.

Clarify missing product decisions, then define one coherent scope. Read the relevant requirements, debt, and model schemas before preparing. Once the title, slug, type, and counts of new functional and technical requirements are settled, run `scripts/prepare.mjs <type> <slug> <title>` with `--functional`, `--technical`, `--product`, and `--base` as needed. It requires a clean default branch, creates the spec branch before writing, reserves the next IDs, and creates `spec.md` from the template. Use the returned IDs in the PRD and verification table; never reserve IDs by hand.

Write the spec from `spec.template.md`. Write each PRD requirement as one line, `- **F0001**: {statement}`, with `T` instead of `F` for a technical requirement and the statement in EARS with its keywords (`IF`, `WHEN`, `WHILE`, `WHERE`, `SHALL`) in uppercase. The PRD is the only owner of requirement text: the spec references requirement IDs and records why they change and how acceptance proves it, never their wording. Preserve existing IDs and unrelated requirements, and keep deprecated lines until shipping.

Declare in the schema impact every entity, relation, table, column, or endpoint the scope adds, changes, or removes, including each endpoint's success status and every error status with its cause, and cover at least one error scenario in the verification table. Leave the schema documents themselves to shipping.

Unless in YOLO mode, present the spec and PRD edits for human approval and wait. Journal the creation and the approval. On approval, set the spec to `in-progress`.

Before presenting the proposal, run `scripts/validate.mjs <spec-directory>` with `--product` or `--base` when needed. Resolve every reported issue; it checks spec identity and branch, reserved IDs, requirement formatting, EARS keywords on new or changed requirements, PRD change rows, and preservation of deprecated requirements.

The result is an approved spec on its own branch, with its proposed PRD edits.

Commit as `docs(spec): define delivery`.
