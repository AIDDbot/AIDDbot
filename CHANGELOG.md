# Changelog

This file tracks notable changes to AIDDbot. It follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and uses [Semantic Versioning](https://semver.org/).

## Unreleased

### Changed

- Foundational documents moved into the AIDDbot wiki in `docs/wiki/`, with an index of About, Method, and Development pages.
- Script toolchain split into the AIDDbot CLI page and the CLI development page.
- `META` uses `created` and `updated` dates instead of `date`.
- Change flow steps use the lifecycle phase names: Analysis, Design, Implementation, Verification, and Close.
- Spec sections are Problem, Solution, and Verification, with 1 to 3 user stories and a checklist of up to 9 EARS requirements. After approval, only checkboxes and status change; failures and findings go to a review report.
- An accepted spec can go back to draft before its implementation starts.
- The change flow and the status use are tables. The building blocks table adds Templates, Wiki, and a Relations column. The page rules protect the tables that the explorer reads.
- Spec `s0002` rewritten: the web knowledge explorer is now a visual story of AIDDbot, with a map, one page per element, and the full documents.

### Added

- Knowledge explorer in `packages/explorer/`: a static site with a map of the method, one page with an animated diagram for each phase, step, building block, and document type, and the full documents. Run it with `bun run explorer:dev`.
- Explorer development wiki page and the knowledge explorer glossary term.
- First spec, `s0001`: build the AIDDbot wiki.
- `roadmap` document type for the project plan, and the installer term.
- Seven lifecycle phases with project and change levels: Foundation, Analysis, Design, Implementation, Verification, Release, Maintenance.
- Glossary terms for repository, project, package, product, and system, and the problem, solution, and verification views.

- Project plan with four milestones (base documentation and wiki, lifecycle skills, deterministic CLI, distribution), the dogfooding rules, and a list of future ideas.
- Change flow with one spec per change and an explicit criterion for separate plan and review documents.
- Proposed repository layout for the specs, templates, skills, and CLI.
- Foundational documentation for the project scope, documentation standards, knowledge wiki, and script toolchain.
- Shared `DESIGN.md` with the colors, fonts, and Mermaid rules for AIDDbot documents and diagrams.
- Git rules for consistent LF line endings and for ignoring local and generated files.
- Package metadata for versioning, authorship, and licensing.
