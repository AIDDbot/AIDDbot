# Craftsman pipelines

Paths below are under `{Product_Folder}` (default `.product/`).

## Build features or complex improvements

```mermaid
flowchart TD  
  HUM[HUMAN]
  COD["{tier}/"]:::nd
  RPT["reports/{slug}.review.report.md"]:::nd
  CHL["CHANGELOG.md"]:::nd
  
  HUM -->|/review| RPT
  RPT -->|/repair| COD
  COD -->|/release| CHL

  classDef nd fill:#f8fafc,stroke:#00c4cc,color:#457b9d
```

Hygiene without a review report: **`/refactor`** edits code in place, then uses **`/repository`** for one detailed conventional commit; run unit and E2E tests (or **`/verify`**) afterward.

### Workflow

#### On success

```markdown
/review -> /release
```

#### On failed

```markdown
/review -> /repair -> /release
```

Optional (clean code / DRY, no `{slug}.review.report.md`):

```markdown
/refactor -> (tests) -> /release
```

