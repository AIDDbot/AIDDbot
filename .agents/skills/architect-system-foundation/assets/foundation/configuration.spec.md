<!--
Foundation spec 1 of 6 (Columbus principle 9; D17, D18, D39, D44, D48, D51).
Written in ASD-STE100 Simplified Technical English. Technical names are not dictionary words.
Create: aidd spec new feat configuration "Configuration" --domain foundation
Instance: replace each role (`back-api`, `front-web`, `cli`, `e2e`) with the project name.
Remove the rows, requirements and Solution subsections of the roles that the system does not have. Then number the requirements again, with no gaps.
The technology is in the AGENTS.md of each project, never here.
-->
# {id}-configuration — Configuration

## Problem

Each project must start in the same way in each environment, with its settings outside the code.

### User Stories

- As an operator, I want **to set each project with environment variables** so that one build operates in each environment.
- As a developer, I want **an incorrect setting to stop the project when it starts** so that I never examine a system with an incomplete configuration.

### Business rules

- Each setting must have a documented default.
- A project must stop cleanly: it must not lose a request in progress or a log line.

### Out of context

- The log and the error format (`monitoring`), the health status (`health`).
- The management of secrets. Configuration files, other than an optional local `.env` file.

## Requirements

- **R01**: WHEN the `back-api` starts with `PORT` set, it SHALL accept HTTP connections on that port.
- **R02**: WHEN the `back-api` starts without `PORT`, it SHALL accept HTTP connections on port 3000.
- **R03**: WHEN the `front-web` starts with `PORT` set, it SHALL serve its application at `/` on that port.
- **R04**: WHEN the `front-web` starts without `PORT`, it SHALL serve its application at `/` on port 4000.
- **R05**: WHEN a project starts with a `PORT` that is not an integer from 1 to 65535, it SHALL stop with a non-zero exit code and a message that contains `PORT`.
- **R06**: WHEN a request to the `back-api` has an `Origin` header that `CORS_ORIGIN` contains, the `back-api` SHALL answer with `Access-Control-Allow-Origin` set to that origin.
- **R07**: WHILE `CORS_ORIGIN` is not set, the `back-api` SHALL answer each request with `Access-Control-Allow-Origin: *`.
- **R08**: WHEN the `cli` runs with `--version`, it SHALL show its version and stop with exit code 0.
- **R09**: WHEN the `front-web` starts with `API_BASE_URL` set, `GET /runtime-config.json` SHALL answer 200 with `{ "apiBaseUrl": "<that URL>" }`.
- **R10**: WHEN the `back-api` starts, it SHALL apply each migration that the database does not have, in order, and record the version of each one.
- **R11**: IF the database has a schema version that the `back-api` does not know, THEN the `back-api` SHALL stop with a non-zero exit code and a message that contains that version.

## Expected URLs and APIs

| Kind | Project | Address | Expected answer | Requirements |
| --- | --- | --- | --- | --- |
| api | back-api | any path on `PORT` | An HTTP response with the CORS header | R01, R02, R06, R07 |
| page | front-web | `/` on `PORT` | The application document | R03, R04 |
| api | front-web | `GET /runtime-config.json` | 200 `{ "apiBaseUrl": "..." }`. No error status. | R09 |
| command | cli | `--version` | The version. Exit code 0. | R08 |
| process | back-api | start on a database | Applies the missing migrations, or stops on an unknown version | R10, R11 |

## Solution

### back-api

- Settings: `PORT` (3000), `HOST` (all interfaces), `DATABASE_URL` (a local default), `CORS_ORIGIN` (comma list, `*`).
- `core` reads and checks each setting one time, before it opens the port, with the shared primitives `readSetting` and `parseInteger`. It adds them when they do not exist. `parseInteger` gets the variable name as its field, so its error names the variable. No project writes its own integer check. `shared` never reads settings.
- A relative path in a setting starts at the project folder, never at the working directory.
- `core` opens the database from `DATABASE_URL`. Features get it by the access method of the project.
- Migrations: one numbered file for each schema change (`0001-{name}`), all in one folder; a feature adds its own there. The runner of `core` applies each missing one before the port opens, each in one transaction, and records its version and time. No feature creates a table.
- Clean stop, checked by `review-implementation` (a stop signal is not the same on each operating system): on a stop signal, no new connection, the requests in progress complete, the queued log lines are written, the database closes, exit code 0. After a short timeout: stop them, non-zero exit code.

### front-web

- `PORT` (4000), `API_BASE_URL` (`http://localhost:3000`).
- `core` serves `GET /runtime-config.json`. The HTTP client of `core` reads it one time at startup and is the only user of `API_BASE_URL`. No build for each environment.

### cli

- `core` reads the arguments and the environment. An argument has priority.

### e2e

- For each project under test (`{PROJECT}` in upper case), `core` reads `{PROJECT}_DIRECTORY` (default: its source folder, such as `../back`), `{PROJECT}_PORT` (3000 back, 4000 front, written one time in `core`), `{PROJECT}_START` (default: its `start` slot) and `E2E_STARTUP_TIMEOUT_MS` (15000). An invalid value stops the suite; it never falls back to the default.
- Without `{PROJECT}_PORT`, the suite starts the project without `PORT`, so the project uses its own default.
- Checked by `review-implementation`, not by a test: a project that answers on its port is used, never started a second time; otherwise the suite starts it, waits, and stops it after the run; an invalid setting or a timeout stops the suite before the first test, with the variable or the project and the cause.
- `core` gives the base URLs to the tests through the runner configuration. Tests read them through the fixtures in `shared`, never write a port or a URL, and get a free port from `shared`.
- A helper in `shared` (a shared primitive) starts one project with an environment that the test gives, and returns its output, exit code, base URL and stop operation. `core` uses it too.
- Each instance that a test starts has its own temporary database when the test gives no `DATABASE_URL`. The helper never takes `DATABASE_URL` from the environment of the runner, and deletes the database after the stop. No retries and no single worker to hide a shared database.

### All projects

- An example environment file lists each variable and its default.

## Schema impact

| Schema | Element | Change | Description |
| --- | --- | --- | --- |
| back-api.db | table of applied versions | new | `version`, `appliedAt`. One row for each applied migration. |

## Test notes

- **R01, R03, R05, R09**: start an own instance with the helper, on a free port, with no browser.
- **R02, R04**: use the instance that the suite started without `PORT`; its base URL has the default port.
- **R10**: start on a new temporary database, stop, start again on it: no version has two rows.
- **R11**: record an unknown version in a temporary database before the start.
