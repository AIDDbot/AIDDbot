# Extract a front container

UI tier: renders views, holds client state, and calls sibling APIs.

## Templates
- `{Arch}/{container}.arch.md` from [container arch template](../assets/container.arch.template.md).
- `{Rules}/{container}.rules.md` from [code rules template](../assets/code.rules.template.md).

## Focus
- Component stereotypes: page/route, UI component, state store, API client.
- Map the routes first — they are the entry points into the component tree.
- Consume contracts only — link `api.schema.md`, never redefine its shapes here.
- Capture styling and state-management conventions in the code rules.
