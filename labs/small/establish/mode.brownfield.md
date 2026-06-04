# Establish — brownfield mode

- Read this when **source code already exists**. 
- You **extract**: 
  - Document what the code actually is. 
  - Don't prescribe or redesign.

## Explore
- Infer OS, shell, and Git remote from the environment.
- Shallow-scan the tree: read `README.md`, manifests (`package.json`, etc.), and entry points.
- Detect real **{Product_Folder}** and **{Source_Folders}** from the layout; don't impose new ones.

## AGENTS.md
- Record the **actual** tech stack, paths, and scripts found in the repo.
- Fill **Product** problem + solution from `README.md` / existing docs.

## Architecture (`system.arch.md`)
- Reverse-engineer containers from the real folder/process boundaries.
- Tech per container = what's installed and imported, not what you'd choose.
- Code rules: extract the conventions already present (naming, structure, errors, tests) 

## Guardrails
- Observe; don't reform.
- Document reality, not aspiration. If the code is messy, describe it as-is.
- Flag contradictions (e.g. docs vs. code) instead of silently picking one.
