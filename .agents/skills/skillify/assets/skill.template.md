# Skill template

A primitive skill is short prose an agent reads — the same voice as a command, without role and without handoff. A worker uses concise English pseudocode: render uppercase control-flow commands in Markdown italics (for example, `_IF_`), use explicit conditions, and include an explicit `_RETURN_`.

Keep output templates in `assets/` and long guides in `references/`. Link them; never paraphrase them. Every link stays inside this skill's folder.

Write only what a capable agent would get wrong on its own. Use the prose shape below for primitives; replace its body with pseudocode for workers.

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

For a worker, use this body shape instead:

```md
_GOAL_: {composed stage outcome}.

_REQUIRE_ {preconditions}.
{control-flow pseudocode using _FOLLOW_, _SPAWN_, _IF_, _FOR-EACH_, and _RETURN_.}
```

Use `orchestrator` for a public end-to-end outcome, `worker` for internal
composition, and `primitive` for one focused capability. The `metadata` map is
flat and every key and value is a string. See the [classification guide](../references/aiddbot-kinds.md).
