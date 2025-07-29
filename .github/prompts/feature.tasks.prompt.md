---
description: Feature Implementation Tasks
---

# Feature Implementation Tasks

Write detailed tasks for implementing the feature: ${input:featureId}

## Context

- Read the feature specifications from the [{featureId}.spec.md](/docs/{featureId}.spec.md) document.

- Read the feature design from the [{featureId}.design.md](/docs/{featureId}.design.md) document.

- Read instructions

## Workflow

- Use checkbox format: \`- [ ] Task number. Task description\`
- Include implementation details as bullet points
- Reference requirements using: \`_Requirements: X.Y, Z.A_\`
- Reference existing code to leverage using: \`_Leverage: path/to/file.ts, path/to/component.tsx_\`
- Focus only on coding tasks (no deployment, user testing, etc.)
- [ ] Read and follow the [#feature.tasks](/.github/instructions/feature.tasks.instructions.md) instructions.
- [ ] Fill in the placeholders with relevant information about the project.
- [ ] Write the feature implementation tasks in Markdown format at `/docs/{featureId}.tasks.md`.
- [ ] Update the [BACKLOG.md](/docs/BACKLOG.md) with the feature implementation tasks link and status 🟡 IN PROGRESS.

## Validation

- [ ] [{featureId}.tasks.md](/docs/{featureId}.tasks.md) exists
- [ ] [BACKLOG.md](/docs/BACKLOG.md) is updated with the feature implementation tasks link and status
- [ ] Run [/git-commit](/.github/prompts/git-commit.prompt.md)