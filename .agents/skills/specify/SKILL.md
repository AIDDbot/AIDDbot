---
name: specify
description: Capture a functional or technical spec — problem or decision, solution, and criteria.
metadata:
  aiddbot-kind: primitive
user-invocable: true
disable-model-invocation: true
---
# specify

Your goal is to capture a change as a one-page spec.

Require the caller to provide the triaged `key`, `kind`, and `action`; do not reclassify or allocate a different identity. If invoked directly without them, resolve them before writing using the same F/T series rules and existing ownership: functional draws `F001`, `F002`… and technical draws `T001`, `T002`…. A criterion ID is never renumbered or reused.

Load the reference and template for that kind only — [functional](./references/functional.md) with its [spec template](./assets/functional.spec.template.md), or [technical](./references/technical.md) with its [spec template](./assets/technical.spec.template.md). Do not borrow the other kind's habits.

Clarify with the human, one closed question at a time, without changing the reserved identity. Write `{Product_Folder}/specs/{spec_key}/spec.md` on the current branch with the delivery base and branch supplied by the owner; never create or switch branches. Fill only facts validated by the human or repository evidence. Keep optional sections as the template's empty skeleton until they have content; never turn placeholders into made-up requirements, categories, containers, entities, rules, or criteria. For an amend, reset the spec to `pending` and preserve retired criterion IDs. Update the PRD only for a functional spec, within the same sequential stage.

The result is the specification.

Commit as `docs(specify): …`.
