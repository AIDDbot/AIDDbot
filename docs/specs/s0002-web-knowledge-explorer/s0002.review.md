---
id: s0002-review
type: review-report
title: Review of the web knowledge explorer
status: done
created: 2026-11-25
updated: 2026-11-25
links:
  sources:
    - docs/specs/s0002-web-knowledge-explorer/spec.md
  related:
    - s0002
    - explorer-development
  supersedes: []
---

# s0002-review - Review of the web knowledge explorer

All 9 requirements of [`s0002`](spec.md) pass. This report records the evidence and the findings. An agent did the implementation in one session, with no person present. A person reviewed it and closed the change.

## Evidence

| Requirement | Check | Result |
| --- | --- | --- |
| `US1R1` | `bun test`: the build writes `index.html`, `main.js`, `styles.css`, `theme.css`, and `data.json` with relative paths only. Headless Chrome opens the site from the `/dist/` subfolder of a static server. | Pass |
| `US1R2` | `bun test`: the map has one node for each table row, in table order, with the phase, step, and feedback arrows. Headless Chrome: pointing at `spec` highlights its 8 linked elements. | Pass |
| `US1R3` | Headless Chrome over the DevTools protocol: a click on Design starts 29 animations, then the address becomes `#/phase/design` and the page opens. | Pass |
| `US1R4` | `bun test` with broken copies of the wiki: a missing anchor, a renamed column, an unknown document ID, and an unknown element name stop the build. From the command line, the build exits with code 1 and names the file and the problem. | Pass |
| `US2R1` | Screenshots of a phase, a step, a block, and a document type page: summary, diagram, wiki sections, glossary terms, and the mini-map with the element marked. An early frame shows the diagram half built. | Pass |
| `US2R2` | `bun test`: every text color pair of both themes has a contrast of at least 4.5:1. Screenshots of the dark and the light theme. | Pass |
| `US2R3` | Headless Chrome with reduced motion: a click opens the page at once, and the page has 0 running animations. | Pass |
| `US3R1` | Screenshot of `s0002`: headings, tables, code, the Mermaid diagram, `META` badges, contents, related, and sources. `#/doc/glossary/project` scrolls to the term row and marks it. | Pass |
| `US3R2` | `bun test`: a missing `META`, an invalid status, and a broken link are listed with their file, and the document has a warning. | Pass |

Checks: `bunx tsc --noEmit` passes. `bun test` passes 30 tests. `bun lint` does not run (finding 1).

## Findings

| # | Finding | Proposal |
| --- | --- | --- |
| 1 | `bun lint` does not exist in Bun 1.4.5. `AGENTS.md`, `cli-development.md`, and `s0002` ask for it. | A person chooses a linter, or waits for the Bun linter. Then update the three documents. |
| 2 | The spec named four chapter tables. The builder needs a fifth: the status use table, for the document type diagram. | Recorded in the [wiki contract](../../wiki/explorer-development.md#wiki-contract). No action. |
| 3 | The `Set in` column of the status use has one value for all document types. `draft` says "Foundation, Analysis", but a spec is drafted only in Analysis. | Decide in the skill map if `Set in` needs one row for each document group. |
| 4 | The block diagram needs block-to-block links ("Skills uses Templates"). The spec gave only one new column. The `Relations` column now holds block names too. | Recorded in the wiki contract. No action. |
| 5 | The Claude in Chrome extension was not connected. Headless Chrome with the DevTools protocol checked the clicks, the zoom, and reduced motion instead. | A future end-to-end test can reuse this approach. |
| 6 | The explorer is the first package, but there is no Bun workspace. A new clone must run `bun run explorer:install` before the build. | Configure the workspace with the second package, as [scaffolding](../../wiki/scaffolding.md#when-each-folder-appears) says. |
| 7 | The logo loads from the author's site. Offline, the header has no icon. | Decide with the open question about the AIDDbot logo in `DESIGN.md`. |
| 8 | The `mermaid` package adds about 100 chunk files to the build output. It loads only for documents with Mermaid blocks. | No action while the site is local. Check again before a public host. |

## Decisions taken during the implementation

These choices were not in the spec. A person reviews them.

- The building blocks table keeps **Project context** and adds **Templates** and **Wiki**: six blocks.
- The Foundation row names `readme` and `wiki-page` in backticks, so they hang under Foundation on the map.
- A document type hangs under the first **phase** that names it. Only if no phase names it, it hangs under the first step that produces it.
- After `accepted`, the later statuses branch, so an `adr` ends as `superseded` or `deprecated`.
- Fonts use only the Latin subsets, and the bundler puts them inside `styles.css`.
- The element views use the attributes `element` and `doc`, not `id`, so they do not clash with heading anchors.
