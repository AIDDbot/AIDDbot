# Extract a front container

UI tier: renders views, holds client state, and calls sibling APIs.

## Templates
- [`container.arch.template.md`](../assets/container.arch.template.md) → `{Arch}/{container}.arch.md`.
- [`code.rules.template.md`](../assets/code.rules.template.md) → `{Rules}/{container}.rules.md`.

## Focus
- Component stereotypes: page/route, UI component, state store, API client.
- Map the routes first — they are the entry points into the component tree.
- Contracts: consumes only; link `api.schema.md`, never redefine its shapes here.
- Capture styling and state-management conventions in the code rules.
