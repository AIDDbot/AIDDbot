---
name: explore-and-refactor
description: Document an existing codebase to find architecture drift and refactor it
---
# explore-and-refactor

Document an existing codebase from top to bottom to find architecture drift and refactor it.

Run every skill in its own fresh subagent, in a new working session, passing it as context the
state you want it to start from.

Run `/explore` to set the project up and map its containers. Then run `/extract` once per container, documenting them one at a time, comparing the current state with the expected state and taking into account previous contradictions and observed failures.

As a result, generate a work document called `arch/drift.report.md` that serves to refactor the codebase. Choose together with the human the most important task to refactor and run the `/spec-refactor` command passing its content.

Mark the result of the refactoring in the work document and propose the next defect to refactor.

```mermaid
%%{init: {"flowchart": {"curve": "linear", "rankSpacing": 48, "nodeSpacing": 28}}}%%
flowchart TD
  classDef nd fill:#f8fafc,stroke:#00c4cc,color:#457b9d
  classDef hum fill:#fef9c3,stroke:#ca8a04,color:#713f12
  classDef start fill:#ccfbf1,stroke:#0f766e,color:#134e4a,stroke-width:2px
  classDef end fill:#e0e7ff,stroke:#4338ca,color:#312e81,stroke-width:2px

  S([start]):::start --> EXP["/explore"]:::nd --> EXT["/extract × container<br/>vs expected · prior failures"]:::nd --> RPT["arch/drift.report.md"]:::nd

  RPT --> PICK{"pick top defect"}:::hum
  PICK --> REF["/spec-refactor"]:::nd --> MARK["mark result in report"]:::nd --> NEXT{"more defects?"}:::hum
  NEXT -->|done| E([done]):::end

  NEXT -.->|yes| PICK
```
