# build-feature

Take one feature through the whole development pipeline, from spec to release. It chains the
phase commands in order: `specify-and-planify` to write the spec and its plans, `codify-plans`
to implement them, `verify-and-fix` to get the e2e suite green, `review-and-fix` to clear the
quality gates, and finally `/release` to ship. Every skill still runs in its own fresh
subagent.

Use it to build — or amend — a feature end to end in one go. It stops and hands back to you
when a change needs your judgment: a defect triaged as structural, or a review finding that
has to travel through `/specify` or `/planify`.
