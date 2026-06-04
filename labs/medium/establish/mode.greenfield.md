# Establish — greenfield mode

- Read this when **no source code exists** yet. 
- You **prescribe**: 
  - Propose sensible defaults, 
  - Ask the user only what you can't reasonably assume.

## Explore
- Confirm OS, shell, and Git remote from the environment; don't ask if inferable.
- There's no functional code to read — so gather product intent from the user instead.
- Ask **one closed question at a time** for anything blocking: 
  - product goal, 
  - target stack, 
  - source layout.

## AGENTS.md
- Propose **{Product_Folder}** and **{Source_Folders}** ; let the user override.
- State the intended tech stack as a decision, not an observation.
- Fill **Product** problem + solution from the user's brief; if absent, ask before writing.

## Architecture (`system.arch.md`)
- Prescribe the container split and tech per container (what the system *will* be).
- Diagrams describe the **intended** design; mark assumptions explicitly.
- Code rules: state the conventions the project *should* follow for the chosen stack.

## Guardrails
- Prefer one strong default over a menu of options.
- Never invent product requirements — ask. 
