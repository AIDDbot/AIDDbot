---
name: specify
description: Create or amend one durable functional or technical contract.
metadata:
  aiddbot-kind: primitive
user-invocable: true
disable-model-invocation: true
---
# specify

Your goal is to capture one durable contract.

Require the owner to supply its reserved `spec_key` and operation. Use [the functional guidance](./references/functional.md) and [template](./assets/functional.spec.template.md), or [the technical guidance](./references/technical.md) and [template](./assets/technical.spec.template.md). Never reclassify, allocate another identity, or create a branch.

Write `{Product_Folder}/specs/{spec_key}.md` on the owner branch. Give it a concise `Scope` that identifies what it owns and excludes. Preserve criterion IDs; put retired ones under `Deprecated criteria`. Fill only repository evidence or facts validated by the human. Regenerate the PRD with `../build-requested-change/scripts/index-specs.mjs write {Product_Folder}` after a create, amend, or retirement.

The result is the proposed contract.

Commit as `docs(specify): …`.
