# AIDD skills lifecycle

How the 8 pipeline skills — plus `/refactor`, a periodic whole-app audit — cover the
whole SDLC: build, maintain, refactor. The [catalog](./skills.catalog.md) is the
inventory; this is the map.

## The model

**The green e2e suite is the contract.**

- The e2e suite — organized by feature, like production code — is the executable
  statement of current behavior. Green tests change only through a plan, never to
  force a pass.
- The arch docs (`system.arch.md` with Tier/Detail, `{container}.arch.md` or
  `db.schema.md`, rules) describe the current technical state. `/release` reconciles
  them after every change; `/extract` rebuilds them when they drift.
- A spec is the programming artifact for one change — its criteria and acceptance.
  It is **amendable** at any status; amend sets `pending` and always replans.
- `done` means currently shipped (`released-version` set) — not frozen forever.
- The PRD (`specs/PRD.md`) is the functional log — shell from `/explore`, specs indexed
  by category when `/specify` creates them. Status stays in each spec.
- Status chain: `pending` → `planned` → `in-progress` → `verified` | `failed` → `done`.
- Invariant: green e2e suite = current behavior.

## Build (new project or new feature)

`/explore` → `/extract` (×container) → `/specify` → `/planify` → `/codify` (×container)
→ `/verify` → `/review` → `/release`

Amend anytime via `/specify` → `pending` → `/planify` (checkpoints: keep / redo / drop)
→ `/codify` → `/verify` → …

## Maintain (the feature already shipped)

No triage skill. Enter through either door; both answer one mechanical question —
**would satisfying the request change what a green e2e test asserts?** — and bounce a
misrouted request to the other.

- **No green test flips** → defect (or coverage gap).
  - Route: `/codify` fix mode — minimal fix + regression e2e test → patch `/release`.
    No spec.
  - Proof: the regression test passes; every green test still green, untouched.
- **A green test must flip** → behavior change.
  - Route: `/specify` amend (or create) → `/planify` (always, with checkpoints) →
    `/codify` → `/verify` → …
  - Proof: the amended criteria's tests pass.

A "bug" the suite disagrees with is a behavior change in disguise: code, tests, and
docs all agree with each other — they are all wrong together, so the correction must
travel through a spec. The gate makes hot-fixing it structurally impossible: `/codify`
cannot flip a green test without a plan, and a plan needs a current spec.

## Refactor (behavior must not change)

No spec — the *what* is untouched. Every finding routes to one door:

- **Periodic whole-app audit** → `/refactor` reads the accumulated system (clarity, UI, a11y,
  structure, behavior) and asks one question per finding — *would a green e2e test have to change?*
  - No → it is a refactor: the finding goes to `/planify`, which plans the cleanup under
    `refactors/{slug}/`; then `/codify` executes and `/verify` confirms green, and a patch
    `/release` reconciles any drifted docs.
  - Yes → it is not a refactor but a behavior change: flag it to the human as a `/specify`
    feature, never write it as a finding.
  - Proof: the e2e suite stays green and **untouched**; the cleanup carries a plan.
- **Big change incoming, messy landing zone** → preparatory `/review` first, then the
  pipeline.
  - Proof: green before starting.

Guardrails that make refactoring safe to delegate: green baseline before starting, tests
untouchable, contracts frozen. The e2e suite — built by `/codify` from every spec's
e2e plan, judged by `/verify` — is the safety net; SDD manufactures it as a by-product.

## Releases

| Trigger | Bump | Changelog |
|---|---|---|
| New feature spec | minor | Added |
| Behavior-changing amend / spec | minor (or patch if a correction) | Changed / Fixed |
| Defect fix (spec-less, `/codify` fix mode) | patch | Fixed |
| Structural refactor | patch | Changed (internal) |

Every release: version bumped, changelog updated, arch docs reconciled, default branch
tagged. Close the spec (`done`, `released-version`) when one is in scope; it must
have been `verified` first. A later amend keeps the prior `released-version` until
the next ship updates it.
