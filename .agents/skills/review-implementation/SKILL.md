---
name: review-implementation
description: Review technical quality for one spec implementation.
metadata:
  aiddbot-kind: primitive
user-invocable: true
---
# review-implementation

Your goal is to qualify one spec's implementation as an adversarial reviewer and record any findings.

Read the spec, its complete diff, the affected project rules, and the affected schema documents under `{Product_Folder}/model/`, then judge them against `qualify.gates.md`. Judge by reading; never run lint, tests, or quality tools, and never edit code.

For `amber` or `red`, write `{Product_Folder}/specs/{spec_key}/qualification.md` from `assets/qualification.template.md` with only failed controls and findings; omit passed controls and general review notes. Then run `node .agents/aidd/aidd.mjs eval record qualification <spec-directory> <status> "<summary>"`. It requires green verification or red verification at revision 3 or later, selects the next qualification revision, records the evaluation and whether it requires its report in `control.json`, updates the spec state, removes any report on `green`, and journals the evaluation. Never increment revisions yourself.

The result is a recorded green evaluation or a finding-only qualification report.

Commit as `docs(review): qualify implementation`.
