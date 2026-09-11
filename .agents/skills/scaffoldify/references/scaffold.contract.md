# Scaffold contract

Require a solution name and derive a safe slug for project metadata. Resolve
the selected `back`, `front`, `cli`, and `e2e` tiers; at least one is required.
For every selected tier, show the catalogued default and known alternatives.
Catalog coverage requires a matching language and framework, not merely a matching
tier. Inspect the archetype's declared stack when its catalog name is ambiguous;
never replace the user's technology choice with the tier's default.
Reuse choices already settled by the validated greenfield design, but ask about
every missing material choice. Resolve the product's problem, intended users,
and proposed solution from the request and existing product or design documents;
ask for missing context rather than adopting an archetype's description. Summarize the
name, product summary, tiers, technologies, and destinations for confirmation
before materialization.

For catalogued technologies, first run:

```text
node .agents/skills/scaffoldify/scripts/materialize.mjs --list
```

Then run one confirmed invocation with `--name {solution_name}` and one flag
per selected tier. Each selected tier defaults to its literal folder (`back`,
`front`, `cli`, or `e2e`). When the confirmed architecture names containers
differently, pass the matching `--{tier}-dir {container_name}` flag. A
destination must be one safe direct-child folder name and every selected
destination must be distinct. The materializer runs in the current workspace
and neither initializes Git nor copies the AIDDbot overlay.

For a technology outside the catalog, search the internet for its official generator or
scaffolding instructions, present the approach and consequential choices, and
obtain confirmation before running it in the selected tier directory. A mixed
solution uses the materializer only for its catalogued tiers. Do not publish a
new AIDDbot archetype.
Use this route for choices such as a Python `cli`, Laravel `back`, or Vue `front`
when their stack is not catalogued. Read current official documentation for the
actual commands and prerequisites; do not rely on remembered commands. If no
official generator exists, follow official project setup instructions for the
smallest runnable scaffold and report a blocker if no supported route is found.

After either scaffolding route, complete the root reconciliation linked from
the skill. Ensure root `.gitignore` exists without replacing an existing file.
Then install every selected project using its declared package manager and lockfile, and run
the smallest documented non-destructive smoke check for each runnable project.
