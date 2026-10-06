<!--
Foundation spec 4 of 8 (Columbus principle 9; D2, D6, D17, D18, D38, D39, D51). It needs `configuration`, `monitoring` and, with a `front-web`, `layout`.
The tracer bullet: one small feature through presentation → logic → data in each project.
Written in ASD-STE100 Simplified Technical English. Technical names are not dictionary words.
Create: aidd spec new feat health "Health status" --domain foundation
Instance: replace each role (`back-api`, `front-web`, `cli`, `e2e`) with the project name.
Remove the rows, requirements and Solution subsections of the roles that the system does not have. Then number the requirements again, with no gaps.
-->
# {id}-health — Health status

## Problem

Before the first business feature, each layer of each project must operate with the others, and the projects must connect to each other.

### User Stories

- As an operator, I want **to ask the system if it is alive, how many times it started, and for how long it has run** so that I know its state quickly.

### Business rules

- The health answer must contain only the status, the startup count and the uptime.

### Out of context

- Checks of dependencies other than the database of the project. Readiness probes.
- The shell, the menu and the not-found page (`layout`). Authentication (`basic-auth`).

## Requirements

- **R01**: WHEN a client requests `GET /api/health`, the `back-api` SHALL answer 200 with `{ "status": "ok", "runs": <integer ≥ 1>, "uptime": <seconds > 0> }`.
- **R02**: WHEN the `back-api` restarts, the `runs` value SHALL be greater than before the restart.
- **R03**: WHILE the `back-api` runs, each `uptime` value SHALL be greater than the value before it.
- **R04**: WHEN a user opens `/health`, the `front-web` SHALL show the status, the runs and the uptime from the `back-api`, with the uptime as a duration that a person reads (such as `1 h 2 min`).
- **R05**: IF the `back-api` does not answer, THEN the `/health` page SHALL show `Health unavailable` and keep the menu.
- **R06**: WHILE the `front-web` shows a page, the menu SHALL contain a link to `/health`.
- **R07**: WHEN the `cli` runs `health`, it SHALL show the status and the runs, and stop with exit code 0.
- **R08**: WHEN a user opens `/`, the home page SHALL show a health card with the status, the runs, the uptime as a duration that a person reads, and a link to `/health`.
- **R09**: IF the `back-api` does not answer, THEN the health card SHALL show `Health unavailable` and keep its link, the other cards and the menu.
- **R10**: WHEN a user follows the link of the health card, the `front-web` SHALL show `/health` without a full reload of the document.
- **R11**: WHEN a user opens `/` on a screen 375 CSS pixels wide, the home page SHALL have no horizontal scroll.

## Expected URLs and APIs

| Kind | Project | Address | Expected answer | Requirements |
| --- | --- | --- | --- | --- |
| api | back-api | `GET /api/health` | 200 `{ "status": "ok", "runs": int, "uptime": seconds }`. 500 with the uniform error body if the database fails. | R01, R02, R03 |
| page | front-web | `/health` | Status, runs and uptime, or `Health unavailable` | R04, R05, R06 |
| page | front-web | `/` | Health card: status, runs, uptime and a link to `/health`, or `Health unavailable` | R08–R11 |
| command | cli | `health` | Status and runs. Exit code 0. | R07 |

## Solution

### back-api

- `data` records one run at startup and counts the runs; its table comes in the first migration of the feature (see `configuration`).
- No facade: no other feature uses `health`. The feature gets the database from the composition (see `configuration`).
- The `unit` smoke test checks the `logic` with a fake `data` layer.

### front-web

- `logic` keeps the state of the page: loading, loaded or unavailable. `data` calls `GET /api/health` through the HTTP client.
- The page and the card show the uptime with the shared primitive `formatDuration`.
- The registration adds the page `/health`, its menu link `Health` and the card of the home page (see `layout`). The card uses the same `logic` and `data` as the page.

### cli

- `data` records one run for each invocation in the store of the cli, and counts the runs.

### e2e

- A preflight, not a test: before the first test, it checks `GET /api/health` of the `back-api` and `/` of the `front-web`. A project that does not answer stops the run, with its name.
- The page object of `/health` uses the shell page object; the card tests use the home page object (see `layout`).

## Schema impact

| Schema | Element | Change | Description |
| --- | --- | --- | --- |
| model | Run | new | One startup of the `back-api`: `startedAt` (date-time). |
| back-api.db | `runs.id`, `runs.started_at` | new | One row for each startup. |

## Test notes

- **R02**: read `runs`, restart the `back-api`, read it again.
- **R05, R09**: block `/api/health` in the browser.
- **R10**: put a mark on the document before the link; the mark is still there.
- **R11**: the width of the document is not more than the width of the viewport.
- **R04, R08**: check the shape of the duration (such as a number and a unit), never an exact value.
