# explore-and-extract

Document an existing codebase from top to bottom. First it runs `/explore` to set up the
project and map its containers, then it runs `/extract` once for each of those containers to
document them in turn. Every skill runs in its own fresh subagent, and no application source
is written — only the guide docs the rest of the pipeline reads.

Use it as the entry point when a codebase has no AIDD docs yet, or when they have drifted and
need rebuilding. When every container is documented it points you to `/specify`.
