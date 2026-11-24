# AIDDbot Scaffolding

Status: **draft**.

This document proposes where AIDDbot keeps its source files, packages, and documentation. During bootstrap, create foundational Markdown files at the root with uppercase names. Create each directory when the work needs it. [Dogfooding plan](DOGFOODING.md)

## Proposed layout

```text
aidd-bot/
├── AGENTS.md, README.md, DESIGN.md, CHANGELOG.md, LICENSE
├── package.json                     # Private repository manifest
├── bun.lock                         # Shared workspace lockfile
├── skills/
│   └── <skill-name>/SKILL.md         # Shared skill source
├── integrations/
│   └── <tool>/                      # Tool adapters and hook configuration
├── templates/                       # Shared document templates
├── packages/                        # Bun workspace: packages/*
│   ├── cli/                         # Published npm package: the aiddbot CLI
│   │   ├── package.json
│   │   ├── src/cli.ts               # aiddbot entry point
│   │   ├── src/commands/
│   │   └── tests/
│   └── explorer/                    # Private package: the explorer site
│       ├── package.json
│       ├── src/                     # Interface and tour content
│       └── scripts/                 # Explorer build checks
├── scripts/                         # Repository maintenance and release tasks
└── docs/
    ├── wiki/                        # Living project knowledge
    ├── specs/                       # Specs, implementation plans, and review reports
    ├── adr/                         # Architecture decision records
    ├── decisions/                   # Decision notes
    ├── raw/                         # Original imported sources
    ├── guides/                      # Tutorials and task guides
    └── assets/                      # Shared images and diagrams
```

