# Three human entrypoints verification

## Structural verification

- `npm test` passes with 25 canonical skills: 3 orchestrators, 11 workers, and
  11 public primitives.
- The verifier requires the public orchestrators to be exactly
  `architect-solution-foundation`, `build-requested-change`, and
  `craft-lasting-quality`, and rejects the three provisional names as canonical
  skills or managed Claude pointers.
- It asserts the four retained former orchestrators are workers and verifies a Claude
  pointer for every canonical skill.
- It rejects the removed `deliver-work`, `clean-drift`, and `scaffold-workshop`
  skills and their managed Claude pointers.
- Its clean overlay fixture includes all three public skills and proves a
  second dry-run overlay has no writes or conflicts.
- `git diff --check` passes.

## Harness scope

Codex, Cursor, and GitHub Copilot in VS Code consume `.agents/skills/`
directly. Claude receives managed pointers for all 25 skills, including the
three renamed public skills. The repository's adapter implementation has no
executable `/adapt` command; the overlay fixture is the repeatable equivalent
of its `--check` contract. Interactive Cursor worker-picker visibility still
requires the release check recorded in the all-to-skills decision.
