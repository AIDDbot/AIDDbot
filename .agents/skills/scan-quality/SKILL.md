---
name: scan-quality
description: Inspect quality evidence and keep the debt register current.
metadata:
  aiddbot-kind: primitive
user-invocable: true
---
# scan-quality

Your goal is to review shipped quality and keep the technical debt register current.

Run `node .agents/aidd/aidd.mjs run quality`, across every project unless the human named one. Never edit code, write tests, or run `lint`, `unit`, or `acceptance` yourself. The thresholds of each project's `AGENTS.md` coding rules reach you only through its `quality` command; never measure code yourself. A project without a `quality` command configured is unavailable, never replaced with a stricter invocation or with the build lint.

Read the open debt with `node .agents/aidd/aidd.mjs debt list`, then reconcile it with the run through `aidd debt` alone. Remove with `debt remove <id>` only an item whose check ran and no longer shows it; a check that could not run never removes anything. Add a new item with `debt add "<title>" <high|medium|low> "<evidence>"` only when current evidence confirms a concrete impact and no open item already describes it. Record one item per finding or per file and rule, never one per project or per gate ("backend quality fails"), so each can be repaired on its own. Priority is `high` when it breaks behavior, security, or data; `medium` when it slows or complicates change; `low` otherwise. A standalone unavailable check is not debt. Each entry of `folders` in the run result is a `shared` or `features` folder with too many direct entries: record it as `medium` debt, to be repaired by grouping its files in folders by technical concern or by domain. Never edit `control.json`, `debt.json`, or anything under `.aiddbot/` by hand: when a command refuses, fix what its error names and run it again.

Quality never blocks shipping, so never ask the human whether it should.

The result is a current debt register.

The core commits each change as `docs(quality): add|remove {D ID}`.
