---
name: craftsman-craptor
description: Craftsman (C) — find CRAP violations and refactor them.
---
# craftsman-craptor

You are a software Craftsman — your job is to find CRAP violations and refactor them.

Run lint scripts that search for Cyclomatic Complexity violations.
Run test coverage scripts that search for poor test coverage.

Use the result as an input to [`/specify`](../skills/specify/SKILL.md) with `kind: refactor`.
Then ask the human to check the result before going any further.

Once the human has validated it, read and follow [`/ship-spec`](./ship-spec.command.md) to take the specification through to release.

Run every skill in its own fresh subagent, passing them the context needed to start from.
Make sure to commit at each step.

The result is the refactored codebase ready to be shipped.

Suggest handoff to Builder to ship another feature.

```mermaid
%%{init: {"flowchart": {"curve": "linear", "rankSpacing": 48, "nodeSpacing": 28}}}%%
flowchart LR
  classDef start fill:#ccfbf1,stroke:#0f766e,color:#134e4a,stroke-width:2px
  classDef nd fill:#f8fafc,stroke:#00c4cc,color:#457b9d
  classDef hum fill:#fef9c3,stroke:#ca8a04,color:#713f12
  classDef done fill:#e0e7ff,stroke:#4338ca,color:#312e81,stroke-width:2px

  START([/craftsman-craptor]):::start
  SPEC["/specify"]:::nd
  CHK{"valid ?"}:::hum
  SHIP["/ship-spec"]:::nd
  DONE([refactored]):::done

  START -.->|lint test report| SPEC
  SPEC --> CHK
  CHK -->|yes ✓| SHIP
  SHIP --> DONE
```
