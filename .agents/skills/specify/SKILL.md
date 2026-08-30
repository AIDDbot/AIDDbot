---
name: specify
description: Capture a functional or refactor spec — problem or decision, solution, and criteria.
user-invocable: true
disable-model-invocation: true
---
# specify

Your goal is to capture a change as a one-page spec.

The caller names the kind — `functional` or `refactor`. You never classify it; if neither the command nor the human named it, ask once and stop until you have it. Functional draws `F001`, `F002`…; refactor draws `R001`, `R002`…; neither series advances the other. A criterion id is never renumbered or reused.

Load the reference and template for that kind only — [functional](./references/functional.md) with its [spec template](./assets/functional.spec.template.md), or [refactor](./references/refactor.md) with its [spec template](./assets/refactor.spec.template.md). Do not borrow the other kind's habits.

Clarify with the human, one closed question at a time, until `{spec_key}` = `{spec_id}-{slug}` is settled. Write `{Product_Folder}/specs/{spec_key}/spec.md` on `feat/{spec_key}` or `refactor/{spec_key}`.

The result is the specification.

Commit as `docs(specify): …`.
