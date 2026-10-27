---
name: review-implementation
description: Review technical quality for one spec implementation.
metadata:
  aiddbot-kind: primitive
user-invocable: true
---
# review-implementation

Your goal is to qualify the implementation of one spec. Review it as a strict reviewer who looks for faults. Record each finding that only a reader can see.

Read these documents:

- The spec.
- The diff of its branch from the default branch, in the source of the projects only.
- The `{source_root}/AGENTS.md` of each affected project.
- The affected schema documents under `.product/model/`.

Leave each lock file, such as `package-lock.json`, out of the diff. A tool writes it. Also leave out the records of `.aiddbot/` and `.product/`. Keep each dependency manifest, such as `package.json`: the Project rules gate checks it. Judge all of them against `references/qualify.gates.md`.

The review checks only what the hook lint and the acceptance tests cannot see. Examples are security, accessibility, and data integrity. It never judges style, structure, layers, or complexity: `layers` and `crap` own them. Record only findings that are serious enough to be `high` debt. Leave out all else.

- Judge only by reading. Never run lint, tests, or quality tools. Never edit code.
- Find each file through the folders of that `AGENTS.md`, the index of `shared` (`src/shared/README.md`), or a file search. Never open a file by a name that you guess.
- The schema documents still show the system before this spec, because `ship-spec` updates them. Their delay is never a finding.

For `amber` or `red`, write `.aiddbot/logs/{spec_key}.qualification.md` from `assets/qualification.template.md`. Write only the failed controls and the findings. Leave out the passed controls and general review notes.

Then run `node .agents/aidd/aidd.mjs eval qualification <status> "<summary>"` from the spec branch. It records the next revision at the current commit. When the status is green, it deletes the report.

The result is a recorded green evaluation, or a report of the findings only.
