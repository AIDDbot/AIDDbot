---
id: intent
type: wiki-page
title: AIDDbot Project Intent
status: draft
created: 2026-11-24
updated: 2026-11-25
links:
  sources:
    - https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f
    - https://agentskills.io/specification
    - https://aws.amazon.com/blogs/devops/ai-driven-development-life-cycle
    - https://arxiv.org/html/2609.24348v1
    - https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html
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

## Lifecycle phases

AIDDbot covers seven phases. Each phase has a one-word name. Work happens at two levels:

- **Project level:** the whole [project](glossary.md#project).
- **Change level:** one [change](glossary.md#change).

| # | Phase | AIDDbot helps teams to | Project level | Change level |
| --- | --- | --- | --- | --- |
| 0 | Foundation | Prepare the [project set](documentation-catalog.md#project-set) and the [knowledge wiki](knowledge-wiki.md#model). | `agent-instructions`, `readme`, `glossary`, `wiki-page` | — |
| 1 | Analysis | Clarify goals, write [user stories](glossary.md#user-story) and [requirements](glossary.md#requirement), split work into deliverable changes. | `roadmap` | `spec` |
| 2 | Design | Compare options, record decisions, plan the work and its checks. | `adr`, architecture, `design-system` | Tasks or `impl-plan` |
| 3 | Implementation | Follow repo conventions, make focused changes, update docs. | — | Code and docs |
| 4 | Verification | Run [checks](glossary.md#check), [review](glossary.md#review) against the requirements, record [findings](glossary.md#finding) and gaps. | — | Ticked requirements; `review-report` on failures or findings |
| 5 | Release | Write release notes, check readiness, support deploy and rollback. | Release, `changelog` | — |
| 6 | Maintenance | Investigate incidents, update dependencies, turn recurring issues into improvements. | Incidents, dependencies, technical debt | — |

- **One vocabulary.** A change goes through Analysis, Design, Implementation, and Verification, and then Close. Close is the last step of a change, not a phase. It returns durable knowledge to the Foundation documents. See the [change flow](documentation-catalog.md#change-flow).
- **Problem, solution, verification.** Analysis works on the [problem](glossary.md#problem). Design and Implementation build the [solution](glossary.md#solution). Verification gives the [verification](glossary.md#verification).
- **Feedback.** Maintenance starts new changes in Analysis: incidents, technical debt, and findings.
- **Explorer.** The [knowledge explorer](glossary.md#knowledge-explorer) reads this table. Keep its anchor and its columns. Document IDs go in backticks.
- **Skills.** The first skills cover Foundation, the steps of one change, and the [wiki operations](knowledge-wiki.md#operations). Release and Maintenance skills come later. See [PLAN.md](../../PLAN.md).

The phases follow current AI SDLC methods: most start with a foundation step and loop back from operation to analysis. [AWS AI-DLC](https://aws.amazon.com/blogs/devops/ai-driven-development-life-cycle), [AI-SDLC (arXiv)](https://arxiv.org/html/2609.24348v1), [Böckeler on SDD tools](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html)

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

| Block | Role | Relations |
| --- | --- | --- |
| **Skills** | Run development activities and handoffs, and generate documents. Each one defines: objective, needed context, standards, deliverables, and evidence of completion. The model chooses the approach. [Skill](glossary.md#skill) | Templates, Scripts, Wiki, Foundation, Analysis, Design, Implementation, Verification, Close |
| **Templates** | Give consistent documents. Skills choose and fill them. [Document templates](#document-templates) | `spec`, `impl-plan`, `review-report`, `adr` |
| **Scripts** | Do deterministic tasks (Git chores, document IDs, metadata checks). Clear inputs, outputs, and error messages. They do not depend on the project stack or build tool. Skills do not repeat their logic in prose. [Script](glossary.md#script) | Verification, Close, `spec`, `wiki-page` |
| **Wiki** | Keeps what the project knows now, linked to its sources. [Knowledge wiki](#knowledge-wiki) | Foundation, Close, `wiki-page`, `glossary` |
| **Distribution** | One versioned release of the skills, templates, and CLI. The [installer](glossary.md#installer) installs and updates it in a project. Only these three parts ship. [What ships](scaffolding.md#what-ships) | Skills, Templates, Scripts, Foundation |
| **Project context** | Gives repo conventions, commands, and constraints in `AGENTS.md`. Workflows use existing project tools and state their prerequisites. [Project context](glossary.md#project-context) | Foundation, `agent-instructions`, `readme` |

- **Relations** names other blocks, lifecycle phases, change steps, and document IDs in backticks.
- The details of Templates and Wiki are in [Project knowledge](#project-knowledge).
- The [knowledge explorer](glossary.md#knowledge-explorer) reads this table. Keep its anchor and its columns. [Page rules](knowledge-wiki.md#page-rules)

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

## Decisions

| # | Question | Decision | Reason |
| --- | --- | --- | --- |
| 1 | How are the lifecycle phases named? | One word each: Foundation, Analysis, Design, Implementation, Verification, Release, Maintenance. | Simple names, close to the classic SDLC. |
| 2 | Is there a phase before Analysis? | Yes: Foundation. It prepares the project set and the wiki. | Most AI SDLC methods start with one (constitution, steering, bootstrap). "Context" clashes with the LLM term. |
| 3 | How many levels of work? | Two: project and change. Analysis and Design have both. Implementation and Verification are change level. Foundation, Release, and Maintenance are project level. | It separates the work on the whole project from the work on one change (audit item B3). |
| 4 | Which phases get skills first? | Foundation, the steps of one change, and the wiki operations. Release and Maintenance come later. | They wait for a real need. |
| 5 | Does Maintenance feed Analysis? | Yes. Incidents, debt, and findings start new changes. No skill for it yet. | Operational feedback starts a new iteration in current AI SDLC methods. |
| 6 | Which blocks does the building blocks table list? | Skills, Templates, Scripts, Wiki, Distribution, and Project context, with a Relations column. | The knowledge explorer draws each block and its relations. Templates and Wiki were only detail sections. |
