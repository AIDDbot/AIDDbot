# Command pointer

One adapter per origin file `.agents/commands/{name}.command.md`.
`{name}` is the origin stem — the filename without `.command.md`.
The harness map names the folder, the filename, and which frontmatter fields to keep.

Copy those fields from the origin frontmatter. Then stop the header and point at the origin.
Never paste the origin body. Never add harness argument placeholders; arguments the human typed
after the slash belong to the origin.

```md
---
{harness_frontmatter}
---
Read and follow `.agents/commands/{name}.command.md`.
```
