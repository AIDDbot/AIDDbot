---
name: scaffold-system
description: Build only the initial scaffold for a system.
metadata:
  aiddbot-kind: primitive
user-invocable: true
---
# scaffold-system

Your goal is to materialize the initial scaffold for a system: no features, business logic, product screens, or other application code.

Decide which projects are necessary — frontend (`front`), backend (`back`), end-to-end tests (`e2e`), or command-line tool (`cli`) — and omit the rest. Run `node .agents/skills/scaffold-system/scripts/materialize.mjs --list` before choosing technologies, and prefer a catalogued archetype for each project, taking its listed description as the stack (a framework-free front is intended, not a gap); use something else only when no archetype fits a concrete need or the user explicitly chooses another technology, and even then still exclude functional implementation. Clarify the projects, archetypes, exceptions, and destination folders with the user, including the product author, unless in YOLO mode; either way, journal the selection with `node .agents/aidd/aidd.mjs log select "<projects and archetypes>"` before creating any file, so the choice is traced even if nothing exists yet.

Identify the repository's default branch and create or resume `chore/scaffold` from it before writing anything. Run `materialize.mjs` from the project root with the system name, the product author, and only the selected tiers. If it fails, journal `node .agents/aidd/aidd.mjs log blocked "<the error>"`, report the error, and stop: a failed download is never permission to hand-write an archetype. For a project chosen outside the catalog, use its official scaffold generator instead, under the same no-functional-code rule.

Leave every project's own files untouched — its `package.json`, `.env.example`, configuration, and tests — and never copy `.env.example` to `.env`; the archetype's E2E suite asserts those names, ports, and paths. Reconcile shared root documents (README and other project-specific docs) to the repository root, never a project's `.product/` or rules, which describe the archetype, not the product. `materialize.mjs` reads its editable archetypes, destination folders, root file defaults, package metadata, and manifest path from `assets/defaults.json`; it creates `.gitignore` and `LICENSE` from `assets/` only when absent, sets the front `displayName` and root product metadata (`name`, `description`, initial `version`), fills missing package metadata from that configuration, and writes the system index — each project's directory, technology, and available package scripts, without copying application documentation.

Install each project's dependencies by following its own documentation, and report each project's install result or failure. Do not run lint, format, tests, or any other command: a fresh scaffold is proven by installing cleanly, not by passing checks that `implement-project` and `craft-lasting-quality` own.

Once every selected project is created and installed, run `node .agents/aidd/aidd.mjs git integrate "chore(scaffold): add {projects}"` from `chore/scaffold`. It commits remaining scaffold changes, merges the branch into the default branch, and deletes it after a successful merge. If scaffolding is incomplete, report the blocker without running the script.
