# AIDD skills lifecycle

How the 8 skills cover the whole SDLC — build, maintain, refactor. The
[catalog](./skills.catalog.md) is the inventory; this is the map.

## The model

**The green e2e suite is the contract.**

- The e2e suite — organized by feature, like production code — is the executable
  statement of current behavior. Green tests change only through a plan, never to
  force a pass.
- The feature docs (`docs/{feature}.md`) state the same behavior in words — one
  statement per line, each noting the spec that shipped it. `/release` keeps them in
  lockstep with the suite.
- The arch docs (`system.arch.md`, `{container}.arch.md`, rules) describe the current
  technical state. `/release` reconciles them after every change; `/extract`
  (brownfield) rebuilds them when they drift.
- A spec is a disposable ticket: one change, its criteria, its acceptance. Once released
  it is a closed ticket — history (why, and since when), never authority.
- Invariant: green e2e suite = current behavior = feature docs, in words.

## Build (greenfield or new feature)

`/explore` → `/extract` (×container) → `/specify` → `/planify` → `/codify` (×container)
→ `/verify` → `/review` → `/release`

While a spec is `pending`/`in-progress`, edit it freely — that is the normal loop.
Triage only starts after `done`.

## Maintain (the feature already shipped)

No triage skill. Enter through either door; both answer one mechanical question —
**would satisfying the request change what a green e2e test asserts?** — and bounce a
misrouted request to the other.

- **No green test flips** → defect (or coverage gap).
  - Route: `/codify` fix mode — minimal fix + regression e2e test → patch `/release`.
    No spec; the feature doc stays untouched (the fix restores documented behavior).
  - Proof: the regression test passes; every green test still green, untouched.
- **A green test must flip** → behavior change.
  - Route: `/specify` (quote the current behavior from `docs/{feature}.md` as baseline)
    → full pipeline — the e2e plan lists the scenarios it changes or retires — →
    `/release` merges the feature doc.
  - Proof: the new criteria's tests pass.

A "bug" the suite disagrees with is a behavior change in disguise: code, tests, and
docs all agree with each other — they are all wrong together, so the correction must
travel through a spec. The gate makes hot-fixing it structurally impossible: `/codify`
cannot flip a green test without a plan, and a plan needs a spec.

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
- **A test assertion must change to stay green** → not a refactor: a behavior change,
  route through `/specify`.
  - Proof: a new criterion in a new spec.

Guardrails that make refactoring safe to delegate: green baseline before starting, tests
untouchable, contracts frozen. The e2e suite — built by `/codify` from every spec's e2e
plan, judged by `/verify` — is the safety net; SDD manufactures it as a by-product.

## Releases

| Trigger | Bump | Changelog |
|---|---|---|
| New feature spec | minor | Added |
| Behavior-changing spec | minor (or patch if a correction) | Changed / Fixed |
| Defect fix (spec-less, `/codify` fix mode) | patch | Fixed |
| Structural refactor | patch | Changed (internal) |

Every release ends the same way: version bumped, changelog updated, arch docs
reconciled, default branch tagged. Feature releases additionally merge the feature doc
and close the spec (`done`, `released-version`).
