---
name: scaffold-system
description: Build only the initial scaffold for a system.
metadata:
  aiddbot-kind: primitive
user-invocable: true
disable-model-invocation: false
---
# scaffold-system

Build only the initial scaffold for a system. Do not implement features, business logic, product screens, or extra application code.

1. Clarify any question with the user, or choose the simplest one if in YOLO mode.
2. Decide which projects are necessary: frontend (`front`), backend (`back`), end-to-end tests (`e2e`), or command-line tool (`cli`). Omit unnecessary projects.
3. Run `node .agents/skills/scaffold-system/scripts/materialize.mjs --list` to inspect the archetype catalog before choosing technologies.
4. Prefer a catalogued archetype for each needed project. Use something else only when no archetype fits a concrete need or the user explicitly chooses another technology. 
5. If no YOLO mode, show the proposed projects, archetypes or exceptions, and destination folders; confirm the selection with the user.
6. Identify the repository's git default branch. Create or resume `chore/scaffold` branch before creating any scaffold files. 
7. Run the materializer script `materialize.mjs` from the project root with the system name and only the selected catalog tiers. For example, for an Express backend and standard frontend:
```text
node .agents/skills/scaffold-system/scripts/materialize.mjs --name "My system" --back express --front standard
```
8. For a selected project outside the catalog, use its official scaffold generator or create the minimum framework scaffold from official documentation. This exception applies only to that project and still excludes functional implementation.
9. If the materializer fails, report the error and stop. A failed download is not permission to replace an archetype with handwritten code.
10. Reconcile main documents from each project to the repository root. Include README.md, LICENSE, and other project-specific documentation.
11. Keep the generated `aiddbot.system.json` as the root system index. It lists the system name, each project directory, technology, and available package scripts without copying application documentation.
12. Use the generated root `start` and `test:e2e` scripts when they exist. The dependency-free `.aiddbot/run-system.mjs` runner starts all non-E2E projects that expose `start` or `dev`, runs the E2E project's `test:e2e`, `test:acceptance`, or `test` script, and stops services afterward. It must not invent a command for a project that has no matching script.
13. Install any necessary dependencies for the scaffold by going over each project's documentation.
14. Git commit the scaffold changes on `chore/scaffold` branch as `chore(scaffold): add {projects}`. Include only changes belonging to this task. Once all selected scaffolds are created and committed, switch to the default branch (`main` or `master`) and merge `chore/scaffold` into it. If scaffolding is incomplete, report the blocker without merging.
