---
description: 'Clean a feature implementation'
---

# Feature Clean 

Refactor latest changes for the feature: ${input:featureId} in order to make the code more maintainable and easier to understand.

## Context

- [{featureId}.design.md](/docs/feats/{featureId}.design.md)
- [Architecture Instructions](../instructions/bst_architecture.instructions.md)
- [STRUCTURE.md](/docs/STRUCTURE.md) 
- [frm-{framework} Instructions](../instructions/frm_{framework}.instructions.md) for any specific framework involved
- [lng-{language} Instructions](../instructions/lng_{language}.instructions.md) for any specific language involved
- [Clean Code Instructions](../instructions/bst_clean-code.instructions.md) for best practices in writing clean code
- Follow the [Object Calisthenics standard](../instructions/std_object-calisthenics.instructions.md)


## Workflow

- [ ] Use the #runCommands tool run any linter or formatter to clean the code.

- [ ] Use the #getTerminalOutput tool to check the output of the linter or formatter and fix any issues.

- [ ] Read the code related to the feature in the [{featureId}.design.md](/docs/feats/{featureId}.design.md) document.

- [ ] Look for any code smells or anti-patterns in the code and fix them.

- [ ] Look for duplicated or easy to abstract code and refactor it.

- [ ] Look for any code that can be simplified or made more readable and refactor it

- [ ] **Run the Test**: Run the tests to ensure they pass.

- [ ] Update the [BACKLOG.md](/docs/BACKLOG.md) with:
  - [ ] change or keep the status to ⛲ CLEANED

- [ ] Commit changes by running [/U_git-commit](/.github/prompts/U_git-commit.prompt.md) with refactor type message

## Validation

- [ ] [BACKLOG.md](/docs/BACKLOG.md) is updated with the feature test link and status
