# AIDD skills lifecycle

How the 8 pipeline skills — plus `/restructure`, a human-directed structural change — cover the
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
→ `/verify` → `/qualify` → `/release`

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

A spec — but a **non-functional** one: the *what* is untouched, so the demand is about the shape
of the code, not what it does.

- **A structural change you order** → `/restructure` takes your directive — homogenize these
  routes, extract this validation, unify these five drawings into one component — bounds its
  radius and lists the affected sites per container.
  - It becomes a `kind: non-functional` spec under `specs/N{nnn}-{slug}/`, which then travels
    the normal pipeline — `/planify`, `/codify`, `/verify` for non-regression, `/qualify` as the
    oracle for its structural criteria, `/release`. Each spec closes when the change lands; a
    later decision is a new spec, never an amendment. Two may not be open with overlapping scope.
  - Anything that would change what the product does is not structural: flag it to the human as
    a `/specify` feature and leave it under `Out of scope`, never as a criterion.
  - Proof: every e2e scenario still asserts the same result — its implementation may have been
    rewritten — and every criterion its gate judges is `[x]`.
- **Big change incoming, messy landing zone** → preparatory `/qualify` first, then the
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
