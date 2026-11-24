---
id: glossary
type: glossary
title: AIDDbot Glossary
status: draft
date: 2026-11-24
links:
  sources:
    - AGENTS.md
    - DOCUMENTATION-CATALOG.md
    - DOGFOODING.md
    - INTENT.md
    - KNOWLEDGE-WIKI.md
    - SCRIPT-TOOLCHAIN.md
  related: []
  supersedes: []
---

# AIDDbot Glossary

The shared language of AIDDbot. People, agents, documents, and code use these terms with these meanings. This page is the single source of truth for them.

## Contents

The terms are in six groups. Each group answers one question.

1. **[Project and people](#project-and-people)**: who takes part, and where does AIDDbot run?
   - [AIDDbot](#aiddbot) · [Project](#project) · [Person](#person) · [Agent](#agent) · [AI coding tool](#ai-coding-tool) · [Dogfooding](#dogfooding)
2. **[Building blocks](#building-blocks)**: what parts does AIDDbot combine?
   - [Building block](#building-block) · [Skill](#skill) · [Hook](#hook) · [Script](#script) · [AIDDbot CLI](#aiddbot-cli) · [Tool integration](#tool-integration) · [Project context](#project-context) · [Monitoring log](#monitoring-log)
3. **[Change workflow](#change-workflow)**: how does work move from an idea to a merge?
   - [Change](#change) · [Change type](#change-type) · [Change profile](#change-profile) · [Change flow](#change-flow) · [Spec-first](#spec-first) · [Task](#task) · [Check](#check) · [Evidence](#evidence) · [Finding](#finding) · [Human approval](#human-approval)
4. **[Document model](#document-model)**: how are documents classified, structured, and identified?
   - [Document](#document) · [Document type](#document-type) · [Document tags](#document-tags) · [Fragment](#fragment) · [Template](#template) · [Living document](#living-document) · [Change document](#change-document) · [Project set](#project-set) · [Metadata](#metadata) · [Document ID](#document-id)
5. **[Key documents](#key-documents)**: which documents does a change or a project use most?
   - [Spec](#spec) · [Acceptance criteria](#acceptance-criteria) · [Implementation plan](#implementation-plan) · [Review report](#review-report) · [ADR](#adr) · [Design system](#design-system)
6. **[Knowledge](#knowledge)**: how does knowledge stay true after a change closes?
   - [Ontology](#ontology) · [Knowledge wiki](#knowledge-wiki) · [Wiki page](#wiki-page) · [Source](#source) · [Citation](#citation) · [Conflict](#conflict) · [Harvest](#harvest) · [Ingest](#ingest) · [Wiki operation](#wiki-operation) · [Wiki index](#wiki-index) · [Wiki log](#wiki-log)

## How to use this glossary

- Use the term exactly as written here. Do not use the words in **Avoid** for the same concept.
- Write a code identifier in backticks, such as `spec` or `impl-plan`.
- Link to a term with its anchor, such as `GLOSSARY.md#spec`.
- Add or change a term here first. Then update the documents that use it.
- Add a term when two or more documents use it, or when people confuse it with another term.

## Project and people

Who takes part in the work, and where AIDDbot runs. A [person](#person) and an [agent](#agent) work together on a [project](#project), inside an [AI coding tool](#ai-coding-tool).

### AIDDbot

A framework of reusable skills, document templates, and scripts for AI-assisted software development.

Avoid: the bot, the tool. · Source: [Project intent](INTENT.md#purpose)

### Project

A software repository that uses AIDDbot. The AIDDbot repository is also a project (see [dogfooding](#dogfooding)).

Avoid: app, product (when you mean the repository). · Source: [Project intent](INTENT.md#purpose)

### Person

A human who works on a project: writes specs, reviews changes, and gives [human approval](#human-approval).

Avoid: user (a user is the end user of the software, as in a user story). · Source: [Project intent](INTENT.md#purpose)

### Agent

An AI model that works in an [AI coding tool](#ai-coding-tool). It follows skills and project context, and it calls scripts.

Avoid: bot, the AI, Copilot. · Source: [Building blocks](INTENT.md#building-blocks)

### AI coding tool

An application that runs an agent on a project. Initial targets: Codex, Claude Code, and Cursor.

Avoid: IDE, assistant, tool (alone). · Source: [Project intent](INTENT.md#purpose)

### Dogfooding

Building AIDDbot with AIDDbot. Templates, skills, and scripts are extracted from real work in this repository.

Source: [Dogfooding](DOGFOODING.md)

## Building blocks

The parts that AIDDbot combines. [Skills](#skill) need judgment, so the agent runs them. [Scripts](#script) are deterministic, so skills and [hooks](#hook) call them.

### Building block

One of the parts that AIDDbot combines: [skill](#skill), [hook](#hook), [script](#script), [tool integration](#tool-integration), and [project context](#project-context).

Source: [Building blocks](INTENT.md#building-blocks)

### Skill

Instructions for a recurring development activity. A skill states the objective, the required context, the expected outputs, and the checks. The agent chooses the approach.

Avoid: prompt, command, workflow. · Source: [Building blocks](INTENT.md#building-blocks)

### Hook

A configuration that runs a script when an AI coding tool emits an event.

Avoid: trigger, listener. · Source: [Building blocks](INTENT.md#building-blocks)

### Script

A command that does one deterministic task with defined inputs, outputs, and errors. Skills and hooks call it. Skills do not repeat its logic in prose.

Avoid: tool, helper, the narrative of a guided tour. · Code: `aiddbot <group> <action>`. · Source: [Script contract](SCRIPT-TOOLCHAIN.md#script-contract)

### AIDDbot CLI

The single executable, `aiddbot`, that ships all scripts as subcommands. Skills and hooks call a pinned version.

Avoid: binary, the scripts package. · Code: `aiddbot`. · Source: [Packaging](SCRIPT-TOOLCHAIN.md#packaging)

### Tool integration

The adapter that connects the shared skills and hooks to one AI coding tool. Tool-specific details live only here.

Avoid: plugin, connector. · Source: [Building blocks](INTENT.md#building-blocks)

### Project context

The conventions, commands, and constraints of a project that agents read before they work. It lives in the agent instructions and conventions.

Avoid: memory, prompt context. · Source: [Building blocks](INTENT.md#building-blocks)

### Monitoring log

The record of events that hooks write with `aiddbot log`. It is script output, not a document.

Avoid: log (alone), progress log. · Not the same as the [wiki log](#wiki-log). · Source: [Commands](SCRIPT-TOOLCHAIN.md#commands-provisional)

## Change workflow

How work moves from an idea to a merge. Every [change](#change) has a [type](#change-type), follows the same [flow](#change-flow), and ends with [evidence](#evidence) for its [checks](#check).

### Change

One unit of work that goes from a spec to a merge. It has one [change type](#change-type) and one spec.

Avoid: feature (unless the type is `feat`), ticket, task. · Source: [Change profiles](DOCUMENTATION-CATALOG.md#change-profiles)

### Change type

The category of a change: `chore`, `refactor`, `fix`, `feat`, or `epic`. It matches the Conventional Commits type and decides the [change profile](#change-profile).

Avoid: issue type, size. · Source: [Change profiles](DOCUMENTATION-CATALOG.md#change-profiles)

### Change profile

The rules that say which documents and fragments a change type requires (`MUST`), recommends (`SHOULD`), or allows (`COULD`).

Avoid: checklist, template. · Source: [Change profiles](DOCUMENTATION-CATALOG.md#change-profiles)

### Change flow

The four steps of every change:

1. **Specify**: write the spec before any code.
2. **Plan**: split the work into tasks, each with a check.
3. **Build and review**: implement the tasks, run the checks, and record the evidence in the review report.
4. **Close**: set the spec to `done` and [harvest](#harvest) its knowledge.

Avoid: pipeline, process. · Source: [README](README.md#how-it-works)

### Spec-first

Every change starts with a spec. The spec drives the change and is frozen when it closes. Living documents keep the knowledge afterwards.

Avoid: spec-anchored (a different approach, where the spec is maintained). · Source: [Principles](DOCUMENTATION-CATALOG.md#principles)

### Task

One step of a change, small enough to verify on its own. Tasks are a checklist in the spec or in the implementation plan, and they show progress.

Avoid: ticket, story, subtask. · Code: `tasks` fragment. · Source: [Fragment catalog](DOCUMENTATION-CATALOG.md#fragment-catalog)

### Check

An action that verifies a result: a test, a linter, a type check, or a manual review step.

Avoid: validation (alone), QA. · Source: [Review report](DOCUMENTATION-CATALOG.md#p4--verification-and-review)

### Evidence

The output that shows a check ran and what it found: a test result, a log excerpt, a screenshot, or a link.

Avoid: proof, artifact. · Source: [Inclusion criteria](INTENT.md#inclusion-criteria)

### Finding

A problem, gap, or lesson found during a review. Process findings feed [dogfooding](#dogfooding).

Avoid: bug (a bug is one kind of finding), comment. · Source: [Dogfooding rules](DOGFOODING.md#rules)

### Human approval

A decision that a person must take before the agent continues. Skills mark these decisions and show the evidence.

Avoid: sign-off, confirmation. · Source: [Inclusion criteria](INTENT.md#inclusion-criteria)

## Document model

How AIDDbot classifies, structures, and identifies documents. These terms apply to every [document type](#document-type).

### Document

A standalone Markdown file with its own [metadata](#metadata) and ID.

Avoid: doc, file (when you mean the content). · Source: [Kinds of entry](DOCUMENTATION-CATALOG.md#kinds-of-entry)

### Document type

The kind of a document in the catalog, such as `spec`, `adr`, or `glossary`. It is the `type` field in the metadata.

Avoid: template, category. · Source: [Document catalog](DOCUMENTATION-CATALOG.md#document-catalog)

### Document tags

The five properties of each document type in the catalog: **phase** (`P0`–`P6`), **focus** (`BIZ`, `FUN`, `TEC`), **life** (`LIVE`, `CHG`), **relevance** (`MUST`, `SHOULD`, `COULD`), and **context** (`any`, `ui`, `api`…).

Source: [How to read this catalog](DOCUMENTATION-CATALOG.md#how-to-read-this-catalog)

### Fragment

A reusable section or diagram inside a document, such as `user-story` or `tasks`. It has no ID of its own and uses the metadata of its host document.

Avoid: partial, snippet, sub-document. · Source: [Fragment catalog](DOCUMENTATION-CATALOG.md#fragment-catalog)

### Template

The starting structure for one document type. Skills fill it. Scripts create files from it.

Avoid: example, skeleton. · Source: [Document templates](INTENT.md#document-templates)

### Living document

A document maintained for the whole life of a project. Update it when the knowledge it holds changes.

Avoid: permanent doc, reference doc. · Code: `LIVE`. · Source: [Life](DOCUMENTATION-CATALOG.md#3-life)

### Change document

A document written for one change. When the change closes, its status becomes `done` and it is never edited again.

Avoid: temporary doc, working doc. · Code: `CHG`. · Source: [Life](DOCUMENTATION-CATALOG.md#3-life)

### Project set

The five living documents that every project has: agent instructions, conventions, glossary, README, and changelog.

Avoid: minimum docs, core docs. · Source: [Project set](DOCUMENTATION-CATALOG.md#project-set)

### Metadata

The YAML frontmatter at the start of every document: `id`, `type`, `title`, `status`, `date`, and `links`.

Avoid: header, properties. · Code: `META`. · Source: [Metadata](DOCUMENTATION-CATALOG.md#metadata-meta)

### Document ID

The unique identifier of a document. The catalog defines the rules for each document type. A wiki page uses its file name without `.md`.

Avoid: number, key. · Source: [Metadata](DOCUMENTATION-CATALOG.md#metadata-meta)

## Key documents

The documents that a change or a project uses most. The [documentation catalog](DOCUMENTATION-CATALOG.md#document-catalog) lists all of them.

### Spec

The change document that says why a change is needed, what it covers, and how to accept it. A person approves it before any code.

Avoid: requirements, ticket, PRD (a different document, for an `epic`). · Code: `spec`. · Source: [Discovery and planning](DOCUMENTATION-CATALOG.md#p1--discovery-and-planning)

### Acceptance criteria

The observable outcomes that a change must produce: typical, boundary, and error cases. They guide the checks.

Avoid: definition of done (a project-wide rule in the conventions). · Code: `acceptance` fragment. · Source: [Fragment catalog](DOCUMENTATION-CATALOG.md#fragment-catalog)

### Implementation plan

The change document that lists the tasks, dependencies, risks, and checks of a `feat` or `epic`. Its task checklist tracks progress across sessions and agents.

Avoid: design, roadmap. · Code: `impl-plan`. · Source: [Implementation](DOCUMENTATION-CATALOG.md#p3--implementation)

### Review report

The change document that records the checks with their evidence, the findings, and the decisions that need human approval.

Avoid: QA report, PR description. · Code: `review-report`. · Source: [Verification and review](DOCUMENTATION-CATALOG.md#p4--verification-and-review)

### ADR

Architecture decision record. A living document for one significant, hard-to-reverse decision. A new ADR supersedes it; nobody edits it.

Avoid: decision note (a lighter record of a thinking session). · Code: `adr`. · Source: [Design](DOCUMENTATION-CATALOG.md#p2--design)

### Design system

The visual identity of a project: design tokens, components, and usage rules. AIDDbot keeps its own in [DESIGN.md](DESIGN.md).

Avoid: style guide, theme. · Code: `design-system`. · Source: [Design](DOCUMENTATION-CATALOG.md#p2--design)

## Knowledge

How knowledge stays true after a change closes. Closed change documents become [sources](#source). The [wiki](#knowledge-wiki) [harvests](#harvest) them into current, cited pages.

### Ontology

The domain model of AIDDbot: the kinds of things, how they relate, and the rules that always hold. The glossary defines the terms; the ontology defines their relationships.

Also called: domain model. · Code: `domain-model`. · Source: [AIDDbot ontology](ONTOLOGY.md)

### Knowledge wiki

The linked Markdown pages in `docs/wiki/` that hold what a project knows now. Agents maintain it from sources.

Avoid: docs (alone), knowledge base. · Source: [Wiki model](KNOWLEDGE-WIKI.md#model)

### Wiki page

A living prose document in the wiki, about one topic. Every claim cites a source.

Avoid: note, article. · Code: `wiki-page`. · Source: [What is a wiki page](KNOWLEDGE-WIKI.md#what-is-a-wiki-page)

### Source

An original input that the wiki cites and never edits: a closed change document, an ADR, a raw file, or an external URL.

Avoid: reference, input. · Source: [Wiki model](KNOWLEDGE-WIKI.md#model)

### Citation

A relative Markdown link from a claim to its source. A claim without one is marked `(unverified)`.

Avoid: footnote, reference. · Source: [Page rules](KNOWLEDGE-WIKI.md#page-rules)

### Conflict

Two sources that say different things about the same fact. The wiki shows both and a person decides.

Avoid: inconsistency, error. · Source: [Page rules](KNOWLEDGE-WIKI.md#page-rules)

### Harvest

Moving durable knowledge from a closed change to the living documents it affects. For wiki pages, the harvest is an [ingest](#ingest).

Avoid: sync, update docs. · Source: [Principles](DOCUMENTATION-CATALOG.md#principles)

### Ingest

The wiki operation that reads a source and updates or creates pages, with citations and flagged conflicts.

Avoid: import, load. · Source: [Ingest a source](KNOWLEDGE-WIKI.md#1-ingest-a-source)

### Wiki operation

One of the three actions of the wiki skill: **ingest** a source, **answer** a question, or **review** the wiki.

Avoid: review (alone, for the wiki review): say "wiki review" to tell it from the review step of a change. · Source: [Operations](KNOWLEDGE-WIKI.md#operations)

### Wiki index

The file `docs/wiki/index.md`, with one line per page. Agents read it first.

Avoid: table of contents, home. · Source: [index.md](KNOWLEDGE-WIKI.md#indexmd)

### Wiki log

The append-only file `docs/wiki/log.md`, with one entry per wiki operation.

Avoid: log (alone), history. · Not the same as the [monitoring log](#monitoring-log). · Source: [log.md](KNOWLEDGE-WIKI.md#logmd)

## Change history

- v5: define document IDs in terms of the rules for each document type.
- v5: define ontology as the domain model of AIDDbot.
- v4: define ontology and link to the relationships between glossary terms.
- v3: readable contents list with one guiding question per group; an introduction for each group; documents split into **Document model** and **Key documents**.
- v2: group terms by category with a contents list; one section per term for direct links; **Avoid** lists for synonyms; new terms for people, building blocks, workflow, documents, and wiki; separate meanings for review, log, and script.
- v1: initial table of core terms.
