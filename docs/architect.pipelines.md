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
  HUM -->|/excavate| ARC
  HUM -->|/extract| RUL

  classDef nd fill:#f8fafc,stroke:#00c4cc,color:#457b9d
```

### Workflow

```markdown
/establish -> /explore -> /excavate -> /extract
```

The same four steps apply to every project. Each is **mode-aware**: it prescribes on greenfield (no source code) and describes from the codebase on brownfield.

- `/explore` writes `system.arch.md` and `ADR.md`.
- `/excavate` produces one tier per invocation: `{tier}.arch.md`. When every tier is done, it writes `ER.md`.
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
  DES -->|/codify| COD

  classDef nd fill:#f8fafc,stroke:#00c4cc,color:#457b9d
```

`/envision` authors the design spec at `design/{slug}/DESIGN.md` (tokens + component behavior); `/codify` then implements the UI from it. Use existing `feat/{slug}` or create it before UI commits (same as `/codify`). Format reference: [DESIGN.md](../.agents/skills/envision/DESIGN.md). Skill: [`/envision`](../.agents/skills/envision/SKILL.md).

### Optional: spec-driven UI work

For design systems that are part of a product feature, slot `/envision` between the spec and the build:

```mermaid
flowchart LR
  SPC["specs/{slug}.spec.md"] --> ENV["/envision → DESIGN.md"] --> PLN["plans/..."] --> COD["/codify"]
```

Then `/review` on the implementation (a11y, security, performance — findings are fixed in the same pass); optionally `/refactor` for clean-code passes.