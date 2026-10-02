---
name: ship-spec
description: Integrate and close an evidenced spec.
metadata:
  aiddbot-kind: primitive
user-invocable: true
---
# ship-spec

Your goal is to integrate one evidenced spec and close it with current schema and debt records.

Run `node .agents/aidd/aidd.mjs spec show` from the spec branch and stop on any listed blocker. Inspect each non-green report to confirm it contains only current findings.

Apply the spec's conceptual changes to `model.schema.md`, but update each affected `{project}.db.schema.md` and `{project}.api.schema.md` from the merged migrations, ORM schema, and routes, never from the spec. Touch a timestamp only when content changes.

Without running quality tools, reconcile the debt register through `node .agents/aidd/aidd.mjs debt` alone. Remove with `debt remove <id>` each D ID the spec's `Technical debt` section cites once verification is green, unless the spec's latest quality run still shows it; the next scan records again whatever remains. Then add every finding of a non-green qualification, `high` when it is classified `blocking`, and every failure or finding still present in a red report that reached revision 3, with `debt add "<title>" <high|medium|low> "<evidence>"`, unless an open item already describes it. Priority is `high` when it breaks behavior, security, or data; `medium` when it slows or complicates change; `low` otherwise. Never edit `control.json`, `debt.json`, or anything under `.aiddbot/` by hand: when a command refuses, fix what its error names and run it again.

Promote each durable, project-specific lesson that no automated check enforces into the project-rules table of the applicable `{source_root}/AGENTS.md`, with its scope and evidence-based reason. Never record a one-off incident, a product requirement, or tool output. Add every helper the spec created in `shared` to the shared-primitives table of that `AGENTS.md`, with its contract and path.

Then run `node .agents/aidd/aidd.mjs run format` and commit whatever it rewrote with `node .agents/aidd/aidd.mjs commit "style: format"`; it is cosmetic, so a failing or unavailable format never stops shipping. Then run `node .agents/aidd/aidd.mjs release` from the spec branch, adding `--major` only when the delivery breaks compatibility for its users. It enforces the gate, derives the version from the spec type, writes it into the version files and `CHANGELOG.md`, marks the spec `shipped`, regenerates the spec index, commits, merges into the default branch, tags, and deletes the spec branch. Never edit a version or the changelog yourself. When it refuses, report its error and stop with the spec unshipped: never merge, tag, or integrate by other means, because only `release` writes the changelog and the spec index.

The result is one shipped spec, listed in the spec index, with current schema and debt records.

The core commits as `chore(release): {version}`.
