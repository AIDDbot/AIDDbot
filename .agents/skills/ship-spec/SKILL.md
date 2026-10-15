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
- Keep one shared-primitives table there. Add each helper that the spec made in `shared` and that two or more features use, with its contract and path. Remove each row whose export no longer exists. A helper of one feature, such as its page object, follows the name convention of that table and gets no row.

## Regression

Up to now, each step tested only its own surface. Now test the full system one time:

1. Run `node .agents/aidd/aidd.mjs run lint` for all projects. It applies the safe fixes of the linter.
2. When the lint passes, run `node .agents/aidd/aidd.mjs run format`, always last: a fix can change the layout. The format is cosmetic: when it fails or is unavailable, continue. Commit what the lint and the format changed with `node .agents/aidd/aidd.mjs commit "style: lint fixes and format"`.
3. Run `node .agents/aidd/aidd.mjs run test`: all the unit tests, then the full acceptance suite. Run it also when the lint fails.

Never repair code or tests yourself.

`release` refuses a failed regression. When the latest verification is red at revision 3, record each failure as debt and continue. Otherwise, triage each failure from its log in `.aiddbot/logs/`, and give it one cause and one owner:

| Cause | Owner | Proposed repair |
| --- | --- | --- |
| The code of the spec breaks shipped behavior, or the lint | **Builder** | the production code |
| The test is wrong, not the behavior | **Builder** | the test, with no weaker assertion |
| A requirement of this spec contradicts the test of a shipped one | human | `Replaces: {global ID}` in the spec, if the human agrees |
| Only a product decision can tell | human | the question |

- When open debt from `debt list`, recorded before this spec, explains each failure, give its D IDs to `release --preexisting` and continue.
- Otherwise, write `{Product_Folder}/specs/{spec_key}/verification.md` from `assets/triage.template.md`, then run `node .agents/aidd/aidd.mjs eval verification red "<summary>"`. Return the triage, and stop with the spec not shipped. The repair stays in this spec: a regression never reaches the default branch.

## Debt

Change the debt register only with `node .agents/aidd/aidd.mjs debt`, and never run a quality tool. The priority tells the source; `medium` belongs to `scan-quality` only.

- When the verification is green, remove with `debt remove <id>` each D ID that the `Technical debt` section of the spec gives, unless the latest quality run of the spec still shows it.
- Add with `debt add "<title>" <high|low> "<evidence>"` each finding of a qualification that is not green: `high` when it is `blocking`, else `low`.
- At revision 3, also add as `high` each failure that remains in the red report and each failure of the regression.
- Skip each one that an open item already describes.

## Release

Run `node .agents/aidd/aidd.mjs release` from the spec branch. Add `--major` only when the delivery breaks compatibility for its users. The command checks the gate and the regression, sets the version from the spec type, and writes it to the version files and to `CHANGELOG.md`. It marks the spec `shipped`, makes the spec index again, commits, merges into the default branch, tags, and deletes the spec branch. Never edit a version or the changelog yourself.

When `release` refuses, report its error and stop with the spec not shipped. Never merge, tag, or integrate in a different way: only `release` writes the changelog and the spec index.

The result is one shipped spec, in the spec index, with current schema and debt records, or a triage of its regression.

The core commits as `chore(release): {version}`.
