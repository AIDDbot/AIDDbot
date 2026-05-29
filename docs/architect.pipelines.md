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

## UI from design spec

Paths below are under `{Product_Folder}` (default `.product/`).

### Standalone UI

```mermaid
flowchart TD
  HUM[HUMAN]
  DES["design/{slug}/DESIGN.md"]:::nd
  COD[Source Code]:::nd

  HUM -->|/envision| DES
  DES --> COD

  classDef nd fill:#f8fafc,stroke:#00c4cc,color:#457b9d
```

Place the design spec at `design/{slug}/DESIGN.md` or pass a path explicitly. Use existing `feat/{slug}` or create it per `AGENTS.md` before UI commits (same as `/codify`). Format reference: [DESIGN.md](../.agents/skills/envision/DESIGN.md). Git: [`/envision`](../.agents/skills/envision/SKILL.md) and [`/repository`](../.agents/skills/repository/SKILL.md).

### Optional: spec-driven UI work

For design systems that are part of a product feature:

```mermaid
flowchart LR
  SPC["specs/{slug}.spec.md"] --> PLN["plans/..."] --> COD["/codify"] --> ENV["/envision"]
```

Then `/review` on the implementation (a11y, security, performance — findings are fixed in the same pass); optionally `/refactor` for clean-code passes.