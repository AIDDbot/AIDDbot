# Builder pipelines

Paths below are under `{Product_Folder}` (default `.product/`).

## Build features or complex improvements

```mermaid
flowchart TD  
  HUM[HUMAN]
  SPC["specs/{slug}.spec.md"]:::nd
  PLN["plans/{slug}.{tier?}.plan.md"]:::nd
  COD["{tier}/"]:::nd
  E2E["e2e/"]:::nd

  HUM -->|/specify| SPC
  SPC -->|/planify| PLN
  PLN -->|/codify| COD
  COD -->|/verify| E2E
  E2E -->|/rectify| COD
  
  classDef nd fill:#f8fafc,stroke:#00c4cc,color:#457b9d
```

### Workflow

#### On success

```markdown
/specify -> /planify -> /codify -> /verify
```

#### On failed

```markdown
/specify -> /planify -> /codify -> /verify -> /rectify -> /verify
```

