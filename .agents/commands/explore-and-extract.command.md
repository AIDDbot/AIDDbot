---
name: explore-and-extract
description: Document an existing codebase top to bottom — /explore once, then /extract per container.
---
# explore-and-extract

Document an existing codebase from top to bottom.

Run every skill in its own fresh subagent, in a new working session, passing it as context the
state you want it to start from.

First run `/explore` to set the project up and map its containers. Then run `/extract` once per
container, documenting them one at a time.

The result is the codebase documentation, created or brought up to date.

```mermaid
%%{init: {"flowchart": {"curve": "linear", "rankSpacing": 48, "nodeSpacing": 28}}}%%
flowchart TD
  classDef nd fill:#f8fafc,stroke:#00c4cc,color:#457b9d
  classDef start fill:#ccfbf1,stroke:#0f766e,color:#134e4a,stroke-width:2px
  classDef end fill:#e0e7ff,stroke:#4338ca,color:#312e81,stroke-width:2px

  S([start]):::start --> EXP["/explore"]:::nd --> EXT["/extract × container"]:::nd --> E([arch docs ready]):::end
```
