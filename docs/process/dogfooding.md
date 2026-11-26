---
id: dogfooding
type: page
title: AIDDbot Dogfooding
status: draft
created: 2026-11-26
updated: 2026-11-26
links:
  sources: []
  related:
    - roadmap
    - s0008
  supersedes: []
---

# AIDDbot Dogfooding

## Dogfooding rules

We test AIDDbot on AIDDbot. This repository is the first project that uses its skills, templates, and CLI. The outputs are examples for teams and courses.

1. **Start from the wiki.** Use the [AIDDbot wiki](../wiki/index.md) to find the original documents. A skill, template, or command applies a rule from a process page. If a rule is missing, add it to its page first.
2. **Use each piece as soon as it exists.** The next change in this repository uses the new skill, template, or command.
3. **The tool never blocks the work.** If an AIDDbot step is missing or gets in the way, do it by hand and record a finding.
4. **Record every finding.** Each change records its process findings in its review report. Findings that change the roadmap go to the [findings](#findings) table.

Other teams get the skills, the templates, and the CLI. The project documents stay in this repository. [What ships](../technology/scaffolding.md#what-ships)

## How to use the roadmap

Use the [roadmap](../../ROADMAP.md) to track work.

- Work through the milestones in order.
- Tick a task when it is done. A milestone is done when its **Done when** criterion is true.
- Close every milestone with a findings review. Findings can change, add, or remove tasks. Record each change in the roadmap.

## Findings

| # | Finding | Status |
| --- | --- | --- |
| F1 | The repository had only 2 of the 5 documents of the old project set. | Closed. The [project set](documentation-catalog.md#project-set) is now `AGENTS.md`, `README.md`, `CHANGELOG.md`, and [glossary](../product/glossary.md). The repository has all four. |
| F2 | `AGENTS.md` already contains the conventions. A separate `conventions` document is redundant in small projects. | Closed. Conventions are a section of `AGENTS.md`. |
| F3 | The catalog did not fix the folders for source documents. | Closed. The [scaffolding](../technology/scaffolding.md) page states each folder and the milestone that creates it. |
| F4 | Without templates, the original spec-first rule blocked changes to the foundational documents. | Closed. A person requests or approves each spec under the [spec-first rule](../../AGENTS.md#way-of-working). |
| F5 | The old plan built a template, skill, or script only after we repeated a task three times. It ignored the design in the foundational documents and delayed the lifecycle skills. | Closed. The plan now starts from the foundational documents and builds in four milestones. |
| F6 | The test install of the CLI used `bun add -d`. Many projects have no `package.json`. | Open. M3 defines an install that does not depend on the project stack. |
| F7 | The old plan deferred the wiki. AIDDbot needs one for its own documents, and teams need one for their projects. | Closed. M0 builds the AIDDbot wiki. M1 adds the wiki skills. |
