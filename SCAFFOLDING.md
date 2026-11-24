# AIDDbot Scaffolding

Status: **draft**.

This document states where AIDDbot keeps its files. Create each folder only when the work needs it. The [project plan](PLAN.md) sets the order.

## Layout

```text
aidd-bot/
├── AGENTS.md, README.md, CHANGELOG.md, LICENSE
├── <FOUNDATIONAL>.md               # Foundational documents, uppercase names
├── package.json                    # Private repository manifest
├── docs/
│   └── specs/                      # Specs of the changes
├── templates/                      # Shared document templates
├── skills/
│   └── <skill-name>/SKILL.md       # Shared skill source
└── packages/
    └── cli/                        # The aiddbot CLI
```

The foundational documents stay at the root until they are hard to find.

## When each folder appears

| Folder | Created when | Milestone |
| --- | --- | --- |
| `docs/specs/` | The first spec is written. | H1 |
| `templates/` | The spec template is extracted. | H2 |
| `skills/` | The first skill is extracted: specify a change. | H2 |
| `packages/cli/` | The first CLI command is added, if the findings justify it. | H2 |
| `docs/adr/` | The first ADR is written. | When needed |
| `docs/wiki/` | There is durable knowledge that has no home yet. | When needed |
| `docs/raw/` | The wiki ingests the first external source. | When needed |

Configure the [Bun workspace](https://bun.com/docs/pm/workspaces) when a second package exists.

## Skills and templates

- Keep one source folder per skill in `skills/`. Put the entry point in `SKILL.md`. Use `references/` and `assets/` for resources that travel with that skill. [Agent Skills specification](https://agentskills.io/specification#directory-structure)
- Keep shared document templates in `templates/`. A skill that needs a template references it. Do not copy its content into the skill.
- The same skill works in every AI coding tool. To use it, copy it by hand to the location that each tool supports. The `README.md` documents the location and the way to load the skill in each tool.
- Keep the source in `skills/` only. Do not commit copies in tool folders. Do not add `CLAUDE.md`, `.cursor/rules`, or other files for one tool.
