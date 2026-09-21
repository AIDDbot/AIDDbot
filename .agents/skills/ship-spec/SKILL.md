---
name: ship-spec
description: Integrate and close an evidenced spec.
metadata:
  aiddbot-kind: primitive
user-invocable: true
disable-model-invocation: false
---
# ship-spec

Integrate and close an evidenced spec.

Read the approved spec, diff, and current reports. Ship normally with green verification and green or amber qualification. A current red report may ship only when its evaluation revision is at least 3, proving that the repair loop reached its ceiling. Missing or stale evidence stops delivery.

Apply its PRD edits, removing `deprecated` requirements only when verification proves the obsolete implementation and tests are gone.

Without running quality tools, add every still-present verification failure and qualification finding from an eligible delivery to `{Product_Folder}/quality/TDR.md`. Include qualification findings classified as `debt` during normal shipping and every unresolved finding from a red report that reached revision 3. Link each entry to its report evidence. Remove declared D IDs whose resolution the evidence proves. If the initialized register or counters are missing, return the need to execute `document-system`; do not create replacements. Reserve new D IDs from `counters.yaml` and never reuse them.

Set the spec to `shipped` with its date and tag. Update `CHANGELOG.md` following `CHANGELOG.template.md`. Execute `record-journal` for the release with `stage: ship`.

Commit and merge the delivery, create the next semantic version tag when the repository uses them, and remove the merged branch.

The result is one shipped spec with current product and debt records.

Commit as `chore(release): {version}`.
