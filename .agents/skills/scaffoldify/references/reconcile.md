# Reconcile

Each archetype is self-sufficient: own `README.md`, package manifest, lockfile, git hooks config, `.env.example`. Archetypes are domain-agnostic and agent-agnostic. Apply the toolchain detected for that piece.

Typical fixes:

- **Meta files** — one `LICENSE` and one `.gitignore` at root (merge subfolder ignores if they differ); delete duplicates inside `back/`, `front/`, `e2e/`. Keep each piece's `README.md`.
- **Root README** — a minimal file stating the scaffolded combination and pointing to each piece's README.
- **Ports and env** — create each piece's `.env` from its `.env.example`. Point the front's API URL at the back's actual port; make sure nothing collides.
- **E2E wiring** — configure the e2e `webServer` (or equivalent) to launch both back and front with their real commands, and point `baseURL` at the front's actual port.
- **Git hooks** — subfolder hook configs will not fire from the monorepo root. Install hooks per subfolder or note a pending decision in the report. Do not silently drop hooks.
- **Runtime** — if pieces pin different runtime versions, align to the highest and note it.

Fix what is unambiguous. Anything that needs a preference goes to the report, not to a guess.

## Tracer bullet

Run each piece's install command, then the e2e test command — both taken from the piece itself. The e2e smoke test must launch back and front and verify the health endpoint end to end. If it fails, diagnose, fix if within scope, and re-run; if it still fails, record the exact error in the report.
