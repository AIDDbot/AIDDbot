---
name: codify
description: Generate code for a given implementation plan, following the defined steps and tasks for each tier. Use this skill with an implementation plan to create clear and actionable code for its implementation.
---
# Codify skill 

Write code to implement a feature

## Role

Act as a software engineer with expertise in implementing features and bug fixes.

## Task

Implement the feature or bug fix according to the specification and implementation plan. Include unit tests for critical modules.

## Context

- A request made by the user with a concrete requirement.
- A specification file with a feature request or bug to fix.
- A set of implementation plans that break down the steps and tasks required for implementation.

## Steps

### Step 1: Think before coding
- [ ] Reason about the problem and ask to clarify ambiguities.

### Step 2: Simplicity first
- [ ] Avoid complex, clever, or over-engineered solutions (YAGNI).

### Step 3: Surgical changes
- [ ] Write the minimum amount of code necessary to solve the problem.

### Step 4: Goal-driven execution
- [ ] Keep working until verification is complete.
  
## Output

- [ ] Fully functional code that fulfills the criteria.
- [ ] Green unit test for critical modules.

## Verification

- [ ] Code compiles without errors.
- [ ] Unit test passes.
- [ ] Smoke test passes (app or servers start).
- [ ] Acceptance criteria are met.