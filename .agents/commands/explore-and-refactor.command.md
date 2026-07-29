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