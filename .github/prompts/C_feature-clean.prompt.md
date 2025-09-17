---
description: 'Clean a feature implementation'
---

# Feature Clean 

Refactor latest changes for the feature: ${input:featureId} in order to make the code more maintainable and easier to understand.

## Context

- [{featureId}.spec.md](/docs/specs/{featureId}.spec.md)
- [Architecture Instructions](../instructions/bst_architecture.instructions.md)
- [STRUCTURE.md](/docs/STRUCTURE.md) 
- [frm-{framework} Instructions](../instructions/frm_{framework}.instructions.md) for any specific framework involved
- [lng-{language} Instructions](../instructions/lng_{language}.instructions.md) for any specific language involved
- [Clean Code Instructions](../instructions/bst_clean-code.instructions.md) for best practices in writing clean code
- Follow the [Object Calisthenics standard](../instructions/std_object-calisthenics.instructions.md)


## Workflow

- [ ] Use the #runCommands tool run any linter or formatter to clean the code.

- [ ] Use the #getTerminalOutput tool to check the output of the linter or formatter and fix any issues.

- [ ] Read the code related to the feature in the [{featureId}.spec.md](/docs/specs/{featureId}.spec.md) document.

- [ ] Look for any code smells or anti-patterns in the code and fix them.

- [ ] Look for duplicated or easy to abstract code and refactor it.

- [ ] Look for any code that can be simplified or made more readable and refactor it

- [ ] **Run the Test**: Run the tests to ensure they pass.

- [ ] Add documentation comments to any public or exported functions, classes, or modules in the feature codebase.

- [ ] Update or create the [docs/STRUCTURE.md](/docs/STRUCTURE.md) file to include the new feature following the [tpl_docs-STRUCTURE](../instructions/tpl_docs-STRUCTURE.instructions.md) instructions.

- [ ] Update the [BACKLOG.md](/docs/BACKLOG.md) with:
  - [ ] change or keep the status to ✔️ CLEANED

- [ ] Commit changes by running [/U_git-commit](U_git-commit.prompt.md) with docs type message and closing the feature.

- [ ] Merge the branch named `feat/{featureId}` to `main` and switch to it.

## Validation

- [ ] [BACKLOG.md](/docs/BACKLOG.md) is updated with the feature status
