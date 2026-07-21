# Skillify — the only way to author a skill

`/skillify` creates or fixes a skill under `.agents/skills/`. It is the single door
through which any `SKILL.md` — and its `references/` and `assets/` — is written. It is a
meta-skill: it is not part of the SDLC pipeline; it maintains the skill framework itself.

It plays a Skill Author: it turns intent into a well-formed skill that obeys the house
grammar and stays consistent with the rest of the skillset.

## What it's for

Skills in this repo follow a fixed shape (Role, Task, Guardrails, Context, Steps,
Verification) and a constrained sentence grammar in their Steps. `/skillify` is what keeps
that discipline: every new or changed skill goes through it, so the format, the grammar,
the width and length limits, and the cross-references all stay in sync. It is also the
skill that keeps the alignment docs — the catalog, the lifecycle map, READMEs, and the
workflow doc — up to date when behavior or paths change.

> Note: this README is itself an example of the idea it serves. Each skill's README is the
> de-skillified, natural-language spec of its `SKILL.md`; running that spec back through
> `/skillify` should reproduce the skill.

## When to use it

- To draft a brand-new skill.
- To fix or tighten an existing skill, its references, or its assets.

It is user-invocable and never invoked automatically by the model. It sits outside the
build pipeline.

## What you give it

- **Required:** a new skill to draft, or the path to an existing `SKILL.md` to fix.
- **Optional:** what changed and why (for a fix).

## What it produces

- **A `SKILL.md`** written from the skill template, with no placeholders left.
- **Any `references/*.guide.md` or `assets/*`** the skill needs, linked only from that
  skill's own folder.
- **Updated alignment docs** — the README, `skills.catalog.md`, `skills.lifecycle.md`, and
  `docs/AIDD.workflow.md` — whenever behavior or paths change.
- A commit: `feat(skills): add /{skill}` or `refactor(skills): tighten /{skill}`.

## How it behaves (the rules it never breaks)

- **Single door.** A skill is never edited outside `/skillify`.
- **Width.** Sentences stay short (under 100 characters); it never wraps mid-sentence to
  fake the limit.
- **Length.** A skill stays under 100 sentences (blank lines and headings don't count).
- **Grammar.** Steps use the skill grammar forms; other sections stay declarative.
- **Composition over duplication.** Short duplication is fine, but composition is
  preferred.
- **Align docs.** When behavior or paths change, it syncs the catalog, lifecycle, README,
  and workflow.

## How it works, step by step

1. **Research.** It asks you to clarify context one closed-ended question at a time, and
   decides create vs fix. When fixing, it reads the target `SKILL.md` and every
   `references/` and `assets/` file it links. When creating, it reads one sibling
   `SKILL.md` for composition patterns. It reads the skills catalog to see where the skill
   sits and what it produces.
2. **Plan.** It reads the skill template and the sentence grammar, maps the content onto
   Role, Task, Guardrails, Context, Steps, and Verification, lists which references/assets
   to add or update, and — if behavior or paths change — lists which alignment docs to
   update.
3. **Implement.** It writes the `SKILL.md` from the template with no placeholders, writes
   any references or assets the skill needs (linked only from that skill's folder),
   updates the alignment docs if behavior or paths changed, and commits.

## How you know it worked

- The `SKILL.md` follows the template sections, in order, with no placeholders left.
- The Steps and References verb bullets parse as valid skill-grammar forms.
- Sentences are short, with no artificial mid-sentence line breaks.
- Linked references and assets exist and stay in the same skill folder.
- The alignment docs were updated when behavior or paths changed, and the catalog lists
  the skill.

## The sentence grammar (for authoring Steps)

Steps and the verb bullets in References follow a small grammar; other sections stay
declarative prose. In short:

- **Action:** `_<verb>_ {subjects}.` — preferred verbs include `_read_`, `_write_`,
  `_update_`, `_ask_`, `_commit_`, `_run_`, `_handoff_`, and a handful more.
- **Conditional:** `_if_ {condition}, {action}.` (optionally `; _else_ {action}.`), where
  the action is itself an Action, Handoff, or Block.
- **Iteration:** `_for-each_ {item}, {action}.` — sequential by default; say "in parallel"
  only when no shared file is written.
- **Block:** when an `_if_` or `_for-each_` needs more than one action, indent one level,
  each child being an Action, Conditional, Iteration, or Handoff.
- **Handoff:** `_handoff_ to /{skill}.`

Keep sentences under 100 characters and split long ideas into more sentences rather than
wrapping.

## Where it hands off

Nowhere in the SDLC — it stands apart, maintaining the skill framework that the pipeline
skills are written in.
