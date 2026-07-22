# review-and-fix

Gate the scope and fix what fails. It runs `/review` to produce a gate report, then routes on
the outcome: all-green points you to `/release`; failed gates are fixed with `/codify` and
re-confirmed with `/verify`. Each skill runs in its own fresh subagent.

Use it as the last quality step before release. Findings that need a spec or a replan aren't
fixed here — they are surfaced to you and the loop stops, so they can go through `/specify` or
`/planify`.
