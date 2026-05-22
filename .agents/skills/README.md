# AIDD skills

Slash-command skills under `.agents/skills/`. Each folder has a `SKILL.md` (role, steps, verification) and local templates or guidelines.

- **Prerequisites table:** [AIDD.skills-catalog.md](../AIDD.skills-catalog.md)
- **Human docs:** [docs/AIDD.workflow.md](../../docs/AIDD.workflow.md) · [getting-started](../../docs/getting-started.md)

## Typical loops

**Greenfield:** `/initialize` → `/specify` → `/planify` → `/codify` → `/verify` → `/review` → `/repair` (as needed) → `/release`

**Brownfield (once):** `/initialize` → `/explore` (modes: `system`, tiers, `adr`, `er`) → `/extract` (`naming`, tiers, `testing`, or `all`) → feature loop above

**UI:** `/design` from `{Product_Folder}/design/{slug}/DESIGN.md` — use `feat/{slug}` like `/codify`

**Git:** Producing skills finish with [`/repository`](./repository/SKILL.md). `/codify` creates `feat/{slug}` before implementation code.

## Spec and plan status

| Artifact | Status chain |
|----------|----------------|
| Spec | `pending` (`/specify`) → `in-progress` (`/codify`) → `done` (`/release`; `released-version`) |
| Plan | `pending` (`/planify`) → `in-progress` (`/codify` start) → `done` (`/codify` end) |

Reports: `/repair` marks rows `resolved` or `skipped` (no frontmatter chain).

## Pipelines by phase

| Phase | Doc |
|-------|-----|
| Architect | [architect.pipelines.md](../../docs/architect.pipelines.md) |
| Builder | [builder.pipelines.md](../../docs/builder.pipelines.md) |
| Craftsman | [craftsman.pipelines.md](../../docs/craftsman.pipelines.md) |
| Designer | [designer.pipelines.md](../../docs/designer.pipelines.md) |

## WIP

| Skill | Use instead |
|-------|-------------|
| `/refactor` | `/review` → `/repair` for defects; `/specify` → … for features |
