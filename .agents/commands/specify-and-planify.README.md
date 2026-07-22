# specify-and-planify

Turn intent into a ready-to-build plan set. It runs `/specify` to capture or amend a one-page
spec, then runs `/planify` to break that spec into one plan per software container plus the
e2e plan. Each skill runs in its own fresh subagent.

Use it to start a new feature or amend an existing one. On an amend, `/planify` always
replans, keeping, redoing, or dropping the prior plans. The plan set it produces feeds
`codify-plans`.
