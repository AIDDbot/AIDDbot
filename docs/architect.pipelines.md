# Architect pipelines

Paths below are under `{Product_Folder}` (default `.product/`).

## Greenfield projects from scratch

```mermaid
flowchart TD  
  HUM[HUMAN]
  AGT["AGENTS.md"]:::nd
  SKL[".agents/skills/"]:::nd

  HUM -->|/initialize| AGT
  AGT --- SKL

  classDef nd fill:#f8fafc,stroke:#00c4cc,color:#457b9d
```

`/initialize` confirms `.agents/skills/` exists and commits `AGENTS.md` via [shared/git.md](../.agents/skills/shared/git.md).

## Brownfield projects with legacy code

```mermaid
flowchart TD  
  HUM[HUMAN]
  AGT["AGENTS.md"]:::nd
  ARC["arch/"]:::nd
  RUL["rules/"]:::nd

  HUM -->|/initialize| AGT
  HUM -->|/explore| ARC
  HUM -->|/extract| RUL
  ARC --> RUL

  classDef nd fill:#f8fafc,stroke:#00c4cc,color:#457b9d
```

`/explore` and `/extract` use the [incremental artifact pattern](../.agents/skills/shared/incremental-artifact.md) — one file per run. Git: [shared/git.md](../.agents/skills/shared/git.md). When complete, start features with `/specify`.
