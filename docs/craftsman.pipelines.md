# Craftsman pipelines

Paths below are under `{Product_Folder}` (default `.product/`).

## Repair

Use `/repair` for findings from `/review` or `/verify` reports.

```mermaid
flowchart TD  
  HUM[HUMAN]
  RPT["reports/{slug}.{type}.report.md"]:::nd
  COD[Source Code]:::nd

  HUM -->|/review| RPT
  RPT -->|/repair| COD
 
  classDef nd fill:#f8fafc,stroke:#00c4cc,color:#457b9d
```

`/review` and `/repair` commit reports and fixes via [`/repository`](/.agents/skills/repository/). Use `fix/{slug}` only when not on an active `feat/{slug}` feature branch.

## Release

Requires specs at `status: verified`. Sets `released`, bumps semver, updates `CHANGELOG.md` and `README.md`.

```mermaid
flowchart TD  
  HUM[HUMAN]
  SPC["specs/{slug}.spec.md"]:::nd
  CHL["CHANGELOG.md"]:::nd
  VER["version files"]:::nd

  HUM -->|/release| CHL & SPC & VER
  
  classDef nd fill:#f8fafc,stroke:#00c4cc,color:#457b9d
``` 
