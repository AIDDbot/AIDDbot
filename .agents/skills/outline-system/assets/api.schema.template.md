# API schema — {Project_Name}

Source of truth inspected: {route definitions | controllers | OpenAPI document}

Every error response has the body `{Error_Shape}`, for example `{ "error": "message" }`.

- [Endpoint_Name_1](#endpoint_name_1) : {Description}
- [Endpoint_Name_2](#endpoint_name_2) : {Description}

## {Endpoint_Name_1}
| Method | URL | Request | Success | Errors |
|--------|-----|---------|---------|--------|
| {METHOD} | {URL} | [{TypeName_1}](#{TypeName_1}) | {status} [{TypeName_2}](#{TypeName_2}) | {status} {when} · {status} {when} |

## {Endpoint_Name_2}
| Method | URL | Request | Success | Errors |
|--------|-----|---------|---------|--------|
| {METHOD} | {URL} | [{TypeName_1}](#{TypeName_1}) | {status} [{TypeName_2}](#{TypeName_2}) | {status} {when} · {status} {when} |

## Shared types

### {TypeName_1}
| Field | Type |
|-------|------|
| {field_1} | {type} |
| {field_2} | {type} |

### {TypeName_2}
| Field | Type |
|-------|------|
| {field_1} | {type} |
| {field_2} | {type} |

---

> last updated: {DateTime}
