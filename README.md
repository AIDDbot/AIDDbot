# AIDDbot

AIDDbot is a framework of reusable skills, document templates, and scripts for AI-assisted software development. It helps teams coordinate work across the software lifecycle, record decisions, and verify changes.

**For**: teams that build software with an AI coding tool, such as Codex, Claude Code, or Cursor, and students of [AI Code Academy](https://aicode.academy/) courses.

## How it works

Every change follows the same flow and has one spec. The change type (`chore`, `refactor`, `fix`, `feat`) guides its requirements. The impact level (`small`, `medium`, `large`) decides how much process it needs: a `small` change has a short spec and gets its approval in the pull request; a `large` change adds a plan and a review report.

1. **Analysis.** Write the problem of the spec: the goal, what is out of scope, 1 to 3 user stories, and up to 9 requirements.
2. **Design.** Write the solution, its tasks, and a data model when the change touches data. Write one Gherkin feature file for each user story, with the scenarios of its requirements. A person approves the spec and its scenarios before any code.
3. **Implementation.** Implement the change, its unit tests, and the docs. Another agent generates the end-to-end tests from the scenarios, in their own package. Repeat the quality checks until they pass: build, format, lint, and unit tests.
4. **Verification.** Run the end-to-end tests and keep their test report. An agent reviews the diff against the review gates (by default: security, user experience, maintainability): pass or changes needed. Tick each requirement that passes. Write a review report only if a requirement fails or there are findings.
5. **Close.** Freeze the spec. Move durable knowledge into the living documents.

Skills guide the agent in each step. Scripts do the deterministic parts, such as document IDs, metadata checks, and Git chores. See the [documentation catalog](docs/wiki/documentation-catalog.md#change-flow).

## Status

Design stage. There is no usable release yet.

Next step: **H1**, map the lifecycle skills. See the [project plan](PLAN.md).

## Requirements

- An AI coding tool that reads `AGENTS.md` and [Agent Skills](https://agentskills.io/specification).
- The latest stable [Bun](https://bun.com/docs/installation), when the AIDDbot CLI exists. Skills will run a pinned release of it.

## Project documents

- [AIDDbot wiki](docs/wiki/index.md): intent, glossary, method, and development pages.
- [Project plan](PLAN.md): milestones, dogfooding rules, and future ideas.
- [Design system](DESIGN.md) for AIDDbot documents and diagrams.
- [Changelog](CHANGELOG.md): notable project changes.
- Knowledge explorer: a visual map of the method, built from these documents. Run `bun run explorer:install` once, then `bun run explorer:dev`. [Explorer development](docs/wiki/explorer-development.md)

## Author and license

Created by [Alberto Basalo](https://albertobasalo.dev/). Released under the [MIT License](LICENSE).
