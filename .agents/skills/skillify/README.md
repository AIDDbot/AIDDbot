# Skillify — the only way to author a skill

`/skillify` creates or fixes a skill under `.agents/skills/`. It is the single door through
which any `SKILL.md` — and its `references/` and `assets/` — is written. It is a meta-skill:
not part of the SDLC pipeline, it maintains the skill framework itself, playing a Skill
Author who turns intent into a well-formed skill that obeys the house grammar and stays
consistent with the rest of the skillset.

> Note: this README is itself an example of the idea it serves. Each skill's README is the
> de-skillified, natural-language spec of its `SKILL.md`; running that spec back through
> `/skillify` should reproduce the skill.

## What it's for

Skills here follow a fixed shape (Role, Task, Guardrails, Context, Steps, Verification) and
a constrained sentence grammar in their Steps. `/skillify` keeps that discipline: every new
or changed skill goes through it, so format, grammar, width/length limits, and
cross-references stay in sync. It also keeps the alignment docs — the catalog, the lifecycle
map, READMEs, and the workflow doc — current when behavior or paths change. Use it to draft
a brand-new skill, or to fix or tighten an existing one, its references, or its assets.

Position: it stands outside the build pipeline and hands off nowhere; it is user-invocable
and never invoked automatically by the model.

## In and out

- **Input (required):** a new skill to draft, or the path to an existing `SKILL.md` to fix.
  **Optional:** what changed and why (for a fix).
- **A `SKILL.md`** written from the template, no placeholders left.
- **Any `references/*.guide.md` or `assets/*`** the skill needs, linked only from that
  skill's folder.
- **Updated alignment docs** — README, `skills.catalog.md`, `skills.lifecycle.md`,
  `docs/AIDD.workflow.md` — whenever behavior or paths change.

## The rules it never breaks

- **Single door** — a skill is never edited outside `/skillify`.
- **Width** — sentences under 100 characters; never wraps mid-sentence to fake the limit.
- **Length** — under 100 sentences per skill (blanks and headings don't count).
- **Grammar** — Steps use the [skill grammar forms](./references/grammar.md); other sections
  stay declarative.
- **Composition over duplication** — short duplication is fine, but composition is preferred.
- **Align docs** — behavior or path changes sync the catalog, lifecycle, README, and workflow.

See [SKILL.md](./SKILL.md) for the exact steps and verification checklist, and
[references/grammar.md](./references/grammar.md) for the sentence grammar.
