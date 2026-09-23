---
name: ship-spec
description: Integrate and close an evidenced spec.
metadata:
  aiddbot-kind: primitive
user-invocable: true
---
# ship-spec

Your goal is to integrate one evidenced spec and close it with current product, schema, and debt records.

Ship only on current evidence: green verification with green or amber qualification, or a red report whose revision reached 3. Missing or stale evidence stops the delivery.

Apply the spec's PRD edits, removing a `deprecated` requirement only when verification proves its implementation and tests are gone. Apply the spec's conceptual changes to `model.schema.md`, but update each affected `{project}.db.schema.md` and `{project}.api.schema.md` from the merged migrations, ORM schema, and routes, never from the spec. Touch a timestamp only when content changes.

Without running quality tools, record in `{Product_Folder}/quality/TDR.md` every qualification finding classified as `debt` and every failure or finding still present in a red report that reached revision 3, each linked to its report, and remove the D entries the evidence proves resolved. Reserve new D IDs from `.aiddbot/counters.yaml` and never reuse one. If the register or the counters are missing, return the need to run `aiddbot init`.

Promote each durable, project-specific lesson that no automated check enforces into the coding-rules table of the applicable `{Agents_Folder}/rules/{project}.rules.md`, with its scope and evidence-based reason. Never record a one-off incident, a product requirement, or tool output.

Choose the next semantic version and synchronize it across every authoritative declaration as [release-versioning.md](references/release-versioning.md) describes. Set the spec to `shipped` with its date and tag, and add the release to `CHANGELOG.md` from `CHANGELOG.template.md`. Journal the release, then merge the delivery, tag it when the repository uses tags, and delete the merged branch.

The result is one shipped spec with current product, schema, and debt records.

Commit as `chore(release): {version}`.
