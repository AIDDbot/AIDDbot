# AIDD Workflow

```mermaid
flowchart TD
  classDef nd fill:#f8fafc,stroke:#00c4cc,color:#457b9d
  classDef sg fill:#f1f5f9,stroke:#00f2ff,color:#457b9d 

  HUM[HUMAN]

  subgraph A["AGENTS"]
      AGT["{Agents_File}"]:::nd
      SKL[".agents/skills/"]:::nd
      RUL["rules/{container}.rules.md"]:::nd
  end  

  subgraph P["{Product_Folder}"]
      ARC["arch/system.arch.md"]:::nd
      CAR["arch/{container}.arch.md"]:::nd
      SPC["specs/{slug}/spec.md"]:::nd
      PLN["specs/{slug}/{container}.plan.md"]:::nd
      EPL["specs/{slug}/e2e.plan.md"]:::nd
      RPT["specs/{slug}/e2e.report.md"]:::nd
  end

  subgraph S["SOLUTION"]
      COD["Source Code + Unit Tests"]:::nd
      E2E["E2E Tests"]:::nd
      CHL["CHANGELOG.md"]:::nd
  end

  HUM -->|/explore| AGT
  HUM -->|/explore| ARC
  HUM -->|/extract| CAR
  HUM -->|/extract| RUL
  HUM -->|/specify| SPC
  HUM -->|/modify| SPC
  AGT -.-> SPC
  ARC -.-> SPC
  SPC -->|/planify| PLN
  SPC -->|/planify| EPL
  CAR -.-> PLN

  PLN -->|/codify| COD
  RUL -.-> COD
  EPL -->|/verify| E2E
  E2E -->|/verify| RPT
  RPT -->|/verify| COD
  COD -->|/review| COD
  SPC -->|/release| CHL

  class P,A,S sg
```

## Commands

- **When to use each skill:** [Skills catalog](../.agents/skills/skills.catalog.md) · [Skills lifecycle](../.agents/skills/skills.lifecycle.md)
- **Install, loops, and prompts:** [Getting started](./getting-started.md)
- **Phase diagrams:** [architect](./architect.pipelines.md) · [builder](./builder.pipelines.md) · [craftsman](./craftsman.pipelines.md)
- **Producers and consumers:** [Skills interrelationships](./skills-interrelationships.md)

## Glossary

- **Container** — a named runnable unit in `system.arch.md` (`api`, `web`, `db`...) — C4 L2. Units are always identified by container name.
- **Tier** — the technological layer a container belongs to (`front | back | db | e2e | fullstack`); classifies containers, never identifies one.
- **e2e container** — runnable like any container, but transversal: it verifies the others. Planned via `e2e.plan.md` and owned by `/verify`, never `/codify`.
- **Mode** — `greenfield` (no code → prescribe) or `brownfield` (code exists → extract). Resolved per container by `/extract`.

## Git

Branch naming, conventional commits, and git safety rules live in the root `{Agents_File}` (written by `/explore`).

## SDD Artifacts (Source, Context, Output, Status)

Builder artifacts in pipeline order. `Status` is the `status` frontmatter value; artifacts without frontmatter show `—`.

| Artifact | Source | Context | Output | Status |
|----------|--------|---------|--------|--------|
| **Spec** | `/specify` | `system.arch.md` | `specs/{slug}/spec.md` | `pending` (`/specify`) -> `in-progress` (first `/codify`) -> `done` (`/release`) |
| **Container plan** | `/planify` | `{container}.arch.md` | `specs/{slug}/{container}.plan.md` | — (steps checked `[x]` by `/codify`) |
| **E2E plan** | `/planify` | `spec.md` acceptance criteria | `specs/{slug}/e2e.plan.md` | — |
| **Code** | `/codify` | `rules/{container}.rules.md` | `{Source_Folders}` | — |
| **E2E tests** | `/verify` | `e2e.arch.md` / `e2e.rules.md` when present | `e2e/` | — |
| **E2E report** | `/verify` | `spec.md`, E2E run | `specs/{slug}/e2e.report.md` | one entry per defect: `code bug \| test bug \| structural` |

`/verify` also marks the spec's acceptance criteria `[x]/[ ]` — the spec carries the durable acceptance state; the report carries the transient run details.

### Workflow index

- `{Agents_File}` (`AGENTS.md` | `CLAUDE.md`) — Entry point: environment, paths, git rules, status chain, and product brief (`/explore`).
- `{Agents_Folder}/skills/` — Agent skills (from AIDDbot or custom).
- `{Agents_Folder}/rules/` — Coding rules per container.
  - `{container}.rules.md` — Naming, conventions, canonical example (`/extract`).

### Product

- `arch/` — Architecture set for planning and coding.
  - `system.arch.md` — Containers diagram (C4 L2) + ER diagram (`/explore`).
  - `{container}.arch.md` — Components (C4 L3), code organization, contracts (`/extract`).

- `specs/` — One folder per feature, named with the feature `{slug}`; all of the feature's artifacts live inside it.
  - `{slug}/spec.md` — Problem, per-container expected results, acceptance criteria (`/specify`). `/verify` marks its criteria `[x]/[ ]`; `/release` closes it.
  - `{slug}/{container}.plan.md` — Implementation plan for one container (`/planify`).
  - `{slug}/e2e.plan.md` — Transversal e2e plan covering every acceptance criterion (`/planify`).
  - `{slug}/e2e.report.md` — Defects report: expected vs actual, affected container, severity, kind (`/verify`).

### Solution

- `{Source_Folders}` — The source code and unit tests of each container.
- `e2e/` — End-to-end tests (owned by `/verify`).
- `CHANGELOG.md` — Keep-a-Changelog log of all notable changes (`/release`).

## Maintenance

Specs are commits; arch docs are HEAD. A `done` spec is immutable — changes to released features enter via `/modify`:

- Implementation defect → direct fix + regression test → patch `/release`.
- Requirement change → `/specify` with `amends: {old-slug}` → full pipeline → `/release` stamps `superseded-by:` on the old spec.

See the [Skills lifecycle](../.agents/skills/skills.lifecycle.md) for the full maintenance and refactoring map.
