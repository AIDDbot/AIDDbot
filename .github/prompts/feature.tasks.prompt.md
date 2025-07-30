---
description: 'Write Feature Implementation Tasks'
---

# Feature Implementation Tasks

Write detailed tasks for implementing the feature: ${input:featureId}

## Context

- [PRD.md](/docs/PRD.md) 
- [DOMAIN.md](/docs/DOMAIN.md) 
- [SYSTEMS.md](/docs/SYSTEMS.md) 
- [{featureId}.spec.md](/docs/{featureId}.spec.md)
- [Architecture Instructions](/.github/instructions/architecture.instructions.md) 
- [Structure Instructions](/.github/instructions/structure.instructions.md)
- [STRUCTURE.md](/docs/STRUCTURE.md) (if exists)
- [frm-{framework} Instructions](/.github/instructions/frm-{framework}.instructions.md) for any specific framework involved

- If there is no specific framework instructions use the #fetch tool to search for recent instructions and best practices at https://github.com/github/awesome-copilot

## Workflow

- [ ] Use checkbox format: \`- [ ] Task number. Task description\`
- [ ] Include implementation details as bullet points
- [ ] Reference requirements using: \`_Requirements: X.Y, Z.A_\`
- [ ] Reference existing code to leverage using: \`_Leverage: path/to/file_\`
- [ ] Focus only on coding tasks (no deployment, no testing, no documentation, etc.)

- [ ] Read and follow the [#feature.tasks](/.github/instructions/feature.tasks.instructions.md) instructions.
- [ ] Fill in the placeholders with relevant information about the project.
- [ ] Write the feature implementation tasks in Markdown format at `/docs/{featureId}.tasks.md`.
- [ ] Update the [BACKLOG.md](/docs/BACKLOG.md) with the feature implementation tasks link and status 🟡 DESIGNED.

## Validation

- [ ] [{featureId}.tasks.md](/docs/{featureId}.tasks.md) exists
- [ ] [BACKLOG.md](/docs/BACKLOG.md) is updated with the feature implementation tasks link and status
- [ ] Run [/git-commit](/.github/prompts/git-commit.prompt.md)