# Greenfield bootstrap: conversation notes

Status: discussion to resume; no implementation decision approved.

## Direction discussed

- Consider moving scaffold creation out of AIDDbot into a standalone CLI that the user invokes explicitly.
- The CLI could accept command-line arguments for automation or ask questions interactively when details are missing. It would use the answers to select and download project archetypes, create the scaffold, and install project dependencies.
- AIDDbot's greenfield workflow would be reconsidered separately. One possible direction is for the agent to ask the user focused questions, prepare a system proposal document, and let the user review it before any scaffold is created.
- The proposal should capture the system purpose, users and needs, project boundaries, and technology choices that affect scaffolding. Questions should be staged and use available context rather than making the user fill out a long form.
- The CLI would initially be invoked by the user at the start of a new project. Automatic invocation from AIDDbot's greenfield flow is undecided.

## Current repository context

- AIDDbot currently provides `/scaffold-system` and its `materialize.mjs` script.
- The scaffold skill also coordinates project selection, journaling, dependency installation, and branch integration; extracting only the materializer would not move the whole workflow.
- `docs/getting-started.md` currently describes automatic scaffolding as part of initializing a system with no application source. That guidance would need revision if the scaffold workflow is removed from AIDDbot.

## Open questions

- What is the proposal document's format, location, and minimum content?
- Which decisions should the agent propose, and which require explicit user input or approval?
- What questions and arguments should the standalone CLI support, and how should it handle an existing repository or destination directory?
- Should the CLI create a task branch, commit the scaffold, merge it into the default branch, and delete the branch, or leave Git integration to the user?
- What happens in AIDDbot's greenfield flow before and after the proposal is approved?
- How should the standalone CLI be named, distributed, versioned, and documented?
- When should the current scaffold skill and its bundled materializer be removed or replaced?

## Resume point

Decide the greenfield user journey and proposal artifact first. Then define the standalone CLI boundary and interface, and update AIDDbot's skills and human documentation to match the agreed flow.
