---
description: "Write documentation for a feature implementation"
---

# Feature Documentation

Write documentation for the feature: ${input:featureId}

## Context

- [{featureId}.design.md](/docs/feats/{featureId}.design.md)
- [Architecture Instructions](/.github/instructions/architecture.instructions.md)
- [STRUCTURE.md](/docs/STRUCTURE.md) (if exists)

## Workflow

- [ ] Add documentation comments to any public or exported functions, classes, or modules in the feature codebase.

- [ ] Update or create the [docs/STRUCTURE.md](/docs/STRUCTURE.md) file to include the new feature.

- [ ] Update the [BACKLOG.md](/docs/BACKLOG.md) with the feature specification link and status ✔️ RELEASED by running [/backlog-update](/.github/prompts/backlog-update.prompt.md).

- [ ] Commit changes by running [/git-commit](/.github/prompts/git-commit.prompt.md) with docs type message and closing the feature.

## Validation

- [ ] [BACKLOG.md](/docs/BACKLOG.md) is updated with the feature test link and status

> End of Feature Documentation prompt.