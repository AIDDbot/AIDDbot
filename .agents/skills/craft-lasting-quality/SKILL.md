---
name: craft-lasting-quality
description: Reduce existing quality debt.
metadata:
  aiddbot-kind: orchestrator
user-invocable: true
---
# craft-lasting-quality

Your goal is to reduce existing quality debt, from high to low, each item with the smallest repair that proves it.

```text
upgrade request ─────────────────────────────────────────────────────┐
1. you         debt list              the next item                    │  high, then medium, then low
2. high        spec debt  → fix       build-requested-spec             │  approved when made
3. medium      spec debt  → refactor  build-requested-spec             │
4. low         Builder    patch                   crap green           │  no spec
   repeat 1–4 while debt remains, at most 5 specs                      │
5. you         run layers, crap       all green: stop                  │
   red:        Craftsman  scan-quality            its debt, then 1     │  only a red check
   you         build-requested-spec   shipped chore                   ◄┘
```

| Debt | Comes from | Repaired by |
| --- | --- | --- |
| `high` | the review, or a triage too big for its spec | a `fix` spec: implement, verify, review, ship |
| `medium` | `layers`: layers, duplicates, folder size | a `refactor` spec: implement with the check green, ship |
| `low` | `crap`: complexity, test coverage | a patch: implement with the check green, integrate |

## Roles

- Route as the **Craftsman**. Use the **Craftsman** that a calling orchestrator gives you. Otherwise, spawn the agents of each repair when its first step starts, with a fresh context: never fork or copy your conversation into it. Thus no repair inherits the context of the one before. Relay their questions to the human. When a repair ends, also after a failure, stop each agent that you started for it.
- Run this flow yourself. Never give all of it to one agent, because an agent that you spawn cannot spawn other agents. Never read the skill of a step that you hand off.
- Wait for an agent with the longest timeout that the tool allows: each wait that ends early costs one more turn.
- Journal `node .agents/aidd/aidd.mjs log handoff "<from> → <to>: <what>"` before each scan, each patch, and each handover to `build-requested-spec`.

## Upgrade request

When the human asks to upgrade dependencies, skip the debt. The request is a `chore` that upgrades the named projects, or all projects, and repairs all that the upgrade breaks. Execute `build-requested-spec` with it, and stop after that one spec.

## 1. Select

Read `node .agents/aidd/aidd.mjs debt list` and take the open item of the highest priority. Before you take it, check in the current code that it still exists, because an earlier repair of this run can remove it: remove an item that no longer exists with `debt remove <id>`. Journal the choice with `node .agents/aidd/aidd.mjs log select "<D ID>: <why>"`.

The priority sets the repair, so no one judges "big" or "small". The evidence of the item limits the repair of a spec: a finding that a later check shows stays for the next scan. Never add it to the scope. A patch is different: the `crap` of its project limits it.

## 2. High debt

Run `node .agents/aidd/aidd.mjs spec debt <D ID>`. It makes the minimal `fix` spec of the item, approved at once, and adds the other open `high` items of the same project (its `debt` lists them). Execute `build-requested-spec` with that spec.

## 3. Medium debt

Run `node .agents/aidd/aidd.mjs spec debt <D ID>`. It makes the minimal `refactor` spec of the item, approved at once, and adds the other open `medium` items of the same project (its `debt` lists them): one refactor repairs them together. Execute `build-requested-spec` with that spec: it has no verification and no review, and its regression proves that the behavior did not change.

## 4. Low debt: patch

A patch has no spec and no release:

- A patch repairs the item and the other open `low` items of the same project, at most five. Create the task branch `chore/{D ID}-{slug}` from the default branch, with the D ID of the selected item.
- The **Builder** executes `implement-project` for that project, with these items and the `crap` slot of the project as its scope. It runs `crap` until it is green: first the items, then what `crap` shows next, such as the test coverage that a failing limit hides. Thus one patch ends the `crap` debt of its project, with no scan and no patch more. It commits through the hook, which runs the affected unit tests, as `refactor({project}): {what the patch does}`.
- When the **Builder** cannot repair an item, or its finding shows a bug, keep that item. When it repairs none, delete the task branch and select the next item. When `crap` stays red, the check of step 5 sends it to a scan.
- Run `node .agents/aidd/aidd.mjs debt remove <id>` for each item that `crap` no longer shows, then `node .agents/aidd/aidd.mjs integrate "refactor({project}): {what the patch does}"`.

A patch runs only its affected unit tests. The ship of the next spec catches a regression. A patch does not count as one of the five specs.

## 5. Check

When no debt is open, check the code with the core: run `node .agents/aidd/aidd.mjs run layers` and `node .agents/aidd/aidd.mjs run crap`. When each project is green, the run stops: no scan runs on a green check, because it would find nothing. When a project is red, the **Craftsman** executes `scan-quality` in the mode of the red check (`layers` → medium, `crap` → `low`), for that project only, and you go back to the selection.

## Stop

Go back to the selection while debt remains. Stop after five shipped specs, when a spec ships with a failure recorded as debt, when the check of step 5 is green, or when a scan of step 5 records nothing. A human request that names one item gets only its repair.

When you stop, return the summary of `debt list`.

The result is each selected debt item repaired, and the debt register that remains.
