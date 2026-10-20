---
name: ship-spec
description: Integrate and close an evidenced spec.
metadata:
  aiddbot-kind: primitive
user-invocable: true
---
# ship-spec

Your goal is to prove one evidenced spec against the full system, then integrate it and close it with current schema and debt records.

Run `node .agents/aidd/aidd.mjs spec show` from the spec branch. If it lists a blocker, stop. Make sure that each report that is not green contains only current findings.

## Schemas

Apply the conceptual changes of the spec to `model.schema.md`. Update each affected `{project}.db.schema.md` and `{project}.api.schema.md` from the merged migrations, ORM schema, and routes, never from the spec. Change a timestamp only when the content changes.

## Project AGENTS.md

- When the spec adds or removes a project, such as a `chore` that scaffolds it, run `outline-system` for the root `AGENTS.md` and for the schema documents of that project.
- Promote each durable lesson of one project that no automatic check enforces to the project-rules table of its `{source_root}/AGENTS.md`: one short row, with its scope and a reason from the evidence. Never record a single incident, a product requirement, or tool output.
- Each `AGENTS.md` stays under 100 lines: before you add a row, merge or remove one that a check or the code already gives.
- Keep one shared-primitives table there. Add each helper that the spec made in `shared` and that two or more features use, with its contract and path. Remove each row whose export no longer exists. A helper of one feature, such as its page object, follows the name convention of that table and gets no row.

## Regression

Only the ship tests the full system. The verification tested only the acceptance tests of the spec, and the Builder only the unit tests of its changes, so a regression shows here first.

Run `node .agents/aidd/aidd.mjs run test`: all the unit tests, then the full acceptance suite. `release` needs it at the current code. Never repair code or tests yourself, and never run a lint or a format: the pre-commit hook of the technology did that at each commit.

When a test fails, triage each failure into `.aiddbot/logs/{spec_key}.regression.md` from `assets/regression.template.md`: a record of the process, never a file of `{Product_Folder}/`. Give each failure one cause and one owner:

| Cause | Owner | Proposed repair |
| --- | --- | --- |
| The code of the spec breaks shipped behavior | **Builder** | the production code |
| The test is wrong, not the behavior | **Builder** | the test, with no weaker assertion |
| A requirement of this spec contradicts the test of a shipped one | human | `Replaces: {global ID}` in the spec, if the human agrees |
| Only a product decision can tell | human | the question |
| Too big for the spec: it failed before the spec, its repair is outside the scope of the spec, or the **Builder** tried it one time and could not repair it | debt | a `high` debt item |

- When a row has the owner **Builder** or human, stop with the spec not shipped and return the report: the repair stays in this spec, and the ship runs again after it.
- When only rows of the owner debt remain, record each one as `high` debt (see Debt) and give their D IDs to `release --debt`. The spec solves its problem as well as it can, and then it closes.

## Debt

Change the debt register only with `node .agents/aidd/aidd.mjs debt`. The priority tells the source: `high` comes from the review and from a triage, `medium` and `low` belong to `scan-quality` only.

- Remove with `debt remove <id>` each D ID that the `Technical debt` section of the spec gives, when the spec proves its repair: a green verification for a `feat` or a `fix`, a green qualification for a `fix` with no requirements, or, for a `refactor`, a `node .agents/aidd/aidd.mjs run layers --project {project}` that no longer shows it.
- Add with `debt add "<title>" high "<evidence>"` each finding of a qualification that is not green.
- At revision 3 of the verification, also add as `high` each failure that remains in the red report.
- Add as `high` each row of the regression report with the owner debt. Put the tag of each failing test in its evidence, such as `@S0042-R03`: the `fix` that repairs it runs that test again.
- Skip each one that an open item already describes, and give its D ID instead.

## Release

Run `node .agents/aidd/aidd.mjs release` from the spec branch. Add `--major` only when the request or the spec asks for a major version. The command checks the gate and the regression, sets the version from the spec type, and writes it to the version files and to `CHANGELOG.md`. It marks the spec `shipped`, makes the spec index again, commits, merges into the default branch, tags, and deletes the spec branch. Never edit a version or the changelog yourself.

When `release` refuses, report its error and stop with the spec not shipped. Never merge, tag, or integrate in a different way: only `release` writes the changelog and the spec index.

The result is one shipped spec, in the spec index, with current schema and debt records, or the failures of its regression.

The core commits as `chore(release): {version}`.
