---
name: scaffold-system
description: Build only the initial scaffold for a system.
metadata:
  aiddbot-kind: primitive
user-invocable: true
---
# scaffold-system

Your goal is to materialize the initial scaffold for a system: no features, business logic, product screens, or other application code.

Decide which projects are necessary — frontend (`front`), backend (`back`), end-to-end tests (`e2e`), or command-line tool (`cli`) — and omit the rest. Run `node .agents/skills/scaffold-system/scripts/materialize.mjs --list` before choosing technologies, and prefer a catalogued archetype for each project; use something else only when no archetype fits a concrete need or the user explicitly chooses another technology, and even then still exclude functional implementation. Clarify the projects, archetypes, exceptions, and destination folders with the user, including the product author, unless in YOLO mode; either way, journal the selection as `select`, green, before creating any file, so the choice is traced even if nothing exists yet.

Identify the repository's default branch and create or resume `chore/scaffold` from it before writing anything. Run `materialize.mjs` from the project root with the system name, the product author, and only the selected tiers. If it fails, journal `failed`, red, report the error, and stop: a failed download is never permission to hand-write an archetype. For a project chosen outside the catalog, use its official scaffold generator instead, under the same no-functional-code rule.

Leave every project's own files untouched — its `package.json`, `.env.example`, configuration, and tests — and never copy `.env.example` to `.env`; the archetype's E2E suite asserts those names, ports, and paths. Reconcile only shared root documents (README, LICENSE, and other project-specific docs) to the repository root, never a project's `.product/` or rules, which describe the archetype, not the product. `materialize.mjs` reads its editable archetypes, destination folders, package metadata, and manifest path from `assets/defaults.json`; it sets the front `displayName` and root product metadata (`name`, `description`, initial `version`), fills missing package metadata from that configuration, and writes the system index — each project's directory, technology, and available package scripts, without copying application documentation.

Install each project's dependencies by following its own documentation, then journal each project's install result or failure. Do not run lint, format, tests, or any other command: a fresh scaffold is proven by installing cleanly, not by passing checks that `implement-project` and `craft-lasting-quality` own.

Commit the scaffold on `chore/scaffold` as `chore(scaffold): add {projects}`, including only this task's changes. Once every selected project is created and installed, merge `chore/scaffold` into the default branch and delete it. If scaffolding is incomplete, report the blocker without merging.
