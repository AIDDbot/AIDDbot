<!--
Foundation spec 1 of 5 (Columbus principle 9; D17, D18, D39).
Written in ASD-STE100 Simplified Technical English. Technical names are not dictionary words.
Create: aidd spec new feat configuration "Configuration" --domain foundation
Instance: replace each role (`back-api`, `front-web`, `cli`, `e2e`) with the project name.
Remove the rows, requirements and Solution subsections of the roles that the system does not have. Then number the requirements again, with no gaps.
The technology is in the AGENTS.md of each project, never here.
-->
# {id}-configuration — Configuration

## Problem

Each project must start in the same way in each environment. Its settings must be outside the code. Then projects that different teams make can operate together.

### User Stories

- As an operator, I want **to set the settings of each project with environment variables** so that one build operates in each environment.
- As a developer, I want **an incorrect setting to stop the project when it starts** so that I never examine a system with an incomplete configuration.

### Business rules

- Each setting must come from an environment variable and must have a documented default.
- A project must not start with an invalid setting.
- A `front-web` project must connect to the `back-api` only through its configured base URL.
- For each project under test, the `e2e` suite must know the folder, the port and the start command. Then it can use a project that runs, or start it.

### Out of context

- The log and the error format (`monitoring`).
- The health status (`health`).
- The management of secrets.
- Configuration files, other than an optional local `.env` file.

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

## Expected URLs and APIs

| Kind | Project | Address | Expected answer | Requirements |
| --- | --- | --- | --- | --- |
| api | back-api | any path on `PORT` | An HTTP response with the CORS header | R01, R02, R06, R07 |
| page | front-web | `/` on `PORT` | The application document | R03, R04 |
| command | cli | `--version` | The version. Exit code 0. | R08 |
| api | front-web | `GET /runtime-config.json` | 200 `{ "apiBaseUrl": "..." }` | R09 |

## Solution

### back-api

- `createApp()` in `main` makes `core`.
- `core` reads and validates each setting one time, before it opens the port. It uses the shared primitives `readSetting` and `parseInteger` (see the `AGENTS.md` of the project). If they do not exist, `core` adds them. `parseInteger` gets the name of the variable as its field, so its error names the variable. Each project uses it for its integer settings and never writes its own check.
- Features get the settings by the access method of the `AGENTS.md` of the project: injection or the public file of `core`. `shared` never reads the settings.
- Settings:
  - `PORT`: default 3000.
  - `HOST`: default all interfaces.
  - `DATABASE_URL`: the connection to the database. A local default for development.
  - `CORS_ORIGIN`: origins, with commas between them. Default `*`.
- `core` opens the database connection from `DATABASE_URL`. Features get it by the same access method.
- A relative path in a setting starts at the project folder, never at the working directory.

### front-web

- `createApp()` in `main` makes `core`.
- `core` reads `PORT` (default 4000) and `API_BASE_URL` (default `http://localhost:3000`).
- `core` serves `GET /runtime-config.json` with the value of `API_BASE_URL`. The browser gets the setting at runtime, so the front needs no build for each environment.
- The HTTP client of `core` reads `/runtime-config.json` one time when the application starts. Only this client uses `API_BASE_URL`.

### cli

- `createApp()` in `main` makes `core`.
- `core` reads the arguments and the environment settings. An argument has priority over the setting.

### e2e

- For each project under test, `core` reads these settings. `{PROJECT}` is the project name in upper case.
  - `{PROJECT}_DIRECTORY`: the project folder, to start the project. Default: its source folder, relative to the e2e project (for example, `../back`).
  - `{PROJECT}_PORT`: the project port, to use or start the project. Default: 3000 for the `back-api`, 4000 for the `front-web`. The base URL is `http://localhost:{PORT}`. Write these defaults one time, in `core`. If `{PROJECT}_PORT` is not set, the suite starts the project without `PORT`, so the project uses its own default.
  - `{PROJECT}_START`: the start command. Default: the `start` slot in the `AGENTS.md` of that project. The foundation writes it in the example environment file.
  - `E2E_STARTUP_TIMEOUT_MS`: the maximum time to wait for a project that the suite starts. Default 15000.
- The suite reports an invalid value. It never uses the default in its place.
- A project answers when its port returns an HTTP response. Later, `health` changes this check to the health address.
- `core` starts the projects before the run and stops them after the run. It gives the base URLs to the tests through the runner configuration (base URL and environment). Tests never use `core`: they read the base URLs through the fixtures in `shared`.
- This technical result is not an acceptance requirement:
  - If a project answers on its port, the suite uses it and does not start a second instance.
  - If a project does not answer, the suite starts it in its folder with its start command and `PORT`. The suite waits until the project answers. After the run, the suite stops it.
  - If a setting is invalid, or a project does not answer in time, the suite stops before the first test. The message contains the variable or the project, and the cause.
  - Each acceptance run does these steps. `review-implementation` checks them. No test checks them.

### Acceptance tests that start a project

- Tests never write a port or a URL. They get the base URLs from the fixtures, and a free port from `shared`.
- `shared` has a helper that starts one project in its folder with its start command and an environment that the test gives. It returns the output, the exit code and the base URL, and it stops the project after the test. Add it to the shared primitives of the `e2e` project. `core` also uses it to start the projects of the suite.
- The tests of R01, R03, R05 and R09 start their own instance with that helper, on a free port. They do not use a browser.
- Each instance that a test starts has its own data. If the test does not give `DATABASE_URL`, the helper gives a new temporary database, and it deletes that database after the instance stops. Tests run in parallel, so two instances never share a database. Do not use retries or one worker to hide a shared database.
- The tests of R02 and R04 use the instance that the suite started without `PORT`. They check that its base URL has the default port of `core` and that it answers.

### All projects

- Each project has an example environment file. This file lists each variable and its default.

## Schema impact

| Schema | Element | Change | Description |
| --- | --- | --- | --- |
| front-web.api | `GET /runtime-config.json` | new | 200 `{ "apiBaseUrl": "..." }`. No error status. |

## Verification

| Requirement | Acceptance test |
| --- | --- |
| R01 | Start the `back-api` with `PORT` set to a free port. Send an HTTP request to that port. A response comes back. |
| R02 | The suite started the `back-api` without `PORT`. Its base URL has port 3000. A request to it gets a response. |
| R03 | Start the `front-web` with `PORT` set to a free port. `GET /` on that port answers 200 with a document. |
| R04 | The suite started the `front-web` without `PORT`. Its base URL has port 4000. `GET /` answers 200 with a document. |
| R05 | Start each project with `PORT=abc`. It stops with a non-zero exit code. Its output contains `PORT`. |
| R06 | Send a request to the `back-api` with an `Origin` that `CORS_ORIGIN` contains. `Access-Control-Allow-Origin` is equal to that origin. |
| R07 | With `CORS_ORIGIN` not set, send a request. `Access-Control-Allow-Origin` is `*`. |
| R08 | Run the `cli` with `--version`. It shows a version and stops with exit code 0. |
| R09 | Start the `front-web` on a free port with an `API_BASE_URL` that the test makes. `GET /runtime-config.json` answers 200 with `apiBaseUrl` equal to that URL. |
