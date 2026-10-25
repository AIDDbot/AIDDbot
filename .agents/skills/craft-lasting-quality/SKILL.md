---
name: craft-lasting-quality
description: Reduce existing quality debt.
metadata:
  aiddbot-kind: orchestrator
user-invocable: true
---
# craft-lasting-quality

Your goal is to reduce existing quality debt, from high to low, each item with the smallest repair that proves it.

## Roles

- Route as the **Craftsman**. Use the **Craftsman** from the caller when available. Otherwise, spawn agents at the first step of each repair with a fresh context. Never copy or fork your conversation. Never carry context between repairs. Relay questions to the human. Stop each agent you started for a repair when it ends, also after a failure.
- Run this flow yourself. Never give the full flow to one agent: an agent you spawn cannot spawn other agents. Never read a skill you hand off.
- Wait for an agent with the longest timeout that the tool allows: each wait that ends early costs one more turn.
- Journal `node .agents/aidd/aidd.mjs log handoff "<from> → <to>: <what>"` before each scan, each patch, and each handover to `build-requested-spec`.

## Upgrade request

When the human asks for a dependency upgrade, skip the debt. Execute `build-requested-spec` with a `chore` for the named projects, or all projects. Repair all that the upgrade breaks. Stop after this spec.

## Select

Read `node .agents/aidd/aidd.mjs debt list`. Select an open item by priority: high, then medium, then low. First check the current code. Remove items that no longer exist with `node .agents/aidd/aidd.mjs debt remove <id>`. Journal the choice with `node .agents/aidd/aidd.mjs log select "<D ID>: <why>"`.

The priority sets the repair, not the size. The evidence of the item limits the scope of a spec. Leave findings from later checks for the next scan. The scope of a patch includes the `crap` of its project.

## High and medium debt

Run `node .agents/aidd/aidd.mjs spec debt <D ID>`. The core makes and approves a minimal spec. It includes other open items of the same priority and project in its `debt`. Execute `build-requested-spec` with it.

| Priority | Source | Spec and route |
| --- | --- | --- |
| `high` | The review, or a triage too big for its spec | `fix`: implement, verify, review, ship |
| `medium` | `layers`: layers, duplicates, folder size | `refactor`: implement until the check is green, then ship. No verification or review. The regression proves that behavior did not change. |

## Low debt: patch

Low debt comes from `crap`: complexity and test coverage. A patch has no spec or release. It does not count toward the limit of five specs. When you select a `low` item, read `references/patch.md` and follow it.

## Check

When no debt is open, run `node .agents/aidd/aidd.mjs run layers` and `node .agents/aidd/aidd.mjs run crap`. For a red project check, have the **Craftsman** execute `scan-quality` for that project and mode only: `layers` → medium, `crap` → low. Then select again. Never scan a green check.

## Stop

Select again while debt remains, also after a scan. Stop after five shipped specs or when a spec ships with a failure recorded as debt. Also stop when all project checks are green or a scan records nothing. A request that names one item gets only its repair. When you stop, return the summary of `debt list`.

The result is each selected debt item repaired, and the debt register that remains.
