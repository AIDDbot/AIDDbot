---
name: ship-spec
description: Integrate and close an evidenced spec.
metadata:
  aiddbot-kind: primitive
user-invocable: true
---
# ship-spec

Your goal is to integrate one evidenced spec and close it with current schema and debt records.

Run `node .agents/aidd/aidd.mjs eval gate` with the spec ID or directory before integrating. It reads the latest verification and qualification in the spec's `control.json`, checks that each required report is present and filled in and each unrequired one absent, and decides whether the evidence permits shipping. Stop on any blocker and inspect each non-green report to confirm it contains only current findings.

Apply the spec's conceptual changes to `model.schema.md`, but update each affected `{project}.db.schema.md` and `{project}.api.schema.md` from the merged migrations, ORM schema, and routes, never from the spec. Touch a timestamp only when content changes.

Without running quality tools, reconcile the debt register through `node .agents/aidd/aidd.mjs debt` alone, never editing it or its `TDR.md` view by hand. Resolve with `debt resolve <id> --spec <spec>` each D ID the spec's `Technical debt` section cites and the delivered changes fix; the core refuses it unless the spec cites that ID and its verification is green, and an issue that remains or is only partly fixed keeps its item. Then register each remaining qualification finding classified as `debt`, and every failure or finding still present in a red report that reached revision 3, with `debt add --source <spec-key>/<report>`; when the issue is already open, update that item with `debt update <id> --source …` instead.

Promote each durable, project-specific lesson that no automated check enforces into the coding-rules table of the applicable `{Agents_Folder}/rules/{project}.rules.md`, with its scope and evidence-based reason. Never record a one-off incident, a product requirement, or tool output.

Then run `node .agents/aidd/aidd.mjs release` from the spec branch, adding `--major` only when the delivery breaks compatibility for its users, and `--base <branch>` only when the local default branch cannot be inferred. It enforces the gate, derives the version from the spec type, writes it into the version files and `CHANGELOG.md`, marks the spec `shipped`, regenerates the spec index, commits, merges into the default branch, tags, and deletes the spec branch. Never edit a version or the changelog yourself. When it refuses, report its error and stop with the spec unshipped: never merge, tag, or integrate by other means, because only `release` writes the changelog and the spec index.

The result is one shipped spec, listed in the spec index, with current schema and debt records.

The core commits as `chore(release): {version}`.
