---
name: build-spec
description: Take an existing spec from planning through to release.
---
# build-spec

Take a specification all the way to release. You neither write it nor argue it: you are given its
key, you read it, and you put it through the process.

Run every skill in its own fresh subagent, in a new working session, passing it as context the
state you want it to start from.

Start by calling `/planify`, once per affected container — the spec's solution overview lists them
— plus one more run for `e2e` when the change reaches the acceptance tests.

Call `/codify` to write the code of each plan: the production containers first, and the e2e suite
last if there is one.

If there are tests, run them with `/verify` and wait for its report: the defects, or a green
verdict. If there are defects, go back to `/codify` with the report in hand.

Once the functional side is green, call `/qualify` to grade the quality of the code. If a gate
fails, go back to `/codify` and repeat the whole functional verification until everything is green
again.

When the code has passed both the functional verification and the quality review, call `/release`
to publish the specification.
