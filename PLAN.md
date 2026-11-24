# AIDDbot Project Plan

Status: **draft**. Current phase: **1**.

This plan holds the order of work and its progress. [DOGFOODING.md](DOGFOODING.md) holds the method: rules, the rule of three, and findings. [SCAFFOLDING.md](SCAFFOLDING.md) holds the folders.

## How to use this plan

- Work through the phases in order, unless **Depends on** allows parallel work.
- Tick a task when it is done. A phase is done when its **Done when** criterion is true.
- Close every phase with a findings review. Apply the [rule of three](DOGFOODING.md#rules).
- Phases 1 and 2 are fixed. From phase 3, the tasks are the expected order. Findings can change, add, or remove tasks. Record each change in this plan.

## Phase 1 · Prepare the repository

By hand. No spec needed: the temporary exception in [AGENTS.md](AGENTS.md#way-of-working) covers this phase. Depends on: nothing.

- [ ] Confirm the repository and installation layouts. [Scaffolding](SCAFFOLDING.md)
- [ ] Check the project set against the [catalog](DOCUMENTATION-CATALOG.md#project-set) (findings F1 and F2).
- [ ] Create the wiki index and log: `docs/wiki/index.md` and `docs/wiki/log.md`. [Knowledge wiki](KNOWLEDGE-WIKI.md)
- [ ] Move the foundational documents into the wiki (catalog decision 14). Add `META` to each page, add it to the index, and add one `ingest` entry per page to the log.

  | Current file | Wiki page | `type` |
  | --- | --- | --- |
  | `GLOSSARY.md` | `docs/wiki/glossary.md` | `glossary` |
  | `ONTOLOGY.md` | `docs/wiki/ontology.md` | `domain-model` |
  | `INTENT.md` | `docs/wiki/vision.md` | `vision` |
  | `DOCUMENTATION-CATALOG.md` | `docs/wiki/documentation-catalog.md` | `wiki-page` |
  | `KNOWLEDGE-WIKI.md` | `docs/wiki/knowledge-wiki.md` | `wiki-page` |
  | `SCRIPT-TOOLCHAIN.md` | `docs/wiki/script-toolchain.md` | `architecture` |
  | `SCAFFOLDING.md` | `docs/wiki/scaffolding.md` | `architecture` |
  | `DOCUMENTATION-EXPLORER.md` | `docs/wiki/documentation-explorer.md` | `wiki-page` |
  | `PLAN.md` | `docs/wiki/plan.md` | `wiki-page` |
  | `DOGFOODING.md` | `docs/wiki/dogfooding.md` | `wiki-page` |

  Keep `README.md`, `AGENTS.md`, `DESIGN.md`, `CHANGELOG.md`, and `LICENSE` at the root.
- [ ] Update all links, including those in `README.md` and `AGENTS.md`.
- [ ] Move the [initial findings](DOGFOODING.md#initial-findings) to `docs/wiki/dogfooding-findings.md`.
- [ ] Review the findings.

Done when: a contributor can start at `README.md` or `AGENTS.md`, reach `docs/wiki/index.md`, and find every foundational page.

## Phase 2 · Complete the first change

By hand. Change: **spec template**. Type: `feat`. Depends on: phase 1.

- [ ] **Specify.** Write the first spec in `docs/specs/`. Follow the `feat` profile: `user-story`, `acceptance`, and `META`.
- [ ] **Plan.** Write its `impl-plan` with a `tasks` checklist.
- [ ] **Build.** Extract the spec template from the first spec, with variants for `chore`, `refactor`, `fix`, and `feat`.
- [ ] **Review.** Write the `review-report`, with checks, evidence, and **Process feedback**.
- [ ] **Close.** Set the spec to `done`, ingest it into the wiki, add a `CHANGELOG.md` entry, and remove the temporary exception from `AGENTS.md`.
- [ ] Review the findings.

Done when: the next change can start from the template, not from a blank page.

## Phase 3 · Complete the change templates

Depends on: phase 2.

- [ ] Extract the `impl-plan` and `review-report` templates from the first change.
- [ ] Use the three templates in the next change.
- [ ] Review the findings.

Done when: a `feat` change can be documented from templates only.

## Phase 4 · Build the CLI

Depends on: phase 2. Can run in parallel with phase 3.

- [ ] Create the CLI package in the Bun workspace. [Script toolchain](SCRIPT-TOOLCHAIN.md)
- [ ] Set up CI: lint, type check, and tests on every push.
- [ ] Run the `log` command spike. Record the CLI launch decision in an ADR.
- [ ] Add the document commands (`doc new`, `doc validate`, `doc close`) when the findings show repeated manual steps.
- [ ] Add the commit check command.
- [ ] Add maintenance tasks in `scripts/` when a repository task repeats.
- [ ] Review the findings.

Done when: every command passes CI, and the hook commands meet the [performance budget](SCRIPT-TOOLCHAIN.md#performance-budget).

## Phase 5 · Build and install skills and hooks

Depends on: phase 4.

- [ ] Extract the first skill: specify a change.
- [ ] Add the wiki skill: ingest, answer, and review.
- [ ] Add installation support for the first AI coding tool.
- [ ] Pin the exact CLI version in the installed skills and hooks.
- [ ] Install them in this repository and use them on a real change.
- [ ] Review the findings.

Done when: a change in this repository runs with the installed skills and hooks, with no manual workaround.

## Phase 6 · Build the explorer

Depends on: phase 2. Can run in parallel with phases 3 to 5.

- [ ] Write the first explorer spec. Confirm the stack, hosting, and tour content format. [Explorer](DOCUMENTATION-EXPLORER.md)
- [ ] Build an animated walkthrough from a real AIDDbot change.
- [ ] Show the ontology relationships in the building blocks map.
- [ ] Add build checks for source links and stale tour content.
- [ ] Deploy the site from CI.
- [ ] Review the findings.

Done when: a new reader can follow a real change from spec to close in the explorer, and its review report passes the `ui-checklist`.

## Phase 7 · Release AIDDbot

Depends on: phases 3 to 6.

- [ ] Decide which AI coding tools the first release supports.
- [ ] Confirm the npm package name.
- [ ] Write the first user guide.
- [ ] Follow the guide in a clean project. Record the results.
- [ ] Publish the CLI package.
- [ ] Publish the skills bundle for the pinned CLI version.
- [ ] Check that the explorer shows the release revision.
- [ ] Move the `Unreleased` changelog entries to the release version and tag it.
- [ ] Update `README.md` and `AGENTS.md`: remove the design-stage notice, and add the release and guide links.
- [ ] Review the findings.

Done when: a team can install AIDDbot in a new project from the guide and complete one change.

## Change history

- v2. The plan holds the order and progress; `DOGFOODING.md` keeps the method. Add **Done when** and **Depends on** to every phase, a findings review per phase, CI, the change templates phase, and the complete release steps. Reorder the release phase.
- v1. List the phases and tasks.
