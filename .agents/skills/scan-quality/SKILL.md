---
name: scan-quality
description: Inspect quality evidence and keep the debt register current.
metadata:
  aiddbot-kind: primitive
user-invocable: true
---
# scan-quality

Your goal is to review shipped quality and keep the technical debt register current.

Run `node .agents/aidd/aidd.mjs run quality`, across every project unless the human named one. Never edit code, write tests, or run `lint`, `unit`, or `acceptance` yourself. A project without a `quality` command configured is unavailable, never replaced with a stricter invocation or with the build lint.

Read the open debt with `node .agents/aidd/aidd.mjs debt list`, then reconcile it with the run through `aidd debt` alone; it writes the register and its `TDR.md` view, so never edit either by hand. For an item the run still shows, run `debt update <id> --source quality:<project>` with its current evidence; for one whose check could not run, `debt update <id> --state not-revalidated`, because unavailable evidence never resolves; for one a check that ran no longer shows, `debt resolve <id> --scan <project>`. Add a new item with `debt add` only when current evidence confirms a concrete impact, and keep the same ID when an observation describes an issue already open. A standalone unavailable check is not debt.

The result is a current debt register.

Commit as `docs(quality): audit system`.
