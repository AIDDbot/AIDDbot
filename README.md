# AIDDbot

AIDDbot is a framework of reusable skills, document templates, and scripts for AI-assisted software development. It helps teams coordinate work across the software lifecycle, record decisions, and verify changes.

**For**: teams that build software with an AI coding tool, such as Codex, Claude Code, or Cursor, and students of [AI Code Academy](https://aicode.academy/) courses.

## How it works

Every change follows the same flow and has one spec. The change type (`chore`, `refactor`, `fix`, `feat`) guides its acceptance criteria.

1. **Specify.** Write a spec with the goal, scope, and acceptance. A person approves it before any code.
2. **Plan.** Split the work into tasks, each with a check, when tasks help.
3. **Build and review.** Implement the change. Run the checks and record the evidence.
4. **Close.** Record the verification in the spec and freeze it. Move durable knowledge into the living documents.

Skills guide the agent in each step. Scripts do the deterministic parts, such as document IDs, metadata checks, and Git chores. See the [documentation catalog](DOCUMENTATION-CATALOG.md#change-flow).

## Status

Design stage. There is no usable release yet.

Next step: **H1**, one real change by hand, with its spec in `docs/specs/`. See the [project plan](PLAN.md).

## Requirements

- An AI coding tool that reads `AGENTS.md` and [Agent Skills](https://agentskills.io/specification).
- The latest stable [Bun](https://bun.com/docs/installation), when the AIDDbot CLI exists. Skills will run a pinned release of it.

## Project documents

- [Project plan](PLAN.md): milestones, dogfooding rules, and future ideas.
- [Project intent](INTENT.md): goals, building blocks, and engineering foundations.
- [Documentation catalog](DOCUMENTATION-CATALOG.md): change flow, spec, document types, and standards.
- [Glossary](GLOSSARY.md) for shared AIDDbot terms.
- [Knowledge wiki](KNOWLEDGE-WIKI.md): how agents build and maintain a project's Markdown wiki.
- [Script toolchain](SCRIPT-TOOLCHAIN.md): the planned CLI and its development and execution rules.
- [Scaffolding](SCAFFOLDING.md) for the layout of the skills, templates, CLI, and documentation.
- [Design system](DESIGN.md) for AIDDbot documents and diagrams.
- [Changelog](CHANGELOG.md): notable project changes.

## Author and license

Created by [Alberto Basalo](https://albertobasalo.dev/). Released under the [MIT License](LICENSE).
