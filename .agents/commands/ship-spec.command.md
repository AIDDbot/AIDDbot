---
name: ship-spec
description: Take an existing validated spec from planning through to release.
---
# ship-spec

Shared workflows used by Builder and Craftsman — ships an already-validated specification.

Take a specification all the way to release without changing its content.

Start by calling `/planify` skill, once per affected container plus one more run for `e2e` suite.

Call the `/codify` skill to write the code of each plan.

Then call the `/verify` skill to run the e2e and acceptance tests.
If there are defects, go back to `/codify` with the report in hand.

Once the tests are green, call `/qualify` skill to grade the quality of the code. 
If a gate fails, go back to `/codify` with the report in hand.

Run every skill in its own fresh subagent, passing them the context needed to start from.

After code has been verified and qualified, call `/release` skill to publish the specification.

```mermaid
%%{init: {"flowchart": {"curve": "linear", "rankSpacing": 48, "nodeSpacing": 28}}}%%
flowchart LR
  classDef start fill:#ccfbf1,stroke:#0f766e,color:#134e4a,stroke-width:2px
  classDef nd fill:#f8fafc,stroke:#00c4cc,color:#457b9d
  classDef loop fill:#fefce8,stroke:#ca8a04,color:#854d0e
  classDef end fill:#e0e7ff,stroke:#4338ca,color:#312e81,stroke-width:2px

  START([/ship-spec]):::start
  PLAN["/planify"]:::nd
  CODE["/codify"]:::nd
  VER{"/verify"}:::loop
  QLF{"/qualify"}:::loop
  REL["/release"]:::nd
  END([released]):::end

  START --> PLAN
  PLAN --> CODE
  CODE --> VER
  VER -->|green ✓| QLF
  QLF -->|all pass ✓| REL
  REL --> END
```
