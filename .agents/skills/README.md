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

Before `/release`: [`release/SKILL.md`](./release/SKILL.md) (merge preference and blocking reports).

## Conventions

- **Consumer projects:** paths, slugs, slim **Technology** table, spec status, and brownfield reads live in root `AGENTS.md` ([template](./initialize/AGENTS.template.md)); structural detail in `{Product_Folder}/arch/` from `/explore`.
- **Brownfield onboarding:** [`/explore`](./explore/SKILL.md) → [`/extract`](./extract/SKILL.md) (incremental, one artifact per run).
- **Brownfield reads:** `AGENTS.md` → **Implementation context (brownfield)** ([template](./initialize/AGENTS.template.md#implementation-context-brownfield) — for `/planify`, `/codify`, `/verify`).
- **Spec lifecycle:** project `AGENTS.md` **Spec status** · [template](./initialize/AGENTS.template.md#spec-status-state-machine).
- **Git:** project `AGENTS.md` — producing skills finish via `/repository`; [repository/SKILL.md](./repository/SKILL.md) and [skill-integrations.md](./repository/skill-integrations.md) hold branch and commit rules.

## Docs

Human workflow: [AIDD.workflow.md](../../docs/AIDD.workflow.md) · Pipelines: [architect](../../docs/architect.pipelines.md) · [builder](../../docs/builder.pipelines.md) · [craftsman](../../docs/craftsman.pipelines.md) · [designer](../../docs/designer.pipelines.md)
