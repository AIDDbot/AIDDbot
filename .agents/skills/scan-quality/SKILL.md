---
name: scan-quality
description: Inspect quality evidence and keep the debt register current.
metadata:
  aiddbot-kind: primitive
user-invocable: true
---
# scan-quality

Your goal is to review the shipped quality and keep the technical debt register current.

The scan has two modes. Each mode owns one level of debt:

| Mode | Command | Checks | Debt |
| --- | --- | --- | --- |
| medium (default) | `node .agents/aidd/aidd.mjs run layers` | the logical layers, duplicated code, folder size | `medium` |
| low, when the caller asks | `node .agents/aidd/aidd.mjs run crap` | the complexity limits, the test coverage | `low` |

Run the scan for all projects, unless the human names one. Never edit code, write tests, or run `test`.

Never measure code yourself: the limits of the code rules and of the project rules reach you only through these commands. Never replace a command with a stricter invocation or with the lint of the pre-commit hook. A project without a `layers` command is unavailable. In the low mode, read `references/crap-findings.md` before you record debt.

Read the open debt with `node .agents/aidd/aidd.mjs debt list`. A `layers` run owns the `medium` items. A `crap` run owns the `low` items. Make the items that the run owns agree with it. Change them only through `node .agents/aidd/aidd.mjs debt`:

- Remove an item with `debt remove <id>` only when its check ran and no longer shows it. A check that could not run removes nothing.
- Add an item with `debt add "<title>" <priority> "<evidence>" --project <name>`. The project is the one whose run reported the finding. Add it only when current evidence shows a concrete impact. Also make sure that no open item describes it already.
- A `layers` finding is always `medium`. A `crap` finding is always `low`: it improves code that works. The review and the triage of a spec record the `high` debt.
- A `layers` run records one item for each finding, or for each file and rule.
- Never record one item for a project or a gate, such as "backend quality fails". Each item must be possible to repair alone.
- An unavailable check alone is not debt.
- When the run result has `folders`, `subfolders`, or `duplicates`, read `references/structure-findings.md`.

Quality never blocks shipping. Never ask the human if it must.

The result is a current debt register.

The core commits each change as `docs(quality): add|remove {D ID}`.
