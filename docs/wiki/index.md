---
id: index
type: wiki-page
title: AIDDbot Wiki Index
status: draft
created: 2026-11-24
updated: 2026-11-26
links:
  sources: []
  related: []
  supersedes: []
---

# AIDDbot Wiki

Agent map of the AIDDbot project brain. Open the original documents for project facts. [Wiki rules](../process/knowledge-wiki.md)

Each kind has a folder under `docs/`. The roadmap and other standard documents keep their root paths. [Repository layout](../technology/scaffolding.md#layout)

## Process

- [Agent instructions](../../AGENTS.md) — repository rules and commands
- [Documentation catalog](../process/documentation-catalog.md) — change flow, document types, and standards
- [Knowledge wiki](../process/knowledge-wiki.md) — wiki model, rules, and operations
- [AIDDbot CLI](../process/aiddbot-cli.md) — shared command and script contract
- [Dogfooding](../process/dogfooding.md) — rules, how to use the roadmap, and findings
- [Notepad](../process/NOTEPAD.txt) — current session handoff

## Product

- [README](../../README.md) — project overview
- [Intent](../product/intent.md) — purpose, lifecycle, and building blocks
- [Glossary](../product/glossary.md) — shared terms
- [Roadmap](../../ROADMAP.md) — product milestones, outcomes, tasks, and future ideas
- [Journal](../process/documentation-catalog.md#session-journal) — daily entries for past changes in `docs/product/journal/`
- [Changelog](../../CHANGELOG.md) — notable changes
- [License](../../LICENSE) — terms for using AIDDbot

### Specs and change documents

- [s0001 spec](../product/specs/s0001-build-aiddbot-wiki/s0001.spec.md) — build the wiki
- [s0002 spec](../product/specs/s0002-web-knowledge-explorer/s0002.spec.md) — build the knowledge explorer
- [s0002 review](../product/specs/s0002-web-knowledge-explorer/s0002.review.md)
- [s0003 spec](../product/specs/s0003-two-loop-lifecycle/s0003.spec.md) — define the project and change loops
- [s0003 review](../product/specs/s0003-two-loop-lifecycle/s0003.review.md)
- [s0003 lifecycle scenarios](../product/specs/s0003-two-loop-lifecycle/s0003-US1.feature)
- [s0003 explorer scenarios](../product/specs/s0003-two-loop-lifecycle/s0003-US2.feature)
- [s0004 spec](../product/specs/s0004-naming-review/s0004.spec.md) — align names and Analysis inputs
- [s0004 review](../product/specs/s0004-naming-review/s0004.review.md)
- [s0005 spec](../product/specs/s0005-layered-maps/s0005.spec.md) — layer the explorer maps
- [s0005 overview scenarios](../product/specs/s0005-layered-maps/s0005-US1.feature)
- [s0005 detail map scenarios](../product/specs/s0005-layered-maps/s0005-US2.feature)
- [s0005 element page scenarios](../product/specs/s0005-layered-maps/s0005-US3.feature)
- [s0006 spec](../product/specs/s0006-publish-knowledge-explorer/s0006.spec.md) — publish the explorer
- [s0007 spec](../product/specs/s0007-separate-brain-and-wiki/s0007.spec.md) — separate the project brain and the wiki
- [s0008 spec](../product/specs/s0008-folders-by-kind/s0008.spec.md) — group every brain document in a kind folder
- [s0009 spec](../product/specs/s0009-session-journal/s0009.spec.md) — keep a session journal

## Technology

- [Design system](../../DESIGN.md) — colors, fonts, and diagrams
- [Scaffolding](../technology/scaffolding.md) — repository layout and distribution
- [CLI development](../technology/cli-development.md) — runtime, packaging, and local tests
- [Explorer development](../technology/explorer-development.md) — commands, tables, and site rules
