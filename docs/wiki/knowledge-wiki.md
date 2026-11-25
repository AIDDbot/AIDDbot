---
id: knowledge-wiki
type: wiki-page
title: AIDDbot Knowledge Wiki
status: draft
created: 2026-11-24
updated: 2026-11-25
links:
  sources:
    - https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f
    - https://obsidian.md/
  related:
    - documentation-catalog
    - glossary
  supersedes: []
---

# AIDDbot Knowledge Wiki

The wiki is the living knowledge of a project, for people and agents. It is a second brain for all the project documentation. AIDDbot uses it for its own documents, and its skills help teams keep one in their projects. Agents keep it up to date from sources. It follows [Karpathy's LLM Wiki pattern](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f). See the [intent](intent.md) and the [documentation catalog](documentation-catalog.md).

Status: **draft**.

## Model

Three layers:

| Layer | What | Rule |
| --- | --- | --- |
| **Sources** | Closed specs and reports, ADRs, issues, pull requests, raw files, external URLs. [Sources](#sources) | Never edited by the wiki. Cited by the wiki. |
| **Wiki** | Synthesis pages: what the project knows now. | Maintained by agents. Every claim cites a source. |
| **Schema** | The wiki rules in this document. | Tells agents how to ingest, answer, and review. |

The wiki **synthesizes**; it does not **copy**. One fact has one home.

### What is a wiki page

A wiki page is a prose `LIVE` document about one topic.

These `LIVE` documents stay **outside** the wiki, because tools or conventions need them in a fixed place. The wiki links to them:

| Document | Why outside |
| --- | --- |
| `agents`, `readme`, `changelog` | Fixed names at the repository root. |
| `design-system` | Lives with the UI code or in a shared guide. AIDDbot uses [DESIGN.md](../../DESIGN.md) at the repository root. |
| `adr` | Immutable record; a source, not a synthesis. |
| `roadmap` | Fixed place at the repository root, next to the readme. |

## Repository layout

```text
<project-root>/
├── AGENTS.md            # points agents to docs/wiki/index.md
└── docs/
    ├── wiki/
    │   ├── index.md     # catalog of pages
    │   └── <topic>.md
    ├── specs/           # one folder per change: spec and other change documents (sources)
    ├── adr/             # ADRs (sources)
    └── raw/             # imported files: transcripts, notes, articles (sources)
```

Git records the history of the wiki.

## Page rules

- **Flat folder.** All pages live in `docs/wiki/`. Add subfolders only when the index becomes hard to read.
- **Metadata.** Each page starts with `META` frontmatter. A wiki page's `id` is its file name without `.md` (for example, `glossary`), because there is only one page per topic.
- **Synthesis first.** The page starts with a short summary of the current state. Details follow.
- **Citations.** Every claim links to its source with a relative Markdown link. A claim without a source is marked `(unverified)`.
- **Conflicts.** When sources disagree, the page shows both with their citations under a `> [!warning] Conflict` callout. A person decides.
- **Links.** Use only standard relative Markdown links, such as `[Glossary](glossary.md)`.
- **Explorer tables.** The [knowledge explorer](glossary.md#knowledge-explorer) reads six tables: the [lifecycle phases](intent.md#lifecycle-phases), the [change flow](documentation-catalog.md#change-flow), the [building blocks](intent.md#building-blocks), the [document catalog](documentation-catalog.md#document-catalog), the [Form tag](documentation-catalog.md#form), and the [status use](documentation-catalog.md#status-use). Keep their headings and column names. Write document IDs in backticks. A change to them needs an explorer update. [Explorer development](explorer-development.md#wiki-contract)

## index.md

One line per page, grouped by `type`:

```markdown
## Domain
- [Glossary](glossary.md) — shared terms for people, agents, and code
```

Agents read the index first. Then they open only the pages they need.

## Operations

### 1. Ingest a source

A person or an agent gives a [source](#sources): for example, a closed spec, an ADR, an issue, a pull request, or a file from `docs/raw/`.

1. Read the source. See the [source types](#sources).
2. Find related pages in `index.md`.
3. Update those pages, or create new ones, with citations.
4. Mark conflicts with existing claims.
5. Update `index.md`.

### 2. Answer a question

1. Read `index.md`, then the relevant pages.
2. Check the original sources where needed.
3. Answer with citations. State uncertainty.
4. If the answer adds knowledge, offer to save it as a page.

### 3. Review the wiki

Check, then fix what the sources support. Flag the rest for a person.

- Claims with no source, or with sources that no longer say it.
- Conflicts between pages.
- Pages missing from `index.md`, and orphan pages.
- Broken links and invalid `META`.

## Sources

| Source | Where it lives | How the wiki cites it |
| --- | --- | --- |
| Closed specs, plans, and review reports | `docs/specs/` | Relative link. |
| ADRs | `docs/adr/` | Relative link. |
| Issues and pull requests | The issue tracker or the Git host | URL. |
| Incident reports and postmortems | The project documents or the incident tool | Relative link or URL. |
| Transcripts, meeting notes, articles | `docs/raw/` | Relative link. |
| External references | The web | URL. |

Ingest only sources with durable knowledge, such as the cause of a defect or a decision taken in a pull request. Not every issue or pull request needs an ingest.

- **`docs/raw/` is immutable.** Files are added, never edited or deleted.
- Cite project documents in place. Do not copy them to `docs/raw/`.
- Cite issues, pull requests, and external references by URL. Save a local copy only when the page may change or disappear; record the original URL and capture date in its frontmatter.

## Access

- **Agents**: `agents` says: "For project knowledge, start at `docs/wiki/index.md`."
- **People**: any Markdown editor. On GitHub, links work as they are.

### Obsidian

[Obsidian](https://obsidian.md/) can open the repository as a vault. It reads the pages, the relative links, the `META` frontmatter as properties, Mermaid diagrams, and callouts.

Set these options in **Settings → Files & links**, so that new links stay standard Markdown:

| Option | Value |
| --- | --- |
| Use `[[Wikilinks]]` | Off |
| New link format | Relative path to file |

Known limits:

- Links to an anchor, such as `glossary.md#spec`, open the page but do not go to the section. Obsidian does not use GitHub heading anchors or HTML `<a id>` anchors.
- File names in the `links` field of `META` do not show in the graph. Obsidian shows only `[[...]]` links there.

Do not use `[[...]]` links in pages. GitHub and other editors do not read them.

## Deferred

These ideas wait for a real need.

- A `log.md` of wiki operations. Git is the history.
- Automatic ingest when a change closes.
