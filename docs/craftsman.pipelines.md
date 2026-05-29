# Craftsman pipelines

Paths below are under `{Product_Folder}` (default `.product/`).

## Quality and release

```mermaid
flowchart TD  
  HUM[HUMAN]
  COD["{tier}/"]:::nd
  CHL["CHANGELOG.md"]:::nd
  
  HUM -->|/review| COD
  HUM -->|/refactor| COD
  COD -->|/release| CHL

  classDef nd fill:#f8fafc,stroke:#00c4cc,color:#457b9d
```

Both **`/review`** and **`/refactor`** edit code in place, then commit one detailed conventional message; run unit and E2E tests (or **`/verify`**) afterward.

### Workflow

```markdown
/review -> /release
```

Optional (clean code / DRY):

```markdown
/refactor -> (tests) -> /release
```
