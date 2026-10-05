<!--
Foundation spec 4 of 6 (Columbus principle 9; D2, D6, D17, D18, D38, D39). It needs `configuration`, `monitoring` and, with a `front-web`, `layout`.
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

### Business rules

- The startup count must stay after a restart.
- The health answer must contain only the status, the startup count and the uptime.

### Out of context

- Checks of dependencies other than the database of the project.
- Readiness probes.
- The shell, the menu and the not-found page (`layout`).
- Authentication (`basic-auth`).

## Requirements

- **R01**: WHEN a client requests `GET /api/health`, the `back-api` SHALL answer 200 with `{ "status": "ok", "runs": <integer ≥ 1>, "uptime": <seconds > 0> }`.
- **R02**: WHEN the `back-api` restarts, the `runs` value SHALL be greater than before the restart.
- **R03**: WHILE the `back-api` runs, each `uptime` value SHALL be greater than the value before it.
- **R04**: WHEN a user opens `/health`, the `front-web` SHALL show the status, runs and uptime from the `back-api`.
- **R05**: IF the `back-api` does not answer, THEN the `/health` page SHALL show `Health unavailable` and keep the menu.
- **R06**: WHILE the `front-web` shows a page, the menu SHALL contain a link to `/health`.
- **R07**: WHEN the `cli` runs `health`, it SHALL show the status and the runs, and stop with exit code 0.
- **R08**: WHEN a user opens `/`, the home page SHALL show a health card with the status, the runs, the uptime in seconds and a link to `/health`.
- **R09**: IF the `back-api` does not answer, THEN the health card SHALL show `Health unavailable` and keep its link, the other cards and the menu.
- **R10**: WHEN a user follows the link of the health card, the `front-web` SHALL show `/health` without a full reload of the document.
- **R11**: WHEN a user opens `/` on a screen 375 CSS pixels wide, the home page SHALL have no horizontal scroll.

## Expected URLs and APIs

| Kind | Project | Address | Expected answer | Requirements |
| --- | --- | --- | --- | --- |
| api | back-api | `GET /api/health` | 200 `{ "status": "ok", "runs": int, "uptime": seconds }` | R01, R02, R03 |
| page | front-web | `/health` | Status, runs and uptime, or `Health unavailable` | R04, R05, R06 |
| page | front-web | `/` | Health card: status, runs, uptime and a link to `/health`, or `Health unavailable` | R08, R09, R10, R11 |
| command | cli | `health` | Status and runs. Exit code 0. | R07 |

## Solution

### back-api

- Feature `health` with three layers:
  - `presentation` answers the route.
  - `logic` makes the status from the run count and the process uptime.
  - `data` records one run at startup and counts the runs. Its table comes in the first migration of the feature (see `configuration`).
- The `health` facade exports only its registration. The manifest lists it. `createApp()` in `main` registers the manifest. The feature gets the database connection by the access method of the `AGENTS.md` of the project.
- The `unit` smoke test checks the `health` logic with a fake `data` layer.

### front-web

- Feature `health`:
  - `presentation` is the page.
  - `logic` keeps the state of the page: loading, loaded or unavailable.
  - `data` calls `GET /api/health` through the HTTP client of `core`.
- The `health` facade registers the page `/health` and its menu link `Health`. The manifest lists it.
- The `health` facade also exports the card registration of the home page (see `layout`). The card is in `presentation`. It uses the same `logic` and `data` as the page.

### cli

- Feature `health`:
  - `presentation` is the command.
  - `logic` makes the status.
  - `data` records one run for each invocation in the store of the cli, and counts the runs.

### e2e

- This technical result is not an acceptance requirement: before the first test, a preflight checks the health address of each project (`GET /api/health` for the `back-api`, `/` for the `front-web`). If a project does not answer, the preflight stops the run and shows the project name. Each acceptance run does this step. No test checks it.
- The page object for `/health` is in `shared/page-objects/` of the e2e project. It uses the page object of the shell from `layout`.
- The tests of the health card use the page object of the home page from `layout`.

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
| R04 | Open `/health`. The status, runs and uptime are visible. |
| R05 | Block `/api/health` and open `/health`. `Health unavailable` and the menu are visible. |
| R06 | Open `/`. The menu has a link to `/health`. Follow it. The health page is visible. |
| R07 | Run the `cli` with `health`. It shows the status and runs, and stops with exit code 0. |
| R08 | Open `/`. The health card shows the status, the runs, the uptime in seconds and a link to `/health`. |
| R09 | Block `/api/health` and open `/`. The health card shows `Health unavailable` and its link. The menu is visible. |
| R10 | Open `/`. Put a mark on the document. Follow the link of the health card. The health page is visible and the mark is still there. |
| R11 | Open `/` with a viewport 375 CSS pixels wide. The width of the document is not more than the width of the viewport. |
