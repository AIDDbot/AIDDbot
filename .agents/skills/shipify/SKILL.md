---
name: shipify
description: Integrate and close an evidenced spec.
metadata:
  aiddbot-kind: primitive
user-invocable: true
disable-model-invocation: true
---
# shipify

Your goal is to integrate and close an evidenced spec.

Read the spec, its PRD edits, qualification and verification reports, and diff. Require approval and current passing evidence. Missing, failed, blocked, or stale evidence prevents shipping. A semantic conflict resolution requires affected checks again.

Confirm deprecated PRD lines only leave after their checks pass. Integrate the branch so code and PRD change together. Set `status: shipped` and `shipped_at` in `spec.md`; add `tag` when the project creates one. Reconcile the root map and container rules with approved work. New rule decisions return to the spec before closing.

Promote still-present, non-blocking quality debt from the qualification report to `quality/findings.md`. Reserve Q IDs from `counters.yaml` and retain the ID of an existing duplicate. Remove only findings proven resolved by this shipped spec.

The result is one shipped spec.

Write a CHANGELOG entry for the shipped spec following [CHANGELOG.template.md](./assets/CHANGELOG.template.md)

**Git Procedure**Commit and tag under the project release policy, then delete the working branch.
