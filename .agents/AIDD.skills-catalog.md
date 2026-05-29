# AIDD skills catalog

## Architect

| Skill | What it does |
|-------|----------------|
| [`/establish`](./skills/establish/) | `AGENTS.md` (product + paths) and `SOUL.md` (personality + boundaries) at project root (L1) |
| [`/explore`](./skills/explore/) | System arch + ADRs — prescriptive (green) or descriptive (brown) (L2) |
| [`/elaborate`](./skills/elaborate/) | Tier arch + ER + coding rules — greenfield only (L3 + rules) |
| [`/excavate`](./skills/excavate/) | Tier/component arch + ER diagram — brownfield only (L3) |
| [`/extract`](./skills/extract/) | Coding rules and conventions — brownfield only |
| [`/envision`](./skills/envision/) | Frontend UI from a `DESIGN.md` specification |

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

## Director

| Skill | What it does |
|-------|----------------|
| [`/repository`](./skills/repository/) | Branches and conventional commits |

---

## Typical loops

**Greenfield (once):** `/establish` → `/explore` → `/elaborate` (per tier, then `ER.md`)

**Brownfield (once):** `/establish` → `/explore` → `/excavate` (per tier, then `ER.md`) → `/extract` (per tier) 

**Feature:** /specify → /planify → /codify → /verify → /review? → /refactor? → /release

**Failed verification:**  `/verify` → `/rectify` 
