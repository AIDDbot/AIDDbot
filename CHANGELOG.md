# Changelog

This file tracks notable changes to AIDDbot. It follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and uses [Semantic Versioning](https://semver.org/).

## Unreleased

### Changed

- Implementation repeats the quality checks until they pass: build, format, lint, and unit tests. Foundation sets up their commands. Verification runs the end-to-end tests and an agent review of the diff against the review gates. AIDDbot ships three default gates (security, user experience, maintainability), and each project can configure its own.
- Each change has its own folder in `docs/specs/`, with `spec.md`, one `US<n>.feature` for each user story, and `plan.md` and `review.md` when they exist. Specs `s0001` and `s0002` moved to their folders.
- Feature files are change documents. The end-to-end tests generated from them are the living part.
- Each change has an impact level: `small`, `medium`, or `large`. It replaces the criterion for separate plan and review documents. A `small` change has a short spec and gets its approval in the pull request.
- User stories follow the `USERSTORY` standard. The spec Solution can have a Data model with a Mermaid ER diagram.
- Foundational documents moved into the AIDDbot wiki in `docs/wiki/`, with an index of About, Method, and Development pages.
- Script toolchain split into the AIDDbot CLI page and the CLI development page.
- `META` uses `created` and `updated` dates instead of `date`.
- Change flow steps use the lifecycle phase names: Analysis, Design, Implementation, Verification, and Close.
- Spec sections are Problem, Solution, and Verification, with 1 to 3 user stories and a checklist of up to 9 EARS requirements. After approval, only checkboxes and status change; failures and findings go to a review report.
- An accepted spec can go back to draft before its implementation starts.
- The change flow and the status use are tables. The building blocks table adds Templates, Wiki, and a Relations column. The page rules protect the tables that the explorer reads.
- Spec `s0002` rewritten: the web knowledge explorer is now a visual story of AIDDbot, with a map, one page per element, and the full documents.

### Added

- `feature-file` document: Gherkin scenarios tagged with their requirement code, run by end-to-end tests.
- `domain-model` document: bounded contexts, aggregates, and entities, with a Mermaid ER diagram.
- `code`, `unit-test`, and `check-report` document types for the output of Implementation. The agent reads each check report and fixes the code until the checks pass.
- `e2e-test` and `test-report` document types. Another agent instance writes the end-to-end tests in their own package, without reading the source code. Verification runs them and keeps a test report.
- Glossary terms for end-to-end test, test report, check report, scenario, feature file, domain model, quality check, and review gate.
- Knowledge explorer in `packages/explorer/`: a static site with a map of the method, one page with an animated diagram for each phase, step, building block, and document type, and the full documents. Run it with `bun run explorer:dev`.
- Explorer development wiki page and the knowledge explorer glossary term.
- Second spec, `s0002`: build the web knowledge explorer, closed with a review report of its evidence and findings.
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
