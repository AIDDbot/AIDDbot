# AIDD skills catalog

## Architect

| Skill | What it does |
|-------|----------------|
| [`/establish`](./skills/establish/) | Product, paths, personality and git rules — C4 L1 |
| [`/explore`](./skills/explore/) | System architecture + ADRs — C4 L2 |
| [`/elaborate`](./skills/elaborate/) | Tier/component architecture + ER — C4 L3 |
| [`/extract`](./skills/extract/) | Coding rules and conventions, one file per tier |
| [`/envision`](./skills/envision/) | UI design spec — tokens + component behavior for a surface |

## Builder

| Skill | What it does |
|-------|----------------|
| [`/specify`](./skills/specify/) | Specs with acceptance criteria |
| [`/planify`](./skills/planify/) | Implementation plans from spec |
| [`/codify`](./skills/codify/) | Code and unit tests from plans |
| [`/verify`](./skills/verify/) | E2E tests; updates spec on failure → `/rectify` |
| [`/rectify`](./skills/rectify/) | Fixes from spec Rectify section after failed `/verify` |

## Craftsman

| Skill | What it does |
|-------|----------------|
| [`/review`](./skills/review/) | Audit a11y, security, performance; fix findings in place |
| [`/refactor`](./skills/refactor/) | Clean-code / DRY refactors; detailed commit + test handoff |
| [`/release`](./skills/release/) | Version, changelog, spec `done` + `released-version` |

---

## Typical loops

**Architecture (once, green or brown):** `/establish` → `/explore` → `/elaborate` (per tier, then `ER.md`) → `/extract` (per tier)

Each step is mode-aware: prescriptive on greenfield, descriptive on brownfield.

**Feature:** /specify → /planify → /codify → /verify → /review? → /refactor? → /release

**UI design (optional, per surface):** `/envision` authors `DESIGN.md`; `/codify` implements it.

**Failed verification:**  `/verify` → `/rectify` 
