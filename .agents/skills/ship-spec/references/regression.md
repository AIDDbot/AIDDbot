# Regression triage

Give each failure one cause and one owner in the regression report.

| Cause | Owner | Proposed repair |
| --- | --- | --- |
| The code of the spec breaks shipped behavior | **Builder** | Repair the production code. |
| The test is wrong, not the behavior | **Builder** | Repair the test without weaker assertions. |
| A requirement of this spec contradicts the test of a shipped spec | human | Add `Replaces: {global ID}` to the spec if the human agrees. |
| Only a product decision can tell | human | State the question. |
| The failure existed before the spec, its repair is outside the scope or too big for the spec, or the **Builder** tried once without success | debt | Record a `high` debt item. |
