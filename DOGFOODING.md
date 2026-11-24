# Dogfooding AIDDbot

We build AIDDbot with AIDDbot, as long as it is feasible. This repository is the first project for its templates, skills, and scripts. See [INTENT.md](INTENT.md).

Status: **draft**.

## Goals

- Test every rule on real work before other teams use it.
- Extract templates, skills, and scripts from real documents. Do not invent them.
- Keep the outputs as examples for teams and courses.

## Rules

1. **The tool never blocks the work.** If an AIDDbot step is missing or gets in the way, do it by hand and record a finding.
2. **Extract, do not invent.** A template comes from a real document that worked. A skill comes from a workflow we repeated. A script comes from a manual step we repeated.
3. **Rule of three.** The second time we repeat something, record it as a finding. The third time, turn it into a template, skill, or script.
4. **Record every finding.** Each `review-report` has a **Process feedback** section. The wiki page `dogfooding-findings.md` collects all findings.

## Stage 0 · Bootstrap (by hand)

No spec needed: the temporary exception in [AGENTS.md](AGENTS.md#way-of-working) covers this stage.

1. **Complete the project set** ([catalog](DOCUMENTATION-CATALOG.md#project-set)):
   - `CHANGELOG.md` at the root, with an `Unreleased` section ([Keep a Changelog](https://keepachangelog.com/en/1.1.0/)).
   - `docs/wiki/glossary.md`: spec, change type, change profile, `LIVE`, `CHG`, fragment, harvest, ingest, and other core terms.
2. **Create the wiki**: `docs/wiki/index.md` and `docs/wiki/log.md` ([KNOWLEDGE-WIKI.md](KNOWLEDGE-WIKI.md)).
3. **Move the foundational documents into the wiki** (catalog decision 14):

   | Current file | Wiki page | `type` |
   | --- | --- | --- |
   | `INTENT.md` | `docs/wiki/vision.md` | `vision` |
   | `DOCUMENTATION-CATALOG.md` | `docs/wiki/documentation-catalog.md` | `wiki-page` |
   | `KNOWLEDGE-WIKI.md` | `docs/wiki/knowledge-wiki.md` | `wiki-page` |
   | `SCRIPT-TOOLCHAIN.md` | `docs/wiki/script-toolchain.md` | `architecture` |
   | `DOGFOODING.md` | `docs/wiki/dogfooding.md` | `wiki-page` |

   - Add `META` frontmatter to each page.
   - Update all links, including those in `README.md` and `AGENTS.md`.
   - Add each page to `index.md` and one `ingest` entry per page to `log.md`.
   - The root keeps only `README.md`, `AGENTS.md`, `CHANGELOG.md`, and `LICENSE`.
4. **Move the initial findings** (below) to `docs/wiki/dogfooding-findings.md`.

Done when: a contributor can start at `README.md` or `AGENTS.md`, reach `docs/wiki/index.md`, and find every foundational page.

## Stage 1 · First change: `spec-0001` (by hand)

Change: **spec template**. Type: `feat`.

1. **Specify.** Write `docs/specs/spec-0001-spec-template.md` by hand. Follow the `feat` profile in the catalog: `user-story`, `acceptance`, and `META`.
2. **Plan.** Write its `impl-plan` with a `tasks` checklist.
3. **Build.** Extract the spec template from `spec-0001` itself. Include variants or sections for `chore`, `refactor`, `fix`, and `feat`.
4. **Review.** Write the `review-report`, with checks, evidence, and **Process feedback**.
5. **Close.**
   - Set `spec-0001` to `done`.
   - Ingest it into the wiki.
   - Add a `CHANGELOG.md` entry.
   - Remove the temporary exception from `AGENTS.md`.

Done when: the next change can start from the template, not from a blank page.

## Stage 2 · Grow by the rule of three

From now on, every change uses the latest templates, skills, and scripts. The findings decide the order. Likely candidates:

- Templates for `impl-plan` and `review-report` (extracted from `spec-0001`).
- `aiddbot doc new` and `aiddbot doc validate`, once IDs and metadata are repeated by hand.
- The `log` spike from [SCRIPT-TOOLCHAIN.md](SCRIPT-TOOLCHAIN.md#next-step), when the first hook is needed.
- The first skill: specify a change.

## Initial findings

Findings from the review of the foundational documents. They move to the wiki in Stage 0.

| # | Finding | Proposed action |
| --- | --- | --- |
| F1 | The repository has only 2 of the 5 project-set documents (`AGENTS.md`, `README.md`). | Stage 0, step 1. |
| F2 | `AGENTS.md` already contains the conventions (writing style, commits, scripts). A separate `conventions` document may be redundant in small projects. | Evaluate after Stage 1. Possible catalog change: `conventions` is a section of `agent-instructions` unless the project is `complex`. |
| F3 | The catalog does not fix the folders for source documents (`docs/specs/`, `docs/adr/`…). | Use the layout in [KNOWLEDGE-WIKI.md](KNOWLEDGE-WIKI.md#repository-layout). Confirm it in Stage 1. |
| F4 | Without templates, the spec-first rule blocks changes to the foundational documents. | Temporary exception in `AGENTS.md`. Remove it when Stage 1 closes. |
