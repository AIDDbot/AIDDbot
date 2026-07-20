# Skill grammar

Every body bullet in a `SKILL.md` parses as exactly one sentence form below.
One symbol, one meaning; one idea, one syntax.

## Sentence forms

### Action
- _<verb>_ {subjects}. 

### Conditionals
- _if_ {condition}, {action}.

### Iteration
- _for-each_ {item}, {action}.

### Handoff
- _handoff_ to `/{skill}`.

## Examples
````md
- _read_ [file](path)
- _write_ [file](path)
- _ask_ me to clarify the context one question at a time with closed-ended answers.
- _if_ mode is `research`, _search_ the web.
- _for-each_ entity , _write_ its attributes .
- _handoff_ to `/related-skill`.
````

