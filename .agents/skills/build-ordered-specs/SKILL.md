---
name: build-ordered-specs
description: Deliver an ordered list of spec files, each with its quality repair, to zero debt.
metadata:
  aiddbot-kind: orchestrator
user-invocable: true
---
# build-ordered-specs

Your goal is to deliver an ordered list of spec files, one at a time, each with its quality repair, and to end with zero debt.

```text
for each spec file, in order:
1. you   build-requested-spec   shipped spec        approved in advance
2. you   craft-lasting-quality  debt repaired       one run
3. you   debt list              zero open items     else craft again
then:
4. you   craft-lasting-quality  until its check is green
```

The caller gives the spec files and their order: a list, or a file that holds the list. A row with a condition, such as "the system has users", applies only when `.product/system.md` meets it. Skip each other row.

## Roles

- Run each step yourself. `build-requested-spec` and `craft-lasting-quality` spawn their own agents. Never give a step to one agent, because an agent that you spawn cannot spawn other agents.
- Keep in your context only the result of each step. The files hold all else: the next step reads them again.
- Each step starts its agents fresh. When a step ends, stop each agent that it started; never give an agent of one spec or repair to the next one. An agent keeps the context of all its work, and each later turn pays for it again.

## State

Before the first step, and again after each interruption, read the state from the files: `git log`, the current branch, `git status`, `node .agents/aidd/aidd.mjs spec show` and `node .agents/aidd/aidd.mjs debt list`.

- A spec file is done when a shipped spec has its slug.
- A spec of the list that is not shipped continues with its next skill, such as `ship-spec`. Never reserve a second spec for the same file. Keep the changes that are not committed: they belong to that spec.

## Deliver

1. Execute `build-requested-spec` with the request "Deliver the spec from `{file}`". The list is the approval in advance: nobody asks, and the approval is journaled as soon as the spec is written.
2. Execute `craft-lasting-quality` one time. The list also approves in advance each `fix` that it makes from high debt: journal the approval as soon as the spec is made, as in YOLO mode.
3. Read `node .agents/aidd/aidd.mjs debt list`. The next spec never starts on open debt: while an item is open, execute `craft-lasting-quality` again. Stop and return the open debt only when a run ships no repair.

After the last spec, execute `craft-lasting-quality` again until its check is green, and `debt list` shows no open item.

The result is each spec of the list shipped, zero debt, and a table with one row for each shipped spec: its file, its version, the debt that it left, the repairs of `craft-lasting-quality`, and the time of each, from the journal in `.aiddbot/logs/`.
