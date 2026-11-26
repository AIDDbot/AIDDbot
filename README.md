# AIDDbot

[![Version](https://img.shields.io/github/package-json/v/AIDDbot/AIDDbot?color=1D4ED8)](https://github.com/AIDDbot/AIDDbot/blob/main/package.json)
![Codename](https://img.shields.io/github/package-json/codename/AIDDbot/AIDDbot?label=codename&color=15803D)

AIDDbot is a framework of reusable skills, document templates, and scripts for AI-assisted software development. It helps teams coordinate work across the software lifecycle, record decisions, and verify changes.

**For**: teams that build software with an AI coding tool, such as Codex, Claude Code, or Cursor, and students of [AI Code Academy](https://aicode.academy/) courses.

## How it works

A person requests a spec or approves the agent's proposal to create one. Changes with a spec follow the change flow below. [Routine maintenance](docs/process/documentation-catalog.md#routine-maintenance) goes straight to verification. The change type (`chore`, `refactor`, `fix`, `feat`) guides the requirements. A `small` change has a short spec and gets its approval in the pull request. A `large` change adds a review report.

1. **Analysis.** Write the problem of the spec: the goal, what is out of scope, 1 to 3 user stories, and up to 9 requirements.
2. **Design.** Write the solution, its tasks, and a data model when the change touches data. Write one Gherkin feature file for each user story, with the scenarios of its requirements. A person approves the spec and its scenarios before any code.
3. **Implementation.** Implement the change, its unit tests, and the docs. Another agent generates the end-to-end tests from the scenarios, in their own package. Repeat the quality checks until they pass: build, format, lint, and unit tests.
4. **Verification.** Run the end-to-end tests and keep their test report. An agent reviews the diff against the review gates (by default: security, user experience, maintainability): pass or changes needed. Tick each requirement that passes. Write a review report only if a requirement fails or there are findings.
5. **Close.** Freeze the spec. Move durable knowledge into the living documents.

Skills guide the agent in each step. Scripts do the deterministic parts, such as document IDs, metadata checks, and Git chores. See the [documentation catalog](docs/process/documentation-catalog.md#change-flow).

## Status

Design stage. There is no usable release yet.

The [roadmap](ROADMAP.md) gives the current milestone. To resume work, read [the notepad](docs/NOTEPAD.txt).

## Requirements

- An AI coding tool that reads `AGENTS.md` and [Agent Skills](https://agentskills.io/specification).
- The latest stable [Bun](https://bun.com/docs/installation), when the AIDDbot CLI exists. Skills will run a pinned release of it.

## Project documents

- [Project brain](docs/process/knowledge-wiki.md#model) with the original [process](docs/process/), [product](docs/product/), and [technology](docs/technology/) documents.
- [AIDDbot wiki](docs/wiki/index.md), the index agents use to find those documents.
- [Roadmap](ROADMAP.md) for product milestones and outcomes.
- [Development plan](docs/PLAN.md) for tasks, dogfooding rules, and future ideas.
- [Design system](DESIGN.md) for AIDDbot documents and diagrams.
- [Changelog](CHANGELOG.md): notable project changes.
- [Knowledge explorer](https://aiddbot.github.io/AIDDbot/): a visual guide to the method, roadmap, and specs. [Run it locally](docs/technology/explorer-development.md#commands).
- [AIDDbot-legacy](https://github.com/AIDDbot/AIDDbot-legacy): the archived version of the project.

## Author and license

Created by [Alberto Basalo](https://albertobasalo.dev/). Released under the [MIT License](LICENSE).
