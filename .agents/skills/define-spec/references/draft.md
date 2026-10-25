# Draft

A draft is a spec that waits for a later build. It has no ID and no spec branch, so it never blocks the spec in progress or a repair of debt. `build-requested-spec` makes the spec from it.

- Work on the task branch `specs/drafts`. Switch to it when it exists, else create it from the default branch. Never run `spec new`.
- Write the draft as `{Product_Folder}/drafts/{slug}.md`. Before you write it, read the other drafts there too: never write a second draft of the same scope.
- Fill it from the template of its type, with these changes. Remove the frontmatter. Write `{id}` in each place of the ID, such as `# {id}-{slug} — {title}` and `@{id}-R01`. Put the command that makes the spec on the first line, as a comment: `<!-- node .agents/aidd/aidd.mjs spec new <type> <slug> "<title>" --domain <domain> --from {Product_Folder}/drafts/{slug}.md -->`.
- Write the projects of the system by their names: the build uses the draft as it is.
- Never commit the draft. The agent that gets the approval integrates it with `node .agents/aidd/aidd.mjs integrate "docs(spec): draft {slug}"`. In YOLO mode, it does so as soon as the draft is written.

The result is an approved draft on the default branch.
