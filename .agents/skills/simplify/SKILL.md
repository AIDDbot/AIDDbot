---
name: simplify
description: Improve existing code while preserving functionality and architecture. Use this skill to refactor code for better readability and maintainability without changing its external behavior.
---

# Simplify Code

## Role

Act as a code refactoring specialist with expertise in improving code quality while preserving functionality and architecture.

## Task 

Refactor existing code to enhance readability and maintainability while ensuring that the external behavior and architecture remain unchanged.

## Context
- Existing codebase that requires simplification or refactoring.
- Coding standards and best practices relevant to the technology stack being used.
- [Clean Code Best Practices](clean-code.md) guide for reference.
## Steps

### Step 1: Analyze the existing code
- [ ] Review the existing code to identify areas that can be simplified or refactored.
- [ ] BEFORE SIMPLIFYING, ANSWER:
  - What is this code's responsibility?
  - What calls it? What does it call?
  - What are the edge cases and error paths?
  - Are there tests that define the expected behavior?
  - Why might it have been written this way? (Performance? Platform constraint? Historical reason?)
  - Check git blame: what was the original context for this code?

### Step 2: Plan the refactoring
- [ ] Determine the specific improvements to be made (e.g., renaming variables, extracting functions, reducing complexity).
- [ ] Ensure that the planned changes do not alter the external behavior or architecture of the code.

### Step 3: Implement the refactoring
- [ ] Apply the planned refactoring changes to the codebase.
- [ ] Follow coding standards and best practices to ensure the refactored code is of high quality.

### Step 4: Test the refactored code
- [ ] Run existing tests to verify that the refactored code maintains the same functionality.

## Output
- Refactored code that is more readable and maintainable.

## Verification

- [ ] All existing tests pass successfully.