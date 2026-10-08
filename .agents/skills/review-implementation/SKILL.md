---
name: review-implementation
description: Review technical quality for one spec implementation.
metadata:
  aiddbot-kind: primitive
user-invocable: true
---
# review-implementation

Your goal is to qualify one spec's implementation as an adversarial reviewer and record any findings.

Read the spec, its complete diff, the `{source_root}/AGENTS.md` of each affected project, and the affected schema documents under `{Product_Folder}/model/`, then judge them against `references/qualify.gates.md`. The schema documents still describe the system before this spec, because `ship-spec` updates them, so their lag is never a finding. Where that `AGENTS.md` keeps a layer boundary as a written rule because no linter checks it, check it in the diff. Judge whether names carry their domain meaning, and record a misleading name, an unnamed compound condition, or a check that duplicates a shared primitive as a `debt` finding, never a `blocking` one. Judge by reading; never run lint, tests, or quality tools, and never edit code.

For `amber` or `red`, write `{Product_Folder}/specs/{spec_key}/qualification.md` from `assets/qualification.template.md` with only failed controls and findings; omit passed controls and general review notes. Then run `node .agents/aidd/aidd.mjs eval qualification <status> "<summary>"` from the spec branch; it records the next revision at the current commit, drops the report when green, and commits the record. Never edit `control.json`, `debt.json`, or anything under `.aiddbot/` by hand: when a command refuses, fix what its error names and run it again.

The result is a recorded green evaluation or a finding-only qualification report.

The core commits as `docs(review): qualify implementation`.
