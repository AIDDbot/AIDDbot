---
id: scaffolding
type: wiki-page
title: AIDDbot Scaffolding
status: draft
created: 2026-11-24
updated: 2026-11-25
links:
  sources:
    - https://agentskills.io/specification#directory-structure
  related:
    - cli-development
    - explorer-development
    - knowledge-wiki
  supersedes: []
---

# AIDDbot Scaffolding

Status: **draft**.

This page states where AIDDbot keeps its files. Create each folder only when the work needs it. The [project plan](../../PLAN.md) sets the order.

## Layout

```text
aidd-bot/
├── AGENTS.md, README.md, CHANGELOG.md, LICENSE
├── PLAN.md                         # Roadmap: milestones and tasks
├── DESIGN.md                       # Design system
├── package.json                    # Private repository manifest
├── docs/
│   ├── wiki/                       # The AIDDbot wiki: index.md and pages
│   └── specs/                      # Specs of the changes
├── templates/                      # Shared document templates
├── skills/
│   └── <skill-name>/SKILL.md       # Shared skill source
└── packages/
    ├── cli/                        # The aiddbot CLI
    └── explorer/                   # The knowledge explorer (does not ship)
```

## What ships

AIDDbot is a help for development teams that use AI across the software lifecycle. A release gives them only these parts:

| Ships | Source |
| --- | --- |
| Skills | `skills/` |
| Document templates | `templates/` |
| AIDDbot CLI | `packages/cli/` |

Everything else stays in this repository: the roadmap, the specs, the AIDDbot wiki, and the [knowledge explorer](glossary.md#knowledge-explorer). They are how we build AIDDbot, not what teams install.

## When each folder appears

| Folder | Created when | Milestone |
| --- | --- | --- |
| `docs/specs/` | The first spec is written. | H1 |
| `templates/` | The first template is written: the spec. | H2 |
| `skills/` | The first skill is written: the Analysis step of a change. | H2 |
| `packages/cli/` | The first CLI command is written. | H3 |
| `packages/explorer/` | The knowledge explorer is built: [`s0002`](../specs/s0002-web-knowledge-explorer.spec.md). | H1 |
| `docs/adr/` | The first ADR is written. | When needed |
| `docs/wiki/` | The foundational documents become the AIDDbot wiki. | H1 |
| `docs/raw/` | The wiki ingests the first external source. | When needed |

Configure the [Bun workspace](https://bun.com/docs/pm/workspaces) when a second package exists. Until then, the root scripts run the explorer with `--cwd`. [Explorer development](explorer-development.md#commands)

## Skills and templates

- Keep one source folder per skill in `skills/`. Put the entry point in `SKILL.md`. Use `references/` and `assets/` for resources that travel with that skill. [Agent Skills specification](https://agentskills.io/specification#directory-structure)
- Keep shared document templates in `templates/`. A skill that needs a template references it. Do not copy its content into the skill.
- The same skill works in every AI coding tool. Until the [installer](glossary.md#installer) exists, copy it by hand to the location that each tool supports. The `README.md` documents the location and the way to load the skill in each tool.
- Keep the source in `skills/` only. Do not commit copies in tool folders. Do not add `CLAUDE.md`, `.cursor/rules`, or other files for one tool.
