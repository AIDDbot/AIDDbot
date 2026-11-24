# AIDDbot Project Plan

Status: **draft**. Current milestone: **H1**.

- **Success criterion.** Another person completes a real change with the AIDDbot [README](README.md) and leaves evidence that others can review.
- **Guiding idea.** Design only what the next real change needs. Everything else goes to the [future ideas](#future-ideas).

## Dogfooding rules

We build AIDDbot with AIDDbot. This repository is the first project for its templates, skills, and scripts. The outputs are examples for teams and courses.

1. **The tool never blocks the work.** If an AIDDbot step is missing or gets in the way, do it by hand and record a finding.
2. **Extract, do not invent.** A template comes from a real document that worked. A skill comes from a workflow that we repeated. A script comes from a manual step that we repeated.
3. **Rule of three.** The second time we repeat something, record it as a finding. The third time, turn it into a template, skill, or script.
4. **Record every finding.** Each change records its process findings in its spec. Findings that change this plan go to the [findings](#findings) table.

## How to use this plan

- Work through the milestones in order.
- Tick a task when it is done. A milestone is done when its **Done when** criterion is true.
- Close every milestone with a findings review. Findings can change, add, or remove tasks. Record each change in this plan.

## H1 · One change by hand

The temporary exception in [AGENTS.md](AGENTS.md#way-of-working) covers the preparation of the foundational documents. H1 starts with a spec written by hand.

- [ ] Choose a small change that solves a current need of this repository.
- [ ] Write its [spec](DOCUMENTATION-CATALOG.md#spec) in `docs/specs/spec-0001-<short-name>.md`, with [`META`](DOCUMENTATION-CATALOG.md#metadata-meta): goal, scope, and acceptance. A person approves it.
- [ ] Implement the change.
- [ ] Review the change. Record the checks, their results, and their evidence in the spec.
- [ ] Close the change. Record the process findings.
- [ ] Review the findings. Decide which simplifications make the next change easier.

Done when: there is a closed change with evidence that another person can review.

## H2 · Repeat and extract

- [ ] Make more real changes with the same flow.
- [ ] Apply the rule of three. Extract the spec template into `templates/`.
- [ ] Extract the first skill, "specify a change", into `skills/`.
- [ ] If the findings justify it, add the first CLI command. [Script toolchain](SCRIPT-TOOLCHAIN.md)
- [ ] Remove the temporary exception from `AGENTS.md` when a change has used the template.
- [ ] Review the findings.

Done when: a change starts from the template and the first skill, and closes with evidence.

## H3 · Test outside

- [ ] Prepare a clean repository with its own `AGENTS.md`.
- [ ] Follow the AIDDbot `README.md` to copy the skill and the files that it uses.
- [ ] Another person completes a change with one AI coding tool.
- [ ] Repeat the test with a second AI coding tool and the same shared files.
- [ ] Update the `README.md` with the example and the tested steps. Add notable changes to `CHANGELOG.md`.
- [ ] Review the findings.

Done when: there is evidence of a complete change in both tools. The guide states how to load the skill in each tool and which context the skill takes from the test repository.

H3 can use an identified revision of this repository. If the skill needs the CLI, the test uses a local package file, as [before the first publish](SCRIPT-TOOLCHAIN.md#before-the-first-publish) explains. Consider npm publishing, an installer, and tool integrations only after a real need for distribution or installation appears.

## Findings

| # | Finding | Status |
| --- | --- | --- |
| F1 | The repository had only 2 of the 5 documents of the old project set. | Closed. The [project set](DOCUMENTATION-CATALOG.md#project-set) is now `AGENTS.md`, `README.md`, `CHANGELOG.md`, and `GLOSSARY.md`. The repository has all four. |
| F2 | `AGENTS.md` already contains the conventions. A separate `conventions` document is redundant in small projects. | Closed. Conventions are a section of `AGENTS.md`. |
| F3 | The catalog did not fix the folders for source documents. | Closed. [SCAFFOLDING.md](SCAFFOLDING.md) states each folder and the milestone that creates it. |
| F4 | Without templates, the spec-first rule blocks changes to the foundational documents. | Open. Temporary exception in `AGENTS.md`. H2 removes it. |

## Future ideas

Names only. Design one when a real change needs it.

- Web explorer of the documentation.
- Regulated profile (`brd`, `srs`, `use-case`, `traceability`) and `prd`.
- Installer and optional integrations for each tool: hooks and install paths.
- Monitoring log and performance budget.
- Compiled binaries.
- Customization for each project (`.aiddbot/`).
- Migration of the foundational documents into `docs/wiki/`.
- Wiki log, automatic ingest on change close, and `META` validation with the CLI.
- Ontology, if a real consumer needs it.
- Catalog documents and standards that are not used today.
