---
description: 'Implement a feature following its specification.'
---

# Feature Code Generation

Write code following the specification {specId}.

## Context

Specification document:
- [{specId}.spec.md](/docs/specs/{specId}.spec.md)

Best practice instructions:
- [Architecture Instructions](../instructions/bst_architecture.instructions.md)
- [Database Instructions](../instructions/bst_database.instructions.md) (if applicable)
- [Clean Code Instructions](../instructions/bst_clean-code.instructions.md)

Technical instructions:
- [lng-{language} Instructions](../instructions/lng_{language}.instructions.md) for any specific language involved
- [frm-{framework} Instructions](../instructions/frm_{framework}.instructions.md) for any specific framework involved
- [lib-{library} Instructions](../instructions/lib_{library}.instructions.md) for any specific library involved
- [tol-{tool} Instructions](../instructions/tol_{tool}.instructions.md) for any specific tool involved
  
## Workflow

- [ ] Create a new git branch named `dev/{specId}` and switch to it.

- [ ] #think and plan in a list of tasks for the implementation of [{specId}.spec.md](/docs/specs/{specId}.spec.md) before writing any code. Focus only on coding tasks (no deployment, no testing, no documentation, etc. ONLY WORKING CODE).

- [ ] Execute the tasks in the order they are listed. CHOOSE THE SIMPLEST APPROACH FOR EACH TASK. DO NOT INCLUDE TESTING NOR COMMENTS AT THIS STAGE.

## Validation

- [ ] **Smoke Test**: The code builds and runs successfully. Do not run tests or lint the code at this stage.
  - [ ] If it fails, fix and try again ONE more time.
  - [ ] If the build/run still fails, write a report at `/docs/specs/{specId}.code.fail.md`.

- [ ] Commit changes by running [/U_git-commit](U_git-commit.prompt.md) with a feat type message.

> End of Feature Code Generation prompt.