---
id: knowledge-wiki
type: page
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

The knowledge wiki helps agents find their way through the project brain and the code. It follows [Karpathy's LLM Wiki pattern](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f).

## Model

- **Project brain (W1).** The brain holds all original project documentation that people, agents, and skills create. It includes living documents, change documents, and sources such as specs, ADRs, and raw notes.
- **Wiki (W2).** The wiki is a separate map of the brain and the code for agents. Its indexes and summaries link to original sources. It owns no facts.
- **Ownership (W3).** People own the brain and can use agents and skills to write it. Only agents write the wiki through ingest, answer, and review. They can rebuild it from its sources.
- **Views (W4).** Wiki pages can connect information from many sources. Write a new fact in its original brain document first. Cite that document from the wiki.
- **Code (W5).** Code and its tests are sources for the wiki. A code map can link to modules and explain their purpose, connections, and recurring patterns. Link to the relevant specs, ADRs, and tests. Leave code, signatures, and behavior details in their original files.
- **Size (W6).** Start with the index. Add a page when an ingest or a question shows that agents need it to navigate or answer.
- **Kind (W7).** Every document has one [kind](documentation-catalog.md#kind). Process covers how the team works. Product and technology together describe what the team builds, why, and how. AIDDbot ships its versioned, read-only process through skills, templates, and the CLI. Teams install it separately and keep adaptations in their own process documents. [What ships](../technology/scaffolding.md#what-ships)
- **Explorer (W8).** The [knowledge explorer](../technology/explorer-development.md) shows the AIDDbot process to people. It reads original brain documents and stays in this repository.

## Repository layout

- [Original pages](documentation-catalog.md#document-ids-and-file-names) live in `docs/process/`, `docs/product/`, and `docs/technology/`.
- Change documents live in `docs/specs/`. Other sources can live in `docs/adr/` or `docs/raw/`.
- The agent map lives in [`docs/wiki/index.md`](../wiki/index.md). Add other wiki pages in `docs/wiki/` when needed.

See the [repository layout](../technology/scaffolding.md#layout) for fixed paths.

## Page rules

- **Metadata.** Every wiki page starts with [`META`](documentation-catalog.md#metadata-meta). Its `id` is the file name without `.md`.
- **Synthesis.** Start with a short summary. Link claims to their sources. Mark a claim with no confirmed source as `(unverified)`.
- **Conflicts.** If sources disagree, show both with citations in a `> [!warning] Conflict` callout. A person decides.
- **Links.** Use relative Markdown links for repository sources.
- **Explorer tables.** The explorer reads seven tables from the original documents. Keep the headings and columns in the [brain contract](../technology/explorer-development.md#brain-contract).

## index.md

Group links to the brain documents by process, product, and technology. Use one entry for each document. Add code or topic maps when agents need them. Agents read the index first, then open the relevant sources.

## Operations

### 1. Ingest a source

1. Read the [source](#sources) and find its related documents in the index.
2. Update the index and any relevant wiki summaries with links to the originals.
3. Flag conflicts for a person. Put durable facts in the original documents before using them in the wiki.

### 2. Answer a question

1. Read the index and the relevant original sources.
2. Answer with citations and state uncertainty.
3. Add a wiki page if the question shows that agents need a new view across sources.

### 3. Review the wiki

Check missing sources, conflicts, missing index entries, broken links, and invalid `META`. Fix what the sources support and flag the rest for a person.

## Sources

| Source | Where it lives | How the wiki cites it |
| --- | --- | --- |
| Specs, plans, and review reports | `docs/specs/` | Relative link. |
| Living documents | Their original paths in the project brain. | Relative link. |
| Code and tests | Their original paths in the repository. | Relative link. |
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
- **People**: read the original documents in the [knowledge explorer](../technology/explorer-development.md), Obsidian, or GitHub.

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
- An explorer for teams could show their process, wiki, product, and technology documents.
