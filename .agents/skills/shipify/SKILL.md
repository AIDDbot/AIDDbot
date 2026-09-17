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

Read the approved spec, diff, and current reports. Ship only with green verification and green or amber qualification.

Apply its PRD edits, removing `deprecated` requirements only when verification proves the obsolete implementation and tests are gone.

Without running quality tools, add still-present minor qualification findings to `{Product_Folder}/quality/TDR.md` and remove declared D IDs whose resolution the evidence proves. If the initialized register or counters are missing, return the need to execute `explore`; do not create replacements. Reserve new D IDs from `counters.yaml` and never reuse them.

Set the spec to `shipped` with its date and tag. Update `CHANGELOG.md` following `CHANGELOG.template.md` and append the release to `journal.md`.

Commit and merge the delivery, create the next semantic version tag when the repository uses them, and remove the merged branch.

The result is one shipped spec with current product and debt records.

Commit as `chore(release): {version}`.
