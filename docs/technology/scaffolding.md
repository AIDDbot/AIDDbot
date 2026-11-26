---
id: scaffolding
type: page
title: AIDDbot Scaffolding
status: draft
created: 2026-11-24
updated: 2026-11-26
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

This page states where AIDDbot keeps its files. Create each folder only when the work needs it. The [roadmap](../../ROADMAP.md) sets the milestone order. The [development plan](../PLAN.md) tracks the work.

## Layout

```text
aidd-bot/
├── AGENTS.md, README.md, CHANGELOG.md, LICENSE
├── ROADMAP.md                      # Product milestones and outcomes
├── DESIGN.md                       # Design system
├── package.json                    # Private repository manifest
├── docs/
│   ├── PLAN.md                     # Development tasks, dogfooding, findings, and ideas
│   ├── NOTEPAD.txt                 # Shared session handoff
│   ├── process/                    # How the team works
│   ├── product/                    # What AIDDbot is and why it exists
│   ├── technology/                 # How we build AIDDbot
│   ├── wiki/                       # Agent map of the project brain (index.md)
│   └── specs/                      # One folder per change: spec, feature files, plan, review
├── templates/                      # Shared document templates
├── skills/
│   └── <skill-name>/SKILL.md       # Shared skill source
└── packages/
    ├── cli/                        # The aiddbot CLI
    └── explorer/                   # The knowledge explorer (does not ship)
```

## What ships

AIDDbot ships its [process](../process/documentation-catalog.md#kind) through these parts.

| Ships | Source |
| --- | --- |
| Skills | `skills/` |
| Document templates | `templates/` |
| AIDDbot CLI | `packages/cli/` |

Teams install this process separately from their own documents. The installed process is versioned and read-only. Teams keep adaptations in their own process documents. The original AIDDbot documents, including its product and technology documents, stay in this repository with the wiki and the [knowledge explorer](../product/glossary.md#knowledge-explorer).

## When each folder appears

| Folder | Created when | Milestone |
| --- | --- | --- |
| `docs/specs/` | The first spec is written. | M0 |
| `templates/` | The first template is written: the spec. | M1 |
| `skills/` | The first skill is written: the Analysis step of a change. | M1 |
| `packages/cli/` | The first CLI command is written. | M2 |
| `packages/explorer/` | The knowledge explorer is built: [`s0002`](../specs/s0002-web-knowledge-explorer/s0002.spec.md). | M0 |
| `docs/adr/` | The first ADR is written. | When needed |
| `docs/wiki/` | The AIDDbot wiki provides the agent map of the brain. | M0 |
| `docs/process/` | Process pages move to their own folder in [`s0007`](../specs/s0007-separate-brain-and-wiki/s0007.spec.md). | M0 |
| `docs/product/` | Product pages move to their own folder in [`s0007`](../specs/s0007-separate-brain-and-wiki/s0007.spec.md). | M0 |
| `docs/technology/` | Technology pages move to their own folder in [`s0007`](../specs/s0007-separate-brain-and-wiki/s0007.spec.md). | M0 |
| `docs/raw/` | The wiki ingests the first external source. | When needed |

Configure the [Bun workspace](https://bun.com/docs/pm/workspaces) when a second package exists. Until then, the root scripts run the explorer with `--cwd`. [Explorer development](explorer-development.md#commands)

## Skills and templates

- Keep one source folder per skill in `skills/`. Put the entry point in `SKILL.md`. Use `references/` and `assets/` for resources that travel with that skill. [Agent Skills specification](https://agentskills.io/specification#directory-structure)
- Keep shared document templates in `templates/`. A skill that needs a template references it. Do not copy its content into the skill.
- The same skill works in every AI coding tool. Until the [installer](../product/glossary.md#installer) exists, copy it by hand to the location that each tool supports. The `README.md` documents the location and the way to load the skill in each tool.
- Keep the source in `skills/` only. Do not commit copies in tool folders. Do not add `CLAUDE.md`, `.cursor/rules`, or other files for one tool.
