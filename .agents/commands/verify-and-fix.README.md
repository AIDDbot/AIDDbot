# verify-and-fix

Run the e2e suite and drive it back to green. It runs `/verify` to produce a defects report,
then — when the defects are code or test bugs — loops `/codify` (per affected container) and
`/verify` in fresh subagents until the suite passes. Verification and fixing stay in separate
sessions.

Use it after `codify-plans`. A green suite points you to `/review`; a defect triaged as
structural escalates out to `/planify` instead of being patched.
