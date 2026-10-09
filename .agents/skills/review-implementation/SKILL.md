---
name: review-implementation
description: Review technical quality for one spec implementation.
metadata:
  aiddbot-kind: primitive
user-invocable: true
---
# review-implementation

Your goal is to qualify the implementation of one spec as an adversarial reviewer, and to record each finding.

Read the spec, its full diff, the `{source_root}/AGENTS.md` of each affected project, and the affected schema documents under `{Product_Folder}/model/`. Judge them against `references/qualify.gates.md`.

- Judge only by reading. Never run lint, tests, or quality tools, and never edit code.
- Find each file through the folders and the primitives of that `AGENTS.md`, or with a file search. Never open a file by a guessed name.
- The schema documents still show the system before this spec, because `ship-spec` updates them. Their delay is never a finding.
- When that `AGENTS.md` keeps a layer boundary as a written rule, because no linter checks it, check it in the diff.
- Names must carry their domain meaning. A misleading name, an unnamed compound condition, or a check that repeats a shared primitive is a `debt` finding, never a `blocking` one.

For `amber` or `red`, write `{Product_Folder}/specs/{spec_key}/qualification.md` from `assets/qualification.template.md`, with only the failed controls and the findings. Leave out the passed controls and general review notes.

Then run `node .agents/aidd/aidd.mjs eval qualification <status> "<summary>"` from the spec branch. It records the next revision at the current commit, deletes the report when green, and commits the record.

The result is a recorded green evaluation, or a report of the findings only.

The core commits as `docs(review): qualify implementation`.
