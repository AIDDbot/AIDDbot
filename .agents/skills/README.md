# AIDD agent skills

Invoke skills by name (e.g. `/specify`, `@specify`). Each folder contains `SKILL.md` plus supporting templates and mode files.

## When to use which skill

| Phase | Skill | Prerequisite |
|-------|-------|----------------|
| Setup | `/initialize` | — |
| Brownfield arch | `/explore` | `AGENTS.md` |
| Brownfield rules | `/extract` | `arch/` |
| Feature spec | `/specify` | — |
| Implementation plan | `/planify` | spec, report, or requirement |
| Code + unit tests | `/codify` | plan, spec, or requirement |
| E2E verification | `/verify` | `{slug}.spec.md` at `verified` or `in-progress` |
| UI from design | `/design` | `DESIGN.md` or `design/{slug}/` |
| Code review | `/review` | code in scope |
| Fix findings | `/repair` | `reports/{slug}.{type}.report.md` |
| Ship | `/release` | spec `status: verified` |
| Git (always) | `/repository` | read explicitly before commit |

Full catalog: [AIDD.skills-catalog.md](../AIDD.skills-catalog.md).

## Shared conventions

- [Artifact naming & paths](./repository/artifact-conventions.md)
- [Incremental docs pattern](./repository/incremental-artifact.md) (explore, extract)
- [Spec status lifecycle](./specify/spec-status.md)
- [Git per skill](./repository/skill-integrations.md)

## Typical loops

```
/specify → /planify → /codify → /verify
                ↑___________|  (fail → report → /repair → /verify)
```

```
/review → /repair → (re-review or /verify as appropriate)
```

Merge `feat/{slug}` to the default branch before `/release` unless the user confirms otherwise.

## AIDD Skills catalog

Conventions: [artifact-conventions.md](./repository/artifact-conventions.md)

### Architect

| Skill | What it does |
|---|---|
| [`/initialize`](./initialize/) | Sets up your project environment and main instructions file |
| [`/explore`](./explore/) | Reverse-engineers legacy code for architecture insights |
| [`/extract`](./extract/) | Extracts real rules from your codebase to guide new generation |

### Builder

| Skill | What it does |
|---|---|
| [`/specify`](./specify/) | Writes clear specifications with formal acceptance criteria |
| [`/planify`](./planify/) | Breaks specs into concrete, ordered implementation steps |
| [`/codify`](./codify/) | Generates code that follows your plans and your rules |
| [`/verify`](./verify/) | Writes and runs E2E tests; on failure, produces a report for `/repair` |

### Craftsman

| Skill | What it does |
|---|---|
| [`/review`](./review/) | Reviews code for quality, accessibility, or compliance |
| [`/repair`](./repair/) | Fixes issues from review or verify reports |
| [`/release`](./release/) | Bumps version, updates CHANGELOG and docs, marks specs `released` |
| [`/repository`](./repository/) | Branches and conventional commits; called by every skill that produces artifacts |
| [`/refactor`](./refactor/) | *(WIP)* Improves existing code without changing its behavior — not ready for routine use |

### Designer

| Skill | What it does |
|---|---|
| [`/design`](./design/) | Production-grade frontend UI from a design specification |
