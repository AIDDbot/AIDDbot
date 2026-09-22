---
name: ship-spec
description: Integrate and close an evidenced spec.
metadata:
  aiddbot-kind: primitive
user-invocable: true
---
# ship-spec

Integrate and close an evidenced spec.

Read the approved spec, diff, and current reports. Ship normally with green verification and green or amber qualification. A current red report may ship only when its evaluation revision is at least 3, proving that the repair loop reached its ceiling. Missing or stale evidence stops delivery.

Apply its PRD edits, removing `deprecated` requirements only when verification proves the obsolete implementation and tests are gone.

Reconcile the schema documents under `{Product_Folder}/model/` with the delivery. Apply the spec's conceptual changes to `model.schema.md`. Update each affected `{project}.db.schema.md` and `{project}.api.schema.md` from the merged migrations, ORM schema, and routes, not from the spec, keeping each document's structure. Remove deprecated elements only when the diff shows them gone. When a delivery gives a project its first persistence or endpoints and its schema document is missing, report that `document-project` must run for that project. Update a schema timestamp only when its content changes.

Without running quality tools, add every still-present verification failure and qualification finding from an eligible delivery to `{Product_Folder}/quality/TDR.md`. Include qualification findings classified as `debt` during normal shipping and every unresolved finding from a red report that reached revision 3. Link each entry to its report evidence. Remove declared D IDs whose resolution the evidence proves. If the initialized register or counters are missing, return the need to execute `document-system`; do not create replacements. Reserve new D IDs from `.aiddbot/counters.yaml` and never reuse them.

Review the implementation, verification, qualification, and repair evidence for lessons that would prevent the same class of error. Add each durable, project-specific, non-automatable constraint to the applicable `{Agents_Folder}/rules/{project}.rules.md` coding-rules table with its scope and evidence-based reason. Consolidate equivalent rules. Do not record a one-off incident, product requirement, tool output, or restriction already enforced by an automated check. Update the rules file timestamp only when its content changes.

Choose the next semantic version from the repository's release policy. Before committing, synchronize that exact version across every existing authoritative declaration for the released product, following [release-versioning.md](references/release-versioning.md). The root `package.json` version created by `scaffold-system` is authoritative and must change on every ship. Do not create a version file where the project has none. Set the spec to `shipped` with its date and matching tag, and update `CHANGELOG.md` from `CHANGELOG.template.md` with the same version. Execute `record-journal` for the release with `stage: ship` and the spec ID.

Commit and merge the delivery, create the next semantic version tag when the repository uses them, and remove the merged branch.

The result is one shipped spec with current product, schema, and debt records.

Commit as `chore(release): {version}`.
