---
name: specify
description: Capture a functional or technical spec — problem or decision, solution, and criteria.
user-invocable: true
disable-model-invocation: true
---
# specify

Your goal is to capture a change as a one-page spec (short and lean).

The caller names the kind — `functional` or `technical`. You never classify it; if neither the command nor the human named it, ask once and stop until you have it. Functional draws `F001`, `F002`…; technical draws `T001`, `T002`…; neither series advances the other. A criterion id is never renumbered or reused.

Load the reference and template for that kind only — [functional](./references/functional.md) with its [spec template](./assets/functional.spec.template.md), or [technical](./references/technical.md) with its [spec template](./assets/technical.spec.template.md). Do not borrow the other kind's habits.

Clarify with the human, one closed question at a time, until `{spec_key}` = `{spec_id}-{slug}` is settled. Write `{Product_Folder}/specs/{spec_key}/spec.md` on the current branch — never create or switch branches.

The result is the specification.

Commit as `docs(specify): …`.
