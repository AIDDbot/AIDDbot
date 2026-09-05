# Technical kind

This is not a product feature. It starts a development process complex enough to need plans, implementation, and review — architecture, tooling, boilerplate, a structural change.

There is no functional e2e: criteria are technical properties of the destination, not user-facing scenarios. Do not write an e2e scenario plan. Give each active criterion its own verification method and expected evidence; `/qualify` performs that check and records the result. A green regression suite alone never proves a technical criterion.

The PRD is untouched — you do not change what the product does, so you never index this spec there.

On amend, move retired criteria to `Deprecated criteria` without renumbering or reusing their IDs.

If the point of the work is what the user gets, it is `functional`: put that under `Out of scope` and tell the human.
