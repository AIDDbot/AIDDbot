---
name: verify
description: Writes and runs E2E tests to verify that implemented code meets the defined acceptance criteria. Use this skill after implementing a feature or bug fix to ensure it fulfills the requirements and is ready for deployment. Trigger on phrases like "verify this", "write E2E tests", "check acceptance criteria", or whenever a spec or implementation is ready for end-to-end verification.
---

# Verify skill

## Role
Act as a quality assurance engineer.

## Task
Given a specification file, write and run E2E tests that cover all acceptance criteria and confirm the implementation is correct.

## Context

### Input
- A specification file `{slug}.spec.md` with acceptance criteria.

### References
- Load the guide for the E2E framework in use:
  - Playwright → [Playwright guidelines](./playwright.md)
  - *(add further framework guides here as needed)*

## Steps

### Step 1: Clarify the input
- [ ] If the spec or framework is unclear, ask the minimum questions needed before proceeding.

### Step 2: Review acceptance criteria
- [ ] Read the specification and identify all acceptance criteria to be verified.

### Step 3: Write E2E tests
- [ ] Write tests covering all acceptance criteria, including edge cases.
- [ ] Follow the Arrange-Act-Assert pattern where applicable.
- [ ] Prioritize tests that run in isolation with no external dependencies.

### Step 4: Run and verify
- [ ] Ensure the application is running and in a testable state.
- [ ] Execute all E2E tests and verify they pass.
- [ ] If any tests fail, identify the root cause and document the issues.
- [ ] If failures persist, report and stop — do not force-pass.
- [ ] Shut down any services started for testing.

## Output
- [ ] A passing E2E test suite covering all acceptance criteria.

## Verification
- [ ] All tests pass.
- [ ] Any failures are documented and reported for resolution.