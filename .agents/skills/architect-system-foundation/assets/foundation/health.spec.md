<!--
Foundation spec 3 of 4 (Columbus principle 9; D2, D6, D17, D18). It needs `configuration` and `monitoring`.
The tracer bullet: one small feature through presentation → logic → data in each project.
Written in ASD-STE100 Simplified Technical English. Technical names are not dictionary words.
Create: aidd spec new feat health "Health status" --domain foundation
Instance: replace each role (`back-api`, `front-web`, `cli`, `e2e`) with the project name.
Remove the rows, requirements and Solution subsections of the roles that the system does not have. Then number the requirements again, with no gaps.
-->
# {id}-health — Health status

## Problem

Before the first business feature, each layer of each project must operate with the others. A request must go through presentation, logic and data. The projects must connect to each other.

### User Stories

- As an operator, I want **to ask the system if it is alive, how many times it started, and for how long it has run** so that I know its state quickly.
- As a user, I want **an application shell with navigation and a clear page for an unknown address** so that I never see an empty screen.

### Business rules

- The startup count must stay after a restart.
- The health answer must contain only the status, the startup count and the uptime.
- An unknown address must show a not-found page, never an error.

### Out of context

- Checks of dependencies other than the database of the project.
- Readiness probes.
- Authentication (`basic-auth`).

## Requirements

- **R01**: WHEN a client requests `GET /api/health`, the `back-api` SHALL answer 200 with `{ "status": "ok", "runs": <integer ≥ 1>, "uptime": <seconds > 0> }`.
- **R02**: WHEN the `back-api` restarts, the `runs` value SHALL be greater than before the restart.
- **R03**: WHILE the `back-api` runs, each `uptime` value SHALL be greater than the value before it.
- **R04**: WHEN a user opens `/`, the `front-web` SHALL show the application title and a navigation with links to `/` and `/health`.
- **R05**: WHEN a user opens `/health`, the `front-web` SHALL show the status, runs and uptime from the `back-api`.
- **R06**: IF the `back-api` does not answer, THEN the `/health` page SHALL show `Health unavailable` and keep the navigation.
- **R07**: WHEN a user opens an unknown path directly, the `front-web` SHALL show a not-found page with the requested path and a link to `/`.
- **R08**: WHEN a user follows a navigation link, the `front-web` SHALL change the page without a full reload of the document.
- **R09**: WHEN the `cli` runs `health`, it SHALL show the status and the runs, and stop with exit code 0.

## Expected URLs and APIs

| Kind | Project | Address | Expected answer | Requirements |
| --- | --- | --- | --- | --- |
| api | back-api | `GET /api/health` | 200 `{ "status": "ok", "runs": int, "uptime": seconds }` | R01, R02, R03 |
| page | front-web | `/` | Title and navigation | R04, R08 |
| page | front-web | `/health` | Status, runs and uptime, or `Health unavailable` | R05, R06 |
| page | front-web | `/{unknown}` | Not-found page with the path and a link to `/` | R07 |
| command | cli | `health` | Status and runs. Exit code 0. | R09 |

## Solution

### back-api

- Feature `health` with three layers:
  - `presentation` answers the route.
  - `logic` makes the status from the run count and the process uptime.
  - `data` records one run at startup and counts the runs.
- The `health` facade exports only its registration. The manifest lists it. `core` registers the manifest and gives the database connection by injection.
- The `unit` smoke test checks the `health` logic with a fake `data` layer.

### front-web

- `core` contains the shell: title, navigation, router and the not-found fallback.
- The server answers each unknown path with the shell. Thus direct links to pages operate.
- Feature `health`:
  - `presentation` is the page.
  - `logic` keeps the state of the page: loading, loaded or unavailable.
  - `data` calls `GET /api/health` through the shared HTTP client.
- The manifest is the router table. `core` imports only the manifest.

### cli

- Feature `health`:
  - `presentation` is the command.
  - `logic` makes the status.
  - `data` records one run for each invocation in the store of the cli, and counts the runs.

### e2e

- This technical result is not an acceptance requirement: before the first test, a preflight checks the health address of each project (`GET /api/health` for the `back-api`, `/` for the `front-web`). If a project does not answer, the preflight stops the run and shows the project name. Each acceptance run does this step. No test checks it.
- The page objects for the shell, `/health` and the not-found page are in `shared/page-objects/` of the e2e project.

## Schema impact

| Schema | Element | Change | Description |
| --- | --- | --- | --- |
| model | Run | new | One startup of the `back-api`: `startedAt` (date-time). |
| back-api.db | `runs.id`, `runs.started_at` | new | Made at startup if it does not exist. One row for each startup. |
| back-api.api | `GET /api/health` | new | 200 `{ status, runs, uptime }`. 500 with the uniform error body if the database fails. |

## Verification

| Requirement | Acceptance test |
| --- | --- |
| R01 | `GET /api/health` answers 200 JSON. `status` is `ok`, `runs` is an integer ≥ 1, and `uptime` is a number > 0. |
| R02 | Read `runs`. Restart the `back-api`. Read `runs` again. The new value is greater. |
| R03 | Request `GET /api/health` two times. The second `uptime` is greater. |
| R04 | Open `/`. The title and the links to `/` and `/health` are visible. |
| R05 | Open `/health`. The status, runs and uptime are visible. |
| R06 | Block `/api/health` and open `/health`. `Health unavailable` and the navigation are visible. |
| R07 | Open `/no-such-page` directly. The not-found page shows `/no-such-page` and a link to `/`. |
| R08 | Put a mark on the document. Follow the link to `/health`, then the link to `/`. The mark is still there. |
| R09 | Run the `cli` with `health`. It shows the status and runs, and stops with exit code 0. |
