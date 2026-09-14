# Skill template

A primitive skill is short prose an agent reads — the same voice as a command, without role and without handoff. Orchestrators and workers use concise English pseudocode: render uppercase control-flow commands in Markdown italics (for example, `_IF_`), use explicit conditions, and include an explicit `_RETURN_`.

Keep output templates in `assets/` and long guides in `references/`. Link them; never paraphrase them. Resource links stay inside this skill's folder; composition links target the invoked skill's `SKILL.md`.

Write only what a capable agent would get wrong on its own. Use the prose shape below for primitives; replace its body with pseudocode for orchestrators and workers.

```md
---
name: {slug}
description: {what it does, in one sentence}
metadata:
  aiddbot-kind: {orchestrator|worker|primitive}
user-invocable: {true|false}
disable-model-invocation: true
---
# {slug}

Your goal is to {do the thing}.

{The few things a capable agent would get wrong. Link the templates it fills.}

The result is {the artifact}.

Commit as `{message}`.
```

For non-primitive pseudocode, use nested lists with four spaces per level. Nest controlled actions under their condition or loop. Keep subsequent actions at the parent level. Render command tokens in italics: `_IF_`, `_FOR-EACH_`, `_REPEAT_`, `_ALWAYS_`, `_SPAWN_`, and `_RETURN_`. Nest an agent's assignment under `_SPAWN_`. For an orchestrator or worker, use this body shape:

```md
Your goal is to {composed stage outcome}.

- _FOR-EACH_ {item}:
    - {Action.}
    - _IF_ {condition}:
        - _RETURN_ {blocker}.
- {Action after the loop.}

_RETURN_ {stage result}.
```

Use `orchestrator` for a public end-to-end outcome, `worker` for internal
composition, and `primitive` for one focused capability. The `metadata` map is
flat and every key and value is a string. See the [classification guide](../references/aiddbot-kinds.md).
