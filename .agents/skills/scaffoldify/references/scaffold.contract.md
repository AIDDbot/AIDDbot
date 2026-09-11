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

If fetching fails, diagnose and retry when appropriate or report the blocker.

Do not populate the destination manually without an explicit change of choice from the user.

Each selected tier defaults to its literal folder.

For a technology outside the catalog, search the internet for its official generator or scaffolding instructions.

After either scaffolding route, complete the root reconciliation linked from the skill. 
Ensure root `.gitignore` exists without replacing an existing file.
Then install every selected project using its declared package manager and lockfile
Run the smallest documented non-destructive smoke check for each runnable project.
