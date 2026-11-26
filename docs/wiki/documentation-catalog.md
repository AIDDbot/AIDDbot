---
id: documentation-catalog
type: wiki-page
title: AIDDbot Documentation Catalog
status: draft
created: 2026-11-24
updated: 2026-11-26
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

1. **Spec-first, not spec-anchored.** Every change starts with a spec. A person approves its problem, solution, and requirements before any code. A `small` change gets this approval in its pull request. [Impact levels](#impact-levels) The spec drives the change and is frozen when the change closes. It is not maintained afterwards. After approval, only its checkboxes and its `status` and `updated` fields change. [Böckeler on SDD levels](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html)
2. **One spec per change.** Separate documents appear only when the [impact level](#impact-levels) asks for them.
3. **Living knowledge is harvested, not anchored.** When a change closes, durable knowledge moves to the living documents that it affects: glossary, ADRs, wiki pages, changelog.
4. **Fewer documents, more sections.** If content always travels with another document, it is a section of that document.

## Tags

Each document has three tags.

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

### Form

| Code | Form | Rule |
| --- | --- | --- |
| `DOC` | Document | Text for people and agents. The `LIVE` documents with this form are the [project brain](glossary.md#project-brain). |
| `CODE` | Code | Source code and tests that tools run. |

The [knowledge explorer](glossary.md#knowledge-explorer) reads this table. Keep its anchor and its columns.

## Project set

Every project creates and maintains these `LIVE` documents: `agents`, `readme`, `changelog`, and `glossary`.

Two sections of `agents` guide each change:

- **Conventions:** code style, commits, and the command of each [quality check](#quality-checks).
- **Review gates:** the [review gates](#review-gates) of the project. Without this section, the default gates apply.

Foundation sets up both sections.

## Change flow

The change flow is the work of the Development [lifecycle phase](intent.md#lifecycle-phases). Every change follows five steps. A step is change level. Its name is not the name of a phase.

| # | Step | Work | Uses | Produces |
| --- | --- | --- | --- | --- |
| 1 | Analysis | Write the Problem section and the requirements of the [spec](#spec). Write one `feature-file` for each user story, with declarative [scenarios](glossary.md#scenario) of its requirements and no interface steps. Clarify the open questions with a person. Update the `roadmap` when the work splits into several changes. | `roadmap`, `glossary`, `wiki-page`, `domain-model`, `adr`, `agents` | `spec`, `feature-file`, `roadmap` |
| 2 | Design | Write the Solution section and its tasks. Add a data model when the change touches data. Write an `adr` for a significant, hard-to-reverse decision. A person approves the whole spec and its scenarios. | `spec`, `feature-file`, `wiki-page`, `domain-model`, `design-system` | `spec`, `adr` |
| 3 | Implementation | Implement the change, its unit tests, and the docs. Another agent instance generates the `e2e-test` from the feature files, with the same tags. It works only in the e2e package and does not read or change the source code. Run the [quality checks](#quality-checks): build, format, lint, and unit tests. Read the `check-report`, fix the code, and repeat until they all pass. | `spec`, `feature-file`, `agents` | `code`, `unit-test`, `e2e-test`, `check-report`, and docs |
| 4 | Verification | Run the `e2e-test`. It writes a `test-report` with the result of each requirement. An agent [reviews](glossary.md#review) the diff against the [review gates](#review-gates) and decides: pass or changes needed. Tick each requirement that passes. If a requirement fails or the change has findings, write a `review-report`. [Impact levels](#impact-levels) | `spec`, `e2e-test`, `code`, `check-report`, `agents` | `spec`, `test-report`, `review-report` |
| 5 | Close | Freeze the spec and harvest the knowledge. [Close a change](#close-a-change) | `spec`, `review-report` | `glossary`, `domain-model`, `wiki-page`, `changelog` |

- **Uses** and **Produces** hold document IDs from the [document catalog](#document-catalog), in backticks. Other text is plain.
- The [knowledge explorer](glossary.md#knowledge-explorer) reads this table. Keep its anchor and its columns. [Page rules](knowledge-wiki.md#page-rules)

Close is the last step of a change, not a lifecycle phase. Many changes close before one Release. Analysis and Design can happen in one session, before the approval. A `small` change follows a shorter flow. [Impact levels](#impact-levels)

When the agent review asks for changes, the change goes back to Implementation.

### Quality checks

Implementation runs these deterministic checks, in this order. It repeats them until they all pass. Then the code compiles, has one style, is clean, and has unit tests.

| Check | Ensures | Examples |
| --- | --- | --- |
| Build | The code compiles or passes the type check. | `tsc --noEmit`, `dotnet build`, `cargo check` |
| Format | One code style, with no discussion in the review. | Prettier, Biome, `dotnet format`, `ruff format` |
| Lint | Clean code: no known bad patterns, unused code, or risky constructs. | ESLint, Biome, Ruff, Clippy |
| Unit tests | Each unit of code works on its own. The change adds tests for its new code. | `bun test`, Vitest, xUnit, pytest |

Rules:

- `agents` names the command of each check. One command that runs them all is best.
- Foundation sets up the checks. If a check is missing, the agent proposes a tool for the stack of the project. A person approves it. The examples are not a default.
- If a project cannot have a check yet, `agents` says why. The change is not blocked.
- Each run writes a `check-report`. The agent reads it, fixes the code, and runs the checks again. This loop is how Implementation corrects itself.
- The last `check-report` goes to Verification. The review reads it with the diff.
- These checks look at the code. Verification looks at the behavior.

### Independent end-to-end tests

The `e2e-test` checks the code from outside, so the code cannot shape its own test.

- Treat every project as a possible monorepo. The `e2e-test` is its own [package](glossary.md#package). It can use another stack.
- One agent instance writes the `code` and the `unit-test`. Another agent instance writes the `e2e-test` from the feature files.
- The e2e agent reads the feature files and the public interfaces of the system. It does not read or change the source code.
- The code agent does not change the `e2e-test`. If a test looks wrong, it records a finding.

### Review gates

In Verification, an agent reviews the diff against each gate. Each gate gives pass or changes needed, with its findings. One gate with changes needed sends the change back to Implementation.

AIDDbot ships three default gates:

| Gate | The review checks |
| --- | --- |
| Security | No secrets in the code. Inputs are validated. Access rules are applied. New dependencies have no known risks. |
| User experience | The behavior and the messages match the user stories. The interface is accessible and consistent. Errors tell the user what to do. |
| Maintainability | The diff stays in the scope of the spec. The code is simple and uses the glossary terms. Each requirement has its tests. The docs are updated. |

Rules:

- A project configures its gates in the Review gates section of `agents`. It can change, remove, or add gates.
- Without that section, the default gates apply.
- A gate states what the review checks, not how to fix it.

### Change types

The type follows [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/). It guides the requirements.

| Type | Use for | Requirements |
| --- | --- | --- |
| `chore` | Tooling, dependencies, configuration, docs. No behavior change. | The check that shows the result works. |
| `refactor` | Internal structure change. No behavior change. | Behavior is unchanged. The existing checks pass. |
| `fix` | A defect. Behavior returns to what was expected. | Always a regression case: it fails before the fix and passes after it. Usually an `If … then` requirement. |
| `feat` | New or changed behavior for users. | Observable outcomes: typical (`When`), boundary (`While`, `Where`), and error (`If … then`) cases. |

An `epic` is not a change type. It only groups several specs.

### Impact levels

Each change has one impact level. The [change type](#change-types) says what the change does. The impact level says how much process it needs.

| Impact | When | Flow | Skips | Adds |
| --- | --- | --- | --- | --- |
| `small` | All are true: one [package](glossary.md#package), one work session, at most 3 requirements, and no change to data, public interfaces, security, or dependencies. | A short spec: Goal, one user story, a short Solution, and 1 to 3 requirements. No `feature-file` and no data model: unit tests check the requirements. The quality checks and the review gates still run. A person approves the spec and the result together, in the pull request. | `feature-file`, `e2e-test`, `test-report` | — |
| `medium` | Not `small` and not `large`. | The full change flow. A person approves the spec at the end of Design. | — | — |
| `large` | At least one is true: more than one work session, several agents or people on the code, or more than one package. The e2e package and its agent do not count. | The `medium` flow, plus a `review-report`. The Tasks of the spec track the progress across sessions and agents. | — | `review-report` |

Rules:

- In Analysis, a skill proposes the level from the criteria. A skill can check each criterion. A person confirms the level.
- The `impact` field of the spec holds the level.
- `Skips` and `Adds` hold document IDs in backticks. `Skips` lists the document types that the level does not write. `Adds` lists the document types that the level writes in addition to the `medium` flow.
- If a `small` change grows past its criteria, it stops. It becomes `medium`: write the missing sections and get the approval before more code.
- At any level, write a `review-report` when a requirement fails or the change has findings: lessons about the way of working, what helped, and what got in the way.
- The change type and the impact level are independent. A `fix` can be `small` or `large`.

### Spec

One spec per change. Its title is `# <id> - <title>`, such as `# s0002 - Build the web knowledge explorer`. It has three `##` sections: Problem, Solution, and Verification. They follow the [problem, solution, verification](glossary.md#problem) views.

Its [`META`](#metadata-meta) adds two fields:

- `change`: the [change type](#change-types): `chore`, `refactor`, `fix`, or `feat`.
- `impact`: the [impact level](#impact-levels): `small`, `medium`, or `large`.

| Section | Subsection | Content | Written in | When |
| --- | --- | --- | --- | --- |
| Problem | Goal | Why the change is needed. | Analysis | Always. |
| Problem | Out of scope | What the change does not do. | Analysis | Always. |
| Problem | User stories | 1 to 3 stories in [`USERSTORY`](#standards) form: `` - `US1` - As a <role>, I want <action>, so that <benefit>. `` | Analysis | Always. |
| Solution | — | A technical design that a person who does not program can read: the parts, how they work together, and the decisions. | Design | Always. |
| Solution | Data model | The entities, their attributes, and their relations, in a Mermaid `erDiagram`. Use the terms of the `domain-model`. | Design | When the change adds or changes data. |
| Solution | Tasks | Ordered checklist. Each task has a check. | Design | In a `large` change, and when tasks help to coordinate the work. |
| Verification | — | A checklist of up to 9 requirements, grouped by user story: `` - [ ] `US1R1` - <requirement> ``. | Analysis; ticked in Verification | Always. |

Rules:

- Write each requirement in [EARS](#standards), as the [change type](#change-types) asks. The `<system>` of the pattern is a [system](glossary.md#system).
- Each requirement belongs to one user story. Each user story has at least one requirement.
- Codes compose: a requirement is numbered inside its user story (`US1R1`, `US1R2`, `US2R1`). From another document, add the spec ID: `s0002-US1R2`.
- Write codes and IDs as inline code. Use a hyphen `-` between a code and its text.
- A requirement states only the expected behavior. Its [scenarios](glossary.md#scenario) show how to check it.
- In a `medium` or `large` `feat` or `fix`, each user story has one `feature-file` in the spec folder, such as `s0002-US1.feature`. The `Feature` has the user story tag, such as `@s0002-US1`. Each requirement has at least one scenario, tagged with its full code, such as `@s0002-US1R2`. The scenarios hold the details of each check: data, steps, and expected results. A `chore` or a `refactor` uses other checks.
- After approval, the spec changes in two ways only: a checkbox is ticked, and the `status` and `updated` fields change.
- An accepted spec can go back to `draft` only before its implementation starts. Then a person rewrites it and approves it again. After the implementation starts, a problem with the spec goes to the `review-report`.
- Failed requirements and findings go to a [`review-report`](#impact-levels). The evidence stays in the check outputs: test results, CI runs, or the review of the pull request.
- If a change needs more than 3 user stories or more than 9 requirements, it is too large. Split it into several specs, grouped by an `epic` if needed.
- The scope is the user stories and the Solution. There is no "In scope" subsection.
- A `small` spec has only the Goal, one user story, the Solution, and 1 to 3 requirements. [Impact levels](#impact-levels)

### Close a change

1. Check that every task and requirement is ticked. If one is not, the `review-report` says why.
2. Set the spec status to `done`. Do not edit it again.
3. Update the `LIVE` documents that the change affects.
4. Add a `changelog` entry to its `Unreleased` section if the change matters to the people who use the project. Release reads it later.

## Document catalog

| ID | Document | Life | Form | Relevance | Standards | Purpose |
| --- | --- | --- | --- | --- | --- | --- |
| `readme` | README | `LIVE` | `DOC` | `MUST` | — | Understand the project, set it up, and make a first change. |
| `glossary` | Glossary | `LIVE` | `DOC` | `MUST` | `META` | Shared terms for people, agents, documents, and code. |
| `wiki-page` | Knowledge wiki page | `LIVE` | `DOC` | `SHOULD` | `LLMWIKI`, `META` | One topic, linked to its sources. See the [knowledge wiki](knowledge-wiki.md). |
| `agents` | Agent instructions | `LIVE` | `DOC` | `MUST` | — | `AGENTS.md`: project context, commands, conventions, and rules for agents. [AGENTS.md format](https://agents.md/) |
| `roadmap` | Roadmap | `LIVE` | `DOC` | `COULD` when work spans several milestones | `META` | Past and future milestones, their tasks, and their done criteria. |
| `spec` | Change specification | `CHG` | `DOC` | `MUST` | `USERSTORY`, `EARS`, `MERMAID`, `META` | Problem, solution, and verification of one change. Approved before code. |
| `feature-file` | Feature file | `CHG` | `DOC` | `MUST` in a `medium` or `large` `feat` or `fix` | `GHERKIN` | The scenarios of one user story, with the details to check each requirement. Implementation generates the `e2e-test` from it. |
| `adr` | Architecture decision record | `LIVE` | `DOC` | `MUST` for a significant, hard-to-reverse decision | `MADR`, `META` | One decision: context, options, outcome, consequences. A new ADR supersedes it. Nobody edits it. |
| `domain-model` | Domain model | `LIVE` | `DOC` | `SHOULD` when the project has business data | `DDD`, `MERMAID`, `META` | Bounded contexts, aggregates, entities, and their relations in a Mermaid `erDiagram`. It uses the terms of the `glossary`. |
| `design-system` | Design system | `LIVE` | `DOC` | `COULD` with a user interface or visual outputs | — | Colors, fonts, and diagram rules. AIDDbot keeps its own in [DESIGN.md](../../DESIGN.md), in the [DESIGN.md format](https://github.com/google-labs-code/design.md/blob/0.4.0/docs/spec.md). |
| `code` | Code | `LIVE` | `CODE` | `MUST` in a change that is not docs only | — | The source code of the change. Its diff is the input of the review. |
| `unit-test` | Unit test | `LIVE` | `CODE` | `MUST` for new or changed code | — | Tests that check each unit of code on its own. The quality checks run them. |
| `e2e-test` | End-to-end test | `LIVE` | `CODE` | `MUST` when the change has a `feature-file` | — | Tests generated from the feature files. They keep the tags of the scenarios, so each test traces to its requirement. They live in their own package and stay as regression tests. |
| `check-report` | Check report | `CHG` | `DOC` | `MUST` in Implementation | — | The result of one run of the [quality checks](#quality-checks): build, format, lint, and unit tests, with each error and its place in the code. |
| `test-report` | Test report | `CHG` | `DOC` | `MUST` when Verification runs an `e2e-test` | — | The result of one run of the `e2e-test`: pass or fail for each scenario, grouped by requirement tag. |
| `review-report` | Review report | `CHG` | `DOC` | `MUST` in a `large` change, or when a requirement fails or the change has findings | `META` | Failed requirements, findings, and decisions that need human approval. |
| `changelog` | Changelog | `LIVE` | `DOC` | `MUST` | `KEEPACL`, `SEMVER`, `CONVCOMMIT` | Versioned history of notable changes. |

## Metadata (`META`)

Every Markdown document starts with YAML frontmatter, except the three documents named below:

```yaml
---
id: s0001               # Unique document ID
type: spec              # document ID from this catalog
change: feat            # spec only: chore | refactor | fix | feat
impact: medium          # spec only: small | medium | large
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

`agents`, `readme`, and `changelog` have no `META`. Tools and people read them at fixed names, and frontmatter shows as noise there. Files that are not Markdown have no `META`: `feature-file`, `code`, `unit-test`, `e2e-test`, `check-report`, and `test-report`.

### Document IDs and file names

| Document | `id` | File |
| --- | --- | --- |
| `spec` | `s<NNNN>`: one sequence with four digits for all change types, such as `s0001`. | `docs/specs/s<NNNN>-<short-slug>/s<NNNN>.spec.md` |
| `review-report` | The spec ID with a suffix: `s0001-review`. | `docs/specs/s<NNNN>-<short-slug>/s<NNNN>.review.md` |
| Wiki page | The file name without `.md`. | `docs/wiki/<topic>.md` |
| `roadmap` | `roadmap`. One per project. | `PLAN.md` |
| `design-system` | `design-system`. One per project. | `DESIGN.md` |
| `domain-model` | `domain-model`. One per project. | `docs/wiki/domain-model.md` |
| `feature-file` | No `id`. Its `Feature` tag names it, such as `@s0001-US1`. | `docs/specs/s<NNNN>-<short-slug>/s<NNNN>-US<n>.feature` |
| `code`, `unit-test` | No `id`. | The folders of the project. `agents` names them. |
| `e2e-test` | No `id`. | Its own [package](glossary.md#package), such as `packages/e2e/`. It can use another stack. `agents` names it. |
| `check-report`, `test-report` | No `id`. | The output of the check command or the test command. Git does not keep it. CI keeps the report of each pull request. |

- Each change has one folder, `docs/specs/s<NNNN>-<short-slug>/`. All its change documents go in it.
- `<short-slug>` uses lowercase words joined by hyphens.
- The ID does not show the change type. The `change` field holds it, so a spec can change its type without a new file name.
- The `adr` IDs and file names are decided with the first ADR.
- The rule is provisional. The spec template in H2 confirms or changes it (decision 11).

### Status use

| Status | Meaning | Set in | Used by |
| --- | --- | --- | --- |
| `draft` | The document is in progress. It can change. | Foundation, Analysis | `spec`, `review-report`, `glossary`, `wiki-page`, `roadmap`, `design-system`, `domain-model` |
| `proposed` | A decision waits for human approval. | Design | `adr` |
| `accepted` | A person approved it. A `LIVE` document is then updated in place. | Design | `spec`, `review-report`, `adr`, `glossary`, `wiki-page`, `roadmap`, `design-system`, `domain-model` |
| `done` | The change closed. Nobody edits the document again. | Close | `spec`, `review-report` |
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
| `USERSTORY` | [User story](https://www.mountaingoatsoftware.com/agile/user-stories) | `As a <role>, I want <action>, so that <benefit>.` | `spec` user stories |
| `EARS` | [Easy Approach to Requirements Syntax](https://alistairmavin.com/ears/) | `The <system> shall <response>`, with an optional `When <trigger>`, `While <state>`, `Where <feature>`, or `If <condition>, then` | `spec` requirements |
| `GHERKIN` | [Gherkin](https://cucumber.io/docs/gherkin/reference/) | `Feature`, `Scenario`, `Given`, `When`, `Then`, and `@tags` | `feature-file` |
| `DDD` | [Domain-Driven Design](https://www.domainlanguage.com/ddd/reference/) | Ubiquitous language, bounded contexts, aggregates, entities, value objects | `domain-model` |
| `MERMAID` | [Mermaid ER diagram](https://mermaid.js.org/syntax/entityRelationshipDiagram.html) | `erDiagram` with entities, attributes, and relations | `spec` data model, `domain-model` |
| `MADR` | [MADR](https://adr.github.io/madr/) | Context, drivers, options, outcome, consequences | `adr` |
| `KEEPACL` | [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) | Added, Changed, Deprecated, Removed, Fixed, Security | `changelog` |
| `SEMVER` | [Semantic Versioning](https://semver.org/) | `MAJOR.MINOR.PATCH` | `changelog`, AIDDbot CLI |
| `LLMWIKI` | [LLM Wiki pattern](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) | Summary pages linked to sources | `wiki-page` |
| `META` | [AIDDbot metadata](#metadata-meta) | [YAML](https://yaml.org/spec/) frontmatter, [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) dates | All documents |

## Other documents and standards

Names only. Add one to the tables above when a lifecycle skill needs it.

- **Documents:** `conventions` (a section of `agents` for now), `impl-plan` (the Tasks of the spec for now), `prd`, `decision-note`, `vision`, `business-rules`, `process-model`, `example-map`, `quality-attrs`, `tech-design`, `architecture`, `api-contract`, `event-contract`, `data-schema`, `threat-model`, `spike`, `migration-plan`, `release-notes`, `deploy-plan`, `runbook`, `postmortem`, `tech-debt`, `diataxis-doc`.
- **Regulated profile:** `brd`, `srs`, `use-case`, `traceability`. If a project needs regulated documentation, its obligations decide what to add.
- **Spec sections for later:** `defect`, `ui-spec`, `decision-table`, `state-model`, `sequence`, `ui-checklist`.
- **Standards:** `RGB`, `BCP14`, `CONVCOMMENTS`, `AGENTSMD`, `SCRUM`, `LEANCANVAS`, `JTBD`, `UC`, `ISO29148`, `ARC42`, `BLAMELESS`, `DIATAXIS`, `DESIGNMD`, `UML`, `C4`, `BPMN`, `DMN`, `OPENAPI`, `ASYNCAPI`, `JSONSCHEMA`, `DTCG`, `CSF`, `3C`, `INVEST`, `EXMAP`, `ISO25010`, `WCAG`, `APG`, `STRIDE`, `ASVS`, `AAA`, `BVA`.

## Decisions

| # | Question | Decision | Reason |
| --- | --- | --- | --- |
| 1 | Is a 3-level focus enough? | Superseded by decision 15. | — |
| 2 | Is the minimum set too heavy? | Split into a [project set](#project-set) (once) and one spec per change. | No "one size fits all". |
| 3 | Relevance per change size? | Superseded by decision 16. The change type guides the acceptance criteria. | — |
| 4 | `META` fields? | `id`, `type`, `title`, `status`, `created`, `updated`, `links`. A spec adds `change` and `impact` (decision 43). See decision 20. | Minimum that supports IDs, status, and traceability. The change type can change without a new ID. |
| 5 | ADR format? | `MADR` only. | Current standard; its minimal variant covers the Nygard form. |
| 6 | Standards for the remaining documents? | None. Plain Markdown + `META`. | YAGNI. |
| 7 | Is `progress-log` a document? | No. Progress lives in the tasks of the spec (decision 53). | One source of truth for progress. |
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
| 21 | Do all documents need `META`? | No. `agents`, `readme`, and `changelog` have none. | Tools read them at fixed names. Frontmatter shows as noise on GitHub. |
| 22 | Which type has the project plan? | `roadmap`, with one per project. | It is a living document of milestones. The name does not clash with the plan step or the `impl-plan`. |
| 23 | Which ID has the design system? | `design-system`, with one per project. | Single documents use their type as ID, like wiki pages use their topic. |
| 24 | How are the change steps named? | Superseded by decision 50. | — |
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
| 36 | Do user stories follow a standard? | Yes: `USERSTORY`, the `As a, I want, so that` form. | The spec already used the form. A named standard lets a script and a review check it. |
| 37 | How do Gherkin scenarios and EARS requirements work together? | The spec keeps EARS requirements. Design writes Gherkin scenarios in a `LIVE` `feature-file`, tagged with the full requirement code. A person approves them with the spec. End-to-end tests run them. Decision 29 still applies to the requirements. | EARS states the behavior in one line. Gherkin gives the steps that a test runs. The tag links each test to its requirement. The scenarios live on after the spec is frozen. |
| 38 | Where do format, lint, and unit tests run? | In Implementation, as deterministic quality checks. They pass before Verification. `agents` holds their commands. | They check the code, not the behavior. Scripts and tools run them, not a judgment. |
| 39 | What does Verification do? | Two things: end-to-end tests run the scenarios, and an agent reviews the diff against the review gates. The review decides pass or changes needed. The gates are a section of `agents`. | Tests check the behavior. The review checks what tests cannot see. Each project sets its own gates without a new document. |
| 40 | Which design documents cover data and the domain? | A Data model subsection in the spec Solution, with a Mermaid `erDiagram`, when the change touches data. Close harvests it into one `LIVE` `domain-model` with the DDD terms. `er-model` is not a separate document. | One home for the domain and its data. The spec shows only what the change touches. |
| 41 | How does Implementation show its internal steps? | A [quality checks](#quality-checks) table: build, format, lint, and unit tests, in this order. Foundation sets up their commands in `agents`. | The code compiles, has one style, is clean, and has tests before any review. The project chooses the tools for its stack. |
| 42 | Are the review gates fixed? | No. AIDDbot ships three [default gates](#review-gates): security, user experience, and maintainability. A project changes, removes, or adds gates in `agents`. | Teams have different risks. The defaults give a good start with no configuration. |
| 43 | Do all changes follow the same flow? | No. Each change has an [impact level](#impact-levels): `small`, `medium`, or `large`. A `small` change has a short spec, no `feature-file`, and its approval in the pull request. A `large` change adds a `review-report` (decision 53 removed the `impl-plan`). The levels replace the criterion for separate documents. Decision 30 applies to `medium` and `large` changes. | Minor changes move fast. Large changes get the coordination they need. The change type says what a change does, not how much process it needs. |
| 44 | Who decides the impact level? | A skill proposes it from criteria that it can check. A person confirms it. The spec holds it in the `impact` field. | The criteria make the level consistent. The person sees risks that the criteria miss. |
| 45 | Which artifacts does Implementation produce? | `code`, `unit-test`, and `check-report`, as document types of the catalog. They have no `META`. The agent reads each `check-report` and fixes the code until the checks pass. | People see the output of Implementation like the output of the other steps. The report closes the loop of self-correction and gives evidence to Verification. |
| 46 | Where do the feature files live? | One `feature-file` for each user story, as `US<n>.feature` in the spec folder. Each change has one folder, `docs/specs/s<NNNN>-<short-slug>/`, with `spec.md`, the feature files, `plan.md`, and `review.md`. The `feature-file` is `CHG`: it changes decision 37. The `e2e-test` is the `LIVE` part. Decision 11 keeps the IDs; only the paths change. | The scenarios travel with their spec and their user stories. They give the details of each check and make the e2e tests easy to generate and to trace. One folder keeps the documents of a change together. |
| 47 | Who writes the end-to-end tests, and where? | Another agent instance, in Implementation, in its own package. It does not read or change the source code. Verification runs them and writes a `test-report`. The e2e package does not make a change `large`. | An agent that writes both the code and its tests can make them agree without solving the problem. Tests from outside keep the check honest. The e2e package often uses another stack. |
| 48 | How are the files of a change named? | Each file name starts with the spec ID: `s0002.spec.md`, `s0002.plan.md`, `s0002.review.md`, and `s0002-US1.feature`. The folder keeps its slug. It changes the file names of decision 46. | With several files open in an editor, the tab shows which change and which document it is. The feature file name matches its `Feature` tag. |
| 49 | How does the catalog mark code and tests? | A third [tag](#tags), Form: `DOC` for text that people and agents read, and `CODE` for source code and tests that tools run. The document catalog has a `Form` column after `Life`. The rows follow the lifecycle: project documents, then change documents in step order, and the `changelog` last. | The knowledge explorer finds the project brain (`LIVE` and `DOC`) with no hard-coded IDs. The row order is the order of the brain on the map. |
| 50 | How do the change steps relate to the lifecycle phases? | The change flow is the work of the Development phase. Its steps are Analysis, Design, Implementation, Verification, and Close. A step name is not a phase name. Close writes the `changelog` entry to `Unreleased`, and Release reads it. It replaces decision 24. | Each name is used once, at one level. Many changes close before one release. [Intent decisions 1 and 9](intent.md#decisions) |
| 51 | What is the ID of the agent instructions? | `agents`. | The ID follows the file name `AGENTS.md`, as `readme` and `changelog` do. |
| 52 | Does the `roadmap` become a `prd`? | No. The `roadmap` holds past and future milestones. `prd` stays a name for later. | A PRD says what the product must do and why. A roadmap says when. |
| 53 | Does the catalog keep an `impl-plan`? | No. It is a name for later. A `large` change tracks its progress in the Tasks of the spec. It changes decision 43. | Frontier models write good code without a separate plan file. One checklist is one source of truth (decision 7). |
| 54 | In which step is the `feature-file` written? | Analysis, with declarative scenarios and no interface steps. A person still approves the spec and its scenarios once, at the end of Design (decision 30). | The scenarios are examples of the requirements. They describe the problem, not the solution. |
| 55 | What does Analysis use and change? | It reads the `roadmap`, `glossary`, `wiki-page`, `domain-model`, `adr`, and `agents` of the [project brain](glossary.md#project-brain). It writes the `spec` and the `feature-file`, and updates the `roadmap` when the work splits into several changes. Close harvests the rest. | Analysis needs the whole brain to frame the problem. Spec-first: other knowledge waits for Close. |
| 56 | Does the impact levels table name the documents of each level? | Yes. The columns `Skips` and `Adds` hold document IDs. `small` skips `feature-file`, `e2e-test`, and `test-report`. `large` adds `review-report`. The [knowledge explorer](glossary.md#knowledge-explorer) reads the table. [`s0005`](../specs/s0005-layered-maps/s0005.spec.md) | The explorer filters the change loop map by impact level. The wiki contract allows no document ID in the code. |
