---
name: ship-implementation
description: Prove functionality and quality to deliver one spec implementation.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: false
---
# ship-implementation

Prove functionality and quality to deliver one spec implementation.

Execute the `verify` skill to exercise the E2E tests and verify the acceptance criteria.

If the resulting verification report is `green` proceed to the `qualify` skill.

If the qualification report is `green` or `amber`, proceed to exeute the `shipify` skill and return the result as a success.

If either report is `red`, return a summary and suggest to run the `implement-spec` skill to fix the issue if the revision count is below 3. Otherwise, return a summary and suggest to hand off to human review.
