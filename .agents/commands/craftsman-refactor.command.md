---
name: craftsman-refactor
description: Craftsman (C) — find architecture drift and refactor it, or apply a structural directive you already hold.
---
# craftsman-refactor

Craftsman door of the ABC lifecycle — correct technical drift.

Two entries, one door. With no structural directive, detect drift first. With a directive already
in hand, skip detection and apply that decision. Either path ends in `/specify` (`kind: refactor`),
a human check, and `/ship-spec`.

Run every skill in its own fresh subagent, in a new working session, passing it as context the
state you want it to start from.

## Entry: no directive — detect, then fix

Document an existing codebase from top to bottom to find architecture drift.

Run `/explore` to set the project up and map its containers. Then run `/extract` once per
container, documenting them one at a time, comparing the current state with the expected state
and taking into account previous contradictions and observed failures.

As a result, generate `arch/drift.report.md`. Choose together with the human the most important
defect to refactor. For that item, call `/specify` with `kind: refactor`, ask the human to check
the result, then call `/ship-spec`. Mark the outcome in the report and propose the next defect.

```mermaid
%%{init: {"flowchart": {"curve": "linear", "rankSpacing": 48, "nodeSpacing": 28}}}%%
flowchart TD
  classDef nd fill:#f8fafc,stroke:#00c4cc,color:#457b9d
  classDef hum fill:#fef9c3,stroke:#ca8a04,color:#713f12
  classDef start fill:#ccfbf1,stroke:#0f766e,color:#134e4a,stroke-width:2px
  classDef end fill:#e0e7ff,stroke:#4338ca,color:#312e81,stroke-width:2px

  S([start · no directive]):::start --> EXP["/explore"]:::nd --> EXT["/extract × container<br/>vs expected · prior failures"]:::nd --> RPT["arch/drift.report.md"]:::nd

  RPT --> PICK{"pick top defect"}:::hum
  PICK --> SPEC["/specify · kind: refactor"]:::nd --> CHK{"human validates"}:::hum
  CHK -->|ok| SHIP["/ship-spec"]:::nd --> MARK["mark result in report"]:::nd --> NEXT{"more defects?"}:::hum
  NEXT -->|done| E([done]):::end

  CHK -.->|revise| SPEC
  NEXT -.->|yes| PICK
```

## Entry: directive given — apply it

When the human already holds a single structural directive, skip explore, extract, and the drift
report. Call `/specify` with `kind: refactor` from that directive, ask the human to check the
result, then call `/ship-spec`.

```mermaid
%%{init: {"flowchart": {"curve": "linear", "rankSpacing": 48, "nodeSpacing": 28}}}%%
flowchart TD
  classDef nd fill:#f8fafc,stroke:#00c4cc,color:#457b9d
  classDef hum fill:#fef9c3,stroke:#ca8a04,color:#713f12
  classDef start fill:#ccfbf1,stroke:#0f766e,color:#134e4a,stroke-width:2px
  classDef end fill:#e0e7ff,stroke:#4338ca,color:#312e81,stroke-width:2px

  S([start · directive]):::start --> SPEC["/specify · kind: refactor"]:::nd --> CHK{"human validates"}:::hum
  CHK -->|ok| SHIP["/ship-spec"]:::nd --> E([released]):::end

  CHK -.->|revise| SPEC
```
