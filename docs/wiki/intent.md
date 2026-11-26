---
id: intent
type: wiki-page
title: AIDDbot Project Intent
status: draft
created: 2026-11-24
updated: 2026-11-26
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

AIDDbot covers four [lifecycle phases](glossary.md#lifecycle-phase). Each phase has a one-word name. Work happens in two loops:

- **Project loop:** the four phases of the whole [project](glossary.md#project). They are [project level](glossary.md#project-level).
- **Change loop:** the five steps of one [change](glossary.md#change), inside Development. They are [change level](glossary.md#change-level). See the [change flow](documentation-catalog.md#change-flow).

| # | Phase | Work | Uses | Produces |
| --- | --- | --- | --- | --- |
| 0 | Foundation | Prepare the [project set](documentation-catalog.md#project-set), its [quality checks](documentation-catalog.md#quality-checks) and [review gates](documentation-catalog.md#review-gates), and the [knowledge wiki](knowledge-wiki.md#model). | — | `agents`, `readme`, `glossary`, `wiki-page` |
| 1 | Development | Take changes with a spec through Analysis, Design, Implementation, Verification, and Close. [Change flow](documentation-catalog.md#change-flow) Check [routine maintenance](documentation-catalog.md#routine-maintenance) directly. | — | — |
| 2 | Release | Group the closed changes into one version. Turn the `Unreleased` section of the `changelog` into the version, check readiness, and support deploy and rollback. | `changelog` | `changelog` |
| 3 | Maintenance | Investigate incidents, update dependencies, and turn recurring issues into new changes. | — | — |

- **Uses** and **Produces** hold document IDs from the [document catalog](documentation-catalog.md#document-catalog), in backticks. Other text is plain. The documents of one change are in the change flow only.
- **Phase and step.** A phase is project level. A step is change level. Each name is used once.
- **Project brain.** The `LIVE` project documents form the [project brain](glossary.md#project-brain). Foundation creates the first ones. Each change reads them in Analysis and Design. Close updates them.
- **From Close to Release.** Close writes an entry in the `Unreleased` section of the `changelog`. Many changes close before one release. Release reads the `changelog` and makes the version.
- **Problem, solution, verification.** Analysis works on the [problem](glossary.md#problem). Design and Implementation build the [solution](glossary.md#solution). Verification gives the [verification](glossary.md#verification).
- **Feedback.** Maintenance starts new changes in Development: incidents, technical debt, and findings.
- **Explorer.** The [knowledge explorer](glossary.md#knowledge-explorer) reads this table. Keep its anchor and its columns. The row that links to the change flow is the phase that holds the steps. [Page rules](knowledge-wiki.md#page-rules)
- **Skills.** The first skills cover Foundation, the steps of one change, and the [wiki operations](knowledge-wiki.md#operations). Release and Maintenance skills come later. See the [roadmap](../../ROADMAP.md).

The phases follow current AI SDLC methods: most start with a foundation step and loop back from operation to development. [AWS AI-DLC](https://aws.amazon.com/blogs/devops/ai-driven-development-life-cycle), [AI-SDLC (arXiv)](https://arxiv.org/html/2609.24348v1), [Böckeler on SDD tools](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html)

## Project knowledge

### Document templates

Templates give consistent documents. The first one is the spec. Each template applies the rules of the method pages of this wiki. We test it on a real change in this repository. [Dogfooding rules](../PLAN.md#dogfooding-rules) [Documentation catalog](documentation-catalog.md)

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
| **Templates** | Give consistent documents. Skills choose and fill them. [Document templates](#document-templates) | `spec`, `feature-file`, `review-report`, `adr` |
| **Scripts** | Do deterministic tasks (Git chores, document IDs, metadata checks). Clear inputs, outputs, and error messages. They do not depend on the project stack or build tool. Skills do not repeat their logic in prose. [Script](glossary.md#script) | Verification, Close, `spec`, `wiki-page` |
| **Wiki** | Keeps what the project knows now, linked to its sources. [Knowledge wiki](#knowledge-wiki) | Foundation, Close, `wiki-page`, `glossary` |
| **Distribution** | One versioned release of the skills, templates, and CLI. The [installer](glossary.md#installer) installs and updates it in a project. Only these three parts ship. [What ships](scaffolding.md#what-ships) | Skills, Templates, Scripts, Foundation |
| **Project context** | Gives repo conventions, commands, and constraints in `AGENTS.md`. Workflows use existing project tools and state their prerequisites. [Project context](glossary.md#project-context) | Foundation, `agents`, `readme` |

- **Relations** names other blocks, lifecycle phases, change steps, and document IDs in backticks.
- The details of Templates and Wiki are in [Project knowledge](#project-knowledge).
- The [knowledge explorer](glossary.md#knowledge-explorer) reads this table. Keep its anchor and its columns. [Page rules](knowledge-wiki.md#page-rules)

### Shared core

The same core works in every AI coding tool:

- the project context in `AGENTS.md`,
- skills in the [Agent Skills](https://agentskills.io/specification) format,
- the `aiddbot` CLI, when it is needed.

There is no `CLAUDE.md`, `.cursor/rules`, or other file for one tool. Only the location of a skill and the way to load it can change between tools. The README documents them.

Hooks and tool integrations are optional and come later. See the [future ideas](../PLAN.md#future-ideas).

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
| 1 | How are the lifecycle phases named? | One word each: Foundation, Development, Release, Maintenance. Development holds the changes. Each change has five steps: Analysis, Design, Implementation, Verification, Close. It replaces the seven phases. | With the project brain, Analysis and Design are change work only. Phase and step are two separate words, and each name shows once. "Development" is the classic SDLC word for this work. |
| 2 | Is there a phase before Analysis? | Yes: Foundation. It prepares the project set and the wiki. | Most AI SDLC methods start with one (constitution, steering, bootstrap). "Context" clashes with the LLM term. |
| 3 | How many levels of work? | Two loops. The project loop has the four phases. The change loop has the five steps, inside Development. A phase is project level. A step is change level. The project documents of Analysis and Design go to the project brain. | It separates the work on the whole project from the work on one change (audit item B3), with no name in both levels. |
| 4 | Which phases get skills first? | Foundation, the steps of one change, and the wiki operations. Release and Maintenance come later. | They wait for a real need. |
| 5 | Does Maintenance feed Development? | Yes. Incidents, debt, and findings start new changes. No skill for it yet. | Operational feedback starts a new iteration in current AI SDLC methods. |
| 6 | Which blocks does the building blocks table list? | Skills, Templates, Scripts, Wiki, Distribution, and Project context, with a Relations column. | The knowledge explorer draws each block and its relations. Templates and Wiki were only detail sections. |
| 7 | What do Implementation and Verification check? | Implementation runs the deterministic quality checks: format, lint, and unit tests. Verification runs the end-to-end tests and an agent review of the diff against the review gates. | The quality checks look at the code. Verification looks at the behavior and at what tests cannot see. |
| 8 | How does the map show the two levels of work? | Two loops. The project loop shows the four phases, with feedback from Maintenance to Development. The change loop is a zoom of Development with the five steps. Project documents go with the project loop. Change documents go with the change loop. | The old map showed four names twice. Its arrow from Verification to Release said that every change makes a release. Its columns mixed project documents and change documents. |
| 9 | How do Close and Release relate? | Close is the last step of one change: the spec goes to `done`, durable knowledge goes back to the brain, and an entry goes to `Unreleased` in the `changelog`. Release is a project phase: it groups N closed changes into one version. | Many changes close before one release. |
| 10 | Where do the project documents of Analysis and Design go? | To the [project brain](glossary.md#project-brain): one band of `LIVE` project documents between the two loops. Foundation creates the first ones. Each change reads them in Analysis and Design. Close updates them. | Close already returns durable knowledge to the project documents. The brain makes that loop visible. |
| 11 | What columns does the lifecycle phases table have? | `#`, `Phase`, `Work`, `Uses`, `Produces`: the same columns as the [change flow](documentation-catalog.md#change-flow) table. The Development row links to the change flow and lists no documents. | One table shape for phases and steps. The explorer reads both with the same code. The documents of a change are in the change flow only. |
| 12 | Which documents does the project brain show? | Every document type of the [document catalog](documentation-catalog.md#document-catalog) with Life `LIVE` and Form `DOC`, in catalog order. | No new list to maintain. Code and tests are living, but they are not project knowledge for the map. |
| 13 | How does the catalog mark code and tests? | A third [tag](documentation-catalog.md#tags), Form: `DOC` for text that people and agents read, and `CODE` for source code and tests that tools run. | It follows the tag model of Life and Relevance. The explorer needs no hard-coded IDs. A new value comes with a real need. |
| 14 | How does the map draw the path from Close to Release? | Through the brain, with no new element. Close writes to the `changelog`, in its `Unreleased` section. Release reads the `changelog` and makes the version. | `Unreleased` is a part of the `changelog`, not a new element. All knowledge flows through the brain in the same way. |
| 15 | How does the map show Release and Maintenance? | Like the other phases, with no "later" mark. Maintenance has no documents yet. Its dashed feedback arrow goes to Development. | The map shows the method. The [roadmap](../../ROADMAP.md) shows the current milestone. |
| 16 | What is the name of the band of living project documents? | The [project brain](glossary.md#project-brain). It holds every `LIVE` `DOC` document type. The knowledge wiki is one part of it. It replaces "project brain". | "Brain" was the first wish for the wiki. With one name for the whole set, "brain" has one meaning. |
| 17 | What does Analysis use and change in the project brain? | It reads the `roadmap`, `glossary`, `wiki-page`, `domain-model`, `adr`, and `agents`. It writes the `spec` and the `feature-file`, and updates the `roadmap`. Close harvests the rest. [Catalog decision 55](documentation-catalog.md#decisions) | Analysis needs the whole brain to frame the problem. Spec-first: other knowledge waits for Close. |

## Pending

No proposals are pending. Brainstorm proposals go here until they become rules.
