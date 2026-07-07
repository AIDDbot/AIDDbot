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
      ERD["arch/ER.md"]:::nd
      CAR["arch/{container}.arch.md"]:::nd
      PRD["specs/PRD.md"]:::nd
      SPC["specs/{NNN}-{slug}/spec.md"]:::nd
      PLN["specs/{NNN}-{slug}/{container}.plan.md"]:::nd
      EPL["specs/{NNN}-{slug}/e2e.plan.md"]:::nd
      RPT["specs/{NNN}-{slug}/e2e.report.md"]:::nd
      RVR["specs/{NNN}-{slug}/review.report.md"]:::nd
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
  HUM -->|/extract| ERD
  HUM -->|/specify| SPC
  HUM -->|/specify| PRD
  PRD -.functional log.-> SPC
  AGT -.-> SPC
  ARC -.-> SPC
  ERD -.-> SPC
  SPC -->|/planify| PLN
  SPC -->|/planify| EPL
  CAR -.-> PLN

  PLN -->|/codify| COD
  RUL -.-> COD
  EPL -->|/codify| E2E
  E2E -->|/verify| RPT
  RPT -->|/codify| COD
  COD -->|/review| RVR
  RVR -->|/codify| COD
  SPC -->|/release| CHL
  SPC -->|/release reconciles| ARC

  class P,A,S sg
```

## Commands

- **The whole system in diagrams:** [AIDD in diagrams](./AIDD.diagrams.md) · [Building a feature](./feature.building.md)
- **When to use each skill:** [Skills catalog](../.agents/skills/skills.catalog.md) · [Skills lifecycle](../.agents/skills/skills.lifecycle.md)
- **Install, loops, and prompts:** [Getting started](./getting-started.md)
- **Phase diagrams:** [Skill pipelines](./pipelines.md)
- **Producers and consumers:** [Skills interrelationships](./skills-interrelationships.md)
- **Why it is shaped this way:** [Design decisions](./design.decisions.md)

## Glossary

- **Container** — a named runnable unit in `system.arch.md` (`api`, `web`, `db`...) — C4 L2. Units are always identified by container name.
- **Tier** — the technological layer a container belongs to (`front | back | db | e2e | fullstack`); classifies containers, never identifies one.
- **e2e container** — runnable like any container, but transversal: it verifies the others. Planned via `e2e.plan.md` and implemented by `/codify` like any container; only its verdict belongs to `/verify`.
- **Evidence wins** — extract what exists, prescribe what is missing (marked *intended*). Applied per question, not per repo.

## Git

Branch naming, conventional commits, and git safety rules live in the root `{Agents_File}` (written by `/explore`).

## SDD Artifacts (Source, Context, Output, Status)

Feature artifacts in pipeline order. `Status` is the `status` frontmatter value; artifacts without frontmatter show `—`.

| Artifact | Source | Context | Output | Status |
|----------|--------|---------|--------|--------|
| **PRD** | `/specify` | existing specs | `specs/PRD.md` | — (append-only functional log by feature area; status stays in each spec) |
| **Spec** | `/specify` | `system.arch.md`, `ER.md`, `PRD.md` | `specs/{NNN}-{slug}/spec.md` | `pending` (`/specify`) -> `in-progress` (first `/codify`) -> `done` (`/release`) |
| **Container plan** | `/planify` | `{container}.arch.md` | `specs/{NNN}-{slug}/{container}.plan.md` | — (steps checked `[x]` by `/codify`) |
| **E2E plan** | `/planify` | `spec.md` AC ids (`AC-{NNN}.{n}`) | `specs/{NNN}-{slug}/e2e.plan.md` | — (steps checked `[x]` by `/codify`) |
| **Code** | `/codify` | `rules/{container}.rules.md` | `{Source_Folders}` | — |
| **E2E tests** | `/codify` | `e2e.plan.md`, `e2e.arch.md` / `e2e.rules.md` | `e2e/` (titles carry AC ids) | — |
| **E2E report** | `/verify` | `spec.md`, E2E run | `specs/{NNN}-{slug}/e2e.report.md` | a verdict per AC id + one entry per defect: `code bug \| test bug \| structural`, each with a handoff |

`/verify` also marks the spec's acceptance criteria `[x]/[ ]` — the spec carries the durable acceptance state; the report carries the transient run details.

### Workflow index

- `{Agents_File}` (`AGENTS.md` | `CLAUDE.md`) — Entry point: environment, paths, git rules, status chain, and product brief (`/explore`).
- `{Agents_Folder}/skills/` — Agent skills (from AIDDbot or custom).
- `{Agents_Folder}/rules/` — Coding rules per container.
  - `{container}.rules.md` — Naming, conventions, canonical example (`/extract`).

### Product

- `arch/` — Architecture set for planning and coding.
  - `system.arch.md` — Containers diagram (C4 L2) (`/explore`).
  - `ER.md` — Domain Entity-Relationship diagram (`/extract`, when the owning container is extracted).
  - `{container}.arch.md` — Components (C4 L3), code organization, contract surface (`/extract`).
  - `db.schema.md` / `api.schema.md` — System-wide field-level database/API schema, split out as they grow large; written when the owning container is extracted, linked from any container that benefits (`/extract`, when applicable).

- `docs/` — Human-oriented documentation (README, guides); not maintained by `/release`.
- `specs/` — One folder per spec, named `{NNN}-{slug}` (`{NNN}` is a 3-digit sequential id); all of the spec's artifacts live inside it.
  - `PRD.md` — Functional log: specs indexed by feature area when created; written only by `/specify`. No status — that lives in each spec.
  - `{NNN}-{slug}/spec.md` — Problem, per-container expected results, acceptance criteria numbered `AC-{NNN}.{n}` (`/specify`). `/verify` marks its criteria `[x]/[ ]`; `/release` closes it when in scope.
  - `{NNN}-{slug}/{container}.plan.md` — Implementation plan for one container (`/planify`).
  - `{NNN}-{slug}/e2e.plan.md` — The e2e container's plan: one scenario per AC id (`/planify`).
  - `{NNN}-{slug}/e2e.report.md` — Verdict per AC id + defects: expected vs actual, affected container, severity, kind, handoff (`/verify`).
  - `{NNN}-{slug}/review.report.md` — Findings report: dimension, severity, kind, handoff (`/review`).

### Solution

- `{Source_Folders}` — The source code and unit tests of each container.
- `e2e/` — End-to-end tests (written by `/codify` from `e2e.plan.md`; judged by `/verify`).
- `CHANGELOG.md` — Keep-a-Changelog log of all notable changes (`/release`).

## Maintenance

The green e2e suite is the contract; the PRD (`specs/PRD.md`) is the functional log of specs created over time; a released spec is closed history. Changes to released features route on one mechanical question — *would a green e2e test have to change?*

- No → defect or coverage gap: `/codify` fix mode + regression test → patch `/release`.
- Yes → behavior change: a new spec via `/specify` → full pipeline → `/release`.

See the [Skills lifecycle](../.agents/skills/skills.lifecycle.md) for the full maintenance and refactoring map.
