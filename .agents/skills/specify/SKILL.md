---
name: specify
description: Create one proposed spec and its PRD edits.
metadata:
  aiddbot-kind: primitive
user-invocable: true
disable-model-invocation: true
---
# specify

Your goal is to create one proposed spec.

Require reserved S, F, and T IDs and the active spec branch. Use the [spec template](./assets/spec.template.md) and [PRD template](./assets/PRD.template.md). Do not allocate another identity or create a branch.

Write `{Product_Folder}/specs/{spec_key}/spec.md`. Keep Problem, Solution by container, and Verification concise. List changed, affected, and deprecated requirements in the body. Add or change proposed EARS lines in `specs/PRD.md` on the branch. Keep a deprecated PRD line until shipping. Fill only repository evidence or facts validated by the human.

The result is the proposed spec.

Commit as `docs(specify): …`.
