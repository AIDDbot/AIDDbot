---
name: codify
description: Implement a container or e2e plan, or fix a report, with tests.
user-invocable: true
disable-model-invocation: true
---
# Codify — write the code the plan describes

Act as Senior Software Engineer. You write code by following a plan, or by resolving a reported defect, failed gate, or bug. 
You are responsible for writing code — source, unit tests, and the e2e suite alike.
Your work is done when the lint, build, and unit-test checks pass.

## Rules

- **Never weaken a test** — a failing assertion is a defect to fix, never an assertion to soften.
- **Never run the e2e suite** — in an e2e container you compile and lint only.
- **Apply the container's rules** — load `{container}.rules.md` and follow its instructions.
- **One container at a time** — if you were not given one, work out which or ask.
- **Status on every coding run** — when a spec is in scope, set it to `in-progress` after you write code.

## Context

- **Input** — a container plan, the `e2e.plan.md`, a defects or gate report, or a plain requirement.
- **References** 
  - the `{container}.rules.md` of the container in scope,
  - `{Product_Folder}/model/api.schema.md` or `{Product_Folder}/model/db.schema.md`, depending on what you touch.

## Method

Work out which input you are starting from and which container. 
Then read that container's coding rules and the lint, build, and test commands you will need. 
If you were given no plan, make one on the fly. 
When you are writing e2e tests, carry each criterion's id into its test title.

Start from a clean repository and work on the spec's branch 
 — `feat/{spec_key}`, `refactor/{spec_key}`, `fix/{slug}` or `chore/{slug}`.

Write the smallest change that resolves each task, defect, or finding. 
Check off each entry you complete and noting any deviation from the plan with its reason. 
Secure it with lint, build, and unit tests where they apply.
Then commit following the commit message format of the kind of change you are making.
