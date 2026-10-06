# System

A system is a set of projects. Each project has one kind.

```mermaid
flowchart LR
    USER[User] --> CLI[cli]
    USER --> FRONT[front-web]
    FRONT --> BACK[back-api]
    CLI -. optional .-> BACK
    BACK --> DATA[(Persistence)]
    E2E[e2e] --> FRONT
    E2E --> BACK
```

- `back-api` owns the data. Only it connects to persistence.
- `front-web` and `cli` serve the user. They get data only through `back-api`.
- `e2e` tests the flows across projects. It is not part of the product.
- The same principles apply to all projects. An archetype adds the technology.

## REST API

`back-api` talks to its dependants through one REST API.

- Paths start with `/api`. A resource is a plural noun: `/api/users`, `/api/users/:id`.
- Methods: `GET` reads, `POST` creates or does an action, `PUT` replaces, `PATCH` changes part, `DELETE` removes.
- Bodies are JSON. Dates are ISO 8601 strings.
- A protected request sends `Authorization: Bearer <token>`.
- Status codes: 200, 201, 204, 400, 401, 403, 404, 409, 413, 500.
- Every error has one body: `{ "error": "<message>" }`. An input error adds `fields`: `{ "<field>": "<message>" }`.
- An error never shows internal details: no stack, no SQL, no paths.

## Security

- Keep secrets out of the code and out of the repository.
- Store a password only as a salted hash.
- Check each input at the edge.
- A security finding blocks the delivery.

## E2E tests

- An e2e test proves one requirement of a spec, through the public interfaces of the projects. Its name contains the identifier of that requirement.
- The `e2e` project starts the other projects and checks that they answer before the first test.
- A test uses only the API and the screens that a user can see. It does not read the database or the code of other projects.
- Each test makes its own data with unique values. It does not depend on a different test or on the order of the tests.
- Each feature of the system has one folder of tests.
