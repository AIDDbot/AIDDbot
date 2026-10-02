<!--
Foundation spec 3 of 4 (Columbus principle 9; D2, D6, D17, D18). Requires `configuration` and `monitoring`.
The tracer bullet: one minimal feature through presentation → logic → data in every project.
Create: aidd spec new feat health "Health status" --domain foundation
Instance: replace each role (`back-api`, `front-web`, `cli`, `e2e`) with the project name; delete the rows,
requirements, and Solution subsections of roles the system lacks, then renumber without gaps.
-->
# {id}-health — Health status

## Problem

Before any business feature, every layer of every project must be proven to work together: a request crosses presentation, logic, and data, and the projects reach each other.

### User Stories

- As an operator, I want **to ask the system whether it is alive, how many times it has started, and for how long it has run** so that I know its state at a glance.
- As a user, I want **an application shell with navigation and a clear page for unknown addresses** so that I never land on a blank screen.

### Business rules

- The startup count must persist across restarts.
- The health answer must contain only status, startup count, and uptime.
- An unknown address must show a not-found page, never an error.

### Out of context

- Dependency checks beyond the own database, readiness probes, and authentication (`basic-auth`).

## Requirements

- **R01**: WHEN a client requests `GET /api/health`, the `back-api` SHALL answer 200 with `{ "status": "ok", "runs": <integer ≥ 1>, "uptime": <seconds > 0> }`.
- **R02**: WHEN the `back-api` restarts, the `runs` value SHALL be greater than before the restart.
- **R03**: WHILE the `back-api` runs, each `uptime` value SHALL be greater than the one before.
- **R04**: WHEN a user opens `/`, the `front-web` SHALL show the application title and a navigation with links to `/` and `/health`.
- **R05**: WHEN a user opens `/health`, the `front-web` SHALL show the status, runs, and uptime from the `back-api`.
- **R06**: IF the `back-api` does not answer, THEN the `/health` page SHALL show `Health unavailable` and keep the navigation.
- **R07**: WHEN a user opens an unknown path directly, the `front-web` SHALL show a not-found page with the requested path and a link to `/`.
- **R08**: WHEN a user follows a navigation link, the `front-web` SHALL change the page without a full document reload.
- **R09**: WHEN the `cli` runs `health`, it SHALL print the status, the runs, and exit with code 0.
- **R10**: IF a project under test does not answer its health address, THEN the `e2e` suite SHALL stop before any test and name that project.

## Expected URLs and APIs

| Kind | Project | Address | Expected answer | Requirements |
| --- | --- | --- | --- | --- |
| api | back-api | `GET /api/health` | 200 `{ "status": "ok", "runs": int, "uptime": seconds }` | R01, R02, R03 |
| page | front-web | `/` | Title and navigation | R04, R08 |
| page | front-web | `/health` | Status, runs, uptime; or `Health unavailable` | R05, R06 |
| page | front-web | `/{unknown}` | Not-found page with the path and a link home | R07 |
| command | cli | `health` | Status and runs; exit code 0 | R09 |

## Solution

### back-api

- Feature `health` with three layers: `presentation` answers the route; `logic` builds the status from the run count and the process uptime; `data` records one run at startup and counts the runs.
- The `health` facade exports only its registration; the manifest lists it; `core` registers the manifest and injects the database connection.
- The `unit` smoke test proves the `health` logic with a fake `data` layer.

### front-web

- `core` holds the shell: title, navigation, router, and the not-found fallback; the server answers every unknown path with the shell, so deep links work.
- Feature `health`: `presentation` is the page; `logic` holds its state (loading, loaded, unavailable); `data` calls `GET /api/health` through the shared HTTP client.
- The manifest is the router table; `core` imports only it.

### cli

- Feature `health`: `presentation` is the command; `logic` builds the status; `data` records one run per invocation in the cli's own store and counts them.

### e2e

- A preflight, before any test, probes each project's health address (`GET /api/health` for the `back-api`, `/` for the `front-web`) and stops the run with the name of the project that does not answer.
- Page objects for the shell, `/health`, and the not-found page live in the e2e `data` layer.

## Schema impact

| Schema | Element | Change | Description |
| --- | --- | --- | --- |
| model | Run | new | One startup of the `back-api`: `startedAt` (date-time). |
| back-api.db | `runs.id`, `runs.started_at` | new | Created at startup if missing; one row per start. |
| back-api.api | `GET /api/health` | new | 200 `{ status, runs, uptime }`; 500 on database failure with the uniform error body. |

## Verification

| Requirement | Acceptance test |
| --- | --- |
| R01 | `GET /api/health` answers 200 JSON with `status` `ok`, integer `runs` ≥ 1, and number `uptime` > 0. |
| R02 | Read `runs`, restart the `back-api`, read again: the new value is greater. |
| R03 | Poll `GET /api/health` twice; the second `uptime` is greater. |
| R04 | Open `/`; the title and links to `/` and `/health` are visible. |
| R05 | Open `/health`; status, runs, and uptime are visible. |
| R06 | Block `/api/health` and open `/health`; `Health unavailable` and the navigation are visible. |
| R07 | Open `/no-such-page` directly; the not-found page shows `/no-such-page` and a link to `/`. |
| R08 | Mark the document, follow the link to `/health`, then back to `/`; the mark survives. |
| R09 | Run the `cli` with `health`; it prints status and runs and exits 0. |
| R10 | Run the suite with a project down; it stops before any test and names the project. |
