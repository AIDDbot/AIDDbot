# AIDDbot Documentation Catalog

Provisional catalog of documents AIDDbot can generate from templates, and the standards those templates use. See [INTENT.md](INTENT.md).

Status: **draft**. Classifications are proposals for review.

## Principles

1. **Spec-first, not spec-anchored.** Every change starts with a spec. The spec drives the change and is closed after merge. It is not maintained afterwards. [Böckeler on SDD levels](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html)
2. **Documentation fits the change.** A chore needs little documentation. An epic needs much more. See [change profiles](#change-profiles).
3. **Living knowledge is harvested, not anchored.** When a change closes, durable knowledge moves to living documents: glossary, ADRs, contracts, data model, wiki, changelog. Prose knowledge documents are pages of the [knowledge wiki](KNOWLEDGE-WIKI.md); the harvest is the wiki's `ingest` operation.
4. **Fewer documents, more sections.** If content always travels with another document, it is a fragment of that document.

## How to read this catalog

The ontology shows how document types and fragments relate to changes and wiki pages. [AIDDbot ontology](ONTOLOGY.md)

### Kinds of entry

| Kind | Meaning | Example |
| --- | --- | --- |
| **Document** | A standalone file with its own ID and metadata. | `adr`, `spec` |
| **Fragment** | A reusable section or diagram. It lives inside one or more documents. | `user-story` inside `spec` |

Each document has five tags.

### 1. Phase

The SDLC stage where the document is first written. Phases follow [INTENT.md](INTENT.md#lifecycle-coverage).

| Code | Phase |
| --- | --- |
| `P0` | Cross-cutting (all phases) |
| `P1` | Discovery and planning |
| `P2` | Design |
| `P3` | Implementation |
| `P4` | Verification and review |
| `P5` | Release and deployment |
| `P6` | Operation and maintenance |

### 2. Focus (business ↔ technology)

| Code | Focus | Main question | Main reader |
| --- | --- | --- | --- |
| `BIZ` | Business | Why? What value? | Stakeholders, product owner |
| `FUN` | Functional | What does the system do? | Product, UX, QA, developers |
| `TEC` | Technical | How is it built and run? | Developers, ops, agents |

### 3. Life

| Code | Life | Rule |
| --- | --- | --- |
| `LIVE` | Living | Maintained for the whole project. Updated when knowledge changes. |
| `CHG` | Change | Written for one change. Frozen with status `done` after merge. A later change writes a new document. |

### 4. Relevance

| Code | Relevance | Rule |
| --- | --- | --- |
| `MUST` | Required | Always produce it. A skill blocks completion without it. |
| `SHOULD` | Recommended | Produce it by default. Skip only with a written reason. |
| `COULD` | Optional | Produce it only when the team asks or the risk justifies it. |

For `CHG` documents, the relevance column shows the value for a `feat` change. The [change profiles](#change-profiles) give the value for each change type.

### 5. Context

Relevance applies only when the context is present.

| Code | The project or change has… |
| --- | --- |
| `any` | Any project |
| `ui` | A user interface |
| `api` | An HTTP API |
| `events` | Asynchronous messaging |
| `data` | Persistent data or schema changes |
| `prod` | A service running in production |
| `decision` | A significant, hard-to-reverse technical decision |
| `complex` | A large domain, several teams, or high risk |
| `regulated` | Formal, contractual, or audited requirements (see [regulated profile](#regulated-profile)) |

## Project set

Every project creates and maintains these `LIVE` documents:

`agent-instructions` · `conventions` · `glossary` · `readme` · `changelog`

## Change profiles

Each change has a type, aligned with [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/). The type decides the documents.

| Type | Use for |
| --- | --- |
| `chore` | Tooling, dependencies, configuration, docs. No behavior change. |
| `refactor` | Internal structure change. No behavior change. |
| `fix` | A defect. Behavior returns to what was expected. |
| `feat` | New or changed behavior for users. |
| `epic` | A large `feat`. It splits into several `feat` specs. |

| Document / fragment | `chore` | `refactor` | `fix` | `feat` | `epic` |
| --- | --- | --- | --- | --- | --- |
| `spec` | MUST (short) | MUST | MUST | MUST | MUST (one per `feat`) |
| ↳ `user-story` | — | — | — | MUST | MUST |
| ↳ `defect` | — | — | MUST | — | — |
| ↳ `acceptance` | — | MUST (behavior unchanged) | MUST (regression case) | MUST | MUST |
| ↳ `ui-spec` | — | — | if `ui` | if `ui` | if `ui` |
| ↳ `tasks` | MUST | MUST | MUST | in `impl-plan` | in `impl-plan` |
| `prd` | — | — | — | — | MUST |
| `tech-design` | — | COULD | — | COULD | SHOULD |
| `impl-plan` | — | — | — | MUST | MUST |
| `adr` | if `decision` | if `decision` | if `decision` | if `decision` | if `decision` |
| `review-report` | MUST | MUST | MUST | MUST | MUST |
| `changelog` entry | — | — | MUST | MUST | MUST |
| `release-notes` | — | — | — | COULD | COULD |

**Context documents** (`api-contract`, `event-contract`, `er-model`, `migration-plan`) follow their own relevance when the change touches that context.

**Closing a change**: set `spec` status to `done`. Then update the `LIVE` documents the change affects. For `fix` and `feat`, check at least:

- `business-rules`: new or changed rules from the spec.
- `gherkin`: the spec's `acceptance` examples become executable scenarios.

## Overview: phase × focus

| Phase | `BIZ` | `FUN` | `TEC` |
| --- | --- | --- | --- |
| `P0` Cross-cutting | Glossary | Wiki page | Agent instructions, conventions, README, Diátaxis docs |
| `P1` Discovery | PRD, decision note, vision, business rules, process model | Spec, example map, domain model | Quality attributes |
| `P2` Design | — | ER model | ADR, technical design, architecture, API/event contracts, data schema, threat model, design system, spike |
| `P3` Implementation | — | — | Implementation plan, data migration plan |
| `P4` Verification | — | Gherkin feature | Review report |
| `P5` Release | Release notes | — | Changelog, deployment plan |
| `P6` Operation | — | — | Runbook, postmortem, tech debt report |

## Document catalog

Standard codes link to the [standards catalog](#standards-catalog). Fragment IDs link to the [fragment catalog](#fragment-catalog).

### P0 · Cross-cutting

| ID | Document | Focus | Life | Relevance | Context | Standards | Purpose |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `agent-instructions` | Agent instructions (AGENTS.md / CLAUDE.md) | `TEC` | `LIVE` | `MUST` | any | `AGENTSMD` | Project context, commands, and rules for AI agents. |
| `conventions` | Engineering conventions | `TEC` | `LIVE` | `MUST` | any | `CONVCOMMIT`, `AAA`, `BVA`, `SCRUM`, `META` | Code style, naming, branching, test strategy, Definition of Ready and Done. |
| `glossary` | Domain glossary | `BIZ` | `LIVE` | `MUST` | any | `META` | Shared terms for people, agents, docs, and code. |
| `readme` | README / onboarding guide | `TEC` | `LIVE` | `MUST` | any | `DIATAXIS` | Understand, set up, and make a first change. |
| `wiki-page` | Knowledge wiki page | `FUN` | `LIVE` | `SHOULD` | any | `LLMWIKI`, `META` | Topic summary linked to sources and decisions. |
| `diataxis-doc` | Tutorial / how-to / reference / explanation | `TEC` | `LIVE` | `COULD` | any | `DIATAXIS` | Serve one learning or working need. |

### P1 · Discovery and planning

| ID | Document | Focus | Life | Relevance | Context | Standards | Purpose |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `prd` | Product requirements document | `BIZ` | `CHG` | `MUST` (epic) | any | `META` | Outcome, users, metrics, scope, slices. Splits into `feat` specs. |
| `decision-note` | Decision note (brainstorm outcome) | `BIZ` | `CHG` | `SHOULD` | any | `META` | Decisions, reasons, and open questions from a thinking session or workshop. |
| `vision` | Product vision | `BIZ` | `LIVE` | `COULD` | any | `LEANCANVAS`, `JTBD` | Problem, target users, value, direction. |
| `business-rules` | Business rules catalog | `BIZ` | `LIVE` | `SHOULD` | any | `EARS`, `BCP14` + `decision-table` | Policies, thresholds, calculations, exceptions shared by many specs. |
| `process-model` | Workflow / process model | `BIZ` | `LIVE` | `COULD` | complex | `BPMN`, `MERMAID` | Activities, roles, handoffs, decision points. |
| `spec` | Change specification (`feat`, `fix`, `refactor`, `chore`) | `FUN` | `CHG` | `MUST` | any | `EARS`, `BCP14`, `META` + `user-story`, `defect`, `acceptance`, `ui-spec`, `tasks`, `state-model`, `decision-table` | Why, scope, behavior, and acceptance of one change. Written and approved before code. |
| `example-map` | Example map | `FUN` | `CHG` | `COULD` | any | `EXMAP` | Rules, examples, and questions from refinement. Feeds the `spec`. |
| `domain-model` | Domain model and context map | `FUN` | `LIVE` | `SHOULD` | complex | `UML`, `MERMAID` + `state-model` | Concepts, relations, invariants; bounded contexts and how they interact. |
| `quality-attrs` | Quality attributes and SLOs | `TEC` | `LIVE` | `COULD` | prod | `ISO25010`, `EARS` | Measurable targets: performance, availability, reliability; SLO indicators and windows. |

### P2 · Design

| ID | Document | Focus | Life | Relevance | Context | Standards | Purpose |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `er-model` | Entity–relationship model and data dictionary | `FUN` | `LIVE` | `SHOULD` | data | `ER`, `MERMAID` | Entities, attributes (type, constraints, meaning), relations. |
| `adr` | Architecture decision record | `TEC` | `LIVE` | `MUST` | decision | `MADR`, `META` | One significant decision: context, options, outcome, consequences. Superseded, never edited. |
| `tech-design` | Technical design (proposal / RFC) | `TEC` | `CHG` | `COULD` | any | `C4`, `BCP14`, `META` + `sequence` | How a change fits components, interfaces, data flows. Status `proposed` works as an RFC. |
| `architecture` | Software architecture description | `TEC` | `LIVE` | `COULD` | complex | `ARC42`, `C4` | Boundaries, components, runtime, deployment. |
| `api-contract` | HTTP API contract | `TEC` | `LIVE` | `MUST` | api | `OPENAPI` | Operations, inputs, responses, errors, auth. |
| `event-contract` | Event / message contract | `TEC` | `LIVE` | `MUST` | events | `ASYNCAPI` | Channels, payloads, producers, consumers, compatibility. |
| `data-schema` | Data schema and examples | `TEC` | `LIVE` | `COULD` | data | `JSONSCHEMA` | Payload or file structure, constraints, samples. |
| `threat-model` | Threat model | `TEC` | `LIVE` | `SHOULD` | prod | `STRIDE`, `ASVS` | Assets, trust boundaries, threats, mitigations. |
| `design-system` | Design system | `TEC` | `LIVE` | `COULD` | ui | `DESIGNMD`, `DTCG`, `CSF`, `APG`, `WCAG` | Visual style, design tokens, components, UI writing rules. |
| `spike` | Spike report | `TEC` | `CHG` | `COULD` | any | — | Time-boxed question, evidence, findings. |

### P3 · Implementation

| ID | Document | Focus | Life | Relevance | Context | Standards | Purpose |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `impl-plan` | Implementation plan | `TEC` | `CHG` | `MUST` | any | `META` + `tasks` | Slices, dependencies, risks, test scope. Its task checklist tracks progress across sessions and agents. |
| `migration-plan` | Data migration plan | `TEC` | `CHG` | `MUST` | data | — | Field mapping, backfill, validation, rollback. |

### P4 · Verification and review

| ID | Document | Focus | Life | Relevance | Context | Standards | Purpose |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `review-report` | Review and verification report | `TEC` | `CHG` | `MUST` | any | `CONVCOMMENTS`, `META` + `ui-checklist` | What changed and why, checks run with evidence, review findings, open issues, decisions needing human approval. |
| `gherkin` | Gherkin feature file | `FUN` | `LIVE` | `SHOULD` | any | `GHERKIN`, `GWT` | Executable behavior scenarios. Lives with the tests. |

### P5 · Release and deployment

| ID | Document | Focus | Life | Relevance | Context | Standards | Purpose |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `changelog` | Changelog | `TEC` | `LIVE` | `MUST` | any | `KEEPACL`, `SEMVER`, `CONVCOMMIT` | Versioned history of notable changes. |
| `release-notes` | Release notes | `BIZ` | `CHG` | `COULD` | any | `KEEPACL`, `SEMVER` | Changes, compatibility, actions for users. |
| `deploy-plan` | Deployment and rollback plan | `TEC` | `CHG` | `COULD` | prod | — | Prerequisites, rollout stages, checks, recovery. |

### P6 · Operation and maintenance

| ID | Document | Focus | Life | Relevance | Context | Standards | Purpose |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `runbook` | Operational runbook | `TEC` | `LIVE` | `SHOULD` | prod | — | Diagnose, act, verify recovery, escalate. |
| `postmortem` | Incident postmortem | `TEC` | `CHG` | `SHOULD` | prod | `BLAMELESS` | Impact, timeline, causes, follow-up actions. |
| `tech-debt` | Tech debt and dependency report | `TEC` | `LIVE` | `COULD` | any | `SEMVER`, `META` | Outdated dependencies, known debt, priority, plan. |

### Regulated profile

Use these documents only in context `regulated`. They duplicate lighter documents above.

| ID | Document | Focus | Life | Replaces | Standards | Purpose |
| --- | --- | --- | --- | --- | --- | --- |
| `brd` | Business requirements document | `BIZ` | `LIVE` | `prd` | `ISO29148` | Business goals, stakeholder needs, constraints, success measures. |
| `srs` | Software requirements specification | `FUN` | `LIVE` | `spec` + `quality-attrs` | `ISO29148`, `EARS`, `BCP14` | Functional and quality requirements, interfaces, constraints. |
| `use-case` | Use case specification | `FUN` | `LIVE` | `user-story` | `UC` | Actor goal, main and alternate flows. |
| `traceability` | Requirements register and traceability matrix | `FUN` | `LIVE` | — | `ISO29148`, `META` | Requirements with source and status → scenarios → tests → results. |

Note: regulated projects are usually spec-anchored. These documents are `LIVE`.

## Fragment catalog

Fragments have no ID of their own. They follow the metadata of their host document.

| ID | Fragment | Hosts | Standards | Content |
| --- | --- | --- | --- | --- |
| `user-story` | User story | `spec` (`feat`) | `RGB`, `3C`, `INVEST` | A user need and its value. |
| `defect` | Defect description | `spec` (`fix`) | — | Repro steps, expected vs. observed, environment, evidence. |
| `acceptance` | Acceptance criteria and examples | `spec` | `GWT`, `EARS`, `BVA` | Observable outcomes: typical, boundary, exception cases. |
| `ui-spec` | UI specification | `spec` | `WCAG`, `MERMAID` | User flow, screens, wireframes, validation, and loading/empty/error/success states. |
| `tasks` | Task checklist | `spec` (`chore`, `refactor`, `fix`), `impl-plan` | — | Ordered tasks with checkboxes. Shows progress. |
| `decision-table` | Decision table | `spec`, `business-rules` | `DMN` | Outcome for every combination of conditions. |
| `state-model` | State diagram | `spec`, `domain-model` | `UML`, `MERMAID` | States, events, transitions, guards, invalid transitions. |
| `sequence` | Sequence diagram | `tech-design`, `architecture` | `UML`, `MERMAID` | Interactions for one specific flow. |
| `ui-checklist` | Visual and accessibility checklist | `review-report` | `WCAG`, `APG` | Checks across screen sizes, themes, states, keyboard, focus; screenshots. |

## Metadata (`META`)

Every document starts with YAML frontmatter:

```yaml
---
id: adr-0007            # Unique document ID. Wiki pages use their file name.
type: adr               # document ID from this catalog
title: Choose how hooks launch the CLI
status: proposed        # draft | proposed | accepted | done | superseded | deprecated
date: 2026-11-24        # ISO 8601, last status change
links:
  sources: []           # evidence and inputs
  related: []           # other document IDs
  supersedes: []        # document IDs this one replaces
---
```

In `DESIGN.md`, put the `META` fields under `aiddbot` in the same YAML frontmatter. Keep the design format keys at the top level.

Status use:

- `spec`, `impl-plan`, other `CHG`: `draft` → `accepted` → `done`.
- `adr`, `tech-design`: `proposed` → `accepted` → `superseded` or `deprecated`.
- Other `LIVE`: `draft` → `accepted`; then updated in place.

## Standards catalog

Kinds:

- **Syntax**: sentence or text patterns inside a document.
- **Structure**: the sections of a document.
- **Notation**: diagram language.
- **Format**: machine-readable file format.
- **Checklist**: quality criteria to review against.

Documents without a standard use plain Markdown + `META`. Add a standard only when a real need appears.

### Syntax

| Code | Standard | Pattern | Used by |
| --- | --- | --- | --- |
| `RGB` | [Role–goal–benefit](https://agilealliance.org/glossary/user-stories/) | `As a <role>, I want <goal> so that <benefit>` | `user-story` |
| `EARS` | [Easy Approach to Requirements Syntax](https://alistairmavin.com/ears/) | `When <trigger>, the <system> shall <response>` (ubiquitous, event, state, unwanted, optional) | `spec`, `acceptance`, `business-rules`, `quality-attrs`, `srs` |
| `GWT` | [Given–When–Then](https://cucumber.io/docs/gherkin/reference/) | `Given <context> When <action> Then <result>` | `acceptance`, `gherkin` |
| `GHERKIN` | [Gherkin](https://cucumber.io/docs/gherkin/reference/) | `Feature` › `Rule` › `Scenario` / `Scenario Outline` + `Examples` | `gherkin` |
| `BCP14` | [RFC 2119](https://www.rfc-editor.org/rfc/rfc2119) + [RFC 8174](https://www.rfc-editor.org/rfc/rfc8174.html) | Capitalized `MUST`, `SHOULD`, `MAY` | `spec`, `business-rules`, `tech-design`, `srs` |
| `CONVCOMMIT` | [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) | `<type>(<scope>): <description>` | `conventions`, `changelog`, change types |
| `CONVCOMMENTS` | [Conventional Comments](https://conventionalcomments.org/) | `<label> [decorations]: <subject>` | `review-report` |
| `SEMVER` | [Semantic Versioning](https://semver.org/) | `MAJOR.MINOR.PATCH` | `changelog`, `release-notes`, `tech-debt` |

### Structure

| Code | Standard | Sections | Used by |
| --- | --- | --- | --- |
| `MADR` | [MADR](https://adr.github.io/madr/) | Context, drivers, options, outcome, consequences (minimal variant available) | `adr` |
| `AGENTSMD` | [AGENTS.md](https://agents.md/) | Setup, commands, code style, testing, PR rules for agents | `agent-instructions` |
| `SCRUM` | [Scrum Guide](https://scrumguides.org/) | Definition of Done as a commitment for the increment | `conventions` |
| `LEANCANVAS` | [Lean Canvas](https://leanstack.com/lean-canvas) | Problem, segments, value proposition, solution, metrics | `vision` |
| `JTBD` | Jobs to be Done | Job, context, desired outcome | `vision` |
| `UC` | Structured use case | Actor, goal, trigger, preconditions, main flow, extensions, postconditions | `use-case` |
| `ISO29148` | [ISO/IEC/IEEE 29148](https://www.iso.org/standard/63712.html) | Requirements engineering documents | `brd`, `srs`, `traceability` |
| `ARC42` | [arc42](https://arc42.org/overview/) | Context, building blocks, runtime, deployment, decisions | `architecture` |
| `KEEPACL` | [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) | Added, Changed, Deprecated, Removed, Fixed, Security | `changelog`, `release-notes` |
| `BLAMELESS` | [Blameless postmortem](https://sre.google/sre-book/postmortem-culture/) | Impact, timeline, factors, actions; no blame | `postmortem` |
| `DIATAXIS` | [Diátaxis](https://diataxis.fr/) | Tutorial, how-to, reference, explanation | `readme`, `diataxis-doc` |
| `LLMWIKI` | [LLM Wiki pattern](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) | Summary pages linked to sources | `wiki-page` |
| `META` | [AIDDbot metadata](#metadata-meta) | [YAML](https://yaml.org/spec/) frontmatter, [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) dates | All documents |

### Notation

| Code | Standard | Diagrams | Used by |
| --- | --- | --- | --- |
| `MERMAID` | [Mermaid](https://mermaid.js.org/) | Diagrams as text in Markdown (default renderer) | All diagrams |
| `UML` | [OMG UML](https://www.omg.org/spec/UML/) | Class, sequence, state machine | `domain-model`, `state-model`, `sequence` |
| `C4` | [C4 model](https://c4model.com/diagrams) | Context, container, component, code | `tech-design`, `architecture` |
| `ER` | [Chen](https://doi.org/10.1145/320434.320440) / [crow's foot](https://mermaid.js.org/syntax/entityRelationshipDiagram.html) | Conceptual (Chen) or cardinality (crow's foot) | `er-model` |
| `BPMN` | [OMG BPMN](https://www.omg.org/spec/BPMN/) | Participants, activities, events, gateways | `process-model` |
| `DMN` | [OMG DMN](https://www.omg.org/spec/DMN/) | Decision tables and hit policies | `decision-table` |

### Format

| Code | Standard | Describes | Used by |
| --- | --- | --- | --- |
| `OPENAPI` | [OpenAPI](https://spec.openapis.org/oas/latest.html) | HTTP APIs | `api-contract` |
| `ASYNCAPI` | [AsyncAPI](https://www.asyncapi.com/docs/reference/specification/latest) | Message-driven interfaces | `event-contract` |
| `JSONSCHEMA` | [JSON Schema](https://json-schema.org/specification) | JSON structure and constraints | `data-schema` |
| `DESIGNMD` | [DESIGN.md format](https://github.com/google-labs-code/design.md/blob/0.4.0/docs/spec.md) | YAML design tokens and Markdown usage guidance | `design-system` |
| `DTCG` | [Design Tokens Format](https://www.designtokens.org/tr/2025.10/format/) | Typed design tokens | `design-system` |
| `CSF` | [Storybook CSF](https://storybook.js.org/docs/api/csf) | Component stories and states | `design-system` |

### Checklist

| Code | Standard | Checks | Used by |
| --- | --- | --- | --- |
| `3C` | [Three Cs](https://ronjeffries.com/xprog/articles/expcardconversationconfirmation/) | Card, conversation, confirmation | `user-story` |
| `INVEST` | [INVEST](https://xp123.com/invest-in-good-stories-and-smart-tasks/) | Independent, negotiable, valuable, estimable, small, testable | `user-story` |
| `EXMAP` | [Example Mapping](https://cucumber.io/blog/bdd/example-mapping-introduction/) | Story, rules, examples, questions | `example-map` |
| `ISO25010` | [ISO/IEC 25010](https://www.iso.org/standard/78176.html) | Product quality characteristics | `quality-attrs` |
| `WCAG` | [WCAG 2.2](https://www.w3.org/TR/WCAG22/) | Contrast, keyboard, focus, reflow | `ui-spec`, `design-system`, `ui-checklist` |
| `APG` | [ARIA APG](https://www.w3.org/WAI/ARIA/apg/patterns/) | Widget keyboard and semantics | `design-system`, `ui-checklist` |
| `STRIDE` | [STRIDE](https://learn.microsoft.com/en-us/azure/security/develop/threat-modeling-tool-threats) | Spoofing, tampering, repudiation, information disclosure, denial of service, elevation of privilege | `threat-model` |
| `ASVS` | [OWASP ASVS](https://asvs.owasp.org/) | Web security requirements | `threat-model` |
| `AAA` | Arrange–Act–Assert | Setup, action, assertions | `conventions` (test code style) |
| `BVA` | Boundary values + equivalence partitions | Edge and representative cases | `acceptance`, `conventions` (test strategy) |

## Decisions

| # | Question | Decision | Reason |
| --- | --- | --- | --- |
| 1 | Is a 3-level focus enough? | Yes: `BIZ` / `FUN` / `TEC`. | Operations is `TEC`; phase `P6` already separates it. |
| 2 | Is the minimum set too heavy? | Split into a [project set](#project-set) (once) and [change profiles](#change-profiles) (per change). | No "one size fits all". |
| 3 | Relevance per change size? | Yes, per change type: `chore`, `refactor`, `fix`, `feat`, `epic`. | Same types as Conventional Commits; current SDD practice (Spec Kit, Kiro). |
| 4 | `META` fields? | `id`, `type`, `title`, `status`, `date`, `links`. | Minimum that supports IDs, status, and traceability. |
| 5 | ADR format? | `MADR` only. | Current standard; its minimal variant covers the Nygard form. |
| 6 | Standards for the remaining documents? | None. Plain Markdown + `META`. | YAGNI. |
| 7 | Is `progress-log` a document? | No. Progress lives in the `tasks` fragment. Monitoring logs are script output. | One source of truth for progress. |
| 8 | Where do user stories live? | Inside the functional `spec`, as a fragment. | Spec-first: the spec is the unit of change. |
| 9 | Spec-first or spec-anchored? | Spec-first. Knowledge is harvested into `LIVE` documents. | Specs stay small; living docs stay true. |
| 10 | Where do `CHG` documents go after `done`? | They stay in the same folder. Status `done` marks them. | Links never break. |
| 11 | How are document IDs assigned? | Keep a separate sequence for document types with an established numbering scheme, such as ADRs. Decide spec IDs and file names when designing the spec template. | The template can define how to identify and find a spec. |
| 12 | Review and verification: one document or two? | One `review-report`. | Both are written at the same moment for the same change. |
| 13 | UI specification: document or fragment? | Fragment of `spec`. | Spec-first: UI behavior is part of the change. `design-system` keeps the durable part. |
| 14 | Are prose `LIVE` documents (glossary, business rules, domain model…) wiki pages? | Yes. They live in `docs/wiki/`; their `id` is the file name. Full list in [KNOWLEDGE-WIKI.md](KNOWLEDGE-WIKI.md#what-is-a-wiki-page). | One fact, one home. Agents and people have one entry point. |

## Change history

- v4.5: defer spec IDs and file names to the spec template work.
- v4.4: link to the ontology for relationships across the document model.
- v4.3: add `DESIGNMD` as a format for the visual identity of web artifacts and define where it stores `META` fields.
- v4.2: prose `LIVE` documents become wiki pages (decision 14).
- v4.1: `business-rules` and `gherkin` back to `SHOULD` in any project; both added to the change closing check.
- v4 (reduction: 50 → 35 documents + 4 regulated):
  - Removed: `personas`, `story-map`, `eventstorming`, `risk-register`, `exploratory-charter`. Their content goes to `vision`, `prd`, `decision-note`, `impl-plan`.
  - Merged: `dod-dor` and `test-strategy` → `conventions`; `context-map` → `domain-model`; `slo` → `quality-attrs`; `verification-report` → `review-report`; `style-guide`, `ui-writing`, `design-tokens` → `design-system`.
  - Became fragments: `ui-spec` + `user-flow` → `ui-spec`; `defect` → `defect`; `a11y-review` → `ui-checklist`.
  - Downgraded to `COULD`: `business-rules`, `example-map`, `quality-attrs`, `architecture`, `data-schema`, `gherkin`, `deploy-plan`.
  - Downgraded in `epic`: `tech-design` `MUST` → `SHOULD`; `release-notes` `SHOULD` → `COULD`.
- v3: `feature-spec` → `spec` with types; `user-story` → fragment; `tasks` fragment; `Life` tag; change profiles and project set; `MADR`; `META` defined.
- v2: fragments; merges; regulated profile; AI-specific documents and standards.
- v1: raw brainstorm.

## Open questions

None at this time.
