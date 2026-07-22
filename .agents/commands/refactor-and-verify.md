# refactor-and-verify

Audit the whole app for accumulated decay, apply the behavior-preserving fixes, verify, and
surface the findings that need a plan or a spec. Use it periodically — every few specs or at a
release train — to catch cross-cutting issues no single spec's review can see.

- _ensure_ the working tree is on branch `refactor/audit` (create from the default branch if needed).
- _run_ `/verify` in a fresh subagent to confirm a green baseline; _if_ red, _stop_ — refactoring needs green tests to start.
- _run_ `/refactor` in a fresh subagent scoped to the whole app.
- _tell_ it this repo is TypeScript — Express back, framework-free HTML/CSS/TS front, Playwright e2e; ignore Python or React patterns.
- _tell_ it to stop after its commit with no handoff.
- _if_ the report has `structural` or `behavioral` findings, _surface_ them to the human — they re-enter through `/planify` or `/specify`, not here.
- _if_ the report has `/codify` findings:
  - _run_ `/codify` in a fresh subagent to apply them.
  - _tell_ it to stay on `refactor/audit`, preserve behavior, and follow `AGENTS.md`.
  - _tell_ it to stop after its commit with no handoff.
  - _run_ `/verify` in a fresh subagent to confirm the suite still passes.
  - _if_ red:
    - _run_ `/codify` in a fresh subagent to fix the failures.
    - _run_ `/verify` again in a new subagent.
    - _repeat_ until green.
- _reply_ a summary — applied via `/codify` vs. routed to `/planify`/`/specify` — and _suggest_ `/release`.
