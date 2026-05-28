# Architect pipelines

Paths below are under `{Product_Folder}` (default `.product/`).

## Greenfield projects from scratch

```mermaid
flowchart TD  
  HUM[HUMAN]
  AGT["AGENTS.md"]:::nd
  ARC["arch/"]:::nd

  HUM -->|/establish| AGT
  HUM -->|/explore| ARC

  classDef nd fill:#f8fafc,stroke:#00c4cc,color:#457b9d
```
### Workflow

```markdown
/establish -> /explore
```

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