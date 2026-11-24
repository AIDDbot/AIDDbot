---
id: intent
type: wiki-page
title: AIDDbot Project Intent
status: draft
created: 2026-11-24
updated: 2026-11-24
links:
  sources:
    - https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f
    - https://agentskills.io/specification
  related:
    - glossary
    - documentation-catalog
    - knowledge-wiki
    - aiddbot-cli
  supersedes: []
---

# AIDDbot Project Intent

## Purpose

AIDDbot is a reusable framework of skills and scripts for AI-assisted software development. It helps teams:

- coordinate AI work across the whole lifecycle,
- apply their own standards and engineering practices,
- keep decisions, progress, and verification visible.

It works with any project type or stack. It works with AI coding tools that read `AGENTS.md` and [Agent Skills](https://agentskills.io/specification), such as Codex, Claude Code, and Cursor.

## Origin

[Alberto Basalo](https://albertobasalo.dev/) created AIDDbot. He uses it as a proof of concept for his courses at [AI Code Academy](https://aicode.academy/).

## Engineering foundations

Teams pick the practices that fit their project. Skills and templates build on:

- **Extreme Programming (XP)**: small verifiable changes, short feedback loops, continuous integration, regular refactoring.
- **Domain-Driven Design (DDD)**: one shared domain language in talk, docs, and code; bounded contexts where needed.
- **Clean Architecture**: business rules independent of frameworks and infrastructure; dependencies point to the core.
- **Testing**: TDD where it clarifies behavior; test level chosen by risk; a regression test for every defect.

## Lifecycle coverage

| Stage | AIDDbot helps teams to |
| --- | --- |
| Discovery and planning | Clarify goals, write requirements and acceptance criteria, split work into deliverable changes. |
| Design | Compare options, record decisions, define how to verify them. |
| Implementation | Follow repo conventions, make focused changes, update docs. |
| Verification and review | Run checks, review against acceptance criteria, record findings and gaps. |
| Release and deployment | Write release notes, check readiness, support deploy and rollback. |
| Operation and maintenance | Investigate incidents, update dependencies, turn recurring issues into improvements. |

The first skills cover one change: specify, plan, build and review, close. Later skills cover the other stages. See [PLAN.md](../../PLAN.md).

## Project knowledge

### Document templates

Templates give consistent documents. The first one is the spec. Each template applies the rules of the method pages of this wiki. We test it on a real change in this repository ([dogfooding rules](../../PLAN.md#dogfooding-rules)). See the [documentation catalog](documentation-catalog.md).

Each template states:

- when to use it,
- required sections and metadata (with a document ID where it applies).

Skills choose and fill the template. Scripts do the deterministic steps, such as assigning IDs or validating fields.

### Knowledge wiki

A persistent wiki of linked Markdown pages for people and agents: a second brain for all the project documentation. AIDDbot keeps its own documents in one, and its skills help teams keep one in their projects. It is based on [Karpathy's LLM Wiki pattern](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f). See the [knowledge wiki](knowledge-wiki.md) page.

- Keep original sources. Link every summary back to its evidence.
- Agents add new sources, answer with references, and flag stale claims, contradictions, and broken links.
- Files stay plain Markdown, usable in any editor.

### Visual identity

AIDDbot documents and diagrams use the colors, fonts, and Mermaid rules in [DESIGN.md](../../DESIGN.md).

## Building blocks

| Block | Role |
| --- | --- |
| **Skills** | Run development activities and handoffs, and generate documents. Each one defines: objective, needed context, standards, deliverables, and evidence of completion. The model chooses the approach. |
| **Scripts** | Do deterministic tasks (Git chores, document IDs, metadata checks). Clear inputs, outputs, and error messages. They do not depend on the project stack or build tool. Skills do not repeat their logic in prose. |
| **Distribution** | One versioned release of the skills, templates, and CLI. The [installer](glossary.md#installer) installs and updates it in a project. Only these three parts ship. [What ships](scaffolding.md#what-ships) |
| **Project context** | Gives repo conventions, commands, and constraints in `AGENTS.md`. Workflows use existing project tools and state their prerequisites. |

### Shared core

The same core works in every AI coding tool:

- the project context in `AGENTS.md`,
- skills in the [Agent Skills](https://agentskills.io/specification) format,
- the `aiddbot` CLI, when it is needed.

There is no `CLAUDE.md`, `.cursor/rules`, or other file for one tool. Only the location of a skill and the way to load it can change between tools. The README documents them.

Hooks and tool integrations are optional and come later. See the [future ideas](../../PLAN.md#future-ideas).

## Inclusion criteria

A skill or script belongs in AIDDbot only if it:

1. solves a recurring need,
2. adapts to different projects,
3. produces a verifiable result,
4. works on its own, with explicit inputs and outputs for handoffs,
5. marks the decisions that need human approval and shows the evidence for them.
