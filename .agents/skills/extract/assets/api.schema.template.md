# API schema — {Product_Name}

> Service contract across the system: endpoints and request/response shapes.
> Kept in its own file because it grows large for real projects; the OpenAPI/IDL spec remains the canonical source.
> Written when the API container is extracted; linked from any container that consumes it.

### Endpoints

| Method & Path | Request | Response | Notes |
|---------------|---------|----------|-------|
| {GET /resource} | {body / query shape} | {status + body shape} | {auth, errors} |

### Shared types

| Type | Shape |
|------|-------|
| {TypeName} | {field: type, ...} |

> Canonical source: {path to OpenAPI / proto / GraphQL SDL}.

---

> last updated: {DateTime}