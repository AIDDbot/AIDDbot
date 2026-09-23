# Skill template

A skill is a goal, the invariants a capable agent would otherwise miss, and the artifact it leaves behind. Write it as short instructional prose addressed to the agent. Express conditions, loops, and returns in sentences; never as pseudocode, and never as a numbered procedure the agent could work out on its own.

```md
---
name: {slug, identical to its folder}
description: {what it does, in one sentence}
metadata:
  aiddbot-kind: {orchestrator|primitive}
user-invocable: true
---
# {slug}

Your goal is to {outcome}.

{Invariants: what must hold, what must never happen, and what a capable agent would get wrong. Link the templates it fills and the scripts it runs.}

The result is {the artifact}.

Commit as `{message}`.
```

## Kinds

| Kind | Contract |
| --- | --- |
| `orchestrator` | A complete public outcome. It owns its routing, names the role that runs each stage, and composes primitives. |
| `primitive` | One focused capability. It returns its result and never invokes the next pipeline stage. |

Every skill is `user-invocable: true` and stays model-invocable, so never set `disable-model-invocation`. The `metadata` map is flat, with string keys and values. `npm run adapt` skips any skill whose `name` differs from its folder or whose kind is not one of these two.

## Resources

Put output templates in `assets/`, long guides and checklists in `references/`, and deterministic mechanics in `scripts/`. Link them from the skill, only inside its own folder, and never paraphrase them: a template is the spec of its artifact, and a script is the spec of its mechanics.

## Composition

Name the role and the target skill in backticks, and rely on native discovery, so the target's instructions load only when execution reaches it. Never link to another skill's `SKILL.md` or tell an agent to read it.

```md
Have the **Builder** execute the `implement-project` skill for each affected project, one at a time. If a result blocks the delivery, return that blocker; otherwise, return the stage result.
```

## Journal

A skill that journals names only the event and its status, such as "journal `approved` as green". The `record-journal` skill owns the invocation and the line format.
