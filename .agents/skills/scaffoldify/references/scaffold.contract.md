# Scaffold contract

Require a solution name and derive a safe slug for project metadata. Resolve
the selected `back`, `front`, `cli`, and `e2e` tiers; at least one is required.
For every selected tier, show the catalogued default and known alternatives.
Reuse choices already settled by the validated greenfield design, but ask about
every missing material choice. Resolve a concise product summary. Summarize the
name, product summary, tiers, technologies, and destinations for confirmation
before materialization.

For catalogued technologies, first run:

```text
node .agents/skills/scaffoldify/scripts/materialize.js --list
```

Then run one confirmed invocation with `--name {solution_name}` and one flag
per selected tier. Each selected tier defaults to its literal folder (`back`,
`front`, `cli`, or `e2e`). When the confirmed architecture names containers
differently, pass the matching `--{tier}-dir {container_name}` flag. A
destination must be one safe direct-child folder name and every selected
destination must be distinct. The materializer runs in the current workspace
and neither initializes Git nor copies the AIDDbot overlay.

For a technology outside the catalog, research its official generator, present
the generator and consequential choices, and obtain confirmation before running
it in the selected tier directory. Do not publish a new AIDDbot archetype.

After materialization, preserve existing root files and reconcile the root
`README.md` yourself. The materializer's minimal metadata update is not the
root-documentation reconciliation. Use a single clearly marked solution block
so that later runs replace only that block; leave every other root README
section unchanged. Keep the structure concise and derive it from the selected
directories:

- the product name and confirmed summary;
- author fields for name, email, and website;
- one link for each selected direct-child project directory, with its tier and
  technology; and
- that project's documented prerequisites, installation command, run command,
  port, and URL.

Discover project facts from the fetched files, including its README, package
manifest, lockfile, scripts, configuration, and source only where necessary.
Never invent commands, ports, URLs, prerequisites, or health endpoints. If a
fact is not documented, say it is not documented rather than guessing. Link
with the confirmed `--{tier}-dir` destination, not a literal tier folder.

For each author field, first inspect the fetched archetypes for a declared
value. When none is declared, use the matching Git identity or configuration
value. Ask the user for every field still missing; if they provide no value,
render that field explicitly blank. Do not infer an author's website from a
repository remote.

Ensure root `.gitignore` and `LICENSE` exist without replacing existing files.
For a missing license, obtain the license choice before adding it. Then install
every selected project using its declared package manager and lockfile, and run
the smallest documented non-destructive smoke check for each runnable project.
