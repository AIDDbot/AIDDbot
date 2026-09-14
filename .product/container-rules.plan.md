# Container rules plan

Status: ready for review; implementation pending.

## Goal

Reduce project setup documents. Replace the system architecture file, each container architecture file, and each separate coding rules file with one agent-facing file per container. Keep the root `AGENTS.md` short. Use plain English, short sentences, and standard terms.

## Document model

- Use `.agents/rules/{container}.rules.md` as the canonical file for each container. A container is a unit of responsibility. It may be a layer, service, app, database, test suite, or other boundary. Do not restrict it to the current `front`, `back`, `db`, and `e2e` tiers.
- Remove `{Product_Folder}/arch/system.arch.md` and `{Product_Folder}/arch/{container}.arch.md` from the new project workflow. Do not create a separate coding rules file. This changes the generated architecture and rules set from up to `1 + 2 × C` files to `C` files. The root `AGENTS.md` still exists.
- Keep product contracts such as model, database, and API schemas in `{Product_Folder}` when they are needed. This plan does not fold schemas into rules or require empty schema files.

## Root AGENTS.md

- Use Problem, Solution, and Verification under the project-level Product section. It describes the whole product, not each container in depth. Add this structure to the generated root template where it is missing.
- Add a compact container map under Solution. For each container, give its name, source path, one-line responsibility, and link to `.agents/rules/{container}.rules.md`.
- Put a short cross-container fact in the root only when it is needed before choosing a container. Examples are ownership of shared data and the direction of a key API dependency. Do not copy local rules, file trees, or long technology descriptions into the root.
- Keep project-wide instructions and paths in the root. Keep local decisions in the matching container file.

## Container rules template

Use the same three main sections as the root and specs. They describe the standing container, not one work item.

- **Problem:** why the container exists, its boundary, and the need it serves. Keep this short.
- **Solution:** the main section. State its responsibility, source path, key parts, interfaces, dependencies, important technology decisions, and project-specific development rules. Record only rules supported by evidence or an explicit decision. Put mechanically enforceable rules in tool configuration.
- **Verification:** commands, tests, and checks that apply to the container. Name the relevant tool or script. Do not repeat configuration that the tool already owns.

Do not require a diagram. Remove C4 diagrams and C4 syntax from the templates. Use a small ASCII sketch when prose is unclear. Standard Mermaid is optional when it materially helps and the target editor supports it. Keep diagrams out of the default template.

## Harness adapters

- The canonical content remains in `.agents/rules/{container}.rules.md`. The root `AGENTS.md` links to it, so discovery does not depend on one harness's nested-file behavior.
- A harness adapter may add a short nested instruction file in the container source folder when that harness supports it. The nested file points to the canonical rules. Do not copy the full rules body into a second maintained file.
- Check the real load behavior for each supported harness before generating nested files. A file under `.agents/` does not automatically govern source files in another directory.
- Update `scripts/adapt.command.md`, which currently requires full rule copies. Preserve each container's actual path scope, including multiple source paths when needed. Check generated pointers and relative links.

## Maintenance during delivery

`explore` and `extract` create the initial documents. After that, `shipify` reconciles container rules and the root map with the approved spec and delivered code. Add or remove map entries when containers change. Keep existing schema links coherent. This documentation maintenance belongs to `shipify`, not `codify`.

The update records the approved result. If it requires a new rule decision, return that decision to the spec before closing. Do not introduce new constraints during shipping. Use the delivery contract in `spec-first.plan.md`.

## Repo work

- Update the `explore` and `extract` contracts and templates. `explore` writes the root map from known project evidence. `extract` writes or updates one container rules file from relevant source evidence. Neither writes `system.arch.md` or `{container}.arch.md`.
- Update generated `AGENTS.md`, its seed or adapter flow where needed, and all skill references to the removed architecture files. Keep model and schema links when those artifacts exist.
- Update the catalog and public workflow guidance when the visible project document set changes. Edit skills through `/skillify`. Keep this plan in `.product/`.
- Apply the new layout to new projects. Do not rewrite old projects or erase their architecture history.
- Update repository checks for retired architecture paths and the new rules format. Coordinate changes to the shared root template and delivery flow with the other two plans.

## Acceptance checks

- A new project has one canonical `.agents/rules/{container}.rules.md` per documented container, with Problem, Solution, and Verification. Solution is the largest section.
- The root `AGENTS.md` identifies every container and links to its rules. It retains only product-level context and necessary cross-container facts.
- No new `system.arch.md`, `{container}.arch.md`, separate container rules duplicate, or C4 diagram is generated.
- A task can find the relevant container rules from the root, even without a nested harness adapter. Optional nested files point to the canonical source and do not fork its content.
- Required product schemas remain discoverable. No empty schema or diagram is generated just to fill a template.
- `shipify` keeps rules and the root map consistent with delivered work without inventing new decisions. Adapter checks cover scoped discovery and canonical links.
