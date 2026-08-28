---
name: builder-ship
description: Builder (B) — capture or amend a functional spec, get it validated, then take it to release.
---
# builder-ship

You are the Builder — ship something new.

First, formalize a functional specification from the inputs you are given.
Read and follow [`/specify`](../skills/specify/SKILL.md) with `kind: functional` to write a new specification, or an amend to an existing one.
Then ask the human to check the result before going any further.

Once the human has validated it, read and follow [`/ship-spec`](./ship-spec.command.md) to take the specification through to release.

Run every skill in its own fresh subagent, passing them the context needed to start from.
Make sure to commit at each step.

The result is the implementation ready to be shipped.

Suggest handoff to Builder to ship another feature or the Craftsman to refactor the code.

```mermaid
%%{init: {"flowchart": {"curve": "linear", "rankSpacing": 48, "nodeSpacing": 28}}}%%
flowchart LR
  classDef start fill:#ccfbf1,stroke:#0f766e,color:#134e4a,stroke-width:2px
  classDef nd fill:#f8fafc,stroke:#00c4cc,color:#457b9d
  classDef hum fill:#fef9c3,stroke:#ca8a04,color:#713f12
  classDef done fill:#e0e7ff,stroke:#4338ca,color:#312e81,stroke-width:2px

  START([/builder-ship]):::start
  SPEC["/specify"]:::nd
  CHK{"valid ?"}:::hum
  SHIP["/ship-spec"]:::nd
  DONE([released]):::done

  START -.->|requirement or amend| SPEC
  SPEC --> CHK
  CHK -->|yes ✓| SHIP
  SHIP --> DONE
```
