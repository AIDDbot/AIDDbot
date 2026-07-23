# build-feature

Take one feature all the way from a spec to a shipped release. Use it to build or amend a feature in one go.

First it runs `/specify` to capture or amend the spec, then `/planify` to break that spec into one plan per container plus an e2e plan.
Next it runs `/codify` once per plan to write the code — the software containers first, the e2e suite last.
Then `/verify` runs the suite; any failing `functional` or `test` findings loop back through `/codify` until it's green.
Then `/review` gates the result, if there are any failed review gates, it runs `/codify` again to fix the reported minor defects.

At last it runs `/release` to ship it.

Every skill runs in its own fresh subagent, each told to stop after its commit so no run bleeds into the next.

It stops and hands back to you when a change needs your judgment — a defect triaged as structural, or a review finding that has to travel through `/specify` or `/planify`.
