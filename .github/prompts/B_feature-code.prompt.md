---
description: 'Implement a feature following a list of tasks.'
---

# Feature Code Generation

Write code for the feature: ${input:featureId} following the implementation tasks list.

## Context

- [{featureId}.design.md](/docs/backlog/{featureId}.design.md)
- [{featureId}.tasks.md](/docs/backlog/{featureId}.tasks.md)
- [STRUCTURE.md](/docs/STRUCTURE.md)
- [lng-{language} Instructions](../instructions/lng_{language}.instructions.md) for any specific language involved
- [frm-{framework} Instructions](../instructions/frm_{framework}.instructions.md) for any specific framework involved
- [lib-{library} Instructions](../instructions/lib_{library}.instructions.md) for any specific library involved
- [tol-{tool} Instructions](../instructions/tol_{tool}.instructions.md) for any specific tool involved

  
## Workflow

- [ ] Create a new git branch named `feat/{featureId}` and switch to it.

- [ ] Read and follow the [{featureId}.tasks.md](/docs/backlog/{featureId}.tasks.md) tasks document.

- [ ] Execute the tasks in the order they are listed.

- [ ] Mark each task as complete by updating the status in the [{featureId}.tasks.md](/docs/backlog/{featureId}.tasks.md) document.

- [ ] **Smoke Test**: The code builds and runs successfully. Do not run tests or lint the code at this stage.

- [ ] Update the [BACKLOG.md](/docs/BACKLOG.md) with:
  - [ ] change or keep the status to ✨ CODED
  - [ ] review dependent Blocked features, change to ⏳ PENDING if necessary

- [ ] Commit changes by running [/U_git-commit](U_git-commit.prompt.md) with a feat type message.

## Validation

- [ ] [BACKLOG.md](/docs/BACKLOG.md) is updated with the feature implementation tasks link and status

> End of Feature Code Generation prompt.