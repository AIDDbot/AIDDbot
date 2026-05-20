# Implementation context (brownfield)

For `/planify` and `/codify` when `{Product_Folder}/arch/` or `rules/` exist. Paths and artifact names: project `AGENTS.md` → **AIDD product artifacts**.

## Read order

1. **`arch/system.arch.md`** — system context before choosing tiers (`/planify` only).
2. **`arch/{tier}.arch.md`** — organization, shared zones, constraints for the tier in scope.
3. **`arch/ADR.md`** — past decisions before drafting or changing behavior (`/planify`).
4. **`rules/{tier}.rules.md`** — how to write code in that tier (`/codify`).
5. **`rules/naming.rules.md`** — before creating new files (`/codify`).
6. **`rules/testing.rules.md`** — before unit or E2E tests (`/codify`, `/verify`).

Skip any file that does not exist. Do not duplicate arch content into rules files.

## Apply during coding

- Plans and code must respect ADRs and arch constraints.
- Match artifact roles, naming, and error handling from `{tier}.rules.md`.
- Unit tests follow `testing.rules.md` when present.
