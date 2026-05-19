# AIDD Skills catalog

Agent index: [skills/README.md](./skills/README.md) · Conventions: [artifact-conventions.md](./skills/repository/artifact-conventions.md)

### Architect

| Skill | What it does |
|---|---|
| [`/initialize`](./skills/initialize/) | Sets up your project environment and main instructions file |
| [`/explore`](./skills/explore/) | Reverse-engineers legacy code for architecture insights |
| [`/extract`](./skills/extract/) | Extracts real rules from your codebase to guide new generation |

### Builder

| Skill | What it does |
|---|---|
| [`/specify`](./skills/specify/) | Writes clear specifications with formal acceptance criteria |
| [`/planify`](./skills/planify/) | Breaks specs into concrete, ordered implementation steps |
| [`/codify`](./skills/codify/) | Generates code that follows your plans and your rules |
| [`/verify`](./skills/verify/) | Writes and runs E2E tests; on failure, produces a report for `/repair` |

### Craftsman

| Skill | What it does |
|---|---|
| [`/review`](./skills/review/) | Reviews code for quality, accessibility, or compliance |
| [`/repair`](./skills/repair/) | Fixes issues from review or verify reports |
| [`/release`](./skills/release/) | Bumps version, updates CHANGELOG and docs, marks specs `released` |
| [`/repository`](./skills/repository/) | Branches and conventional commits; called by every skill that produces artifacts |
| [`/refactor`](./skills/refactor/) | *(WIP)* Improves existing code without changing its behavior — not ready for routine use |

### Designer

| Skill | What it does |
|---|---|
| [`/render`](./skills/render/) | *(experimental)* Production-grade frontend UI from a design specification |