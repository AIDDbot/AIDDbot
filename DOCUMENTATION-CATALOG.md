# AIDDbot Documentation Catalog

The documents that AIDDbot uses, the rules for each change, and the standards that the templates follow. See [INTENT.md](INTENT.md).

Status: **draft**. The catalog holds only the documents that the next real change needs. The others are [names for later](#other-documents-and-standards).

## Principles

1. **Spec-first, not spec-anchored.** Every change starts with a spec. A person approves its goal, scope, and acceptance before any code. The spec drives the change and is frozen when the change closes. It is not maintained afterwards. [Böckeler on SDD levels](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html)
2. **One spec per change.** Separate documents appear only when an [explicit criterion](#when-to-separate-documents) asks for them.
3. **Living knowledge is harvested, not anchored.** When a change closes, durable knowledge moves to the living documents that it affects: glossary, ADRs, wiki pages, changelog.
4. **Fewer documents, more sections.** If content always travels with another document, it is a section of that document.

## Tags

Each document has two tags.

### Life

| Code | Life | Rule |
| --- | --- | --- |
| `LIVE` | Living | Maintained for the whole project. Updated when knowledge changes. |
| `CHG` | Change | Written for one change. Frozen with status `done` when the change closes. A later change writes a new document. |

### Relevance

| Code | Relevance | Rule |
| --- | --- | --- |
| `MUST` | Required | Always produce it. A skill blocks completion without it. |
| `SHOULD` | Recommended | Produce it by default. Skip it only with a written reason. |
| `COULD` | Optional | Produce it only when its condition is true. |

## Project set

Every project creates and maintains these `LIVE` documents: `agent-instructions`, `readme`, `changelog`, and `glossary`.

The project conventions (code style, commits, checks) are a section of `agent-instructions`.

## Change flow

Every change follows four steps:

1. **Specify.** Write the spec. A person approves it.
2. **Plan.** Split the work into tasks, each with a check, when tasks help to coordinate the work.
3. **Build and review.** Implement the change. Run the checks and record the evidence.
4. **Close.** Record the results, freeze the spec, and harvest the knowledge.

### Change types

The type follows [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/). It guides the acceptance criteria.

| Type | Use for | Acceptance |
| --- | --- | --- |
| `chore` | Tooling, dependencies, configuration, docs. No behavior change. | The check that shows the result works. |
| `refactor` | Internal structure change. No behavior change. | Behavior is unchanged. The existing checks pass. |
| `fix` | A defect. Behavior returns to what was expected. | Always a regression case: it fails before the fix and passes after it. |
| `feat` | New or changed behavior for users. | Observable outcomes: typical, boundary, and error cases. |

An `epic` is not a change type. It only groups several specs.

### Spec

One spec per change. Sections:

| Section | Content | When |
| --- | --- | --- |
| Goal | Why the change is needed. | Always. |
| Scope | What is in and what is out. | Always. |
| Acceptance | Observable outcomes, as the [change type](#change-types) asks. | Always. |
| Tasks | Ordered checklist. Each task has a check. | When tasks help to coordinate the work. |
| Verification | At close: the checks, their results, and their evidence, or a link to the review of the pull request. | Always, at close. |
| Findings | Process findings for [dogfooding](PLAN.md#dogfooding-rules). | When there are some. |

### When to separate documents

Write a separate `impl-plan` or `review-report` only if at least one of these is true. A skill can check each one.

- The change lasts more than one work session.
- Several agents or people work on the change.
- The change affects more than one package.

### Close a change

1. Record the checks, their results, and their evidence in the spec, or link to the review.
2. Set the spec status to `done`. Do not edit it again.
3. Update the `LIVE` documents that the change affects.
4. Add a `changelog` entry if the change matters to people who use AIDDbot.

## Document catalog

| ID | Document | Life | Relevance | Standards | Purpose |
| --- | --- | --- | --- | --- | --- |
| `spec` | Change specification | `CHG` | `MUST` | `EARS`, `GWT`, `META` | Goal, scope, acceptance, and verification of one change. Approved before code. |
| `impl-plan` | Implementation plan | `CHG` | `COULD`: [criterion](#when-to-separate-documents) | `META` | Tasks, dependencies, and risks. Its checklist tracks progress across sessions and agents. |
| `review-report` | Review report | `CHG` | `COULD`: [criterion](#when-to-separate-documents) | `META` | Checks with evidence, findings, and decisions that need human approval. |
| `adr` | Architecture decision record | `LIVE` | `MUST` for a significant, hard-to-reverse decision | `MADR`, `META` | One decision: context, options, outcome, consequences. A new ADR supersedes it. Nobody edits it. |
| `glossary` | Glossary | `LIVE` | `MUST` | `META` | Shared terms for people, agents, documents, and code. |
| `wiki-page` | Knowledge wiki page | `LIVE` | `SHOULD` | `LLMWIKI`, `META` | One topic, linked to its sources. See [KNOWLEDGE-WIKI.md](KNOWLEDGE-WIKI.md). |
| `agent-instructions` | Agent instructions | `LIVE` | `MUST` | — | `AGENTS.md`: project context, commands, conventions, and rules for agents. [AGENTS.md format](https://agents.md/) |
| `readme` | README | `LIVE` | `MUST` | — | Understand the project, set it up, and make a first change. |
| `changelog` | Changelog | `LIVE` | `MUST` | `KEEPACL`, `SEMVER`, `CONVCOMMIT` | Versioned history of notable changes. |
| `design-system` | Design system | `LIVE` | `COULD` with a user interface or visual outputs | — | Colors, fonts, and diagram rules. AIDDbot keeps its own in [DESIGN.md](DESIGN.md), in the [DESIGN.md format](https://github.com/google-labs-code/design.md/blob/0.4.0/docs/spec.md). |

## Metadata (`META`)

Every document starts with YAML frontmatter:

```yaml
---
id: s0001               # Unique document ID
type: spec              # document ID from this catalog
change: feat            # spec only: chore | refactor | fix | feat
title: Add the spec template
status: draft           # draft | proposed | accepted | done | superseded | deprecated
date: 2026-11-24        # ISO 8601, last status change
links:
  sources: []           # evidence and inputs
  related: []           # other document IDs
  supersedes: []        # document IDs this one replaces
---
```

In `DESIGN.md`, put the `META` fields under `aiddbot` in the same YAML frontmatter. Keep the design format keys at the top level.

### Document IDs and file names

| Document | `id` | File |
| --- | --- | --- |
| `spec` | `s<NNNN>`: one sequence with four digits for all change types, such as `s0001`. | `docs/specs/s<NNNN>-<short-slug>.spec.md` |
| `impl-plan` | The spec ID with a suffix: `s0001-plan`. | `docs/specs/s<NNNN>-<short-slug>.plan.md` |
| `review-report` | The spec ID with a suffix: `s0001-review`. | `docs/specs/s<NNNN>-<short-slug>.review.md` |
| Wiki page | The file name without `.md`. | `docs/wiki/<topic>.md` |

- `<short-slug>` uses lowercase words joined by hyphens.
- The ID does not show the change type. The `change` field holds it, so a spec can change its type without a new file name.
- The `adr` IDs and file names are decided with the first ADR.
- The rule is provisional. The spec template in H2 confirms or changes it (decision 11).

Status use:

- `spec`, `impl-plan`, `review-report`: `draft` → `accepted` → `done`.
- `adr`: `proposed` → `accepted` → `superseded` or `deprecated`.
- Other `LIVE`: `draft` → `accepted`; then updated in place.

## Standards

Documents without a standard use plain Markdown and `META`. Add a standard only when a real change needs it.

| Code | Standard | Pattern or content | Used by |
| --- | --- | --- | --- |
| `CONVCOMMIT` | [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) | `<type>(<scope>): <description>` | Change types, commits, `changelog` |
| `EARS` | [Easy Approach to Requirements Syntax](https://alistairmavin.com/ears/) | `When <trigger>, the <system> shall <response>` | `spec` acceptance |
| `GWT` | [Given–When–Then](https://cucumber.io/docs/gherkin/reference/) | `Given <context> When <action> Then <result>` | `spec` acceptance |
| `MADR` | [MADR](https://adr.github.io/madr/) | Context, drivers, options, outcome, consequences | `adr` |
| `KEEPACL` | [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) | Added, Changed, Deprecated, Removed, Fixed, Security | `changelog` |
| `SEMVER` | [Semantic Versioning](https://semver.org/) | `MAJOR.MINOR.PATCH` | `changelog`, AIDDbot CLI |
| `LLMWIKI` | [LLM Wiki pattern](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) | Summary pages linked to sources | `wiki-page` |
| `META` | [AIDDbot metadata](#metadata-meta) | [YAML](https://yaml.org/spec/) frontmatter, [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) dates | All documents |

## Other documents and standards

Names only. Add one to the tables above when a real change needs it. See the [future ideas](PLAN.md#future-ideas).

- **Documents:** `conventions` (a section of `agent-instructions` for now), `prd`, `decision-note`, `vision`, `business-rules`, `process-model`, `example-map`, `domain-model`, `quality-attrs`, `tech-design`, `architecture`, `er-model`, `api-contract`, `event-contract`, `data-schema`, `threat-model`, `spike`, `migration-plan`, `gherkin`, `release-notes`, `deploy-plan`, `runbook`, `postmortem`, `tech-debt`, `diataxis-doc`.
- **Regulated profile:** `brd`, `srs`, `use-case`, `traceability`. If a project needs regulated documentation, its obligations decide what to add.
- **Spec sections for later:** `user-story`, `defect`, `ui-spec`, `decision-table`, `state-model`, `sequence`, `ui-checklist`.
- **Standards:** `RGB`, `BCP14`, `GHERKIN`, `CONVCOMMENTS`, `AGENTSMD`, `SCRUM`, `LEANCANVAS`, `JTBD`, `UC`, `ISO29148`, `ARC42`, `BLAMELESS`, `DIATAXIS`, `DESIGNMD`, `MERMAID`, `UML`, `C4`, `ER`, `BPMN`, `DMN`, `OPENAPI`, `ASYNCAPI`, `JSONSCHEMA`, `DTCG`, `CSF`, `3C`, `INVEST`, `EXMAP`, `ISO25010`, `WCAG`, `APG`, `STRIDE`, `ASVS`, `AAA`, `BVA`.

## Decisions

| # | Question | Decision | Reason |
| --- | --- | --- | --- |
| 1 | Is a 3-level focus enough? | Superseded by decision 15. | — |
| 2 | Is the minimum set too heavy? | Split into a [project set](#project-set) (once) and one spec per change. | No "one size fits all". |
| 3 | Relevance per change size? | Superseded by decision 16. The change type guides the acceptance criteria. | — |
| 4 | `META` fields? | `id`, `type`, `title`, `status`, `date`, `links`. A spec adds `change`. | Minimum that supports IDs, status, and traceability. The change type can change without a new ID. |
| 5 | ADR format? | `MADR` only. | Current standard; its minimal variant covers the Nygard form. |
| 6 | Standards for the remaining documents? | None. Plain Markdown + `META`. | YAGNI. |
| 7 | Is `progress-log` a document? | No. Progress lives in the tasks of the spec or the `impl-plan`. | One source of truth for progress. |
| 8 | Where do user stories live? | Inside the `spec`, when they help. | Spec-first: the spec is the unit of change. |
| 9 | Spec-first or spec-anchored? | Spec-first. Knowledge is harvested into `LIVE` documents. | Specs stay small; living docs stay true. |
| 10 | Where do `CHG` documents go after `done`? | They stay in the same folder. Status `done` marks them. | Links never break. |
| 11 | How are document IDs assigned? | Specs use one neutral sequence, `s0001`, with the file `s0001-<short-slug>.spec.md`. Plans and reviews reuse the spec name with `.plan.md` and `.review.md`. The change type goes in the `change` field, not in the ID. ADR IDs wait for the first ADR. The H1 spec uses this provisional rule; the spec template in H2 confirms or changes it. See [document IDs](#document-ids-and-file-names). | The first spec needs a clear rule. A type letter in the ID would force a rename when the type changes. The suffix groups the documents of one change. |
| 12 | Review and verification: one document or two? | One. It is a section of the spec, or a `review-report` when the [criterion](#when-to-separate-documents) asks for one. | Both are written at the same moment for the same change. |
| 13 | UI specification: document or section? | A section of the `spec`, for later. | Spec-first: UI behavior is part of the change. `design-system` keeps the durable part. |
| 14 | Are prose `LIVE` documents wiki pages? | Yes. The AIDDbot wiki starts in H1 (decision 19). | One fact, one home. |
| 15 | Which tags does a document need? | Two: life and relevance. | Phase, focus, and context did not change any decision for the next change. |
| 16 | How many documents does a change need? | One spec. A separate `impl-plan` or `review-report` only with an explicit criterion that a skill can check. | Small changes stay light. The criterion is checkable. |
| 17 | Which change types? | `chore`, `refactor`, `fix`, `feat`. An `epic` only groups specs. No `prd` and no regulated profile for now. | They wait for a real need. |
| 18 | How large is the catalog? | About ten documents with tables. The others are names. | Design only what the next real change needs. |
| 19 | Do the foundational documents move to `docs/wiki/`? | Yes, in H1. `AGENTS.md`, `README.md`, `CHANGELOG.md`, `PLAN.md`, and `DESIGN.md` stay at the root. | The wiki is the base of AIDDbot documentation. AIDDbot tests its own wiki before its skills help teams keep one. |
