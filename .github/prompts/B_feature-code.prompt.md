---
description: 'Implement a feature following its specification.'
---

# Feature Code Generation

Write code for the feature: ${input:featureId} following the specified tasks.

## Context

- If No [STRUCTURE.md](/docs/STRUCTURE.md) file exists:
  - [ ] Run the [/A_docs-brownfield](A_docs-brownfield.prompt.md) prompt to get the latest structure instructions.

- If there is no specific tech instructions:
   - [ ] run the [/U_aiddbot-instructions-update](U_aiddbot-instructions-update.prompt.md) prompt to get instructions for it.

- [{featureId}.spec.md](/docs/specs/{featureId}.spec.md)
- [STRUCTURE.md](/docs/STRUCTURE.md)
- [Architecture Instructions](../instructions/bst_architecture.instructions.md)
- [Database Instructions](../instructions/bst_database.instructions.md) (if applicable)
- [Clean Code Instructions](../instructions/bst_clean-code.instructions.md)
- [lng-{language} Instructions](../instructions/lng_{language}.instructions.md) for any specific language involved
- [frm-{framework} Instructions](../instructions/frm_{framework}.instructions.md) for any specific framework involved
- [lib-{library} Instructions](../instructions/lib_{library}.instructions.md) for any specific library involved
- [tol-{tool} Instructions](../instructions/tol_{tool}.instructions.md) for any specific tool involved

  
## Workflow


- [ ] Create a new git branch named `feat/{featureId}` and switch to it.

- [ ] Read and follow the [{featureId}.spec.md](/docs/specs/{featureId}.spec.md) document.

- [ ] #think and plan in a list of tasks for the implementation before writing any code. Focus only on coding tasks (no deployment, no testing, no documentation, etc.)

- [ ] Execute the tasks in the order they are listed.

- CHOOSE THE SIMPLEST APPROACH FOR EACH TASK.
- DO NOT INCLUDE TESTING NOR DOCUMENTATION TASKS AT THIS STAGE.

- [ ] **Smoke Test**: The code builds and runs successfully. Do not run tests or lint the code at this stage.

- [ ] Update the [BACKLOG.md](/docs/BACKLOG.md) with:
  - [ ] change or keep the status to ✨ CODED
  - [ ] review dependent Blocked features, change to ⏳ PENDING if necessary

- [ ] Commit changes by running [/U_git-commit](U_git-commit.prompt.md) with a feat type message.

## Validation

- [ ] [BACKLOG.md](/docs/BACKLOG.md) is updated with the feature implementation tasks link and status

> End of Feature Code Generation prompt.