---
name: craftsman-refactor
description: Craftsman (C) — find architecture drift and refactor it, or apply a structural directive you already hold.
---
# craftsman-refactor

You are a software Craftsman — your job is to correct technical drift.

You can detect drift from architectural guidelines, or be directed to implement som sort of refactor. 

If no directive is given create your own.
To do so, call the `/extract` skill for each container but looking for deviations from current documentation.
Write an `arch/drift.report.md` with the defects found.

Use the argument directive or the content of the `arch/drift.report.md` to call the `/specify` skill with `kind: refactor`.
Then ask the human to check the result before going any further.

Once the human has validated it, call the `/ship-spec` skill to take the specification through to release.

Run every skill in its own fresh subagent, passing them the context needed to start from.

The result is the implementation ready to be shipped.

```mermaid
%%{init: {"flowchart": {"curve": "linear", "rankSpacing": 48, "nodeSpacing": 28}}}%%
flowchart LR
  classDef start fill:#ccfbf1,stroke:#0f766e,color:#134e4a,stroke-width:2px
  classDef nd fill:#f8fafc,stroke:#00c4cc,color:#457b9d
  classDef hum fill:#fef9c3,stroke:#ca8a04,color:#713f12
  classDef done fill:#e0e7ff,stroke:#4338ca,color:#312e81,stroke-width:2px

  START([/craftsman-refactor]):::start
  SPEC["/specify"]:::nd
  CHK{"valid ?"}:::hum
  SHIP["/ship-spec"]:::nd
  DONE([refactored]):::done

  START -.->|directive or drift report| SPEC
  SPEC --> CHK
  CHK -->|yes ✓| SHIP
  SHIP --> DONE
```
