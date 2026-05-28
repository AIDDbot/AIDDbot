# Architect pipelines

Paths below are under `{Product_Folder}` (default `.product/`).

## Greenfield projects from scratch

```mermaid
flowchart TD  
  HUM[HUMAN]
  AGT["AGENTS.md"]:::nd
  ARC["arch/"]:::nd
  RUL["rules/"]:::nd

  HUM -->|/establish| AGT
  HUM -->|/explore| ARC
  HUM -->|/elaborate| ARC
  HUM -->|/elaborate| RUL

  classDef nd fill:#f8fafc,stroke:#00c4cc,color:#457b9d
```
### Workflow

```markdown
/establish -> /explore -> /elaborate
```

`/elaborate` prescribes one tier per invocation: `{tier}.arch.md` and `{tier}.rules.md`. When every tier is done, it writes `ER.md`, then you can start features with `/specify`.

## Brownfield projects with legacy code

```mermaid
flowchart TD  
  HUM[HUMAN]
  AGT["AGENTS.md"]:::nd
  ARC["arch/"]:::nd
  RUL["rules/"]:::nd

  HUM -->|/establish| AGT
  HUM -->|/explore| ARC
  HUM -->|/excavate| ARC
  HUM -->|/extract| RUL

  classDef nd fill:#f8fafc,stroke:#00c4cc,color:#457b9d
```

### Workflow

```markdown
/establish -> /explore -> /excavate -> /extract
```