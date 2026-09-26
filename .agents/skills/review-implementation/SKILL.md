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

For `amber` or `red`, write `{Product_Folder}/specs/{spec_key}/qualification.md` from `assets/qualification.template.md` with only failed controls and findings; omit passed controls and general review notes. Then run `scripts/finalize.mjs <spec-directory> <status> "<summary>"`. The finalizer requires green verification or red verification at revision 3 or later, selects the next qualification revision, synchronizes report metadata, updates the spec's general status, `updated_at`, and `last_process`, removes any report on `green`, and journals the evaluation. Do not increment revisions or journal this evaluation separately.

The result is a journaled green evaluation or a finding-only qualification report.

Commit as `docs(review): qualify implementation`.
