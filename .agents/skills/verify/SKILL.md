---
name: verify
description: Writes and runs E2E tests to verify that implemented code meets the defined acceptance criteria. Use this skill after implementing a feature to ensure it fulfills the requirements and is ready for deployment. Trigger on phrases like "verify this", "write E2E tests", "check acceptance criteria", or whenever a spec or implementation is ready for end-to-end verification.
---

# Verify skill

## Role
Act as a quality assurance engineer.

## Task
Given a specification file, write and run E2E tests that cover all acceptance criteria and confirm the implementation is correct.

## Context

### Input

- Spec: `{Product_Folder}/specs/{slug}/spec.md`

### Prerequisites
- There is an e2e strategy in the system architecture
- The e2e archetype (language and framework) is already installed and configured

### References
- System architecture at `{Product_Folder}/arch/system.arch.md`
- Rules with E2E codification instructions `{Rules_Folder}/e2e.rules.md`
- Framework guide (e.g. [Playwright](./playwright.md))
- [Verify report template](./verify.template.md)

## Steps

### Step 1: Clarify the input
- [ ] Read the spec to understand the feature and acceptance criteria.
- [ ] Read `AGENTS.md` and system architecture for tech stack and testing framework.
- [ ] If spec or framework is unclear, ask the minimum questions needed.

### Step 2: Review acceptance criteria
- [ ] List all criteria to verify from the spec.
- [ ] Cross-check against the framework guide (e.g. [Playwright](./playwright.md)) when adding or extending tests.

### Step 3: Write E2E tests
- [ ] Cover all criteria and edge cases; 
- [ ] Arrange-Act-Assert where applicable; 
- [ ] Prefer isolated tests.
- [ ] Group tests by feature or page.
- [ ] Use descriptive names for suites and test groups.
- [ ] Write the happy path test.
- [ ] Write the edge cases tests.
- [ ] Write the error cases tests.

### Step 4: Run and verify
- [ ] Set up the test environment.
- [ ] Run the tests and read the results.
- [ ] If tests pass, go to step 5.
- [ ] Fix any error caused by bad test implementation.
- [ ] Never change the application code to make tests pass.
- [ ] If tests keep failing, stop iterating.
- [ ] Tear down the test environment.

### Step 5: Record outcomes
- [ ] In `{Product_Folder}/specs/{slug}/spec.md`, mark each acceptance criterion as `[x]` when its tests pass and leave failed ones as `[ ]`.
- [ ] Write the verification report at `{Product_Folder}/specs/{slug}/verify.md` from [verify.template.md](./verify.template.md): a summary of the run (criteria covered, pass/fail counts, environment/commands).
- [ ] When tests fail, the report's **Rectify guide** lists each failure: failing test name, violated criterion, expected vs actual, suggested fix, and links to evidence (screenshots, traces, tester reports).
- [ ] The report — not the spec — carries the rectify guidance; the spec only reflects the `[x]/[ ]` acceptance state.

## Output
- [ ] E2E test suite executed.
- [ ] Spec acceptance criteria marked `[x]/[ ]`; `verify.md` report written.
- [ ] Keep spec as `in-progress` until all criteria pass.
- [ ] Commit with conventional message (`test`; scope `e2e` or `{slug}`).
- [ ] If there are failures, suggest `/rectify` on `specs/{slug}/`.
- [ ] If all tests pass, suggest `/review` for a11y, security, and performance.

## Verification
- [ ] All tests are executed.
- [ ] Servers or apps are stopped.
