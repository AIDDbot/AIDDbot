# AIDD Workflow

```mermaid
flowchart TD
  classDef nd fill:#f8fafc,stroke:#00c4cc,color:#457b9d
  classDef sg fill:#f1f5f9,stroke:#00f2ff,color:#457b9d 

  HUM[HUMAN]

  subgraph P["{Product_Folder}"]
      SPC["specs/{slug}/spec.md"]:::nd
      PLN["specs/{slug}/{tier?}.plan.md"]:::nd
      VER["specs/{slug}/verify.md"]:::nd
      RUL["rules/{tier}.md"]:::nd
  end

  subgraph A["AGENTS"]
      AGT["AGENTS.md"]:::nd
      SKL[".agents/skills/"]:::nd
  end  

  subgraph S["SOLUTION"]
      COD["Source Code + Unit Tests"]:::nd
      E2E["E2E Tests"]:::nd
      CHL["CHANGELOG.md"]:::nd
  end

  HUM -->|/establish| AGT
  HUM -->|/extract| RUL
  HUM -->|/specify| SPC
  AGT -.-> SPC  
  AGT -.-> RUL
  AGT -.-> PLN
  RUL -.-> COD  
  SPC -->|/planify| PLN
  RUL -.-> PLN

  PLN -->|/codify| COD
  COD -->|/verify| E2E
  E2E -->|/verify| VER
  VER -->|/rectify| COD
  COD -->|/review| COD
  COD -->|/release| CHL

  class P,A,S sg
```

## Commands

- **When to use each skill:** [Skills catalog](../.agents/AIDD.skills-catalog.md) 
- **Install, loops, and prompts:** [Getting started](./getting-started.md)
- **Phase diagrams:** [architect](./architect.pipelines.md) · [builder](./builder.pipelines.md) · [craftsman](./craftsman.pipelines.md)

## Git

Branch naming and git safety rules live in project `SOUL.md` (from `/establish`).

## SDD Artifacts (Source, Context, Output, Status)

Builder artifacts in pipeline order. `Status` is the `status` frontmatter value; artifacts without frontmatter show `—`.

| Artifact | Source | Context | Output | Status |
|----------|--------|---------|--------|--------|
| **Spec** | `/specify` | `AGENTS.md` (Architecture) | `specs/{slug}/spec.md` | `pending` (`/specify`) -> `in-progress` (`/planify`, on branching) -> `done` (`/release`) |
| **Plan** | `/planify` | `AGENTS.md`, `{tier}.md` | `specs/{slug}/{tier?}.plan.md` | `pending` -> `done` |
| **Code** | `/codify` | `{tier}.md` | `{tier}/` | — |
| **E2E** | `/verify` | `e2e.md` | `e2e/` | — |
| **Verify report** | `/verify` | `spec.md`, E2E run | `specs/{slug}/verify.md` | `pending` -> `pass` \| `fail` |

### Workflow index

- `AGENTS.md` - Entry point, configurations, paths and product brief.

- `.agents/skills/` - Agent skills (from AIDDbot or custom). 

### Product

- `AGENTS.md` - Environment, product brief, and **system architecture** (C4 L2 containers, inter-container communication, and the decisions that constrain planning) — from `/establish`.

- `rules/` - One file per tier, the single source of truth for that tier.
  - `{tier}.md` - Tier architecture (C4 L3 components, code organization, contracts), domain entities, and coding conventions (`/extract`).

- `specs/` - One folder per feature, named with the feature `{slug}`; all of the feature's artifacts live inside it.
  - `{slug}/spec.md` - Feature specification (problem, solution, acceptance criteria). `/verify` marks its criteria `[x]/[ ]`.
  - `{slug}/{tier?}.plan.md` - Implementation plans for the feature in each tier (`/planify`).
  - `{slug}/verify.md` - E2E verification report: run summary plus a Rectify guide for `/rectify` when there are failures (`/verify`).

### Solution

- `{tier}/`- The source code and unit tests of the tier.
- `e2e/` - End-to-end tests 
- `CHANGELOG.md` - A log of all notable changes made to the codebase.
