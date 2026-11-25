---
id: documentation-catalog
type: wiki-page
title: AIDDbot Documentation Catalog
status: draft
created: 2026-11-24
updated: 2026-11-25
links:
  sources:
    - https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html
  related:
    - intent
    - glossary
    - knowledge-wiki
  supersedes: []
---

# AIDDbot Documentation Catalog

The documents that AIDDbot uses, the rules for each change, and the standards that the templates follow. See the [intent](intent.md).

Status: **draft**. The catalog defines the documents that the lifecycle skills produce. The others are [names for later](#other-documents-and-standards).

## Principles

1. **Spec-first, not spec-anchored.** Every change starts with a spec. A person approves its problem, solution, and requirements before any code. The spec drives the change and is frozen when the change closes. It is not maintained afterwards. After approval, only its checkboxes and its `status` and `updated` fields change. [Böckeler on SDD levels](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html)
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

Every change follows five steps. The first four use the names of the [lifecycle phases](intent.md#lifecycle-phases) at change level.

| # | Step | Work | Uses | Produces |
| --- | --- | --- | --- | --- |
| 1 | Analysis | Write the Problem section and the requirements of the [spec](#spec). Clarify the open questions with a person. | `roadmap`, `glossary`, `wiki-page` | `spec` |
| 2 | Design | Write the Solution section and its tasks. Write an `adr` for a significant, hard-to-reverse decision. A person approves the whole spec. | `spec`, `wiki-page`, `design-system` | `spec`, `adr`, `impl-plan` |
| 3 | Implementation | Implement the change and update the docs. | `spec`, `impl-plan`, `agent-instructions` | Code and docs |
| 4 | Verification | Check each requirement and tick it when it passes. If a requirement fails or the change has findings, write a `review-report`. [When to separate documents](#when-to-separate-documents) | `spec` | `spec`, `review-report` |
| 5 | Close | Freeze the spec and harvest the knowledge. [Close a change](#close-a-change) | `spec`, `review-report` | `glossary`, `wiki-page`, `changelog` |

- **Uses** and **Produces** hold document IDs from the [document catalog](#document-catalog), in backticks. Other text is plain.
- The [knowledge explorer](glossary.md#knowledge-explorer) reads this table. Keep its anchor and its columns. [Page rules](knowledge-wiki.md#page-rules)

Close is the last step of a change, not a lifecycle phase. In a small change, Analysis and Design can happen in one session, before the approval.

### Change types

The type follows [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/). It guides the requirements.

| Type | Use for | Requirements |
| --- | --- | --- |
| `chore` | Tooling, dependencies, configuration, docs. No behavior change. | The check that shows the result works. |
| `refactor` | Internal structure change. No behavior change. | Behavior is unchanged. The existing checks pass. |
| `fix` | A defect. Behavior returns to what was expected. | Always a regression case: it fails before the fix and passes after it. Usually an `If … then` requirement. |
| `feat` | New or changed behavior for users. | Observable outcomes: typical (`When`), boundary (`While`, `Where`), and error (`If … then`) cases. |

An `epic` is not a change type. It only groups several specs.

### Spec

One spec per change. Its title is `# <id> - <title>`, such as `# s0002 - Build the web knowledge explorer`. It has three `##` sections: Problem, Solution, and Verification. They follow the [problem, solution, verification](glossary.md#problem) views.

| Section | Subsection | Content | Written in | When |
| --- | --- | --- | --- | --- |
| Problem | Goal | Why the change is needed. | Analysis | Always. |
| Problem | Out of scope | What the change does not do. | Analysis | Always. |
| Problem | User stories | 1 to 3 stories: `` - `US1` - As a <role>, I want <action>, so that <benefit>. `` | Analysis | Always. |
| Solution | — | A technical design that a person who does not program can read: the parts, how they work together, and the decisions. | Design | Always. |
| Solution | Tasks | Ordered checklist. Each task has a check. | Design | When tasks help to coordinate the work. |
| Verification | — | A checklist of up to 9 requirements, grouped by user story: `` - [ ] `US1R1` - <requirement> ``. | Analysis; ticked in Verification | Always. |

Rules:

- Write each requirement in [EARS](#standards), as the [change type](#change-types) asks. The `<system>` of the pattern is a [system](glossary.md#system).
- Each requirement belongs to one user story. Each user story has at least one requirement.
- Codes compose: a requirement is numbered inside its user story (`US1R1`, `US1R2`, `US2R1`). From another document, add the spec ID: `s0002-US1R2`.
- Write codes and IDs as inline code. Use a hyphen `-` between a code and its text.
- A requirement states only the expected behavior. The tasks decide how to check it. Later, end-to-end tests can automate the checks.
- After approval, the spec changes in two ways only: a checkbox is ticked, and the `status` and `updated` fields change.
- An accepted spec can go back to `draft` only before its implementation starts. Then a person rewrites it and approves it again. After the implementation starts, a problem with the spec goes to the `review-report`.
- Failed requirements and findings go to a [`review-report`](#when-to-separate-documents). The evidence stays in the check outputs: test results, CI runs, or the review of the pull request.
- If a change needs more than 3 user stories or more than 9 requirements, it is too large. Split it into several specs, grouped by an `epic` if needed.
- The scope is the user stories and the Solution. There is no "In scope" subsection.

### When to separate documents

Write a separate `impl-plan` or `review-report` only if at least one of these is true. A skill can check each one.

- The change lasts more than one work session.
- Several agents or people work on the change.
- The change affects more than one [package](glossary.md#package).

Also write a `review-report` when a requirement fails or the change has findings: lessons about the way of working, what helped, and what got in the way.

### Close a change

1. Check that every task and requirement is ticked. If one is not, the `review-report` says why.
2. Set the spec status to `done`. Do not edit it again.
3. Update the `LIVE` documents that the change affects.
4. Add a `changelog` entry if the change matters to the people who use the project.

## Document catalog

| ID | Document | Life | Relevance | Standards | Purpose |
| --- | --- | --- | --- | --- | --- |
| `spec` | Change specification | `CHG` | `MUST` | `EARS`, `META` | Problem, solution, and verification of one change. Approved before code. |
| `impl-plan` | Implementation plan | `CHG` | `COULD`: [criterion](#when-to-separate-documents) | `META` | Tasks, dependencies, and risks. Its checklist tracks progress across sessions and agents. |
| `review-report` | Review report | `CHG` | `COULD`: [criterion](#when-to-separate-documents) | `META` | Failed requirements, findings, and decisions that need human approval. |
| `adr` | Architecture decision record | `LIVE` | `MUST` for a significant, hard-to-reverse decision | `MADR`, `META` | One decision: context, options, outcome, consequences. A new ADR supersedes it. Nobody edits it. |
| `glossary` | Glossary | `LIVE` | `MUST` | `META` | Shared terms for people, agents, documents, and code. |
| `wiki-page` | Knowledge wiki page | `LIVE` | `SHOULD` | `LLMWIKI`, `META` | One topic, linked to its sources. See the [knowledge wiki](knowledge-wiki.md). |
| `agent-instructions` | Agent instructions | `LIVE` | `MUST` | — | `AGENTS.md`: project context, commands, conventions, and rules for agents. [AGENTS.md format](https://agents.md/) |
| `readme` | README | `LIVE` | `MUST` | — | Understand the project, set it up, and make a first change. |
| `changelog` | Changelog | `LIVE` | `MUST` | `KEEPACL`, `SEMVER`, `CONVCOMMIT` | Versioned history of notable changes. |
| `roadmap` | Roadmap | `LIVE` | `COULD` when work spans several milestones | `META` | Milestones, their tasks, and their done criteria. |
| `design-system` | Design system | `LIVE` | `COULD` with a user interface or visual outputs | — | Colors, fonts, and diagram rules. AIDDbot keeps its own in [DESIGN.md](../../DESIGN.md), in the [DESIGN.md format](https://github.com/google-labs-code/design.md/blob/0.4.0/docs/spec.md). |

## Metadata (`META`)

Every document starts with YAML frontmatter, except the three documents named below:

```yaml
---
id: s0001               # Unique document ID
type: spec              # document ID from this catalog
change: feat            # spec only: chore | refactor | fix | feat
title: Add the spec template
status: draft           # draft | proposed | accepted | done | superseded | deprecated
created: 2026-11-24     # ISO 8601 date of creation; never changes
updated: 2026-11-24     # ISO 8601 date of the last content change
links:
  sources: []           # evidence and inputs
  related: []           # other document IDs
  supersedes: []        # document IDs this one replaces
---
```

Use dates without time. Git keeps the history of status changes.

In `DESIGN.md`, put the `META` fields under `aiddbot` in the same YAML frontmatter. Keep the design format keys at the top level.

`agent-instructions`, `readme`, and `changelog` have no `META`. Tools and people read them at fixed names, and frontmatter shows as noise there.

### Document IDs and file names

| Document | `id` | File |
| --- | --- | --- |
| `spec` | `s<NNNN>`: one sequence with four digits for all change types, such as `s0001`. | `docs/specs/s<NNNN>-<short-slug>.spec.md` |
| `impl-plan` | The spec ID with a suffix: `s0001-plan`. | `docs/specs/s<NNNN>-<short-slug>.plan.md` |
| `review-report` | The spec ID with a suffix: `s0001-review`. | `docs/specs/s<NNNN>-<short-slug>.review.md` |
| Wiki page | The file name without `.md`. | `docs/wiki/<topic>.md` |
| `roadmap` | `roadmap`. One per project. | `PLAN.md` |
| `design-system` | `design-system`. One per project. | `DESIGN.md` |

- `<short-slug>` uses lowercase words joined by hyphens.
- The ID does not show the change type. The `change` field holds it, so a spec can change its type without a new file name.
- The `adr` IDs and file names are decided with the first ADR.
- The rule is provisional. The spec template in H2 confirms or changes it (decision 11).

### Status use

| Status | Meaning | Set in | Used by |
| --- | --- | --- | --- |
| `draft` | The document is in progress. It can change. | Foundation, Analysis | `spec`, `impl-plan`, `review-report`, `glossary`, `wiki-page`, `roadmap`, `design-system` |
| `proposed` | A decision waits for human approval. | Design | `adr` |
| `accepted` | A person approved it. A `LIVE` document is then updated in place. | Design | `spec`, `impl-plan`, `review-report`, `adr`, `glossary`, `wiki-page`, `roadmap`, `design-system` |
| `done` | The change closed. Nobody edits the document again. | Close | `spec`, `impl-plan`, `review-report` |
| `superseded` | A newer document replaces it. | Design | `adr` |
| `deprecated` | It no longer applies, and nothing replaces it. | Design | `adr` |

- The statuses of one document type follow the table order. An `adr` ends as `superseded` or `deprecated`.
- **Used by** holds document IDs. The life tag is not enough, because an `adr` is `LIVE` with its own cycle.
- The [knowledge explorer](glossary.md#knowledge-explorer) reads this table. Keep its anchor and its columns.

## Standards

Documents without a standard use plain Markdown and `META`. Add a standard only when a real change needs it.

| Code | Standard | Pattern or content | Used by |
| --- | --- | --- | --- |
| `CONVCOMMIT` | [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) | `<type>(<scope>): <description>` | Change types, commits, `changelog` |
| `EARS` | [Easy Approach to Requirements Syntax](https://alistairmavin.com/ears/) | `The <system> shall <response>`, with an optional `When <trigger>`, `While <state>`, `Where <feature>`, or `If <condition>, then` | `spec` requirements |
| `MADR` | [MADR](https://adr.github.io/madr/) | Context, drivers, options, outcome, consequences | `adr` |
| `KEEPACL` | [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) | Added, Changed, Deprecated, Removed, Fixed, Security | `changelog` |
| `SEMVER` | [Semantic Versioning](https://semver.org/) | `MAJOR.MINOR.PATCH` | `changelog`, AIDDbot CLI |
| `LLMWIKI` | [LLM Wiki pattern](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) | Summary pages linked to sources | `wiki-page` |
| `META` | [AIDDbot metadata](#metadata-meta) | [YAML](https://yaml.org/spec/) frontmatter, [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) dates | All documents |

## Other documents and standards

Names only. Add one to the tables above when a lifecycle skill needs it.

- **Documents:** `conventions` (a section of `agent-instructions` for now), `prd`, `decision-note`, `vision`, `business-rules`, `process-model`, `example-map`, `domain-model`, `quality-attrs`, `tech-design`, `architecture`, `er-model`, `api-contract`, `event-contract`, `data-schema`, `threat-model`, `spike`, `migration-plan`, `gherkin`, `release-notes`, `deploy-plan`, `runbook`, `postmortem`, `tech-debt`, `diataxis-doc`.
- **Regulated profile:** `brd`, `srs`, `use-case`, `traceability`. If a project needs regulated documentation, its obligations decide what to add.
- **Spec sections for later:** `defect`, `ui-spec`, `decision-table`, `state-model`, `sequence`, `ui-checklist`.
- **Standards:** `GWT`, `RGB`, `BCP14`, `GHERKIN`, `CONVCOMMENTS`, `AGENTSMD`, `SCRUM`, `LEANCANVAS`, `JTBD`, `UC`, `ISO29148`, `ARC42`, `BLAMELESS`, `DIATAXIS`, `DESIGNMD`, `MERMAID`, `UML`, `C4`, `ER`, `BPMN`, `DMN`, `OPENAPI`, `ASYNCAPI`, `JSONSCHEMA`, `DTCG`, `CSF`, `3C`, `INVEST`, `EXMAP`, `ISO25010`, `WCAG`, `APG`, `STRIDE`, `ASVS`, `AAA`, `BVA`.

## Decisions

| # | Question | Decision | Reason |
| --- | --- | --- | --- |
| 1 | Is a 3-level focus enough? | Superseded by decision 15. | — |
| 2 | Is the minimum set too heavy? | Split into a [project set](#project-set) (once) and one spec per change. | No "one size fits all". |
| 3 | Relevance per change size? | Superseded by decision 16. The change type guides the acceptance criteria. | — |
| 4 | `META` fields? | `id`, `type`, `title`, `status`, `created`, `updated`, `links`. A spec adds `change`. See decision 20. | Minimum that supports IDs, status, and traceability. The change type can change without a new ID. |
| 5 | ADR format? | `MADR` only. | Current standard; its minimal variant covers the Nygard form. |
| 6 | Standards for the remaining documents? | None. Plain Markdown + `META`. | YAGNI. |
| 7 | Is `progress-log` a document? | No. Progress lives in the tasks of the spec or the `impl-plan`. | One source of truth for progress. |
| 8 | Where do user stories live? | Superseded by decision 27. | — |
| 9 | Spec-first or spec-anchored? | Spec-first. Knowledge is harvested into `LIVE` documents. | Specs stay small; living docs stay true. |
| 10 | Where do `CHG` documents go after `done`? | They stay in the same folder. Status `done` marks them. | Links never break. |
| 11 | How are document IDs assigned? | Specs use one neutral sequence, `s0001`, with the file `s0001-<short-slug>.spec.md`. Plans and reviews reuse the spec name with `.plan.md` and `.review.md`. The change type goes in the `change` field, not in the ID. ADR IDs wait for the first ADR. The H1 spec uses this provisional rule; the spec template in H2 confirms or changes it. See [document IDs](#document-ids-and-file-names). | The first spec needs a clear rule. A type letter in the ID would force a rename when the type changes. The suffix groups the documents of one change. |
| 12 | Review and verification: one document or two? | Superseded by decision 32. | — |
| 13 | UI specification: document or section? | A section of the `spec`, for later. | Spec-first: UI behavior is part of the change. `design-system` keeps the durable part. |
| 14 | Are prose `LIVE` documents wiki pages? | Yes. The AIDDbot wiki starts in H1 (decision 19). | One fact, one home. |
| 15 | Which tags does a document need? | Two: life and relevance. | Phase, focus, and context did not change any decision for the next change. |
| 16 | How many documents does a change need? | One spec. A separate `impl-plan` or `review-report` only with an explicit criterion that a skill can check. | Small changes stay light. The criterion is checkable. |
| 17 | Which change types? | `chore`, `refactor`, `fix`, `feat`. An `epic` only groups specs. No `prd` and no regulated profile for now. | They wait for a real need. |
| 18 | How large is the catalog? | The documents that the lifecycle skills produce have tables. The others are names. | The catalog follows the skill map, not one change at a time. |
| 19 | Do the foundational documents move to `docs/wiki/`? | Yes, in H1. `AGENTS.md`, `README.md`, `CHANGELOG.md`, `PLAN.md`, and `DESIGN.md` stay at the root. | The wiki is the base of AIDDbot documentation. AIDDbot tests its own wiki before its skills help teams keep one. |
| 20 | Which dates does `META` hold? | `created` and `updated`, as ISO 8601 dates without time. They replace `date`. | Readers and the wiki review see when the content changed. Git keeps the status history. Time adds noise and merge conflicts. |
| 21 | Do all documents need `META`? | No. `agent-instructions`, `readme`, and `changelog` have none. | Tools read them at fixed names. Frontmatter shows as noise on GitHub. |
| 22 | Which type has the project plan? | `roadmap`, with one per project. | It is a living document of milestones. The name does not clash with the plan step or the `impl-plan`. |
| 23 | Which ID has the design system? | `design-system`, with one per project. | Single documents use their type as ID, like wiki pages use their topic. |
| 24 | How are the change steps named? | With the phase names: Analysis, Design, Implementation, Verification, and then Close. They replace specify, plan, build and review, close. | One vocabulary for phases and steps. People and agents do not translate between two lists (audit item B3). |
| 25 | Is Close a phase? | No. It is the last step of a change. It returns knowledge to the Foundation documents. | It does not check anything. It keeps knowledge. |
| 26 | Where does clarification go? | Inside Analysis, before a person approves the spec. | Fewer steps and handoffs. |
| 27 | Which sections has a spec? | Three `##` sections: Problem (goal, out of scope, 1 to 3 user stories), Solution (an accessible technical design and its tasks), and Verification (a checklist of up to 9 EARS requirements, each with its user story). | The sections follow the problem, solution, verification views. User stories give the reason for each requirement. |
| 28 | Is there a limit on the size of a spec? | Yes. At most 3 user stories and 9 requirements. A larger change is split. | Small changes are easier to review and verify. A script can check the limits. |
| 29 | Which standard do the requirements use? | `EARS` only. `GWT` waits for a real need. | One syntax. EARS covers typical, state, optional, and error cases. |
| 30 | When does a person approve the spec? | Once, at the end of Design, before Implementation. | The person sees the problem, the requirements, and the solution together. Small changes do Analysis and Design in one session. |
| 31 | What changes in a spec after approval? | Only its checkboxes and its `status` and `updated` fields. | The spec stays short and stable. A script can check it. Evidence lives in the check outputs, and later in end-to-end tests. |
| 32 | Where do failures and findings go? | To a `review-report`, only when a requirement fails or the change has findings. | Most changes need no report. The spec does not grow after approval. |
| 33 | How are user stories and requirements coded? | `US<n>` for a user story. `US<n>R<m>` for a requirement, numbered inside its user story. From another document: `<spec id>-US<n>R<m>`. Codes are inline code, with a hyphen before their text. | Codes compose like document IDs (`s0001-plan`). A hyphen is easy to type. Inline code shows each character, as `DESIGN.md` asks for IDs. |
| 34 | Can an accepted spec change before its implementation starts? | Yes. It goes back to `draft`, a person rewrites it, and approves it again. After the implementation starts, decision 31 applies. | `s0002` needed a new scope after approval and before any code. A rewrite is cheaper than a new spec for the same change. |
| 35 | How are the change flow and the status use written? | As tables with fixed anchors and columns. Document IDs go in backticks. | The [knowledge explorer](glossary.md#knowledge-explorer) reads them. A table is easier to read and to check than a list. |
