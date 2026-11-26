---
id: roadmap
type: roadmap
title: AIDDbot Roadmap
status: draft
created: 2026-11-24
updated: 2026-11-26
links:
  sources:
    - s0008
  related:
    - intent
  supersedes:
    - development-plan
---

# AIDDbot Roadmap

Current milestone: **M0**.

Milestone codes run from `M0` to `M9`, in order. A `feat` or `fix` spec names its milestone in `META`. [Spec](docs/process/documentation-catalog.md#spec)

AIDDbot starts from the original documents in its [project brain](docs/process/knowledge-wiki.md#model). Each milestone builds on the previous one. We test each piece in this repository as soon as it exists. [Dogfooding](docs/process/dogfooding.md)

## Building order

| Milestone | Builds | Depends on |
| --- | --- | --- |
| M0 · Base documentation | The foundational documents, the wiki index, and the map of the lifecycle skills. | The current foundational documents. |
| M1 · Lifecycle skills | Skills and templates that produce the documents of each lifecycle phase and keep the project wiki. | M0 |
| M2 · Deterministic CLI | The `aiddbot` CLI. It takes every deterministic step out of the skills. | M1 |
| M3 · Distribution and versions | A versioned release and an installer that installs and updates AIDDbot in a project. | M2 |

## M0 · Base documentation

Teams can learn the AIDDbot method, see where each skill fits in the lifecycle, and inspect a completed change.

At least one M0 change uses a spec written by hand, to test the spec format. [Spec-first](AGENTS.md#way-of-working)

- [x] Review each foundational document. List the gaps, overlaps, and contradictions. Fix them in their reference documents.
- [x] Build the first AIDDbot wiki with pages for the foundational documents and an index. Follow the [page rules](docs/process/knowledge-wiki.md#page-rules).
- [x] Update `AGENTS.md` and the links in every document.
- [x] Check how anchor links work in [Obsidian](docs/process/knowledge-wiki.md#obsidian). Decide if the pages keep them or link to whole pages.
- [x] Define the [lifecycle phases](docs/product/intent.md#lifecycle-phases), their project loop and change loop, and the structure and business terms of the [glossary](docs/product/glossary.md).
- [x] Build the web knowledge explorer: a visual site for people that reads the AIDDbot documents. Spec [`s0002`](docs/product/specs/s0002-web-knowledge-explorer/s0002.spec.md). [Explorer development](docs/technology/explorer-development.md)
- [x] Separate the project loop and the change loop, with the knowledge shelf between them. Spec [`s0003`](docs/product/specs/s0003-two-loop-lifecycle/s0003.spec.md)
- [x] Apply the naming review: project brain, `agents`, no `impl-plan`, feature files in Analysis. Spec [`s0004`](docs/product/specs/s0004-naming-review/s0004.spec.md)
- [x] Give the explorer maps in layers: an overview, a change loop map with an impact filter, a brain map, and a blocks view. Spec [`s0005`](docs/product/specs/s0005-layered-maps/s0005.spec.md)
- [x] Move the original documents into process, product, and technology folders. Keep the wiki as the agent map. Spec [`s0007`](docs/product/specs/s0007-separate-brain-and-wiki/s0007.spec.md)
- [x] Put specs and the notepad in their kind folders. Move milestone tasks to the roadmap and dogfooding rules to process. Spec [`s0008`](docs/product/specs/s0008-folders-by-kind/s0008.spec.md)
- [ ] Map the lifecycle skills. For each phase in [lifecycle phases](docs/product/intent.md#lifecycle-phases) and each step of the [change flow](docs/process/documentation-catalog.md#change-flow), state the skills, the documents that each skill produces, and the order in which we build them.
- [ ] Check that the [documentation catalog](docs/process/documentation-catalog.md) defines every document in the map.
- [x] Write one change with its [spec](docs/process/documentation-catalog.md#spec) in `docs/product/specs/s0001-<short-slug>/s0001.spec.md`, with [`META`](docs/process/documentation-catalog.md#document-ids-and-file-names). A person approves it, and the change closes with evidence.
- [ ] Review the findings.

Done when: the original documents state the foundational knowledge with no contradictions, the wiki indexes it, the skill map exists, and one change has closed with a spec written by hand.

## M1 · Lifecycle skills

The skills and templates support a complete change, from Analysis to Close. A real change in AIDDbot shows how the wiki captures what the closed spec teaches.

Build the skills in the order of the skill map. Start with the [change flow](docs/process/documentation-catalog.md#change-flow): Analysis, Design, Implementation, Verification, and Close. Include the Foundation phase and the [wiki operations](docs/process/knowledge-wiki.md#operations): ingest, answer, and wiki review. Teams use them to keep the wiki of their own projects.

- [ ] Write the template of each document that a skill produces, in `templates/`. Start with the spec.
- [ ] Write each skill in `skills/`, in the [Agent Skills](https://agentskills.io/specification) format.
- [ ] Use each new skill in the next change of this repository.
- [ ] In each skill, mark the deterministic steps. They are the input for M2.
- [ ] Check that no skill or template assumes one stack or language.
- [ ] Use the spec template in a real change.
- [ ] Review the findings.

Done when: a change in this repository goes through the whole change flow with the skills and templates, and its closed spec is ingested into the AIDDbot wiki with the wiki skill.

## M2 · Deterministic CLI

Teams can run routine steps, such as document validation, with consistent results across project stacks.

Follow the [AIDDbot CLI](docs/process/aiddbot-cli.md) and [CLI development](docs/technology/cli-development.md) pages.

- [ ] Turn the deterministic steps that M1 marked into CLI commands.
- [ ] Update the skills. They call the commands and do not repeat their logic in prose.
- [ ] Test the commands on fixture projects. The commands do not depend on the project stack.
- [ ] Use the CLI in the next change of this repository.
- [ ] Review the findings.

Done when: the skills of this repository call the CLI for every deterministic step, and the tests pass.

## M3 · Distribution and versions

A team can install a versioned AIDDbot release in its own repository and complete a real change with evidence that others can review.

- [ ] Decide the release unit. Recommended: one version for the skills, templates, and CLI together.
- [ ] Decide if the CLI needs Bun on the user's machine or ships as compiled binaries. Teams that do not use JavaScript may not have Bun.
- [ ] Write the [installer](docs/product/glossary.md#installer). It copies the skills and templates to the location of each AI coding tool and pins the CLI version. It does not need a `package.json` in the target project.
- [ ] Define the release flow: Semantic Versioning, `CHANGELOG.md`, Git tag, and package publish.
- [ ] Install AIDDbot in this repository with the installer.
- [ ] Prepare a clean repository with its own `AGENTS.md`. Another person installs AIDDbot and completes a change.
- [ ] Repeat one test with a second AI coding tool and the same shared files.
- [ ] Update the `README.md` with the tested steps. Add notable changes to `CHANGELOG.md`.
- [ ] Review the findings.

Done when: the M3 outcome above is met and the README states how to install, update, and load AIDDbot in each tool.

When a release completes a milestone, the milestone can link to that version in the [changelog](CHANGELOG.md).

## Later

Names only. Design one when a real change needs it.

- Regulated profile (`brd`, `srs`, `use-case`, `traceability`) and `prd`.
- Optional integrations for each tool, such as hooks.
- Monitoring log and performance budget.
- Customization for each project (`.aiddbot/`).
- Wiki log and automatic ingest on change close.
- List the specs of each milestone, in a script or in the knowledge explorer.
- Knowledge explorer for teams: their process, their wiki, and their project (product and technology). It reduces the cognitive debt of people who work with agents.
- Ontology, if a real consumer needs it.
- Catalog documents and standards that are not used today.
