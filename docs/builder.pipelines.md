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

  classDef nd fill:#f8fafc,stroke:#00c4cc,color:#457b9d
```

## Verify features or complex improvements

On E2E failure, `/verify` writes `reports/{slug}.verify.report.md`. Use `/repair` to fix findings, then re-run `/verify`.

```mermaid
flowchart TD    
  HUM[HUMAN]
  COD[Source Code]:::nd
  E2E["E2E Tests"]:::nd
  RPT["reports/{slug}.verify.report.md"]:::nd

  HUM -->|/codify| COD
  COD -->|/verify| E2E
  E2E -->|failures| RPT
  RPT -->|/repair| COD
  
  classDef nd fill:#f8fafc,stroke:#00c4cc,color:#457b9d
```
