# AIDD skills catalog

## Architect

| Skill | What it does |
|-------|----------------|
| [`/establish`](./skills/establish/) | Product, paths, personality and git rules — C4 L1 |
| [`/explore`](./skills/explore/) | System architecture + ADRs — C4 L2 |
| [`/excavate`](./skills/excavate/) | Tier/component architecture + ER — C4 L3 |
| [`/extract`](./skills/extract/) | Coding rules per tier; plus `DESIGN.md` (tokens + component behavior) for presentation tiers |

## Builder

| Skill | What it does |
|-------|----------------|
| [`/specify`](./skills/specify/) | Specs with acceptance criteria |
| [`/planify`](./skills/planify/) | Implementation plans from spec |
| [`/codify`](./skills/codify/) | Code and unit tests from plans |
| [`/verify`](./skills/verify/) | E2E tests; marks spec criteria + writes `verify.md` report → `/rectify` |
| [`/rectify`](./skills/rectify/) | Fixes from the `verify.md` Rectify guide after failed `/verify` |

## Craftsman

| Skill | What it does |
|-------|----------------|
| [`/review`](./skills/review/) | Audit a11y, security, performance; fix findings in place |
| [`/refactor`](./skills/refactor/) | Clean-code / DRY refactors; detailed commit + test handoff |
| [`/release`](./skills/release/) | Version, changelog, spec `done` + `released-version` |

---

## Typical loops

**Architecture (once, green or brown):** `/establish` → `/explore` → `/excavate` (per tier, then `ER.md`) → `/extract` (per tier; presentation tiers also get `DESIGN.md`)

Each step is mode-aware: prescriptive on greenfield, descriptive on brownfield.

**Feature:** /specify → /planify → /codify → /verify → /review? → /refactor? → /release

**UI design:** `/extract` authors `DESIGN.md` for presentation tiers; `/codify` implements the UI from it.

**Failed verification:**  `/verify` → `/rectify` 
