# refactor-and-verify

Audit the whole app for accumulated decay, plan the cleanup, apply it, and verify. Use it
periodically — every few specs or at a release train — to catch cross-cutting issues no single
spec's review can see.

It works on a dedicated `refactor/audit` branch and only starts from green: first `/verify`
confirms the baseline, and a red suite stops it — refactoring needs passing tests to lean on.
Then `/refactor` audits the whole app, following the project's own agent-rules file and container
rules for the stack, and writes one triaged report where every finding preserves behavior.

`/planify` turns that report into a cleanup plan per container under `refactors/{slug}/`, then
`/codify` applies each plan on the same branch and `/verify` re-runs to confirm the suite still
passes — looping through `/codify` if anything went red. Anything the audit finds that would change
what a green test asserts is not a refactor: `/refactor` flags it to you as a `/specify` feature,
never applied here.

Every skill runs in its own fresh subagent, each told to stop after its commit so no run bleeds
into the next. It finishes with a summary of the cleanup and points you to `/release`.
