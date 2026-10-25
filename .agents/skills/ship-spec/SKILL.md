---
name: ship-spec
description: Integrate and close an evidenced spec.
metadata:
  aiddbot-kind: primitive
user-invocable: true
---
# ship-spec

Your goal is to prove one evidenced spec against the full system, then integrate it and close it with current schema and debt records.

From the spec branch, run `node .agents/aidd/aidd.mjs spec show`. If it lists a blocker, stop. Keep only current findings in reports that are not green.

## Schemas

Apply the conceptual changes of the spec to `model.schema.md`. Update each affected `{project}.db.schema.md` and `{project}.api.schema.md` from the merged migrations, ORM schema, and routes. Never use the spec for these physical schemas. Change a timestamp only when the content changes.

## Project AGENTS.md

- When the spec adds or removes a project, run `outline-system` for the root `AGENTS.md` and the schema documents of that project.
- Add durable lessons that no automatic check enforces to the project rules of `{source_root}/AGENTS.md`. Use one short line with its reason from the evidence. Never add single incidents, product requirements, tool output, or feature descriptions.
- For a platform change, replace the line of its `core` folder in Platform.
- The `release` command rejects an `AGENTS.md` with more than 128 lines, comments, or sections that are empty or out of order. Run `node .agents/aidd/aidd.mjs agents check` before release. To make room, merge or remove lines that checks, code, or the root `AGENTS.md` already give. The core writes the index of each `shared` folder.

## Regression

Run `node .agents/aidd/aidd.mjs run test --project {e2e}` for each `e2e` project. Only `ship-spec` runs the full acceptance suite. The `release` command needs this evidence at the current code. Do not repeat unit tests: `crap` ran all of them, and the hooks ran those affected by each commit. Never repair code or tests. Never run lint or format.

If a test fails, read `references/regression.md`. Record the triage in `.aiddbot/logs/{spec_key}.regression.md` from `assets/regression.template.md`. Never put this report in `{Product_Folder}/`.

If a row has the owner **Builder** or human, stop with the spec not shipped. Return the report. Repairs stay in this spec. Run `ship-spec` again after repair. If only debt rows remain, record them as `high` debt. Give their D IDs to `release --debt`.

## Debt

Change the debt register only with `node .agents/aidd/aidd.mjs debt`. Review and triage produce `high` debt. Only `scan-quality` produces `medium` and `low` debt.

- Remove only IDs from `Technical debt` in the spec with `debt remove <id>`, and only with proof of repair. A `feat` or `fix` needs green verification. A `fix` without requirements uses green qualification instead. For a `refactor`, `node .agents/aidd/aidd.mjs run layers --project {project}` must no longer show the item.
- Add each finding of a qualification that is not green with `debt add "<title>" high "<evidence>" --project <name>`. Use the project of its scope.
- At revision 3 of the verification, add each failure that remains in the red report as `high` debt.
- Add regression debt rows as `high`. Put the tag of each failed test in the evidence, such as `@S0042-R03`. Thus the repair runs that test again.
- Use the D ID of an open item that already describes a finding. Never duplicate it.

## Release

Run `node .agents/aidd/aidd.mjs release` from the spec branch. Add `--major` only when the request or the spec asks for a major version. The command checks the gate and the regression. It controls the versions, changelog, and spec index. It commits, merges into the default branch, tags, and deletes the spec branch. Never edit versions or the changelog yourself. Never merge, tag, or integrate another way.

If `release` rejects the spec, report the error and stop with the spec not shipped.

The result is one shipped spec, in the spec index, with current schema and debt records, or the failures of its regression.

The core commits as `chore(release): {version}`.
