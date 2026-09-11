# Root reconciliation

Perform this once all selected containers exist, including solutions combining
catalogued archetypes and external tooling. Inspect existing root files before
editing; the materializer only supplies a minimal README and child package names.

## Project narrative and author

Use the user's request and the solution's own product and design documents to
explain who has the problem, what it is, and how the proposed solution addresses
it. Describe intended capabilities as intent: a scaffold does not implement
them yet. Do not reuse an archetype's product description as the solution's.

Resolve author name, email, and website from explicit user-provided identity or
existing solution-owned metadata first, then matching Git identity/configuration
values. An archetype's author is its upstream author, not automatically the new
solution's author. Preserve upstream attribution separately. Never infer a website
from a repository remote. Ask together for unresolved project context and author
fields; if the user declines an author field, leave its value blank.

## README

Fill the template linked from the skill, in the solution documentation's language.
Replace every placeholder, repeating the project row and setup subsection for
each selected container. Read each project's README, manifest, lockfile, scripts,
and configuration for actual setup and runtime facts; inspect source only when
needed. Never invent commands, prerequisites, ports, URLs, or health endpoints.
Use `Not documented` for unknown operational facts and `Not applicable` when a
field does not apply. Commands must state their working directory. Link actual
selected destinations, including custom container names.

Create or replace exactly one `<!-- aidd:solution:start -->` /
`<!-- aidd:solution:end -->` block. Preserve all content outside it. In a fresh
README, keep the script-created title and append the block; do not repeat the
minimal solution heading or name appended by the materializer. On subsequent
runs update the existing block instead of appending another one.

## License and root manifest

Preserve an existing root `LICENSE` and upstream notices. If no root license
exists, use an already settled solution license choice or ask for it before
creating the file. Do not silently adopt an archetype's license as the choice
for the solution. Keep the README's license reference and manifest license
metadata consistent with the actual root license; resolve conflicts with the user.

Reconcile the existing root manifest (`package.json` or the ecosystem equivalent)
with the solution name/slug, concise description, resolved author, and license,
using fields supported by its format. Preserve unrelated metadata, dependencies,
scripts, and workspace configuration. Do not copy child-project commands or
dependencies to the root or invent aggregate commands. If no root manifest exists,
create a minimal one appropriate to the chosen solution tooling; for a Node
solution use a private `package.json`. For mixed or non-package ecosystems, use
their native solution manifest when supported; do not add Node tooling solely
to hold metadata. If no native author/description fields exist, keep those facts
in the README instead.

Before finishing, check that links resolve, commands match the projects, no
template placeholders remain, and root files agree on project identity and
license. Report missing facts or incomplete reconciliation explicitly.
