# AIDDbot Project Plan

Status: **draft**. Current milestone: **H1**.

- **Success criterion.** Another person installs a versioned AIDDbot release in their own project. The person completes a real change with the AIDDbot skills and leaves evidence that others can review.
- **Guiding idea.** AIDDbot starts from its foundational documents. We order them first, as the AIDDbot [knowledge wiki](KNOWLEDGE-WIKI.md). Then we build the skills, the CLI, and the distribution on top of them, one piece at a time. We test each piece on this repository as soon as it exists.
- **What ships.** Other teams get only the skills, the templates, and the CLI. Everything else stays in this repository. [What ships](SCAFFOLDING.md#what-ships)

## Building order

| Milestone | Builds | Depends on |
| --- | --- | --- |
| H1 · Base documentation | The AIDDbot wiki, built from the foundational documents, and the map of the lifecycle skills. | The current foundational documents. |
| H2 · Lifecycle skills | Skills and templates that produce the documents of each lifecycle stage and keep the project wiki. | H1 |
| H3 · Deterministic CLI | The `aiddbot` CLI. It takes every deterministic step out of the skills. | H2 |
| H4 · Distribution and versions | A versioned release and a script that installs and updates AIDDbot in a project. | H3 |

## Dogfooding rules

We test AIDDbot on AIDDbot. This repository is the first project that uses its skills, templates, and CLI. The outputs are examples for teams and courses.

1. **Start from the foundational documents.** They are the design base. A skill, template, or command applies a rule from them. If a rule is missing, add it to its reference document first.
2. **Use each piece as soon as it exists.** The next change in this repository uses the new skill, template, or command.
3. **The tool never blocks the work.** If an AIDDbot step is missing or gets in the way, do it by hand and record a finding.
4. **Record every finding.** Each change records its process findings in its spec. Findings that change this plan go to the [findings](#findings) table.

## How to use this plan

- Work through the milestones in order.
- Tick a task when it is done. A milestone is done when its **Done when** criterion is true.
- Close every milestone with a findings review. Findings can change, add, or remove tasks. Record each change in this plan.

## H1 · Base documentation

The temporary exception in [AGENTS.md](AGENTS.md#way-of-working) covers changes to the foundational documents. At least one H1 change uses a spec written by hand, to test the spec format.

- [ ] Review each foundational document. List the gaps, overlaps, and contradictions. Fix them in their reference documents.
- [ ] Build the AIDDbot wiki. Move the foundational documents into `docs/wiki/` as pages, with `index.md`. Follow the [page rules](KNOWLEDGE-WIKI.md#page-rules). `AGENTS.md`, `README.md`, `CHANGELOG.md`, `PLAN.md`, and `DESIGN.md` stay at the root.
- [ ] Update `AGENTS.md` and the links in every document.
- [ ] Check how anchor links work in [Obsidian](KNOWLEDGE-WIKI.md#obsidian). Decide if the pages keep them or link to whole pages.
- [ ] Map the lifecycle skills. For each stage in [lifecycle coverage](INTENT.md#lifecycle-coverage), state the skills, the documents that each skill produces, and the order in which we build them.
- [ ] Check that the [documentation catalog](DOCUMENTATION-CATALOG.md) defines every document in the map.
- [ ] Write one change with its [spec](DOCUMENTATION-CATALOG.md#spec) in `docs/specs/s0001-<short-slug>.spec.md`, with [`META`](DOCUMENTATION-CATALOG.md#document-ids-and-file-names). A person approves it, and the change closes with evidence.
- [ ] Review the findings.

Done when: the AIDDbot wiki holds the foundational knowledge with no contradictions, the skill map exists, and one change has closed with a spec written by hand.

## H2 · Lifecycle skills

Build the skills in the order of the skill map. Start with the [change flow](DOCUMENTATION-CATALOG.md#change-flow): specify, plan, build and review, close. Include the [wiki operations](KNOWLEDGE-WIKI.md#operations): ingest, answer, and review. Teams use them to keep the wiki of their own projects.

- [ ] Write the template of each document that a skill produces, in `templates/`. Start with the spec.
- [ ] Write each skill in `skills/`, in the [Agent Skills](https://agentskills.io/specification) format.
- [ ] Use each new skill in the next change of this repository.
- [ ] In each skill, mark the deterministic steps. They are the input for H3.
- [ ] Check that no skill or template assumes one stack or language.
- [ ] Remove the temporary exception from `AGENTS.md` when a change has used the spec template.
- [ ] Review the findings.

Done when: a change in this repository goes through the whole change flow with the skills and templates, and its closed spec is ingested into the AIDDbot wiki with the wiki skill.

## H3 · Deterministic CLI

Follow the [script toolchain](SCRIPT-TOOLCHAIN.md).

- [ ] Turn the deterministic steps that H2 marked into CLI commands.
- [ ] Update the skills. They call the commands and do not repeat their logic in prose.
- [ ] Test the commands on fixture projects. The commands do not depend on the project stack.
- [ ] Use the CLI in the next change of this repository.
- [ ] Review the findings.

Done when: the skills of this repository call the CLI for every deterministic step, and the tests pass.

## H4 · Distribution and versions

- [ ] Decide the release unit. Recommended: one version for the skills, templates, and CLI together.
- [ ] Decide if the CLI needs Bun on the user's machine or ships as compiled binaries. Teams that do not use JavaScript may not have Bun.
- [ ] Write the install and update script. It copies the skills and templates to the location of each AI coding tool and pins the CLI version. It does not need a `package.json` in the target project.
- [ ] Define the release flow: Semantic Versioning, `CHANGELOG.md`, Git tag, and package publish.
- [ ] Install AIDDbot in this repository with the script.
- [ ] Prepare a clean repository with its own `AGENTS.md`. Another person installs AIDDbot and completes a change.
- [ ] Repeat one test with a second AI coding tool and the same shared files.
- [ ] Update the `README.md` with the tested steps. Add notable changes to `CHANGELOG.md`.
- [ ] Review the findings.

Done when: the success criterion is true. The README states how to install, update, and load AIDDbot in each tool.

## Findings

| # | Finding | Status |
| --- | --- | --- |
| F1 | The repository had only 2 of the 5 documents of the old project set. | Closed. The [project set](DOCUMENTATION-CATALOG.md#project-set) is now `AGENTS.md`, `README.md`, `CHANGELOG.md`, and `GLOSSARY.md`. The repository has all four. |
| F2 | `AGENTS.md` already contains the conventions. A separate `conventions` document is redundant in small projects. | Closed. Conventions are a section of `AGENTS.md`. |
| F3 | The catalog did not fix the folders for source documents. | Closed. [SCAFFOLDING.md](SCAFFOLDING.md) states each folder and the milestone that creates it. |
| F4 | Without templates, the spec-first rule blocks changes to the foundational documents. | Open. Temporary exception in `AGENTS.md`. H2 removes it. |
| F5 | The old plan built a template, skill, or script only after we repeated a task three times. It ignored the design in the foundational documents and delayed the lifecycle skills. | Closed. The plan now starts from the foundational documents and builds in four milestones. |
| F6 | The test install of the CLI used `bun add -d`. Many projects have no `package.json`. | Open. H4 defines an install that does not depend on the project stack. |
| F7 | The old plan deferred the wiki. AIDDbot needs one for its own documents, and teams need one for their projects. | Closed. H1 builds the AIDDbot wiki. H2 adds the wiki skills. |

## Future ideas

Names only. Design one when a real change needs it.

- Web explorer of the documentation.
- Regulated profile (`brd`, `srs`, `use-case`, `traceability`) and `prd`.
- Optional integrations for each tool, such as hooks.
- Monitoring log and performance budget.
- Customization for each project (`.aiddbot/`).
- Wiki log, automatic ingest on change close, and `META` validation with the CLI.
- Ontology, if a real consumer needs it.
- Catalog documents and standards that are not used today.