The tree shows the proposed layout after the wiki migration and the first releases. The existing documents stay at the root until the migration in [plan phase 1](PLAN.md#phase-1--prepare-the-repository).

## Installed layout

A project that uses AIDDbot receives files from AIDDbot and creates its own documents. It does not copy the CLI: skills and hooks call a pinned CLI version with `bunx` ([execution](SCRIPT-TOOLCHAIN.md#execution-from-skills-and-hooks)).

```text
<project-root>/
├── AGENTS.md                        # Points agents to docs/wiki/index.md
├── <tool skills folder>/            # Installed skills, for example .claude/skills/ in Claude Code
├── <tool hook configuration>        # Hooks that call the pinned aiddbot CLI
└── docs/
    ├── wiki/                        # Created by the wiki skill
    ├── specs/                       # Created by the first spec
    └── adr/, raw/, ...              # Created when a skill first needs them
```

| Origin | Files | Who changes them |
| --- | --- | --- |
| Installed from AIDDbot | Skills and hook configuration for each AI coding tool. | The installer only. A project does not edit installed copies. |
| Created by the project | `AGENTS.md`, the wiki, specs, ADRs, and other documents. | People and agents, through the change flow. |

Confirm the skills folder and hook configuration of each tool in its integration.

**Dogfooding.** This repository is the source of AIDDbot and also its first project. It installs its own skills and hooks from `skills/` and `integrations/` with the same mechanism that other projects use. So every change tests the real installation.

## Skills, integrations, and templates

- Keep one source folder per skill in `skills/`. Put the entry point in `SKILL.md`. Use `references/` and `assets/` for resources that travel with that skill. [Agent Skills specification](https://agentskills.io/specification#directory-structure)
- Put tool-specific hook configuration, payload adapters, and install mappings under `integrations/<tool>/`. Adapters invoke the shared skill or CLI command. Keep workflow rules in the shared skill. [Building blocks](INTENT.md#building-blocks)
- Keep shared document templates in `templates/`. When a CLI command needs a template at runtime, include it from that source in the published package. Verify the installed command from a different project without a checkout of this repository. [Document templates](INTENT.md#document-templates)

## CLI and support scripts

| Caller | Location | Examples |
| --- | --- | --- |
| AIDDbot users, skills, and hooks | `packages/cli/src/commands/` | Create or validate a document, check a commit message, append an event to the monitoring log. |
| AIDDbot maintainers | `scripts/` | Check a release bundle or verify repository links. |
| Explorer build | `packages/explorer/scripts/` | Check that tour links resolve to the source and flag tour content for review when its source sections change. |

Keep each command's logic in one place. Maintenance scripts can call existing CLI commands. When a repository or explorer task becomes useful to other projects, consider moving it behind an `aiddbot` subcommand. [Script toolchain](SCRIPT-TOOLCHAIN.md)

Publish the CLI as one npm package with one executable, `aiddbot`. Pair each released set of skills and hooks with the exact CLI package version it calls. Confirm the registry package name before the first release. [Packaging and version pinning](SCRIPT-TOOLCHAIN.md#packaging)

Keep the root manifest private. The Bun workspace includes every folder in `packages/`. Each package states in its own manifest whether it is published: the CLI is public, and the explorer is `private`. Keep one lockfile at the root and declare dependencies in the package that uses them. Keep the explorer private and build its site as a separate artifact. [Bun workspaces](https://bun.com/docs/pm/workspaces)

## Release units

| Unit | Contents | Version | Channel |
| --- | --- | --- | --- |
| CLI | `packages/cli/` and the templates it needs at runtime. | SemVer. | npm. |
| Skills bundle | `skills/` and `integrations/<tool>/`, for each AI coding tool. | SemVer. Pins the exact CLI version that it calls. | To decide. |
| Explorer site | The build of `packages/explorer/`. | The repository revision that it displays. | GitHub Pages (proposal). |

Open questions:

1. How do skills reach a project: a tool plugin or marketplace, an `aiddbot install <tool>` command, or a copy?
2. Do the CLI and the skills bundle share one version number, or does each have its own?

## Wiki and human documentation

- **README.** Give readers a short introduction and links to the guides, wiki, and explorer as they become available.
- **Wiki.** Keep living project knowledge in `docs/wiki/`. Its index links to pages. Its log records wiki operations. Pages cite source records in `docs/specs/`, `docs/adr/`, `docs/decisions/`, and `docs/raw/` as needed. [Wiki model and layout](KNOWLEDGE-WIKI.md#repository-layout)
- **Guides.** Put tutorials and task guides in `docs/guides/`. Explain how to use AIDDbot. Link to the wiki or the relevant spec for the rules or decisions behind a task.
- **Explorer.** Keep the site code and tour content under `packages/explorer/`. Build from an explicit set of repository sources. Link each summary to its source at the revision the site displays. Use `DESIGN.md` for the visual identity. [Explorer intent](DOCUMENTATION-EXPLORER.md) · [Design system](DESIGN.md)

## When each folder appears

Create a folder only when the work needs it. The [project plan](PLAN.md) sets the order.

| Folder | Created when | Phase | State |
| --- | --- | --- | --- |
| `docs/assets/` | Shared images are needed. | Any | Proposed. |
| `docs/wiki/` | The wiki migration starts. | 1 | Proposed. |
| `docs/specs/` | The first spec is written. | 2 | Proposed. |
| `templates/` | The first change produces a reusable spec template. | 2 | Proposed. |
| `packages/cli/` | The CLI package is created. | 4 | Proposed. |
| `docs/adr/` | The first ADR is written, for example the result of the `log` spike. | 4 | Proposed. |
| `skills/` | The first skill is extracted: specify a change. | 5 | Proposed. |
| `integrations/<tool>/` | The first hook or skill is installed in a tool. | 5 | Proposed. |
| `scripts/` | A maintenance task repeats. | 4 | Proposed. |
| `packages/explorer/` | The first explorer spec starts. Its spec confirms the stack, hosting, and tour format. | 6 | Proposed. |
| `docs/raw/` | The wiki ingests the first external source. | Any | Proposed. |
| `docs/guides/` | The first guide for AIDDbot users is written. | 7 | Proposed. |
| `docs/decisions/` | Decision notes are enabled. | Not yet | Deferred. |

When a folder is created, change its state to `Exists`.

## Pending: top-level structure

Outcome of a thinking session. These are proposals, not decisions yet. The sections above still show the previous proposal. Update them when these proposals are confirmed.

**Principles.**

- The current flat root is temporary. It is not a model for the folders.
- Keep the visible top level small: five folders or fewer. Hidden tool folders (`.agents/`, `.github/`, `.claude/`…) do not count.
- `packages/` holds one folder per [release unit](#release-units).
- **Installed or customizable.** Everything that AIDDbot puts in a project is one of two kinds:
  - **Installed**: skills and hooks. Generated, not in Git, never edited by hand.
  - **Customizable**: what a project adapts, such as document templates and the active hooks. AIDDbot ships defaults. The project keeps its own version in Git. The installer creates it once and never overwrites it. The CLI and the skills use the project version first and the default when there is none.

**Proposed top level.**

```text
aidd-bot/
├── docs/                 # Project knowledge: wiki, specs, ADRs, raw sources, guides, assets
├── packages/
│   ├── cli/              # The aiddbot CLI (npm)
│   ├── skills/           # Skills, hooks, and tool integrations (skills bundle)
│   └── explorer/         # The explorer site (private)
├── templates/            # Default document templates, included in the CLI and skills at publish time
├── scripts/              # Repository maintenance tasks
├── .aiddbot/             # This repository's own customizations (in Git)
└── .agents/              # Installed copies for dogfooding (generated, in .gitignore)
```

**Proposed project layout** (any project that uses AIDDbot, this one included):

```text
<project-root>/
├── .aiddbot/             # Customizable, in Git
│   ├── config.yaml       # Active hooks and their options
│   └── templates/        # The project's own document templates
├── .agents/              # Installed skills and hooks, in .gitignore
└── docs/                 # Documents created by the project
```

**Proposals.**

| Topic | Proposal | Reason |
| --- | --- | --- |
| Source of skills and hooks | `packages/skills/` is the only source. It is distributable. | One home. The same files reach every project. |
| Dogfooding | This repository installs its own skills and hooks with `aiddbot install <tool>`, like any other project. | Every change tests the real installation. |
| Install mechanism | An `aiddbot install <tool>` command in the CLI. | Installing is deterministic, so it is a script. |
| Installed copies | Generated, not stored in Git (`.gitignore`). | Git holds one source. Nobody edits a copy by mistake. |
| Install target | A shared `.agents/` folder when the tool supports it. The tool's own folder (`.claude/`, `.cursor/`…) only when it does not. Each integration confirms its paths. | Fewer copies and one place to look. |
| Default templates | `templates/` at the top level of this repository. The CLI and the skills bundle include them at publish time. | Easy to find and change. Both the CLI and the skills use them. |
| Customizations | `.aiddbot/` in each project, in Git: `templates/` and `config.yaml` (active hooks). | One place for everything a project adapts. It does not use the visible top level. |
| New default versions | The installer keeps the project version and reports that a new default exists, with the difference. | The project owns its customizations. It still learns about improvements. |
| Maintenance tasks | `scripts/` at the top level. Not distributed. | Small, and separate from the release units. |

**Open questions.**

1. Bootstrap: until `aiddbot install` exists, dogfooding stays by hand. [Plan phase 5](PLAN.md#phase-5--build-and-install-skills-and-hooks) adds installation support. Is that the right phase?
2. A fresh clone has no installed skills. `AGENTS.md` must tell contributors to run the install first. Can a hook or `bun install` run it?
3. How does the installer check that installed skills match the pinned CLI version?
4. Which tools support a shared `.agents/` folder for skills and for hooks?
5. Templates are included in two release units. How does the build keep both copies in sync?
6. Which other settings become customizable? Change profiles, document paths, and the design system were considered and left out for now.
7. Format and schema of `.aiddbot/config.yaml`, and the script that validates it.

## Change history

- v6. Tie the templates folder to the first reusable spec template.
- v5. Add the installed-or-customizable principle and the `.aiddbot/` folder for project customizations.
- v4. Add pending proposals for a small top level: `docs/`, `packages/` (cli, skills, explorer), `templates/`, `scripts/`, and generated `.agents/` copies for dogfooding.
- v3. Put the CLI and the explorer side by side in `packages/` (`packages/cli/`, `packages/explorer/`). Remove `apps/`.
- v2. Add the installed layout of a project, the release units, and a table of when each folder appears. It replaces the order of work, which repeated the dogfooding plan.
- v1. Propose the repository layout, release boundaries, and order of work.
