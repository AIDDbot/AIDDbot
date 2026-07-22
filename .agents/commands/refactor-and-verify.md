# refactor-and-verify

Report and apply clarity-only refactors per container, then verify the suite still passes.
Use it when the code works but has accumulated complexity and you want a focused,
behavior-preserving refactor pass gated by e2e.

- _ensure_ the working tree is on branch `refactor/simplify` (create from the default branch if needed).
- _read_ the software containers from [system architecture](docs/arch/system.arch.md).
- _for-each_ software container (`back`, `front`), then `e2e` last:
  - _run_ `/refactor` in a fresh subagent scoped to that container's folder.
  - _tell_ it this repo is TypeScript — Express back, framework-free HTML/CSS/TS front, Playwright e2e; ignore Python or React patterns.
  - _tell_ it to stop after its commit with no handoff.
  - _if_ its report lists opportunities:
    - _run_ `/codify` in a fresh subagent to apply the report.
    - _tell_ it to stay on `refactor/simplify`, preserve behavior, and follow `AGENTS.md`.
    - _tell_ it to stop after its commit with no handoff.
- _run_ `/verify` in a fresh subagent to confirm the e2e suite still passes.
- _if_ the suite is red:
  - _for-each_ failing area, _run_ `/codify` in a fresh subagent to fix it.
  - _run_ `/verify` again in a new subagent.
  - _repeat_ until green.
- _reply_ a short summary and _suggest_ `/release`.
