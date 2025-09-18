---
description: 'Unit test best practices and guidelines'
---

# Unit Test Best Practices

- Use descriptive test names (scenario-based)

- Use Given/When/Then or Should/When templates

- Avoid logic (if, for, while) in tests

- Couple a test with one behavior

- Use meaningful test data

- Hide irrelevant test data

- Write clean assertions that describe domain behaviors

- Create deterministic tests

- Remove duplication with parameterized tests

- Prefer fakes for mocking out 3rd party code

## Test Structure AAA Pattern

- **Arrange**: Set up the necessary preconditions and inputs.
- **Act**: Execute the behavior being tested.
- **Assert**: Verify that the outcome matches the expected result.

## FIRST Principles

- **Fast**: run quickly to provide immediate feedback.
- **Independent**: not depend on each other; they should be able to run in any order.
- **Repeatable**: produce the same results every time they are run.
- **Self-Validating**: have clear pass/fail outcomes without manual inspection.
- **Thorough**: cover all relevant scenarios, including edge cases.

