# Extract a front container

UI tier: renders views, holds client state, and calls sibling APIs.

## 1. Research
- If `api.schema.md` exists, _read_ [the API field shapes]({Arch}/api.schema.md).
- Map the routes first — they are the entry points into the component tree.
- Stereotype the components as page/route, UI component, state store, or API client.

## 2. Plan
- _read_ [container arch template](../assets/container.arch.template.md).
- _read_ [code rules template](../assets/code.rules.template.md).
- Link `api.schema.md` for contracts — never redefine its shapes here.

## 3. Implement
- Write `{Arch}/{container}.arch.md`.
- Write `{Rules}/{container}.rules.md`.
- Capture styling and state-management conventions in the code rules.
