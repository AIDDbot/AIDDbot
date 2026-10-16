---
name: review-implementation
description: Review technical quality for one spec implementation.
metadata:
  aiddbot-kind: primitive
user-invocable: true
---
# review-implementation

Your goal is to qualify the implementation of one spec as an adversarial reviewer, and to record each finding that only a reader can see.

Read the spec, its full diff, the `{source_root}/AGENTS.md` of each affected project, and the affected schema documents under `{Product_Folder}/model/`. Judge them against `references/qualify.gates.md`.

The review checks only what the hook lint and the acceptance tests cannot see, such as security, accessibility, and data integrity. It never judges style, structure, layers, or complexity: `debt:medium` and `debt:low` own them. Each finding is serious enough to be `high` debt; leave out all else. A `refactor` has no review: the core refuses it.

- Judge only by reading. Never run lint, tests, or quality tools, and never edit code.
- Find each file through the folders and the primitives of that `AGENTS.md`, or with a file search. Never open a file by a guessed name.
- The schema documents still show the system before this spec, because `ship-spec` updates them. Their delay is never a finding.

For `amber` or `red`, write `.aiddbot/logs/{spec_key}.qualification.md` from `assets/qualification.template.md`, with only the failed controls and the findings. Leave out the passed controls and general review notes.

Then run `node .agents/aidd/aidd.mjs eval qualification <status> "<summary>"` from the spec branch. It records the next revision at the current commit and deletes the report when green.

The result is a recorded green evaluation, or a report of the findings only.
