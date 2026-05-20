# AIDD Workflow

```mermaid
flowchart TD
  classDef nd fill:#f8fafc,stroke:#00c4cc,color:#457b9d
  classDef sg fill:#f1f5f9,stroke:#00f2ff,color:#457b9d 

  HUM[HUMAN]

  subgraph P["{Product_Folder}"]
      SPC["specs/"]:::nd
      PLN["plans/"]:::nd
      RPT["reports/"]:::nd
      ARC["arch/"]:::nd
      RUL["rules/"]:::nd
      DES["design/"]:::nd
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

  HUM -->|/initialize| AGT
  HUM -->|/explore| ARC
  HUM -->|/extract| RUL
  HUM -->|/specify| SPC
  AGT -.-> SPC  
  AGT -.-> ARC
  RUL -.-> COD  
  SPC -->|/planify| PLN
  ARC -.-> PLN
  DES -.->|/design optional| COD

  PLN -->|/codify| COD
  COD -->|/verify| E2E
  E2E -->|failures| RPT
  COD -->|/review| RPT
  RPT -->|/repair| COD
  COD -->|/release| CHL

  class P,A,S sg
```

## Commands

- **When to use each skill:** [Skills catalog](../.agents/AIDD.skills-catalog.md) · [Skills index](../.agents/skills/README.md)
- **Install, loops, and prompts:** [Getting started](./getting-started.md)
- **Phase diagrams:** [architect](./architect.pipelines.md) · [builder](./builder.pipelines.md) · [designer](./designer.pipelines.md) · [craftsman](./craftsman.pipelines.md)
- **Git:** [repository skill](../.agents/skills/repository/SKILL.md) · [skill integrations](../.agents/skills/repository/skill-integrations.md) — producing skills finish per project `AGENTS.md`; `/repository` is the last step, not a separate pipeline phase.

New here? [Getting started](./getting-started.md) · [Why AIDD](../README.md#why-aidd)

## Artifacts

Paths below are relative to `{Product_Folder}` (default `.product/`, set in `AGENTS.md`) unless noted.

### Workflow index

- `AGENTS.md` - Entry point: paths, slugs, git rules, slim Technology table (folder, language, framework, build/run/test per tier), **Implementation context (brownfield)** read order. Product and structural detail live in `arch/`.

- `.agents/skills/` - Agent skills (from AIDDbot or custom). Not under `{Product_Folder}`; lives at project root per `AGENTS.md`.

### Product

- `arch/system.arch.md` - Product overview, features, C4 context/containers, inter-tier communication (`/explore system`).
- `arch/{tier}.arch.md` - Per-tier stack, dev commands, code organization, contracts (`/explore {tier}`).
- `arch/ADR.md`, `arch/ER.md` - Decisions and domain model when applicable.
- `arch/` - Full architecture set for planning and coding. 

- `rules/` - Define rules that agents must follow when writing code. Can be linked to agents' custom folder.

- `design/{slug}/` - Optional design specifications for `/design` (e.g. `DESIGN.md`).

- `specs/{slug}.spec.md` - A detailed specification (problem, solution, verification) of a feature or technical requirement. YAML frontmatter includes `status` (`draft` → `planned` → `in-progress` → `verified` → `released`); see project `AGENTS.md` **Spec status** ([template](../.agents/skills/initialize/AGENTS.template.md#spec-status-state-machine)).

- `plans/{slug}.{source?}.{tier?}.plan.md` - Implementation plans (fullstack: `{slug}.{source}.plan.md`).

- `reports/{slug}.{type}.report.md` - Findings from `/review` or `/verify` (`{type}`: `quality`, `compliance`, `accessibility`, `verify`). Consumed by `/repair`.

### Solution

- `Source Code + Unit Tests` - The implementation of the system. Unit tests are produced as part of `/codify`, not as a separate step.

- `E2E Tests` - End-to-end tests that verify the implemented code meets the defined specifications and acceptance criteria.

- `CHANGELOG.md` - A log of all notable changes made to the codebase, generated during the release process.
