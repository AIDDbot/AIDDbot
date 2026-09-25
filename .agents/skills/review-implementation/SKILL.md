---
name: review-implementation
description: Review technical quality for one spec implementation.
metadata:
  aiddbot-kind: primitive
user-invocable: true
---
# review-implementation

Your goal is to qualify one spec's implementation as an adversarial reviewer and record any findings.

Read the spec, its complete diff, the affected project rules, and the affected schema documents under `{Product_Folder}/model/`, then judge them against `qualify.gates.md`. Judge by reading: never run lint, tests, or other tools, and never edit code.

Increment the evaluation revision once per run, using the latest journaled revision when resuming. Journal every evaluation with its status and revision. When there are no findings, remove any existing `{Product_Folder}/specs/{spec_key}/qualification.md` and write no report. For `amber` or `red`, write that file from `assets/qualification.template.md` with only failed controls and findings; omit passed controls and general review notes.

The result is a journaled green evaluation or a finding-only qualification report.

Commit as `docs(review): qualify implementation`.
