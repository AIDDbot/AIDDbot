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
  SPC -.->|optional bypass| COD

  classDef nd fill:#f8fafc,stroke:#00c4cc,color:#457b9d
```

- `/planify` is recommended for non-trivial work; `/codify` may start from a spec when the user explicitly skips planning (see spec status in project `AGENTS.md` and `/codify` skill).
- Fullstack plans: `plans/{slug}.spec.plan.md` (no tier segment).
- Each step commits via [`/repository`](/.agents/skills/repository/). `/codify` creates `feat/{slug}` before writing code.

## Verify features or complex improvements

On E2E failure, `/verify` writes `reports/{slug}.verify.report.md` with acceptance-criterion traceability. Use `/repair`, then re-run `/verify`. Spec stays `in-progress` until tests pass.

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
  E2E -->|pass| SPC
  E2E -->|fail| RPT
  RPT -->|/repair| COD
  COD -->|/verify again| E2E
  
  classDef nd fill:#f8fafc,stroke:#00c4cc,color:#457b9d
```

`/verify` and `/repair` stay on the same `feat/{slug}` branch as `/codify`.
