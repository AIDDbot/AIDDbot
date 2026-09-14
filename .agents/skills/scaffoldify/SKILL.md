---
name: scaffoldify
description: Choose the needed projects and create only their scaffold, using catalogued archetypes when suitable.
metadata:
  aiddbot-kind: primitive
user-invocable: true
disable-model-invocation: true
---
# scaffoldify

Your goal is to create only the initial scaffold. Do not implement features, business logic, product screens, or extra application code.

1. Clarify the solution name and what the system needs. Decide which projects are necessary: frontend (`front`), backend (`back`), end-to-end tests (`e2e`), or command-line tool (`cli`). Omit unnecessary projects.
2. Run `node .agents/skills/scaffoldify/scripts/materialize.mjs --list` before choosing technologies. Prefer a catalogued archetype for each needed project. Use something else only when no archetype fits a concrete need or the user explicitly chooses another technology. Show the proposed projects, archetypes or exceptions, and destination folders; confirm the selection with the user.
3. Identify the repository's default branch. Create or resume `chore/scaffold` before creating any scaffold files. Run the materializer from the project root with the solution name and only the selected catalog tiers. The script fetches the archetypes; do not recreate or extend them yourself. For example, for an Express backend and standard frontend:

```text
node .agents/skills/scaffoldify/scripts/materialize.mjs --name "My solution" --back express --front standard
```

For a selected project outside the catalog, use its official scaffold generator or create the minimum framework scaffold from official documentation. This exception applies only to that project and still excludes functional implementation.

If the materializer fails, report the error and stop. A failed download is not permission to replace an archetype with handwritten code.

Commit the scaffold changes on `chore/scaffold` as `chore(scaffold): add {projects}`. Include only changes belonging to this task. Once all selected scaffolds are created and committed, switch to the default branch and merge `chore/scaffold` into it. If scaffolding is incomplete, report the blocker without merging.

Report created folders, commits, and merge result. Do not add installation, testing, or documentation rewriting to this task.
