---
name: ship-spec
description: Integrate and close an evidenced spec.
metadata:
  aiddbot-kind: primitive
user-invocable: true
---
# ship-spec

Your goal is to integrate one evidenced spec, and to close it with current schema and debt records.

Run `node .agents/aidd/aidd.mjs spec show` from the spec branch. If it lists a blocker, stop. Make sure that each report that is not green contains only current findings.

## Schemas

Apply the conceptual changes of the spec to `model.schema.md`. Update each affected `{project}.db.schema.md` and `{project}.api.schema.md` from the merged migrations, ORM schema, and routes, never from the spec. Change a timestamp only when the content changes.

## Debt

Change the debt register only with `node .agents/aidd/aidd.mjs debt`, and never run a quality tool.

- When the verification is green, remove with `debt remove <id>` each D ID that the `Technical debt` section of the spec gives, unless the latest quality run of the spec still shows it. The next scan records again what remains.
- Add with `debt add "<title>" <high|medium|low> "<evidence>"` each finding of a qualification that is not green, `high` when it is `blocking`. Also add each failure or finding that remains in a red report at revision 3. Skip each one that an open item already describes.

## Project AGENTS.md

- Promote each durable lesson of one project that no automatic check enforces to the project-rules table of its `{source_root}/AGENTS.md`: one short row, with its scope and a reason from the evidence. Never record a single incident, a product requirement, or tool output.
- Keep one shared-primitives table there. Add each helper that the spec made in `shared` and that two or more features use, with its contract and path. Remove each row whose export no longer exists. A helper of one feature, such as its page object, follows the name convention of that table and gets no row.

## Release

Run `node .agents/aidd/aidd.mjs run format`, then `node .agents/aidd/aidd.mjs run lint`: the core accepts no code that changed after its last lint. Commit what the format changed with `node .agents/aidd/aidd.mjs commit "style: format"`. The format is cosmetic: when it fails or is unavailable, continue.

Then run `node .agents/aidd/aidd.mjs release` from the spec branch. Add `--major` only when the delivery breaks compatibility for its users. The command checks the gate, sets the version from the spec type, and writes it to the version files and to `CHANGELOG.md`. It marks the spec `shipped`, makes the spec index again, commits, merges into the default branch, tags, and deletes the spec branch. Never edit a version or the changelog yourself.

When `release` refuses, report its error and stop with the spec not shipped. Never merge, tag, or integrate in a different way: only `release` writes the changelog and the spec index.

The result is one shipped spec, in the spec index, with current schema and debt records.

The core commits as `chore(release): {version}`.
