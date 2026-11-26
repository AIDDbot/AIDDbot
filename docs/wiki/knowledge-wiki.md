---
id: knowledge-wiki
type: wiki-page
title: AIDDbot Knowledge Wiki
status: draft
created: 2026-11-24
updated: 2026-11-26
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
| `roadmap` | `ROADMAP.md` at the repository root, next to `CHANGELOG.md`. |
| `notepad` | Plain text for the current [session handoff](documentation-catalog.md#session-handoff). The index links to it. |

## Repository layout

```text
<project-root>/
├── AGENTS.md            # points agents to docs/wiki/index.md
└── docs/
    ├── NOTEPAD.txt      # optional session handoff
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
- **Explorer tables.** The [knowledge explorer](glossary.md#knowledge-explorer) reads seven tables: the [lifecycle phases](intent.md#lifecycle-phases), the [change flow](documentation-catalog.md#change-flow), the [impact levels](documentation-catalog.md#impact-levels), the [building blocks](intent.md#building-blocks), the [document catalog](documentation-catalog.md#document-catalog), the [Form tag](documentation-catalog.md#form), and the [status use](documentation-catalog.md#status-use). Keep their headings and column names. Write document IDs in backticks. A change to them needs an explorer update. [Explorer development](explorer-development.md#wiki-contract)

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

## Pending

Brainstorm results go here until they become rules.

### Wiki as a separate system

Agreed direction from 2026-11-26. It is not applied yet. It replaces the current [model](#model) when a change applies it.

| # | Decision | Reason |
| --- | --- | --- |
| W1 | The **project brain** is all the project documentation that people, agents, and skills create: living documents and sources, such as closed specs, ADRs, and raw notes. It covers process, business, and technology. The wiki is not part of it. | One simple rule: every document is in the brain, except the wiki. |
| W2 | The **knowledge wiki** is a separate system on top of the brain and the code. It indexes and summarizes them for agents, and links to the original documents. It owns no facts. | Documents are the truth. The wiki is the agent map. It is easy to explain and to sell. |
| W3 | Only agents write the wiki, through ingest, query, and review. People write the brain. | Clear ownership. The wiki can be rebuilt from the brain. |
| W4 | The wiki can create new views that cross many documents, but no new facts. A new fact goes to a brain document first. | One fact, one home. |
| W5 | The code is not in the brain, but it is a source of the wiki. The wiki maps the code at the level that changes slowly: modules and their purpose, how they connect, which spec, ADR, or tests explain each part, and repeated patterns. It never copies code, signatures, or behavior details. Start with one code map page. | Agents find their way without reading the whole repository. The code and its tests stay the truth. |
| W6 | Keep the wiki small. A page exists only when an agent needs it to find its way or to answer a real question. Add a page when a query or an ingest needs it, not in advance. | A big wiki costs context and goes stale. Less to keep, less to review. |
| W7 | Each document has one of three kinds. **Process**: how we work. **Product**: what we build and why: business, domain, terms, goals, roadmap. **Technology**: how it is built: architecture, stack, technical decisions, code conventions. Product and technology are the project documentation. AIDDbot installs only process, apart, versioned, and read-only. The team adaptations are process documents of the project. A tag can mark the kind; decide it when a change applies W7. | It answers which part of the method a team gets: only process. Dogfooding needs no exception: the AIDDbot product is process, so its process pages are what we follow and what we ship. The kinds match the About, Method, and Development groups of the index. |
| W8 | For now, the knowledge explorer is an AIDDbot tool that does not ship. It shows the AIDDbot process to people, and it reads the brain documents, not the wiki. Agents use the wiki; people use the explorer, Obsidian, or GitHub. Later, an explorer for teams can show their process, their wiki, and their project (product and technology). | People take on a large cognitive debt: they cannot absorb what agents generate at agent speed. Visual tools help them keep up. A team explorer can be a key feature, but it waits for a real need. |

Consequences for a later change:

- Fix the glossary: "Project brain" and "Knowledge wiki" contradict each other today.
- Move the original documents out of `docs/wiki/` (glossary, intent, catalog, and the others). Decision 19 of the [catalog](documentation-catalog.md#decisions) changes. The [explorer](explorer-development.md#wiki-contract) reads tables from these files.
- Change the meaning of the `wiki-page` type and of the brain in the catalog. Today the brain is the `LIVE` `DOC` documents, and the explorer brain map shows only them.
