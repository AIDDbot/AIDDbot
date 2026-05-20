# AIDD agent skills

Invoke skills by name (e.g. `/specify`, `@specify`). Each folder contains `SKILL.md` plus supporting templates and mode files.

**Catalog:** [AIDD.skills-catalog.md](../AIDD.skills-catalog.md) (phases, prerequisites, and role groupings).

## Typical loops

```
/specify → /planify → /codify → /verify
                ↑___________|  (fail → report → /repair → /verify)
```

```
/review → /repair → (re-review or /verify as appropriate)
```

Merge `feat/{slug}` to the default branch before `/release` unless the user confirms otherwise.

## Conventions

- **Consumer projects:** paths, slugs, spec status, and brownfield reads live in root `AGENTS.md` ([template](./initialize/AGENTS.template.md)).
- **Shared helpers:** [shared/incremental-artifact.md](./shared/incremental-artifact.md), [implementation-context.md](./shared/implementation-context.md), [git.md](./shared/git.md).
- **Spec lifecycle detail:** [specify/spec-status.md](./specify/spec-status.md).
- **Git:** [repository/SKILL.md](./repository/SKILL.md) and [skill-integrations.md](./repository/skill-integrations.md) — every producing skill ends with a Git checklist pointing here.

## Docs

Human workflow: [AIDD.workflow.md](../../docs/AIDD.workflow.md) · Pipelines: [architect](../../docs/architect.pipelines.md) · [builder](../../docs/builder.pipelines.md) · [craftsman](../../docs/craftsman.pipelines.md) · [designer](../../docs/designer.pipelines.md)
