# Scaffold contract

Require a solution name and derive a safe slug for project metadata. 
Resolve the selected `back`, `front`, `cli`, and `e2e` tiers; at least one is required.

Before suggesting technologies, run the catalog listing below 

```text
node .agents/skills/scaffoldify/scripts/materialize.mjs --list
```

Then run one confirmed invocation with `--name {solution_name}` and one flag per selected catalog tier. 

For example, when the user selects the catalog's Express backend and standard frontend, run:

```text
node .agents/skills/scaffoldify/scripts/materialize.mjs --name "My solution" --back express --front standard
```

If fetching fails, report the error and stop.

Do not populate the destination manually without an explicit change of choice from the user.

Each selected tier defaults to its literal folder.

For a technology outside the catalog, search the internet for its official generator or scaffolding instructions.

Create the selected scaffolds on `chore/scaffold`, commit the task's changes, and merge into the repository's default branch only when every selected scaffold is complete. Do not add functional code, installation, testing, or documentation rewriting.
