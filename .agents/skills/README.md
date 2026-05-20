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
