---
name: build-archetype-foundation
description: Build the Foundation of an archetype on its Bedrock, one foundation spec at a time, each with its quality repair, to zero debt.
metadata:
  aiddbot-kind: orchestrator
user-invocable: true
---
# build-archetype-foundation

Your goal is to build the Foundation of an archetype on its Bedrock. Deliver its foundation spec files in order, one at a time, each with its quality repair. End with zero debt.

The caller gives the spec files and their order: a list, or a file that holds the list. A row with a condition, such as "the system has users", applies only when `.product/system.md` meets it. Skip each other row.

## Roles

- Run each step yourself. `build-requested-spec` and `craft-lasting-quality` spawn their own agents. Never give a step to one agent, because an agent that you spawn cannot spawn other agents.
- Keep in your context only the result of each step. The files hold all else: the next step reads them again.
- Each step starts its agents fresh. When a step ends, stop each agent that it started; never give an agent of one spec or repair to the next one. An agent keeps the context of all its work, and each later turn pays for it again.

## State

Read the state from the files before the first step, and again after each interruption. Read `git log`, the current branch, and `git status`. Also run `node .agents/aidd/aidd.mjs spec show` and `node .agents/aidd/aidd.mjs debt list`.

- A spec file is done when a shipped spec has its slug.
- A spec of the list that is not shipped continues with its next skill, such as `ship-spec`. Never reserve a second spec for the same file. Keep the changes that are not committed: they belong to that spec.

## Deliver

1. Create the spec from its file. Use the command on the first line of the file: `node .agents/aidd/aidd.mjs spec new <type> <slug> "<title>" --domain foundation --from {file}`. The file is the spec, written for this archetype: no model writes or adapts it. The list gives the approval in advance. So journal `node .agents/aidd/aidd.mjs log approved "<title>" --spec <id>` at once. This command also checks the size of the spec. Then execute `build-requested-spec` with that spec.
2. Run `node .agents/aidd/aidd.mjs run layers` and `run crap`, and read `debt list`. When each project is green and no item is open, the spec is done: go to the next one. Else execute `craft-lasting-quality` one time.
3. Read `node .agents/aidd/aidd.mjs debt list`. The next spec never starts on open debt: while an item is open, execute `craft-lasting-quality` again. Stop and return the open debt only when a run ships no repair.

After the last spec, execute `craft-lasting-quality` again until its check is green, and `debt list` shows no open item.

The result is each spec of the list shipped, with zero debt. Also give a table with one row for each shipped spec. Each row shows its file, its version, the debt that it left, the repairs of `craft-lasting-quality`, and the time of each. Take the times from the journal in `.aiddbot/logs/`.
