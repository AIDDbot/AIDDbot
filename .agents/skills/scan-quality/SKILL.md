---
name: scan-quality
description: Inspect quality evidence and keep the debt register current.
metadata:
  aiddbot-kind: primitive
user-invocable: true
---
# scan-quality

Your goal is to review the shipped quality and keep the technical debt register current.

The scan has two modes, and each owns one level of debt:

| Mode | Command | Checks | Debt |
| --- | --- | --- | --- |
| medium (default) | `node .agents/aidd/aidd.mjs run layers` | the logical layers, duplicated code, folder size | `medium` |
| low, when the caller asks | `node .agents/aidd/aidd.mjs run crap` | the complexity limits, the test coverage | `low` |

Run it for all projects, unless the human named one. Never edit code, write tests, or run `test`. The limits of the code rules, and the limits that the project rules of a project change, come to you only through these commands: never measure code yourself. A project without a `layers` command is unavailable. Never replace a command with a stricter invocation or with the lint of the pre-commit hook. A project without a `crap` command has nothing to harden.

Read the open debt with `node .agents/aidd/aidd.mjs debt list`. A `layers` run owns the `medium` items, and a `crap` run owns the `low` items. Make the items that the run owns agree with it, only through `node .agents/aidd/aidd.mjs debt`:

- Remove with `debt remove <id>` only an item whose check ran and no longer shows it. A check that could not run removes nothing.
- Add with `debt add "<title>" <priority> "<evidence>" --project <name>`, the project whose run reported it, only when current evidence shows a concrete impact and no open item describes it already. A `layers` finding is always `medium`. A `crap` finding is always `low`: it polishes code that works. The review and the triage of a spec record the `high` debt.
- A `crap` run records one item for each rule, the test coverage included, with each place in its evidence: one repair fixes all its places. When the rule is a false alarm for a project, such as a pattern that its framework requires, write in the evidence that the repair disables the rule in the configuration of that project, never with a comment in each place.
- Otherwise, record one item for each finding, or for each file and rule. Never record one item for a project or a gate, such as "backend quality fails": each item must be possible to repair alone.
- An unavailable check alone is not debt.
- When the run result has `folders`, `subfolders`, or `duplicates`, read `references/structure-findings.md`.

Quality never blocks shipping. Never ask the human if it must.

The result is a current debt register.

The core commits each change as `docs(quality): add|remove {D ID}`.
