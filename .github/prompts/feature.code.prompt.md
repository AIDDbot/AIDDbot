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
- [lib-{library} Instructions](/.github/instructions/lib-{library}.instructions.md) for any specific library involved
- [pck-{package} Instructions](/.github/instructions/pck-{package}.instructions.md) for any specific package involved

  
## Workflow

- [ ] Create a new git branch named `feat/{featureId}` and switch to it.


- [ ] Read the tasks in the [{featureId}.tasks.md](/docs/feats/{featureId}.tasks.md) document.

- [ ] Execute the tasks in the order they are listed.

- [ ] Mark each task as complete by updating the status in the [{featureId}.tasks.md](/docs/feats/{featureId}.tasks.md) document.

- [ ] **Smoke Test**: The code builds and runs successfully. Do not test or lint the code at this stage.

- [ ] Update the [BACKLOG.md](/docs/BACKLOG.md) with the feature specification link and status ✔️ CODED by running [/backlog-update](/.github/prompts/backlog-update.prompt.md).

- [ ] Commit changes by running [/git-commit](/.github/prompts/git-commit.prompt.md)

## Validation

- [ ] [BACKLOG.md](/docs/BACKLOG.md) is updated with the feature implementation tasks link and status

> End of Feature Code Generation prompt.