# Skill grammar

Body bullets in **Steps** and verb bullets in **References** parse as forms below.
The same grammar applies to `.agents/commands/*.md` body bullets.

**Out of scope:** Guardrails, Glossary, Inputs, Verification — keep those declarative.

One symbol, one meaning; one idea, one syntax.

## Concision

Write short sentences (under 100 chars). Split long ideas into more sentences.
Do not insert mid-sentence line breaks just to meet the width limit.

## Sentence forms

### Action
- _<verb>_ {subjects}.

Prefer these verbs: `_read_`, `_write_`, `_update_`, `_ask_`, `_commit_`, `_run_`,
`_pass_`, `_tell_`, `_stop_`, `_propose_`, `_prescribe_`, `_map_`, `_select_`,
`_handoff_`. Other italic verbs are fine when none of these fit.

### Conditionals
- _if_ {condition}, {action}.
- _if_ {condition}, {action}; _else_ {action}.

`{action}` must itself be an Action, Handoff, or Block — not bare English.

### Iteration
- _for-each_ {item}, {action}.

Same rule: `{action}` is an Action, Handoff, or Block.
Default order is **sequential**. Say `in parallel` only when no shared file is written.

### Block
Use when `_if_` or `_for-each_` needs more than one action.
One level of indent only; each child is an Action, Conditional, Iteration, or Handoff.

- _if_ {condition}:
  - {action}.
  - {action}.
- _for-each_ {item}:
  - {action}.
  - {action}.

### Handoff
- _handoff_ to `/{skill}`.

## Examples
````md
- _read_ [file](path)
- _write_ [file](path)
- _ask_ me to clarify the context one question at a time with closed-ended answers.
- _if_ mode is `research`, _search_ the web.
- _if_ a spec is in scope, _read_ [spec](path); _else_ _review_ the diff since last tag.
- _for-each_ entity, _write_ its attributes.
- _for-each_ container:
  - _run_ `/extract` in a fresh subagent, one after another.
  - _pass_ the container name into that run.
- _if_ writing the e2e plan:
  - _derive_ it from the spec and shared contracts.
  - _map_ every AC id to exactly one scenario.
- _handoff_ to `/related-skill`.
````
