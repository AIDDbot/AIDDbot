# Builder pipelines

Paths below are under `{Product_Folder}` (default `.product/`).

## Build features or complex improvements

All feature artifacts live together in `specs/{slug}/` (`spec.md`, `{tier?}.plan.md`, `verify.md`). E2E test code stays in the solution (`e2e/`).

```mermaid
flowchart TD  
  HUM[HUMAN]
  SPC["specs/{slug}/spec.md"]:::nd
  PLN["specs/{slug}/{tier?}.plan.md"]:::nd
  COD["{tier}/"]:::nd
  E2E["e2e/"]:::nd
  VER["specs/{slug}/verify.md"]:::nd

  HUM -->|/specify| SPC
  SPC -->|/planify| PLN
  PLN -->|/codify| COD
  COD -->|/verify| E2E
  E2E -->|/verify| VER
  VER -->|/rectify| COD
  
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

