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

## Plan

[PLAN.md](PLAN.md) holds the phases, their order, and progress. Phases 1 and 2 are by hand. From phase 3, every change uses the latest templates, skills, and scripts, and the findings can change the order.

## Initial findings

Findings from the review of the foundational documents. They move to the wiki in [phase 1](PLAN.md#phase-1--prepare-the-repository).

| # | Finding | Proposed action |
| --- | --- | --- |
| F1 | The repository has only 2 of the 5 project-set documents (`AGENTS.md`, `README.md`). | Plan phase 1. |
| F2 | `AGENTS.md` already contains the conventions (writing style, commits, scripts). A separate `conventions` document may be redundant in small projects. | Evaluate after plan phase 2. Possible catalog change: `conventions` is a section of `agent-instructions` unless the project is `complex`. |
| F3 | The catalog does not fix the folders for source documents (`docs/specs/`, `docs/adr/`…). | Use the proposed [repository layout](SCAFFOLDING.md#proposed-layout). Confirm it in plan phase 1. |
| F4 | Without templates, the spec-first rule blocks changes to the foundational documents. | Temporary exception in `AGENTS.md`. Remove it when plan phase 2 closes. |
