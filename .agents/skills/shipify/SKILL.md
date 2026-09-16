---
name: shipify
description: Integrate and close an evidenced spec.
metadata:
  aiddbot-kind: primitive
user-invocable: true
disable-model-invocation: false
---
# shipify

Integrate and close an evidenced spec.

Read the spec, its PRD edits, qualification and verification reports, and diff. Require approval and current passing evidence. Missing, failed, blocked, or stale evidence prevents shipping. A semantic conflict resolution requires affected checks again.

Remove from the PRD only requirements marked `deprecated` whose obsolete implementation and acceptance coverage the evidence proves removed. Integrate the branch so code and PRD change together. Set `status: shipped` and `shipped_at` in `spec.md`; add `tag` when the project creates one. Reconcile the root map and project rules with approved work. New rule decisions return to the spec before closing.

Reconcile `TDR.md` from existing evidence without running lint, complexity, coverage, or other quality discovery. Promote each still-present minor qualification finding that is not already represented to one concise D entry linked to that qualification report, reserving its ID from `counters.yaml`. Remove only source D IDs declared by the spec whose resolution its passing evidence proves. Preserve every other entry and never reuse an ID.

Write a `CHANGELOG.md` entry for the shipped spec following the `CHANGELOG.template.md`.

Append a high-level release and version entry with a complete ISO 8601 timestamp to the spec's `journal.md`.

Commit the spec delivery changes, merge its branch into the default branch, create the next semantic version tag when the repository uses release tags, and remove the merged branch.

The result is one shipped spec with current product and debt records.

Commit as `chore(release): {version}`.
