---
name: scope-change
description: Discover affected specs and write a coordinated change manifest.
metadata:
  aiddbot-kind: primitive
user-invocable: true
disable-model-invocation: true
---
# scope-change

Your goal is to discover which specs a requirement touches and write a coordinated change manifest (short and lean).

Read the PRD, existing functional specs, and architecture. Apply [Amend, never fork](./references/triage.md): behavior already owned by a spec is an `amend`; genuinely new behavior is a `create`. Draw the next `C001`, `C002`… id; neither series advances the other. `{change_key}` = `{change_id}-{slug}`.

Clarify with the human, one closed question at a time, until the impact map is settled. Write `{Product_Folder}/changes/{change_key}/change.md` from the [change template](./assets/change.manifest.template.md). Work on the current branch — never create or switch branches.

The result is the change manifest and proposed impact map.

Commit as `docs(scope-change): …`.
