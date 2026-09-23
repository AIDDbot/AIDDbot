# All-to-skills verification

Executed 2026-09-03 after the atomic migration.

## Structural and distribution checks

- `npm test` passes. It validates 23 canonical skills: 6 orchestrators, 7
  workers, and 10 primitives; every skill has valid flat classification,
  invocation policy, canonical composition links, and a Claude pointer.
- The test installs the overlay into a clean temporary fixture. Its first pass
  creates 110 files with zero collisions; the immediate `--check` equivalent
  finds 110 byte-identical files and zero writes. The fixture is removed.
- The retired source and adapter paths are absent:
  `.agents/commands/`, `.claude/commands/`, `.cursor/commands/`, and
  `.github/prompts/`. No `.vscode/settings.json` exists.
- `git diff --check` is clean. The managed Codex hook still contains all six
  lifecycle events.

## Harness checks

| Harness | Result |
| --- | --- |
| Codex CLI 0.153.0 | Passed. It discovered all 23 canonical skills. An explicit `$deliver-change` invocation was rejected because the worker has `user-invocable: false` and `disable-model-invocation: true`. Session-start, prompt-submit, and stop audit events were observed. |
| Cursor 3.18.25 | Static layout passed. Its documented `.agents/skills/` discovery is used. Its installed desktop CLI does not expose a non-interactive skills-picker assertion, and the published Cursor skill schema omits `user-invocable`; worker-picker visibility therefore needs an interactive release check. |
| Claude Code | Not installed in this environment. The generated `.claude/skills/` pointers and their frontmatter passed structural validation; run `claude plugin validate .claude/skills` on Claude Code 2.1.233 or later before release. |
| GitHub Copilot in VS Code | The VS Code binary is installed but no Copilot extension is present. The project has no generated prompt or settings adapter; use the documented direct `.agents/skills/` discovery when the extension is installed. |

No complete delivery workflow was run against the fixture: such a run requires a
real requirement, specification scope, and authorized branch/release effects.
The migration preserves that workflow contract in the converted orchestrator
and worker skills; the static and Codex tests prove their graph and invocation
policy without inventing product work.
