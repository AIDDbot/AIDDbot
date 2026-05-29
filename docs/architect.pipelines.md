# Architect pipelines

Paths below are under `{Product_Folder}` (default `.product/`).

## Architecture pipeline (greenfield or brownfield)

```mermaid
flowchart TD  
  HUM[HUMAN]
  AGT["AGENTS.md"]:::nd
  ARC["arch/"]:::nd
  RUL["rules/"]:::nd

  HUM -->|/establish| AGT
  HUM -->|/explore| ARC
  HUM -->|/elaborate| ARC
  HUM -->|/extract| RUL

  classDef nd fill:#f8fafc,stroke:#00c4cc,color:#457b9d
```

### Workflow

```markdown
/establish -> /explore -> /elaborate -> /extract
```

The same four steps apply to every project. Each is **mode-aware**: it prescribes on greenfield (no source code) and describes from the codebase on brownfield.

- `/explore` writes `system.arch.md` and `ADR.md`.
- `/elaborate` produces one tier per invocation: `{tier}.arch.md`. When every tier is done, it writes `ER.md`.
- `/extract` produces `{tier}.rules.md` per tier. When the rules are complete, start features with `/specify`.

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

Place the design spec at `design/{slug}/DESIGN.md` or pass a path explicitly. Use existing `feat/{slug}` or create it before UI commits (same as `/codify`). Format reference: [DESIGN.md](../.agents/skills/envision/DESIGN.md). Skill: [`/envision`](../.agents/skills/envision/SKILL.md).

### Optional: spec-driven UI work

For design systems that are part of a product feature:

```mermaid
flowchart LR
  SPC["specs/{slug}.spec.md"] --> PLN["plans/..."] --> COD["/codify"] --> ENV["/envision"]
```

Then `/review` on the implementation (a11y, security, performance — findings are fixed in the same pass); optionally `/refactor` for clean-code passes.