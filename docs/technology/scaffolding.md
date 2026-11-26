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

This page states where AIDDbot keeps its files. Create each folder only when the work needs it. The [roadmap](../../ROADMAP.md) sets the milestone order and tracks the work.

## Layout

```text
aidd-bot/
├── AGENTS.md, README.md, CHANGELOG.md, LICENSE
├── ROADMAP.md                      # Product milestones, tasks, and future ideas
├── DESIGN.md                       # Design system
├── package.json                    # Private repository manifest
├── docs/
│   ├── process/                    # How the team works
│   │   ├── NOTEPAD.txt             # Shared session handoff
│   │   └── dogfooding.md           # Dogfooding rules and findings
│   ├── product/                    # What AIDDbot is and why it exists
│   │   ├── journal/                # Daily session entries, grouped by month
│   │   └── specs/                  # One folder per change and its documents
│   ├── technology/                 # How we build AIDDbot
│   └── wiki/                       # Agent map of the project brain (index.md)
├── templates/                      # Shared document templates
├── skills/
│   └── <skill-name>/SKILL.md       # Shared skill source
└── packages/
    ├── cli/                        # The aiddbot CLI
    └── explorer/                   # The knowledge explorer (does not ship)
```

Each brain document under `docs/` lives in the folder for its [kind](../process/documentation-catalog.md#kind). Specs and the documents in their folders are product documents, including specs about process changes.

## What ships

AIDDbot ships its [process](../process/documentation-catalog.md#kind) through these parts.

| Ships | Source |
| --- | --- |
| Skills | `skills/` |
| Document templates | `templates/` |
| AIDDbot CLI | `packages/cli/` |

Teams install this process separately from their own documents. The installed process is versioned and read-only. Teams keep adaptations in their own process documents. The original AIDDbot documents, including its product and technology documents, stay in this repository with the wiki and the [knowledge explorer](../product/glossary.md#knowledge-explorer).

The [session journal rule](../process/documentation-catalog.md#session-journal) ships with the process. Each team keeps its own entries in its project brain.

## When each folder appears

| Folder | Created when | Milestone |
| --- | --- | --- |
| `docs/product/specs/` | The first spec is written. Each change keeps its documents together here. | M0 |
| `docs/product/journal/` | The first [session journal entry](../process/documentation-catalog.md#session-journal) is written in a folder for its month. [`s0009`](../product/specs/s0009-session-journal/s0009.spec.md) | M0 |
| `templates/` | The first template is written: the spec. | M1 |
| `skills/` | The first skill is written: the Analysis step of a change. | M1 |
| `packages/cli/` | The first CLI command is written. | M2 |
| `packages/explorer/` | The knowledge explorer is built: [`s0002`](../product/specs/s0002-web-knowledge-explorer/s0002.spec.md). | M0 |
| `docs/technology/adr/` | The first ADR is written. | When needed |
| `docs/wiki/` | The AIDDbot wiki provides the agent map of the brain. | M0 |
| `docs/process/` | Process pages move here in [`s0007`](../product/specs/s0007-separate-brain-and-wiki/s0007.spec.md). [`s0008`](../product/specs/s0008-folders-by-kind/s0008.spec.md) adds the notepad and the dogfooding page. | M0 |
| `docs/product/` | Product pages move to their own folder in [`s0007`](../product/specs/s0007-separate-brain-and-wiki/s0007.spec.md). | M0 |
| `docs/technology/` | Technology pages move to their own folder in [`s0007`](../product/specs/s0007-separate-brain-and-wiki/s0007.spec.md). | M0 |
| `docs/<kind>/raw/` | The wiki ingests the first raw source about that kind. | When needed |

Configure the [Bun workspace](https://bun.com/docs/pm/workspaces) when a second package exists. Until then, the root scripts run the explorer with `--cwd`. [Explorer development](explorer-development.md#commands)

## Skills and templates

- Keep one source folder per skill in `skills/`. Put the entry point in `SKILL.md`. Use `references/` and `assets/` for resources that travel with that skill. [Agent Skills specification](https://agentskills.io/specification#directory-structure)
- Keep shared document templates in `templates/`. A skill that needs a template references it. Do not copy its content into the skill.
- The same skill works in every AI coding tool. Until the [installer](../product/glossary.md#installer) exists, copy it by hand to the location that each tool supports. The `README.md` documents the location and the way to load the skill in each tool.
- Keep the source in `skills/` only. Do not commit copies in tool folders. Do not add `CLAUDE.md`, `.cursor/rules`, or other files for one tool.
