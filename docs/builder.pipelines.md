# Builder pipelines

Paths below are under `{Product_Folder}` (default `.product/`).

## Build features or complex improvements

```mermaid
flowchart TD  
  HUM[HUMAN]
  SPC["specs/{slug}.spec.md"]:::nd
  PLN["plans/{slug}.{source?}.{tier?}.plan.md"]:::nd
  COD[Source Code]:::nd

  HUM -->|/specify| SPC
  SPC -->|/planify| PLN
  PLN -->|/codify| COD
  SPC -.->|optional: /codify without plan| COD
  RPT["reports/{slug}.{type}.report.md"]:::nd
  RPT -.->|/planify| PLN

  classDef nd fill:#f8fafc,stroke:#00c4cc,color:#457b9d
```

- `/planify` is recommended for non-trivial work; `/codify` may start from a spec or requirement when planning is skipped ([codify skill](../.agents/skills/codify/SKILL.md)).
- Fullstack plans: `plans/{slug}.spec.plan.md` (no tier segment).
- **Plan status:** `pending` (from `/planify`) → `in-progress` (start of `/codify`) → `done` (end of `/codify`).
- **Spec status during build:** `pending` (from `/specify`) → `in-progress` (start of `/codify`; stays until `/release`).
- Git per step: project `AGENTS.md` and [`/repository`](../.agents/skills/repository/SKILL.md) (`feat/{slug}` before `/codify` implementation).

## Verify features or complex improvements

On E2E failure, `/verify` writes `reports/{slug}.verify.report.md`. Use `/repair`, then re-run `/verify`. On pass, `/verify` marks acceptance criteria `[x]` in the spec and suggests `/review`. Spec stays `in-progress` until `/release` sets `done`.

```mermaid
flowchart TD    
  HUM[HUMAN]
  SPC["specs/{slug}.spec.md"]:::nd
  COD[Source Code]:::nd
  E2E["E2E Tests"]:::nd
  RPT["reports/{slug}.verify.report.md"]:::nd

  SPC --> COD
  HUM -->|/codify| COD
  COD -->|/verify| E2E
  E2E -->|pass: mark criteria, suggest /review| SPC
  E2E -->|fail| RPT
  RPT -->|/repair| COD
  COD -->|/verify again| E2E
  
  classDef nd fill:#f8fafc,stroke:#00c4cc,color:#457b9d
```

During a feature cycle, `/verify` and `/repair` use the same branch as `/codify` (see [repository skill](../.agents/skills/repository/SKILL.md)).
