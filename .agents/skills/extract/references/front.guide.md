# Extract a front container

UI tier: renders views, holds client state, and calls sibling APIs.

## Templates
- Write `{Arch}/{container}.arch.md` from
  [container arch template](../assets/container.arch.template.md).
- Write `{Rules}/{container}.rules.md` from
  [code rules template](../assets/code.rules.template.md).

## Focus
- Stereotype the components as page/route, UI component, state store, or API client.
- Map the routes first — they are the entry points into the component tree.
- If `api.schema.md` exists, _read_ [the API field shapes]({Arch}/api.schema.md).
- Link `api.schema.md` for contracts — never redefine its shapes here.
- Capture styling and state-management conventions in the code rules.
