# AIDD skills catalog

## Architect

| Skill | What it does |
|-------|----------------|
| [`/establish`](./skills/establish/) | AGENTS.md — product vision + process overview (L1) |
| [`/explore`](./skills/explore/) | System arch + ADRs — prescriptive (green) or descriptive (brown) (L2) |
| [`/excavate`](./skills/excavate/) | Tier/component arch + ER diagram — brownfield only (L3) |
| [`/extract`](./skills/extract/) | Coding rules and conventions — brownfield only |

## Builder

| Skill | What it does |
|-------|----------------|
| [`/specify`](./skills/specify/) | Specs with acceptance criteria |
| [`/planify`](./skills/planify/) | Implementation plans from spec or report |
| [`/codify`](./skills/codify/) | Code and unit tests from plans |
| [`/verify`](./skills/verify/) | E2E tests; verify report on failure → `/rectify` |
| [`/rectify`](./skills/rectify/) | Fixes from verify report |

## Craftsman

| Skill | What it does |
|-------|----------------|
| [`/review`](./skills/review/) | Single `{slug}.review.report.md` (a11y, security, performance) → `/repair` |
| [`/repair`](./skills/repair/) | Fixes from review report findings (a11y, security, performance). |
| [`/release`](./skills/release/) | Version, changelog, spec `done` + `released-version` |
| [`/refactor`](./skills/refactor/) | Clean-code / DRY refactors (no report); detailed commit + test handoff |

## Director

| Skill | What it does |
|-------|----------------|
| [`/design`](./skills/design/) | Frontend UI from a design specification |
| [`/repository`](./skills/repository/) | Branches and conventional commits |

---

## Typical loops

**Greenfield:** `/establish` →  → `/explore system`  

**Brownfield (once):** `/establish` → `/explore all` → `/extract all` 

**Feature:** /specify → /planify → /codify → /verify → /review? → /refactor? → /release

**Failed verification:**  `/verify` → `/rectify` 

**Failed review:**  `/review` → `/repair`
