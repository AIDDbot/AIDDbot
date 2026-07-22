# refactor-and-verify

Audit the whole app for accumulated decay, apply the behavior-preserving fixes, verify, and
surface what needs a plan or a spec. Use it periodically — every few specs or at a release
train — to catch cross-cutting issues no single spec's review can see.

It works on a dedicated `refactor/audit` branch and only starts from green: first `/verify`
confirms the baseline, and a red suite stops it — refactoring needs passing tests to lean on.
Then `/refactor` audits the whole app, following the project's own agent-rules file and container
rules for the stack, and writes one triaged report.

The behavior-preserving findings routed to `/codify` are applied on the same branch, then
`/verify` re-runs to confirm the suite still passes — looping through `/codify` if anything went
red. The findings that would change behavior or move contracts are not applied here: they are
handed back to you, to re-enter the pipeline through `/specify` or `/planify`.

Every skill runs in its own fresh subagent, each told to stop after its commit so no run bleeds
into the next. It finishes with a summary — what was applied versus what was routed — and points
you to `/release`.
