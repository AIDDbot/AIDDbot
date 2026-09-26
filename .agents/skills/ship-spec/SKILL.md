---
name: ship-spec
description: Integrate and close an evidenced spec.
metadata:
  aiddbot-kind: primitive
user-invocable: true
---
# ship-spec

Your goal is to integrate one evidenced spec and close it with current product, schema, and debt records.

Run `scripts/preflight.mjs` with the spec ID or directory before integrating. It selects the latest journaled verification and qualification events, checks report presence and metadata against their status and revision, and decides whether the evidence permits shipping. Stop on any blocker and inspect each non-green report to confirm it contains only current findings.

Apply the spec's PRD edits, removing a `deprecated` requirement only when verification proves its implementation and tests are gone. Apply the spec's conceptual changes to `model.schema.md`, but update each affected `{project}.db.schema.md` and `{project}.api.schema.md` from the merged migrations, ORM schema, and routes, never from the spec. Touch a timestamp only when content changes.

Without running quality tools, reconcile `{Product_Folder}/quality/TDR.md` against the shipped changes before adding debt. For every source D ID in the spec's `Technical debt` section, remove its TDR entry when the delivered changes and current verification evidence prove the underlying issue is resolved; retain the same ID when it remains or is only partly resolved. Apply the same resolution check to other entries whose issue this spec fixes, including debt first identified by the `craft-lasting-quality` review flow. Then record each remaining qualification finding classified as `debt` and every failure or finding still present in a red report that reached revision 3, reusing the existing D ID when it describes the same unresolved issue and linking to its report when one exists. Never treat unavailable evidence as proof of resolution. Reserve new D IDs from `.aiddbot/counters.yaml` and never reuse one. If the register or the counters are missing, return the need to run `aiddbot init`.

Promote each durable, project-specific lesson that no automated check enforces into the coding-rules table of the applicable `{Agents_Folder}/rules/{project}.rules.md`, with its scope and evidence-based reason. Never record a one-off incident, a product requirement, or tool output.

Choose the next semantic version and synchronize it across every authoritative declaration as [release-versioning.md](references/release-versioning.md) describes. Set the spec to `shipped` with its date and tag, and add the release to `CHANGELOG.md` from `CHANGELOG.template.md`. Journal the release before integration. Then run `scripts/git-release.mjs <version>` from the spec branch; pass `--base <branch>` only when the local default branch cannot be inferred. It creates the release commit, merges into the default branch, tags the release when the repository has tags, and deletes the source branch only after a successful merge. It stages all current changes, so run it only after the spec's release records are complete.

The result is one shipped spec with current product, schema, and debt records.

The script commits as `chore(release): {version}`.
