---
id: glossary
type: glossary
title: AIDDbot Glossary
status: draft
created: 2026-11-24
updated: 2026-11-25
links:
  sources:
    - AGENTS.md
    - PLAN.md
    - https://www.domainlanguage.com/ddd/reference/
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
| <a id="repository"></a>Repository | A Git repository. The official Git term. | — |
| <a id="project"></a>Project | A repository seen as a place of work: its `AGENTS.md`, specs, wiki, and roadmap. AIDDbot installs in a project. A monorepo is one project. **Avoid:** project, for a part of a monorepo (as Nx and .NET use it). | — |
| <a id="package"></a>Package | A unit of code in a project that is built and versioned on its own, such as an npm package or a part of a monorepo. **Avoid:** module, for this concept. | `packages/` |
| <a id="product"></a>Product | What the software does or should do for its users, and the value it gives them. One or more systems deliver it. | — |
| <a id="system"></a>System | Software with observable behavior: it takes inputs and gives responses. It can be a whole product, a service, a CLI, or a component. Packages from one or more repositories build it. | `<system>` in `EARS` |
| <a id="project-context"></a>Project context | The conventions, commands, and constraints of a project that agents read before they work. | `AGENTS.md` |
| <a id="change"></a>Change | One unit of work that goes from a spec to a merge. It has one change type and one spec. [Change flow](documentation-catalog.md#change-flow) | — |
| <a id="change-type"></a>Change type | The category of a change. It matches the Conventional Commits type and guides the requirements. An `epic` only groups specs. [Change types](documentation-catalog.md#change-types) | `chore`, `refactor`, `fix`, `feat` |
| <a id="impact-level"></a>Impact level | How much process a change needs: `small`, `medium`, or `large`. A skill proposes it from criteria, and a person confirms it. It is independent of the change type. **Avoid:** level (alone), size. [Impact levels](documentation-catalog.md#impact-levels) | `impact` |
| <a id="change-flow"></a>Change flow | The five steps of every change: Analysis, Design, Implementation, Verification, and Close. The first four are lifecycle phases at change level. [Change flow](documentation-catalog.md#change-flow) | — |
| <a id="lifecycle-phase"></a>Lifecycle phase | One of the seven phases that AIDDbot covers: Foundation, Analysis, Design, Implementation, Verification, Release, Maintenance. **Avoid:** stage. [Lifecycle phases](intent.md#lifecycle-phases) | — |
| <a id="project-level"></a>Project level | Work on the whole project, such as the roadmap, ADRs, a release, or an incident. [Lifecycle phases](intent.md#lifecycle-phases) | — |
| <a id="change-level"></a>Change level | Work on one change, from its spec to its close. [Lifecycle phases](intent.md#lifecycle-phases) | — |
| <a id="problem"></a>Problem | What must be solved, in the domain language. The problem space of [DDD](https://www.domainlanguage.com/ddd/reference/): domain and subdomains. Analysis works on it, at project and change level. | — |
| <a id="solution"></a>Solution | How the software solves the problem. The solution space of DDD: bounded contexts, model, and code. Design and Implementation build it. **Avoid:** solution, for a .NET solution file. | — |
| <a id="verification"></a>Verification | The evidence that the solution solves the problem. Also the lifecycle phase and the change step that check the requirements. | Spec section |
| <a id="close"></a>Close | The last step of a change: freeze the spec and harvest the knowledge. It is not a lifecycle phase. [Close a change](documentation-catalog.md#close-a-change) | — |
| <a id="spec-first"></a>Spec-first | Every change starts with a spec. The spec drives the change and is frozen when it closes. Living documents keep the knowledge afterwards. [Principles](documentation-catalog.md#principles) | — |
| <a id="spec"></a>Spec | The change document with the problem, solution, and verification of one change. A person approves it before any code, or in the pull request for a `small` change. [Spec](documentation-catalog.md#spec) | `spec` |
| <a id="user-story"></a>User story | A need of a role, in the `USERSTORY` form `As a <role>, I want <action>, so that <benefit>.` A spec has 1 to 3, coded `US1` to `US3`. [Spec](documentation-catalog.md#spec) | Spec section |
| <a id="requirement"></a>Requirement | One observable outcome that a change must produce, written in `EARS` and linked to one user story. A checkbox in the spec marks it as verified. A spec has up to 9. Each one is coded inside its user story, such as `US1R2`; from another document, `s0002-US1R2`. **Avoid:** acceptance criterion. [Spec](documentation-catalog.md#spec) | Spec section |
| <a id="scenario"></a>Scenario | One example of a requirement, in `GHERKIN` steps: `Given`, `When`, `Then`. It has the full requirement code as a tag, such as `@s0002-US1R2`. End-to-end tests run it. [Spec](documentation-catalog.md#spec) | `Scenario` |
| <a id="feature-file"></a>Feature file | A Gherkin file with the scenarios of one user story, in the spec folder, such as `US1.feature`. Design writes it, and a person approves it with the spec. Implementation generates the end-to-end tests from it. [Document catalog](documentation-catalog.md#document-catalog) | `feature-file` |
| <a id="domain-model"></a>Domain model | The living document of the bounded contexts, aggregates, and entities of a project, with their relations in a Mermaid `erDiagram`. A spec shows only the data model that its change touches. [Document catalog](documentation-catalog.md#document-catalog) | `domain-model` |
| <a id="task"></a>Task | One step of a change, small enough to verify on its own. Tasks are a checklist in the spec, or in an `impl-plan` when one exists. | Spec section |
| <a id="review"></a>Review | A check of the diff of a change against the review gates, by an agent or a person. It decides pass or changes needed. It is part of the Verification step. **Avoid:** review (alone) for the wiki review. Say "wiki review". | `review-report` (when separate) |
| <a id="check"></a>Check | An action that verifies a result: a test, a linter, a type check, or a manual review step. | — |
| <a id="quality-check"></a>Quality check | A deterministic check that runs in Implementation: build, format, lint, or unit tests. Foundation sets up their commands in `agent-instructions`. [Quality checks](documentation-catalog.md#quality-checks) | — |
| <a id="e2e-test"></a>End-to-end test | A test that checks the system from outside, generated from a feature file. It keeps the scenario tags. Another agent instance writes it, in its own package, without reading the source code. [Independent end-to-end tests](documentation-catalog.md#independent-end-to-end-tests) | `e2e-test` |
| <a id="test-report"></a>Test report | The result of one run of the end-to-end tests: pass or fail for each scenario, grouped by requirement tag. Verification writes it. Git does not keep it. | `test-report` |
| <a id="check-report"></a>Check report | The result of one run of the quality checks, with each error and its place in the code. The agent reads it to fix the code. The last one goes to Verification. Git does not keep it. [Quality checks](documentation-catalog.md#quality-checks) | `check-report` |
| <a id="review-gate"></a>Review gate | One area that the agent review checks on the diff. It gives pass or changes needed. The defaults are security, user experience, and maintainability. A project configures its gates in `agent-instructions`. [Review gates](documentation-catalog.md#review-gates) | — |
| <a id="evidence"></a>Evidence | The output that shows a check ran and what it found: a test result, a log excerpt, a screenshot, or a link. [Inclusion criteria](intent.md#inclusion-criteria) | — |
| <a id="finding"></a>Finding | A problem, gap, or lesson found during a change. Process findings improve the way of working. | `review-report` |
| <a id="human-approval"></a>Human approval | A decision that a person must take before the agent continues. Skills mark these decisions and show the evidence. [Inclusion criteria](intent.md#inclusion-criteria) | — |
| <a id="living-document"></a>Living document | A document maintained for the whole life of a project. [Life](documentation-catalog.md#life) | `LIVE` |
| <a id="change-document"></a>Change document | A document written for one change. When the change closes, its status becomes `done` and nobody edits it again. [Life](documentation-catalog.md#life) | `CHG` |
| <a id="metadata"></a>Metadata | The YAML frontmatter at the start of every document: `id`, `type`, `title`, `status`, `created`, `updated`, and `links`. A spec also has `change`, its change type, and `impact`, its impact level. The `id` is unique. [Metadata](documentation-catalog.md#metadata-meta) | `META` |
| <a id="adr"></a>ADR | Architecture decision record. A living document for one significant, hard-to-reverse decision. A new ADR supersedes it; nobody edits it. | `adr` |
| <a id="changelog"></a>Changelog | The versioned history of notable changes, in `CHANGELOG.md`. **Avoid:** log (alone). | `changelog` |
| <a id="knowledge-wiki"></a>Knowledge wiki | The linked Markdown pages in `docs/wiki/` that hold what a project knows now: a second brain for all the project documentation. Agents maintain it from sources. **Avoid:** brain, second brain (as a term). [Wiki model](knowledge-wiki.md#model) | `docs/wiki/` |
| <a id="knowledge-explorer"></a>Knowledge explorer | A static web site that tells the story of AIDDbot to people: a map of the method, one page for each element, and the full documents. It reads the AIDDbot documents and never edits them. It does not ship. [Explorer development](explorer-development.md) | `packages/explorer/` |
| <a id="wiki-page"></a>Wiki page | One page of the knowledge wiki, about one topic. **Avoid:** note, doc. [Page rules](knowledge-wiki.md#page-rules) | `wiki-page` |
| <a id="source"></a>Source | An original input that the wiki cites and never edits, such as a closed spec, a review report, an ADR, an issue, a pull request, or a raw file. [Sources](knowledge-wiki.md#sources) | — |
| <a id="harvest"></a>Harvest | Moving durable knowledge from a closed change to the living documents that it affects. For wiki pages, the harvest is an ingest. [Principles](documentation-catalog.md#principles) | — |
