---
name: scaffoldify
description: Choose the needed containers and create only their scaffold, using catalogued archetypes when suitable.
metadata:
  aiddbot-kind: primitive
user-invocable: true
disable-model-invocation: true
---
# scaffoldify

Your goal is to create only the initial scaffold. Do not implement features, business logic, product screens, or extra application code.

1. Clarify the solution name and what the system needs. Decide which containers are necessary: frontend (`front`), backend (`back`), end-to-end tests (`e2e`), or command-line tool (`cli`). Omit unnecessary containers.
2. Run `node .agents/skills/scaffoldify/scripts/materialize.mjs --list` before choosing technologies. Prefer a catalogued archetype for each needed container. Use something else only when no archetype fits a concrete need or the user explicitly chooses another technology. Show the proposed containers, archetypes or exceptions, and destination folders; confirm the selection with the user.
3. Run the materializer from the project root with the solution name and only the selected catalog tiers. The script fetches the archetypes; do not recreate or extend them yourself. For example, for an Express backend and standard frontend:

```text
node .agents/skills/scaffoldify/scripts/materialize.mjs --name "My solution" --back express --front standard
```

For a selected container outside the catalog, use its official scaffold generator or create the minimum framework scaffold from official documentation. This exception applies only to that container and still excludes functional implementation.

If the materializer fails, report the error and stop. A failed download is not permission to replace an archetype with handwritten code.

Stop when the selected scaffolds exist. Report created folders and any pending containers. Do not add installation, testing, documentation rewriting, commits, or merges to this task.
