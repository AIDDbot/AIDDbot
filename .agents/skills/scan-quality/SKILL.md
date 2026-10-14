---
name: scan-quality
description: Inspect quality evidence and keep the debt register current.
metadata:
  aiddbot-kind: primitive
user-invocable: true
---
# scan-quality

Your goal is to review the shipped quality and keep the technical debt register current.

Run `node .agents/aidd/aidd.mjs run quality` for all projects, unless the human named one. When the caller asks to harden, run `run harden` instead: the final polish, such as the warnings of the linter and stricter rules. Never edit code, write tests, or run `lint` or `test`. The limits of the Blueprint, and the limits that the technology rules of a project change, come to you only through its `quality` command: never measure code yourself. A project without a `quality` command is unavailable. Never replace that command with a stricter invocation or with the build lint. A project without a `harden` command has nothing to harden.

Read the open debt with `node .agents/aidd/aidd.mjs debt list`. A `quality` run owns the `medium` items, and a `harden` run owns the `low` items with origin `scan`. Make the items that the run owns agree with it, only through `node .agents/aidd/aidd.mjs debt`:

- Remove with `debt remove <id>` only an item whose check ran and no longer shows it. A check that could not run removes nothing.
- Add with `debt add "<title>" <priority> "<evidence>"` only when current evidence shows a concrete impact and no open item describes it already. A `quality` finding is always `medium`. A `harden` finding is always `low`: it polishes code that works. The review of a spec records the other `high` and `low` debt.
- A `harden` run records one item for each rule, with each place in its evidence: one repair fixes all its places. When the rule is a false alarm for a project, such as a pattern that its framework requires, write in the evidence that the repair disables the rule in the configuration of that project, never with a comment in each place.
- Otherwise, record one item for each finding, or for each file and rule. Never record one item for a project or a gate, such as "backend quality fails": each item must be possible to repair alone.
- An unavailable check alone is not debt.
- When the run result has `folders`, `subfolders`, or `duplicates`, read `references/structure-findings.md`.

Quality never blocks shipping. Never ask the human if it must.

The result is a current debt register.

The core commits each change as `docs(quality): add|remove {D ID}`.
