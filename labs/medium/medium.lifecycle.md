# Medium skills lifecycle

How the 9 skills cover the whole SDLC — build, maintain, refactor. The [catalog](./medium.catalog.md) is the inventory; this is the map.

## The model

**Specs are commits; arch docs are HEAD.**

- A spec records one change: what shipped, when (`released-version`), and how it was accepted. Once `done`, it is immutable — like a pushed commit.
- The arch docs (`system.arch.md`, `{container}.arch.md`, rules) describe the current state. `/release` reconciles them after every change; `/extract` (brownfield) rebuilds them when they drift.
- Invariant: released criteria of all non-superseded specs = current e2e suite = current behavior.

## Build (greenfield or new feature)

`/explore` → `/extract` (×container) → `/specify` → `/planify` → `/codify` (×container) → `/verify` → `/review` → `/release`

While a spec is `pending`/`in-progress`, edit it freely — that is the normal loop. Triage only starts after `done`.

## Maintain (the feature already shipped)

Entry point: `/modify`. One triage question — **does the current code pass the released acceptance criteria?**

| Situation | It is a... | Route | Proof |
|---|---|---|---|
| Code violates a released criterion | implementation defect | direct fix + regression e2e test → patch `/release` | violated criterion's test passes |
| Code matches the criteria, behavior must differ (incl. bad analysis, wrong criteria) | requirement change | `/specify` with `amends: {old-slug}` → full pipeline → `/release` stamps `superseded-by:` | new criteria's tests pass |

A "bug" caused by bad analysis is a requirement change in disguise: the code, spec, plans, and e2e suite all agree with each other — they are all wrong together, so the correction must travel through all of them. Never hot-fix it.

## Refactor (behavior must not change)

No spec — the *what* is untouched. Route by blast radius:

| Situation | Verb | Proof |
|---|---|---|
| Ugly internals, contracts intact | `/review` (clean-code dimension) | existing tests green |
| Contracts or components must move | `/planify` (refactor goal, no spec) → `/codify` → `/extract` → patch `/release` | existing e2e suite green, **untouched** |
| Big change incoming, messy landing zone | preparatory `/review` first, then the pipeline | green before `/specify` re-entry |
| A test assertion must change to stay green | not a refactor — `/modify` | new criterion in an amending spec |

Guardrails that make refactoring safe to delegate: green baseline before starting, tests untouchable, contracts frozen. The e2e suite that `/verify` builds for every spec is the safety net — SDD manufactures it as a by-product.

## Releases

| Trigger | Bump | Changelog |
|---|---|---|
| New feature spec | minor | Added |
| Amending spec (behavior change) | minor (or patch if a correction) | Changed / Fixed |
| Defect fix (`/modify` Route A) | patch | Fixed |
| Structural refactor | patch | Changed (internal) |

Every release ends the same way: version bumped, changelog updated, arch docs reconciled, default branch tagged. Feature releases additionally close the spec (`done`, `released-version`, `superseded-by:` stamping).
