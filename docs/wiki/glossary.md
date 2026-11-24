---
id: glossary
type: glossary
title: AIDDbot Glossary
status: draft
created: 2026-11-24
updated: 2026-11-24
links:
  sources:
    - AGENTS.md
    - PLAN.md
  related:
    - intent
    - documentation-catalog
    - knowledge-wiki
    - aiddbot-cli
  supersedes: []
---

# AIDDbot Glossary

The shared language of AIDDbot. People, agents, documents, and code use these terms with these meanings. This page is the single source of truth for them.

## How to use this glossary

- Use the term exactly as written here.
- **Avoid** marks words that cause real confusion. Do not use them for the same concept.
- Write a code identifier in backticks, such as `spec`.
- Link to a term with its anchor, such as `glossary.md#spec`.
- Add or change a term here first. Then update the documents that use it.
- Add a term when two or more documents use it, or when people confuse it with another term.

## Terms

| Term | Definition | Code |
| --- | --- | --- |
| <a id="aiddbot"></a>AIDDbot | A framework of reusable skills, document templates, and scripts for AI-assisted software development. [Intent](intent.md#purpose) | — |
| <a id="person"></a>Person | A human who works on a project: writes specs, reviews changes, and gives human approval. **Avoid:** user. A user is the end user of the software. | — |
| <a id="agent"></a>Agent | An AI model that works in an AI coding tool. It follows skills and project context, and it calls scripts. | — |
| <a id="ai-coding-tool"></a>AI coding tool | An application that runs an agent on a project, such as Codex, Claude Code, or Cursor. [Shared core](intent.md#shared-core) | — |
| <a id="dogfooding"></a>Dogfooding | Testing AIDDbot on AIDDbot. This repository uses each skill, template, and script as soon as it exists. [Rules](../../PLAN.md#dogfooding-rules) | — |
| <a id="skill"></a>Skill | Instructions for a recurring development activity: objective, required context, expected outputs, and checks. The agent chooses the approach. [Building blocks](intent.md#building-blocks) | `SKILL.md` |
| <a id="script"></a>Script | A command that does one deterministic task with defined inputs, outputs, and errors. Skills call it. **Avoid:** tool, helper. [Script contract](aiddbot-cli.md#script-contract) | `aiddbot <group> <action>` |
| <a id="aiddbot-cli"></a>AIDDbot CLI | The single executable that ships all scripts as subcommands. Skills call a pinned version. [Command form](aiddbot-cli.md#command-form) | `aiddbot` |
| <a id="installer"></a>Installer | The program that installs and updates a pinned AIDDbot release in a project: skills, templates, and CLI. **Avoid:** script, for the installer. [H4](../../PLAN.md#h4--distribution-and-versions) | — |
| <a id="project-context"></a>Project context | The conventions, commands, and constraints of a project that agents read before they work. | `AGENTS.md` |
| <a id="change"></a>Change | One unit of work that goes from a spec to a merge. It has one change type and one spec. [Change flow](documentation-catalog.md#change-flow) | — |
| <a id="change-type"></a>Change type | The category of a change. It matches the Conventional Commits type and guides the acceptance criteria. An `epic` only groups specs. [Change types](documentation-catalog.md#change-types) | `chore`, `refactor`, `fix`, `feat` |
| <a id="change-flow"></a>Change flow | The four steps of every change: specify, plan, build and review, close. [Change flow](documentation-catalog.md#change-flow) | — |
| <a id="spec-first"></a>Spec-first | Every change starts with a spec. The spec drives the change and is frozen when it closes. Living documents keep the knowledge afterwards. [Principles](documentation-catalog.md#principles) | — |
| <a id="spec"></a>Spec | The change document with the goal, scope, acceptance, and verification of one change. A person approves it before any code. [Spec](documentation-catalog.md#spec) | `spec` |
| <a id="acceptance-criteria"></a>Acceptance criteria | The observable outcomes that a change must produce. They guide the checks. | Spec section |
| <a id="task"></a>Task | One step of a change, small enough to verify on its own. Tasks are a checklist in the spec, or in an `impl-plan` when one exists. | Spec section |
| <a id="review"></a>Review | The step of a change that runs the checks and records the evidence. **Avoid:** review (alone) for the wiki review. Say "wiki review". | `review-report` (when separate) |
| <a id="check"></a>Check | An action that verifies a result: a test, a linter, a type check, or a manual review step. | — |
| <a id="evidence"></a>Evidence | The output that shows a check ran and what it found: a test result, a log excerpt, a screenshot, or a link. [Inclusion criteria](intent.md#inclusion-criteria) | — |
| <a id="finding"></a>Finding | A problem, gap, or lesson found during a change. Process findings improve the way of working. | Spec section |
| <a id="human-approval"></a>Human approval | A decision that a person must take before the agent continues. Skills mark these decisions and show the evidence. [Inclusion criteria](intent.md#inclusion-criteria) | — |
| <a id="living-document"></a>Living document | A document maintained for the whole life of a project. [Life](documentation-catalog.md#life) | `LIVE` |
| <a id="change-document"></a>Change document | A document written for one change. When the change closes, its status becomes `done` and nobody edits it again. [Life](documentation-catalog.md#life) | `CHG` |
| <a id="metadata"></a>Metadata | The YAML frontmatter at the start of every document: `id`, `type`, `title`, `status`, `created`, `updated`, and `links`. A spec also has `change`, its change type. The `id` is unique. [Metadata](documentation-catalog.md#metadata-meta) | `META` |
| <a id="adr"></a>ADR | Architecture decision record. A living document for one significant, hard-to-reverse decision. A new ADR supersedes it; nobody edits it. | `adr` |
| <a id="changelog"></a>Changelog | The versioned history of notable changes, in `CHANGELOG.md`. **Avoid:** log (alone). | `changelog` |
| <a id="knowledge-wiki"></a>Knowledge wiki | The linked Markdown pages in `docs/wiki/` that hold what a project knows now: a second brain for all the project documentation. Agents maintain it from sources. **Avoid:** brain, second brain (as a term). [Wiki model](knowledge-wiki.md#model) | `docs/wiki/` |
| <a id="wiki-page"></a>Wiki page | One page of the knowledge wiki, about one topic. **Avoid:** note, doc. [Page rules](knowledge-wiki.md#page-rules) | `wiki-page` |
| <a id="source"></a>Source | An original input that the wiki cites and never edits, such as a closed spec, a review report, an ADR, an issue, a pull request, or a raw file. [Sources](knowledge-wiki.md#sources) | — |
| <a id="harvest"></a>Harvest | Moving durable knowledge from a closed change to the living documents that it affects. For wiki pages, the harvest is an ingest. [Principles](documentation-catalog.md#principles) | — |
