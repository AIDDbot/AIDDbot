# AIDDbot Project Intent

## Purpose

AIDDbot is a reusable framework of skills and scripts for AI-assisted software development. It helps teams:

- coordinate AI work across the whole lifecycle,
- apply their own standards and engineering practices,
- keep decisions, progress, and verification visible.

It works with any project type or stack. Initial targets: **Codex**, **Claude Code**, and **Cursor**.

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

## Project knowledge

### Document templates

A catalog of templates for consistent documents: requirements, design proposals, ADRs, test plans, release notes, runbooks, and incident reviews.

Each template states:

- when to use it,
- required sections and metadata (with a document ID where it applies).

Skills choose and fill the template. Scripts do the deterministic steps, such as assigning IDs or validating fields.

### Knowledge wiki

A persistent wiki of linked Markdown pages for people and agents, based on [Karpathy's LLM Wiki pattern](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f).

- Keep original sources. Link every summary back to its evidence.
- Agents add new sources, answer with references, and flag stale claims, contradictions, and broken links.
- Optional: evaluate [Obsidian](https://help.obsidian.md/Files+and+folders/How+Obsidian+stores+data) as a viewer. Files must stay plain Markdown, usable in any editor.

## Building blocks

| Block | Role |
| --- | --- |
| **Skills** | Run development activities and handoffs, and generate documents. Each one defines: objective, needed context, standards, deliverables, and evidence of completion. The model chooses the approach. |
| **Hooks** | Run scripts on events from the AI coding tools. |
| **Scripts** | Do deterministic tasks (monitoring logs, Git chores, document IDs). Clear inputs, outputs, and error messages. |
| **Tool integrations** | Adapt shared workflows and hooks to each tool. Keep tool-specific details there; reuse the shared workflow. |
| **Project context** | Gives repo conventions, commands, and constraints. Workflows use existing project tools and state their prerequisites. |

## Inclusion criteria

A skill or script belongs in AIDDbot only if it:

1. solves a recurring need,
2. adapts to different projects,
3. produces a verifiable result,
4. works on its own, with explicit inputs and outputs for handoffs,
5. marks the decisions that need human approval and shows the evidence for them.
