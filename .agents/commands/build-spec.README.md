# build-spec

Take one spec all the way from capture to a shipped release. It is the only cycle, and it has two
entry doors: `/specify` when you bring a functional requirement, and `/refactor` when you want a
container audited and its accumulated debt paid off.

Through the functional door, `/specify` captures or amends the spec. Through the technical one a
green baseline comes first — `/verify` confirms it, and a red suite stops the run, because
refactoring needs passing tests to lean on — and then `/refactor` audits one container and captures
what it finds as a non-functional spec; if the container is healthy it writes nothing and stops there.

From that point the path is the same for both, and the spec's `kind` is the only thing that modulates
it. `/planify` breaks it into one plan per container — plus an e2e plan only when it is functional,
since non-functional work preserves behavior and leans on the existing suite. `/codify` writes the
code, one run per plan. `/verify` runs the suite: any `functional` or `test` defect loops back through
`/codify` until it is green. Then `/review` gates the result, and that is the other difference: on a
non-functional spec it is also the acceptance oracle, judging every criterion by the gate it names and
marking it in the spec.

At last it runs `/release` to ship it.

Every skill runs in its own fresh subagent, each told to stop after its commit so no run bleeds into
the next.

It stops and hands back to you when a change needs your judgment — a defect triaged as structural, or
a finding that has to travel through `/specify` or `/planify`.
