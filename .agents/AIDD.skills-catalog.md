# AIDD skills catalog

When to invoke each skill (prerequisites). For loops see [skills/README.md](./skills/README.md); for git see [shared/git.md](./skills/shared/git.md) and [docs/AIDD.workflow.md](../docs/AIDD.workflow.md).

| Phase | Skill | Prerequisite |
|-------|-------|----------------|
| Setup | `/initialize` | — |
| Brownfield arch | `/explore` | `AGENTS.md` |
| Brownfield rules | `/extract` | `arch/` |
| Feature spec | `/specify` | — |
| Implementation plan | `/planify` | spec, report, or requirement |
| Code + unit tests | `/codify` | plan, spec, or requirement |
| E2E verification | `/verify` | `{slug}.spec.md` at `in-progress` (or `verified` to re-run) |
| UI from design | `/design` | `DESIGN.md` or `design/{slug}/` |
| Code review | `/review` | code in scope |
| Fix findings | `/repair` | `reports/{slug}.{type}.report.md` |
| Ship | `/release` | spec `status: verified` |
| Git (always) | `/repository` | via [shared/git.md](./skills/shared/git.md) before each commit |

## Architect

| Skill | What it does |
|-------|----------------|
| [`/initialize`](./skills/initialize/) | Project environment and `AGENTS.md` |
| [`/explore`](./skills/explore/) | Architecture docs and ADRs from legacy code |
| [`/extract`](./skills/extract/) | Coding rules from the codebase |

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
| [`/release`](./skills/release/) | Version, changelog, spec `released` |
| [`/repository`](./skills/repository/) | Branches and conventional commits |
| [`/refactor`](./skills/refactor/) | *(WIP)* — use `/review` → `/repair` for defects |

## Designer

| Skill | What it does |
|-------|----------------|
| [`/design`](./skills/design/) | Frontend UI from a design specification |
