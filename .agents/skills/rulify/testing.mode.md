# Mode: testing

**Output**: `{Product_Folder}/rules/testing.rules.md`
**Template**: `testing.rules.template.md` (in this skill's folder)

## 1. Gather context
- [ ] Read `AGENTS.md` → extract tiers, test frameworks, and test commands.
- [ ] Reference artifact roles from `{Product_Folder}/rules/{tier}.rules.md`. Only re-read these files if running testing mode standalone (skip if tier modes already ran in this session — roles are already in context).
- [ ] For each tier, locate all test files (by convention: `*Test.java`, `*.spec.ts`, `*.test.*`, `tests/`, `__tests__/`).
- [ ] For each tier's test suite, extract patterns:
  - **Test file placement**: colocated vs separate `test/` folder, mirrored structure.
  - **Naming**: file name convention, test/describe/it naming style, language (Spanish/English).
  - **Setup**: test runner config, TestBed/MockMvc/fixtures, before/after hooks.
  - **Mocking strategy**: what is mocked (HTTP, services, repos), how (framework mocks, stubs, spies).
  - **Assertion style**: framework (JUnit assertions, expect, assert), custom matchers.
  - **Coverage**: what artifact roles have tests, what don't. What is the typical test surface per role (happy path only, edge cases, error cases).
- [ ] Identify E2E tests separately if `{Source_Folders}` includes an e2e tier.

## 2. Generate testing.rules.md
- [ ] Read `testing.rules.template.md` from this skill's folder.
- [ ] Fill the template replacing all `{placeholders}` with actual values.
- [ ] For each tier, include one **canonical test example** — a real test file (or excerpt) that best represents the dominant pattern.
- [ ] Document what should and should NOT be tested per artifact role.

## 3. Self-check
- [ ] Re-read the generated file. Verify:
  - (a) No `{placeholder}` text remains.
  - (b) Every canonical test example references a test file that exists in the codebase.
  - (c) File is under 200 lines.

## 4. Confirm
- [ ] Present summary of test patterns found per tier.
- [ ] Flag gaps (artifact roles with no test coverage).
- [ ] Suggest "Conventions are complete" or next missing file.
