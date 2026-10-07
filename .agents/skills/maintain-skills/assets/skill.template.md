# Skill template

A skill is a goal, the invariants a capable agent would otherwise miss, and the artifact it leaves behind. Write it as short instructional prose addressed to the agent. Express conditions, loops, and returns in sentences; never as pseudocode, and never as a numbered procedure the agent could work out on its own.

The reader is a frontier model. Give it the goal, the rules, and the reasons. Do not micro-manage steps that it can deduce.

Write in ASD-STE100: short sentences, one idea in each sentence, active voice, and approved words. Technical names are allowed. Use a list, a table, or a small text diagram when it shows the structure better than prose. Ordered steps, a set of events, or a set of conditions are examples.

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

Put output templates in `assets/` and long guides and checklists in `references/`. Link them from the skill, only inside its own folder, and never paraphrase them: a template is the spec of its artifact, and a command is the spec of its mechanics.

Deterministic mechanics belong to the core, `node .agents/aidd/aidd.mjs <command>`, which a skill may call besides its own folder. It prints JSON and exits `0` on success, `1` when a rule rejects the operation, `2` on incorrect usage, and `3` when nothing is configured for what was asked. Keep a script in the skill's own `scripts/` only when the capability is exclusively that skill's. Keep the core small: it stores state and never validates what a model can judge.

## Composition

Name the role and the target skill in backticks, and rely on native discovery, so the target's instructions load only when execution reaches it. Never link to another skill's `SKILL.md` or tell an agent to read it.

```md
Have the **Builder** execute the `implement-project` skill for each affected project, one at a time. If a result blocks the delivery, return that blocker; otherwise, return the stage result.
```

## Journal

The core journals every state change it makes on its own. A skill journals only a judgment of the model, with `node .agents/aidd/aidd.mjs log <event> "<summary>" [--spec <id>]`, and only these events:

| Event | When |
| --- | --- |
| `verdict` | greenfield or brownfield |
| `select` | the debt or the archetype chosen |
| `handoff` | an orchestrator sends work to a different agent: `<from> → <to>: <what>` |
| `approved` | the human approves a proposal or a spec, or YOLO mode accepts it |
| `plan` | the plan of an implementation, before its first edit |
| `scaffolded` | the scaffolded projects |
| `blocked` | with its reason |

Never journal starts, ends, spawns, or coding, testing, and linting milestones.
