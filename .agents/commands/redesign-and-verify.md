# redesign-and-verify

Report and apply design-system and accessibility improvements to the frontend, verifying after
they land so a red suite points at the redesign. Use it when the UI works but drifts from the
design system or WCAG and you want a focused, behavior-preserving redesign pass gated by e2e.

- _ensure_ the working tree is on branch `redesign/front` (create from the default branch if needed).
- _run_ `/verify` in a fresh subagent to confirm a green baseline; _if_ red, _stop_ — redesign needs green tests to start.
- _run_ `/redesign` in a fresh subagent scoped to the frontend container's folder.
- _tell_ it this repo is framework-free HTML/CSS/TS front; ignore React or Tailwind patterns.
- _tell_ it to stop after its commit with no handoff.
- _if_ its report lists opportunities:
  - _run_ `/codify` in a fresh subagent to apply the report.
  - _tell_ it to stay on `redesign/front`, preserve functional behavior, and follow `AGENTS.md`.
  - _tell_ it to stop after its commit with no handoff.
  - _run_ `/verify` in a fresh subagent to confirm the e2e suite still passes.
  - _if_ red:
    - _for-each_ failing area, _run_ `/codify` in a fresh subagent to fix it.
    - _run_ `/verify` again in a new subagent.
    - _repeat_ until green.
- _reply_ a short summary and _suggest_ `/release`.
