# Testing Conventions — {Product_Name}

## Summary

{One paragraph: test frameworks per tier, overall testing strategy, what is and isn't tested.}

{Repeat one section per tier that has tests.}

## {Tier_Name}

### Infrastructure

- **Framework**: {Test framework + version}
- **Runner**: {Test runner or command}
- **Config**: {Config file path if relevant}

### Placement and Naming

- **Placement**: {Colocated with source / separate test folder / mirrored structure}
- **File naming**: `{pattern}` (e.g. `*.spec.ts`, `*Test.java`)
- **Test naming**: {describe/it style, @Test method naming, language used}

### Setup

- {Test setup pattern: TestBed, MockMvc standalone, @SpringBootTest, beforeEach, fixtures, etc.}

### Mocking

- {What is mocked and how: HttpTestingController, Mockito, jest.mock, service stubs, etc.}
- {What is NOT mocked: real implementations used in tests.}

### Canonical Example

(from `{test_file_name}`):
```{language}
{Real test snippet — one representative test that shows setup + act + assert. 15-30 lines.}
```

### Coverage by Artifact Role

- **{role}**: {Yes/No} — {Happy path / + edge cases / + error cases}
- **{role}**: {Yes/No} — {Description of what is tested}

{End of repeated section.}

## E2E (if applicable)

- **Framework**: {e.g. Playwright, Cypress}
- **Location**: `{e2e_folder}/`
- **Scope**: {What E2E tests cover vs unit tests}

## What NOT to Test

- {Patterns explicitly NOT tested in this codebase and why, e.g. "Repositories are not unit-tested — they are trivial in-memory maps."}
