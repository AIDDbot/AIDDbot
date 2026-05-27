# AIDD skills catalog

## Architect

| Skill | What it does |
|-------|----------------|
| [`/initialize`](./skills/initialize/) | AGENTS.md — product vision + process overview (L1) |
| [`/explore`](./skills/explore/) | System arch + ADRs — prescriptive (green) or descriptive (brown) (L2) |
| [`/excavate`](./skills/excavate/) | Tier/component arch + ER diagram — brownfield only (L3) |
| [`/extract`](./skills/extract/) | Coding rules and conventions — brownfield only |

## Builder

| Skill | What it does |
|-------|----------------|
| [`/specify`](./skills/specify/) | Specs with acceptance criteria |
| [`/planify`](./skills/planify/) | Implementation plans from spec or report |
| [`/codify`](./skills/codify/) | Code and unit tests from plans |
| [`/verify`](./skills/verify/) | E2E tests; verify report on failure → `/repair` |

## Craftsman

| Skill | What it does |
|-------|----------------|
| [`/review`](./skills/review/) | Quality, accessibility, or compliance reports |
| [`/repair`](./skills/repair/) | Fixes from review or verify reports |
| [`/release`](./skills/release/) | Version, changelog, spec `done` + `released-version` |
| [`/repository`](./skills/repository/) | Branches and conventional commits |
| [`/refactor`](./skills/refactor/) | *(WIP)* — use `/review` → `/repair` for defects |

## Designer

| Skill | What it does |
|-------|----------------|
| [`/design`](./skills/design/) | Frontend UI from a design specification |

---

## Typical loops

**Greenfield:** `/initialize` →  → `/explore system`  

**Brownfield (once):** `/initialize` → `/explore all` → `/extract all` 

**Feature:** `/specify` → `/planify` → `/codify` → `/verify` → `/review` → `/repair` (as needed) → `/release`

### Spec and plan status

`pending` → `in-progress` → `done` — plans follow the same chain during `/codify`; specs get `released-version` on `/release`.