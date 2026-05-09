---
name: verify
description: Verify that the implemented code meets the defined specifications and acceptance criteria. Use this skill after implementing a feature or bug fix to ensure it fulfills the requirements and is ready for deployment.
---

# Verify 

## Role
Act as a quality assurance engineer with expertise in verifying that implemented code meets specifications and acceptance criteria.

## Task
Write E2E tests to verify that the implemented code fulfills all specifications and acceptance criteria explicitly outlined in the provided specification file. Ensure that all tests pass successfully.

## Context
- A specification file that defines the problem, solution, and verification criteria for a feature or technical requirement.
- A technology stack that supports E2E testing (e.g., Cypress, Selenium, Playwright).

Read one of the following guides the technology stack being used for E2E testing:
- [Playwright Test Writing Guidelines](playwright.md)

## Steps

### Step 1: Review the specification and acceptance criteria
- [ ] Thoroughly review the specification file to understand the problem, solution, and verification criteria.

### Step 2: Design E2E tests
- [ ] Design E2E tests that cover all acceptance criteria defined in the specification.
- [ ] Ensure tests are comprehensive, covering both typical and edge cases.

### Step 3: Implement E2E tests
- [ ] Write E2E tests using the appropriate testing framework for the technology stack.
- [ ] Write tests that can run in isolation as the highest priority, and do not depend on external factors.
- [ ] Follow the Arrange-Act-Assert pattern to structure tests clearly where applicable.

### Step 4: Run tests and verify results
- [ ] Ensure server or application is running and in a testable state.
- [ ] Execute the E2E tests and verify that all tests pass successfully.
- [ ] If any tests fail, investigate the failures, identify the root cause, and document the issues.
- [ ] If tests keep failing, report and stop the verification process.
- [ ] Close any services or applications that were started for testing.

## Output
- A comprehensive set of E2E tests that cover all acceptance criteria.

## Verification
- [ ] All E2E tests pass successfully.
- [ ] If any tests fail, the issues are documented and reported for resolution.