---
description: "Write code for a feature implementation"
---

# Feature Code Generation

Write code for the feature: ${input:featureId}

## Context

- [{featureId}.design.md](/docs/feats/{featureId}.design.md)
- [{featureId}.tasks.md](/docs/feats/{featureId}.tasks.md)
- [Architecture Instructions](/.github/instructions/architecture.instructions.md)
- [STRUCTURE.md](/docs/STRUCTURE.md) (if exists)
- [frm-{framework} Instructions](/.github/instructions/frm-{framework}.instructions.md) for any specific framework involved
- [lng-{language} Instructions](/.github/instructions/lng-{language}.instructions.md) for any specific language involved

- If there is no specific language instructions use the #fetch tool to search for recent instructions and best practices at https://github.com/github/awesome-copilot
  
## Workflow

- [ ] Create a new git branch named `feat/{featureId}` and switch to it.
- [ ] Read the [{featureId}.design.md](/docs/feats/{featureId}.design.md) document.
- [ ] Read the tasks in the [{featureId}.tasks.md](/docs/feats/{featureId}.tasks.md) document.
- [ ] Execute the tasks in the order they are listed.
- [ ] Mark each task as complete by updating the status in the [{featureId}.tasks.md](/docs/feats/{featureId}.tasks.md) document.
- [ ] **Smoke Test**: The code builds and runs successfully.
- [ ] Update the [BACKLOG.md](/docs/BACKLOG.md) with the status 🟢 CODED.
- [ ] Run [/git-commit](/.github/prompts/git-commit.prompt.md) with feat type message

## Validation

- [ ] [BACKLOG.md](/docs/BACKLOG.md) is updated with the feature implementation tasks link and status
