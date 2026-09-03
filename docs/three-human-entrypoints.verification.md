# Three human entrypoints verification

## Structural verification

- `npm test` passes with 27 canonical skills: 3 orchestrators, 14 workers, and
  10 public primitives.
- The verifier requires the public orchestrators to be exactly
  `deliver-requirement`, `establish-solution`, and `improve-solution`.
- It asserts the five former orchestrators are workers and verifies a Claude
  pointer for every canonical skill.
- Its clean overlay fixture includes the two new public skills and proves a
  second dry-run overlay has no writes or conflicts.
- `git diff --check` passes.

## Harness scope

Codex, Cursor, and GitHub Copilot in VS Code consume `.agents/skills/`
directly. Claude receives managed pointers for all 27 skills, including the
four new canonical skills. The repository's adapter implementation has no
executable `/adapt` command; the overlay fixture is the repeatable equivalent
of its `--check` contract. Interactive Cursor worker-picker visibility still
requires the release check recorded in the all-to-skills decision.
