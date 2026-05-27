# Craftsman pipelines

Paths below are under `{Product_Folder}` (default `.product/`).

## Build features or complex improvements

```mermaid
flowchart TD  
  HUM[HUMAN]
  COD["{tier}/"]:::nd
  RPT["reports/{slug}.report.md"]:::nd
  
  HUM -->|/review| RPT
  RPT -->|/repair| COD
  COD -->|/release| CHL

  classDef nd fill:#f8fafc,stroke:#00c4cc,color:#457b9d
```

### Workflow

#### On success

```markdown
/review -> /release
```

#### On failed

```markdown
/review -> /repair -> /release
```

