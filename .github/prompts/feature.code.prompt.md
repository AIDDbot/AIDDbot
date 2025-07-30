---
description: 'Write code for a feature implementation'
---

# Feature Code Generation

Write code for the feature: ${input:featureId}

## Context

- [PRD.md](/docs/PRD.md) 
- [DOMAIN.md](/docs/DOMAIN.md) 
- [SYSTEMS.md](/docs/SYSTEMS.md) 
- [{featureId}.spec.md](/docs/{featureId}.spec.md)
- [Architecture Instructions](/.github/instructions/architecture.instructions.md) 
- [STRUCTURE.md](/docs/STRUCTURE.md) (if exists)
- [frm-{framework} Instructions](/.github/instructions/frm-{framework}.instructions.md) for any specific framework involved
- [lng-{language} Instructions](/.github/instructions/lng-{language}.instructions.md) for any specific language involved

- If there is no specific language instructions use the #fetch tool to search for recent instructions and best practices at https://github.com/github/awesome-copilot

## Workflow

- [ ] Read the tasks in the [{featureId}.tasks.md](/docs/{featureId}.tasks.md) document.
- [ ] Execute the tasks in the order they are listed.
- [ ] Mark each task as complete by updating the status in the [{featureId}.tasks.md](/docs/{featureId}.tasks.md) document.
- [ ] Update the [BACKLOG.md](/docs/BACKLOG.md) with the status 🟢 CODED.

## Validation

- [ ] **Smoke Test**: The code builds and runs successfully.
- [ ] [BACKLOG.md](/docs/BACKLOG.md) is updated with the feature implementation tasks link and status
- [ ] Run [/git-commit](/.github/prompts/git-commit.prompt.md)