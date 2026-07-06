# AIDD skills lifecycle

How the 9 skills cover the whole SDLC — build, maintain, refactor. The
[catalog](./skills.catalog.md) is the inventory; this is the map.

## The model

**Specs are commits; arch docs and feature docs are HEAD.**

- A spec records one change: what shipped, when (`released-version`), and how it was
  accepted. Once `done`, it is immutable — like a pushed commit.
- The arch docs (`system.arch.md`, `{container}.arch.md`, rules) describe the current
  technical state. `/release` reconciles them after every change; `/extract` (brownfield)
  rebuilds them when they drift.
- The feature docs (`docs/{feature}.md`) describe the current behavior — one statement
  per line, each linking its governing spec. `/release` merges them after every feature
  release. Read them to learn what the product does; read `specs/` to learn why and
  since when. They are a projection: on conflict, the spec wins.
- Invariant: released criteria of all non-superseded specs = current e2e suite = current
  behavior. The feature docs are a readable view of that same set.

## Build (greenfield or new feature)

`/explore` → `/extract` (×container) → `/specify` → `/planify` → `/codify` (×container)
→ `/verify` → `/review` → `/release`

While a spec is `pending`/`in-progress`, edit it freely — that is the normal loop.
Triage only starts after `done`.

## Maintain (the feature already shipped)

Entry point: `/modify`. Triage starts at `docs/{feature}.md` — its link points straight
at the governing spec, no chain-walking. One triage question — **does the current code
pass the released acceptance criteria?**

- **Code violates a criterion** → implementation defect.
  - Route: direct fix + regression test → patch `/release`. Feature doc untouched —
    the fix restores documented behavior.
  - Proof: the violated criterion's test passes.
- **Code matches criteria, behavior must differ** (incl. bad analysis, wrong criteria)
  → requirement change.
  - Route: a plain spec via `/specify` (baseline as prose context) → full pipeline —
    `/planify` lists the replaced e2e scenarios — → `/release` merges the feature doc,
    derives the supersession, and stamps `superseded-by:`.
  - Proof: the new criteria's tests pass.

A "bug" caused by bad analysis is a requirement change in disguise: the code, spec,
plans, and e2e suite all agree with each other — they are all wrong together, so the
correction must travel through all of them. Never hot-fix it.

## Refactor (behavior must not change)

No spec — the *what* is untouched. Route by blast radius:

- **Ugly internals, contracts intact** → `/review` (clean-code dimension) reports; apply
  via `--fix` (mechanical) or `/codify`.
  - Proof: existing tests green.
- **Contracts or components must move** → `/planify` (refactor, no spec) → `/codify` →
  `/extract` → patch `/release`.
  - Proof: e2e suite green, **untouched**.
- **Big change incoming, messy landing zone** → preparatory `/review` first, then the
  pipeline.
  - Proof: green before `/specify` re-entry.
- **A test assertion must change to stay green** → not a refactor, route through `/modify`.
  - Proof: a new criterion in a superseding spec.

Guardrails that make refactoring safe to delegate: green baseline before starting, tests
untouchable, contracts frozen. The e2e suite — built by `/codify` from every spec's e2e
plan, judged by `/verify` — is the safety net; SDD manufactures it as a by-product.

## Releases

| Trigger | Bump | Changelog |
|---|---|---|
| New feature spec | minor | Added |
| Behavior-changing spec (supersedes an old one) | minor (or patch if a correction) | Changed / Fixed |
| Defect fix (`/modify` Route A) | patch | Fixed |
| Structural refactor | patch | Changed (internal) |

Every release ends the same way: version bumped, changelog updated, arch docs
reconciled, default branch tagged. Feature releases additionally merge the feature doc
and close the spec (`done`, `released-version`, derived `superseded-by:` stamping).
