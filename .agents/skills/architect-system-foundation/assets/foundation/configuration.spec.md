<!--
Foundation spec 1 of 4 (Columbus principle 9; D17, D18).
Create: aidd spec new feat configuration "Configuration" --domain foundation
Instance: replace each role (`back-api`, `front-web`, `cli`, `e2e`) with the project name; delete the rows,
requirements, and Solution subsections of roles the system lacks, then renumber without gaps.
Technology lives in each project's AGENTS.md, never here.
-->
# {id}-configuration — Configuration

## Problem

Every project must start the same way in every environment, with its settings outside the code, so that projects built apart fit together.

### User Stories

- As an operator, I want **to set each project's settings through environment variables** so that one build runs in any environment.
- As a developer, I want **a wrong setting to stop the project at startup** so that I never debug a half-configured system.

### Business rules

- Every setting must come from an environment variable, with a documented default.
- A project must not start with an invalid setting.
- A `front-web` project must reach the `back-api` only through its configured base URL.

### Out of context

- Logging and error format (`monitoring`), health status (`health`), secrets management, and configuration files beyond an optional local `.env`.

## Requirements

- **R01**: WHEN the `back-api` starts with `PORT` set, it SHALL accept HTTP connections on that port.
- **R02**: WHEN the `back-api` starts without `PORT`, it SHALL accept HTTP connections on port 3000.
- **R03**: WHEN the `front-web` starts with `PORT` set, it SHALL serve its application at `/` on that port.
- **R04**: WHEN the `front-web` starts without `PORT`, it SHALL serve its application at `/` on port 4000.
- **R05**: WHEN a project starts with `PORT` that is not an integer from 1 to 65535, it SHALL exit with a non-zero code and a message that names `PORT`.
- **R06**: WHEN a request to the `back-api` carries an `Origin` header listed in `CORS_ORIGIN`, the `back-api` SHALL answer with `Access-Control-Allow-Origin` set to that origin.
- **R07**: WHILE `CORS_ORIGIN` is unset, the `back-api` SHALL answer every request with `Access-Control-Allow-Origin: *`.
- **R08**: WHEN the `cli` runs with `--version`, it SHALL print its version and exit with code 0.

## Expected URLs and APIs

| Kind | Project | Address | Expected answer | Requirements |
| --- | --- | --- | --- | --- |
| api | back-api | any path on `PORT` | An HTTP response, with the CORS header | R01, R02, R06, R07 |
| page | front-web | `/` on `PORT` | The application document | R03, R04 |
| command | cli | `--version` | The version; exit code 0 | R08 |

## Solution

### back-api

- `main` starts `core`; `core` reads and validates every setting once, before it opens the port, and injects them into the features and `shared` that need them.
- Settings: `PORT` (default 3000), `HOST` (default: all interfaces), `DATABASE_URL` (connection to the database; a local default for development), `CORS_ORIGIN` (comma-separated origins; default `*`).
- `core` opens the database connection from `DATABASE_URL` and hands it to `shared/data`.
- Relative paths in settings resolve from the project folder, never from the working directory.

### front-web

- `main` starts `core`; `core` reads `PORT` (default 4000) and `API_BASE_URL` (default `http://localhost:3000`).
- `API_BASE_URL` reaches the browser through `core`; the shared HTTP client in `shared/data` is the only code that uses it.

### cli

- `main` starts `core`, which parses arguments and reads settings from the environment, with flags overriding them.

### e2e

- The base URL of each project under test comes from `{PROJECT}_URL` (for example `BACK_URL`, `FRONT_URL`), with defaults `http://localhost:3000` and `http://localhost:4000`.

### All projects

- Each project ships an example environment file that lists every variable with its default.

## Schema impact

Omitted: no entity, table, or endpoint changes.

## Verification

| Requirement | Acceptance test |
| --- | --- |
| R01 | Start the `back-api` with `PORT=3101`; an HTTP request to that port gets a response. |
| R02 | Start the `back-api` without `PORT`; an HTTP request to port 3000 gets a response. |
| R03 | Start the `front-web` with `PORT=4101`; `GET /` on that port answers 200 with a document. |
| R04 | Start the `front-web` without `PORT`; `GET /` on port 4000 answers 200 with a document. |
| R05 | Start each project with `PORT=abc`; it exits non-zero and its output names `PORT`. |
| R06 | Request the `back-api` with an `Origin` listed in `CORS_ORIGIN`; `Access-Control-Allow-Origin` equals it. |
| R07 | With `CORS_ORIGIN` unset, any request gets `Access-Control-Allow-Origin: *`. |
| R08 | Run the `cli` with `--version`; it prints a version and exits 0. |
