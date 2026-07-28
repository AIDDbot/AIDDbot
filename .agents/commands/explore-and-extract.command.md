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
