---
name: scan-quality
description: Inspect quality evidence and keep the debt register current.
metadata:
  aiddbot-kind: primitive
user-invocable: true
---
# scan-quality

Your goal is to review the shipped quality and keep the technical debt register current.

Run `node .agents/aidd/aidd.mjs run quality` for all projects, unless the human named one. Never edit code, write tests, or run `lint`, `unit`, or `acceptance`. The limits of the Blueprint, and the limits that the technology rules of a project change, come to you only through its `quality` command: never measure code yourself. A project without a `quality` command is unavailable. Never replace that command with a stricter invocation or with the build lint.

Read the open debt with `node .agents/aidd/aidd.mjs debt list`. Then make it agree with the run, only through `node .agents/aidd/aidd.mjs debt`:

- Remove with `debt remove <id>` only an item whose check ran and no longer shows it. A check that could not run removes nothing.
- Add with `debt add "<title>" <high|medium|low> "<evidence>"` only when current evidence shows a concrete impact and no open item describes it already.
- Record one item for each finding, or for each file and rule. Never record one item for a project or a gate, such as "backend quality fails": each item must be possible to repair alone.
- An unavailable check alone is not debt.
- When the run result has `folders`, `subfolders`, or `duplicates`, read `references/structure-findings.md`.

Quality never blocks shipping. Never ask the human if it must.

The result is a current debt register.

The core commits each change as `docs(quality): add|remove {D ID}`.
