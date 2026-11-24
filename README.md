# AIDDbot

AIDDbot is a framework of reusable skills, document templates, and scripts for AI-assisted software development. It helps teams coordinate work across the software lifecycle, record decisions, and verify changes.

**For**: teams that build software with Codex, Claude Code, or Cursor, and students of [AI Code Academy](https://aicode.academy/) courses.

## How it works

Every change follows the same flow. The amount of documentation depends on the change type (`chore`, `refactor`, `fix`, `feat`, `epic`).

1. **Specify.** Write a spec for the change before any code.
2. **Plan.** Split the work into tasks with a verification for each one.
3. **Build and review.** Implement the tasks. Review the change and record the evidence.
4. **Close.** Freeze the spec. Move durable knowledge into the project's knowledge wiki.

Skills guide the agent in each step. Scripts do the deterministic parts: document IDs, metadata checks, Git chores, and logs.

## Status

Design stage. There is no usable release yet.

Next steps:

- Document templates for the project set and the change profiles.
- Spike: the `log` command, to measure script startup time.
- First skill: spec a change.

## Requirements

- The latest stable [Bun](https://bun.com/docs/installation). Skills and hooks run a pinned release of the AIDDbot CLI.

## Project documents

- [Project plan](PLAN.md) for the order of work and progress checklist.
- [Project intent](INTENT.md): goals and engineering foundations.
- [Documentation catalog](DOCUMENTATION-CATALOG.md): change profiles, document types, and standards.
- [Glossary](GLOSSARY.md) for shared AIDDbot terms.
- [Ontology](ONTOLOGY.md) for how those terms relate across AIDDbot.
- [Knowledge wiki](KNOWLEDGE-WIKI.md): how agents build and maintain the project's Markdown wiki.
- [Script toolchain](SCRIPT-TOOLCHAIN.md): the planned CLI and its development and execution rules.
- [Scaffolding](SCAFFOLDING.md) for the proposed layout of the skills, CLI, and documentation.
- [Documentation explorer](DOCUMENTATION-EXPLORER.md): the plan for a visual, interactive guide to AIDDbot.
- [Design system](DESIGN.md) for AIDDbot web pages, documents, slides, and diagrams.
- [Changelog](CHANGELOG.md): notable project changes.

## Author and license

Created by [Alberto Basalo](https://albertobasalo.dev/). Released under the [MIT License](LICENSE).
