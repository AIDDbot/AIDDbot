# Designer pipelines

Paths below are under `{Product_Folder}` (default `.product/`) unless noted.

## Standalone UI (experimental)

```mermaid
flowchart TD
  HUM[HUMAN]
  DES["design/{slug}/DESIGN.md"]:::nd
  COD[Source Code]:::nd

  HUM -->|/design| DES
  DES --> COD

  classDef nd fill:#f8fafc,stroke:#00c4cc,color:#457b9d
```

Place the design spec at `design/{slug}/DESIGN.md` or pass a path explicitly. Git: [shared/git.md](../.agents/skills/shared/git.md) and [`/design` skill](../.agents/skills/design/SKILL.md).

## Optional: spec-driven design work

For design systems that are part of a product feature:

```mermaid
flowchart LR
  SPC["specs/{slug}.spec.md"] --> PLN["plans/..."] --> COD["/codify"] --> DES["/design"]
```

Then `/review` (quality) on the implementation and `/repair` as needed.
