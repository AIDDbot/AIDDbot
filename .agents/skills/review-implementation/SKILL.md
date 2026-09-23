---
name: review-implementation
description: Review technical quality for one spec implementation.
metadata:
  aiddbot-kind: primitive
user-invocable: true
---
# review-implementation

Your goal is to qualify one spec's implementation as an adversarial reviewer.

Read the spec, its complete diff, the affected project rules, and the affected schema documents under `{Product_Folder}/model/`, then judge them against `qualify.gates.md`. Judge by reading: never run lint, tests, or other tools, and never edit code.

Write `{Product_Folder}/specs/{spec_key}/qualification.md` from `qualification.template.md`, with the status the gates' findings classify. Increment its revision once per evaluation, never for a document edit, and preserve the counter when resuming.

Journal each revision with its status.

The result is current qualification evidence for the spec.

Commit as `docs(review): qualify implementation`.
