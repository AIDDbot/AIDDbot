# Skill grammar

Every body bullet in a `SKILL.md` parses as exactly one sentence form below.
One symbol, one meaning; one idea, one syntax.

## Sentence forms

| Form | Syntax |
|------|--------|
| Action | `<Verb> <object>.` — one action per bullet |
| File action | `_read_ \| _update_ [what it grounds](path)` |
| Condition | `If <cond>, <action>.` — optionally `; else <action>.` |
| Iteration | `Foreach <x>, <action>.` |
| Abort | `If <cond>, stop: → /skill.` |
| Handoff | `→ /skill` — optionally `per <x>`, `then /next` |
| Commit | ``Commit (`type(scope): {description}`).`` |
| Guardrail cite | `Apply **Name**.` |

Forms compose left to right: `If <cond>, foreach <x>, _read_ [...](...)`.

## Rules

- `→` means hand off to a skill — nothing else. For cause or effect in prose, use words.
- Conditions always read `If <cond>, <action>.` — never `<cond>: <action>`,
  `<cond>? <action>`, or `<cond> → <action>`.
- No blockquotes — a `>` note is either a Condition bullet in Steps or a Guardrail.
- Handoffs close their step; each branch is its own Condition bullet.
- A glossary term defined in several skills is copied verbatim, never paraphrased —
  drift must show in a plain diff.
