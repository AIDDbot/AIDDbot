# Scaffold contract

Require a solution name and derive a safe slug for project metadata. Resolve
the selected `back`, `front`, `cli`, and `e2e` tiers; at least one is required.
For every selected tier, show the catalogued default and known alternatives.
Reuse choices already settled by the validated greenfield design, but ask about
every missing material choice. Summarize the name, tiers, and technologies for
confirmation before materialization.

For catalogued technologies, first run:

```text
npx --allow-git=all -p github:AIDDbot/AIDDbot aiddbot-scaffold --list
```

Then run one confirmed invocation with `--name {solution_name}` and one flag
per selected tier. Do not add content-sample flags.

For a technology outside the catalog, research its official generator, present
the generator and consequential choices, and obtain confirmation before running
it in the selected tier directory. Do not publish a new AIDDbot archetype.

After materialization, preserve existing root files, reconcile the solution
name into generated documentation and project metadata, install every selected
project using its declared package manager and lockfile, and run the smallest
documented non-destructive smoke check for each runnable project.
