---
name: spec-feature
description: Capture or amend a functional spec, get it validated, then take it to release.
---
# spec-feature

Settle a functional specification from the inputs you are given — a new one, or an amend to one
that already exists. You do not decide which: `/specify` does.

Call `/specify` to write it, then ask the human to check the result before going any further.

Once they have validated it, call `/build-spec` to take the specification through to release.

```mermaid
%%{init: {"flowchart": {"curve": "linear", "rankSpacing": 48, "nodeSpacing": 28}}}%%
flowchart TD
  classDef nd fill:#f8fafc,stroke:#00c4cc,color:#457b9d
  classDef hum fill:#fef9c3,stroke:#ca8a04,color:#713f12
  classDef start fill:#ccfbf1,stroke:#0f766e,color:#134e4a,stroke-width:2px
  classDef end fill:#e0e7ff,stroke:#4338ca,color:#312e81,stroke-width:2px

  S([start]):::start --> SPEC["/specify · create or amend"]:::nd --> CHK{"human validates"}:::hum
  CHK -->|ok| BLD["/build-spec"]:::nd --> E([released]):::end

  CHK -.->|revise| SPEC
```
