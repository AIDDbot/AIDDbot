---
name: ship-spec
description: Take an existing validated spec from planning through to release.
---
# ship-spec

Shared workflows used by Builder and Craftsman — ships an already-validated specification.

Take a specification all the way to release without changing its content.

Start by reading and following [`/planify`](../skills/planify/SKILL.md), once per affected container plus one more run for `e2e` suite.

Read and follow [`/codify`](../skills/codify/SKILL.md) to write the code of each plan.

Then read and follow [`/verify`](../skills/verify/SKILL.md) to run the e2e and acceptance tests.
If there are defects, go back to [`/codify`](../skills/codify/SKILL.md) with the report in hand.

Once the tests are green, read and follow [`/qualify`](../skills/qualify/SKILL.md) to grade the quality of the code.
If a gate fails, go back to [`/codify`](../skills/codify/SKILL.md) with the report in hand.

Run every skill in its own fresh subagent, passing them the context needed to start from.

After code has been verified and qualified, read and follow [`/release`](../skills/release/SKILL.md) to publish the specification.

```mermaid
%%{init: {"flowchart": {"curve": "linear", "rankSpacing": 48, "nodeSpacing": 28}}}%%
flowchart LR
  classDef start fill:#ccfbf1,stroke:#0f766e,color:#134e4a,stroke-width:2px
  classDef nd fill:#f8fafc,stroke:#00c4cc,color:#457b9d
  classDef loop fill:#fefce8,stroke:#ca8a04,color:#854d0e
  classDef done fill:#e0e7ff,stroke:#4338ca,color:#312e81,stroke-width:2px

  START([/ship-spec]):::start
  PLAN["/planify"]:::nd
  CODE["/codify"]:::nd
  VER{"/verify"}:::loop
  QLF{"/qualify"}:::loop
  REL["/release"]:::nd
  DONE([released]):::done

  START --> PLAN
  PLAN --> CODE
  CODE --> VER
  VER -->|green ✓| QLF
  QLF -->|all pass ✓| REL
  REL --> DONE
```
