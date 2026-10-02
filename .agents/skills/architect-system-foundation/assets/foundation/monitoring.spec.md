<!--
Foundation spec 2 of 4 (Columbus principle 9; D17, D18). Requires `configuration`.
Create: aidd spec new feat monitoring "Monitoring" --domain foundation
Instance: replace each role (`back-api`, `front-web`, `cli`, `e2e`) with the project name; delete the rows,
requirements, and Solution subsections of roles the system lacks, then renumber without gaps.
-->
# {id}-monitoring — Monitoring

## Problem

When something fails, the operator must see what happened, and every client must read failures in one shape.

### User Stories

- As an operator, I want **one log line per request and per error, in a daily file** so that I can trace any failure.
- As a client developer, I want **every API error in one body shape** so that I handle failures in one place.

### Business rules

- Every request must leave one log line, with a level that follows its status.
- An error response must not reveal internal details.
- Every API error must use the body `{ "error": "<message>" }` with its HTTP status.

### Out of context

- Metrics, tracing, log shipping, and log rotation beyond one file per day.

## Requirements

- **R01**: WHEN the `back-api` finishes a request, it SHALL append one line with time, level, method, path, status, and duration in milliseconds to `{LOG_DIR}/{yyyy-mm-dd}.log`.
- **R02**: WHEN a request finishes with a status from 500, the `back-api` SHALL log it at level `ERROR`; from 400, at `WARN`; otherwise at `INFO`.
- **R03**: WHILE `LOG_LEVEL` is set, the `back-api` SHALL write no line below that level.
- **R04**: WHEN a request reaches an API path that does not exist, the `back-api` SHALL answer 404 with `{ "error": "Not found" }`.
- **R05**: WHEN a request body is not valid JSON, the `back-api` SHALL answer 400 with `{ "error": "<message>" }`.
- **R06**: WHEN the `cli` command fails, it SHALL write `error: <message>` to standard error and exit with code 1.

## Expected URLs and APIs

| Kind | Project | Address | Expected answer | Requirements |
| --- | --- | --- | --- | --- |
| api | back-api | `GET /api/{unknown}` | 404 `{ "error": "Not found" }` | R01, R02, R04 |
| api | back-api | `POST /api/{any}` with a malformed body | 400 `{ "error": "<message>" }` | R05 |
| command | cli | `{unknown-command}` | `error: <message>` on standard error; exit code 1 | R06 |

## Solution

### back-api

- `shared/logic` holds the logger: one line per event, columns `time source LEVEL message`, written to the daily file and to the console (`WARN` and `ERROR` to standard error). A failing file write is reported once and never stops the request.
- Settings, read by `core` (see `configuration`): `LOG_DIR` (default `./logs`), `LOG_LEVEL` (`debug`, `info`, `warn`, `error`; default `info`).
- `shared/presentation` holds the request logger and the error handler; `core` registers both. The error handler is the only place that turns an error into a response: an expected error carries its status and message; anything else becomes 500 `{ "error": "Internal server error" }` and is logged at `ERROR` with its cause.
- `shared/logic` defines the one expected-error shape (status and message) that features raise.

### front-web

- `shared/data` holds the only HTTP client; it turns any non-2xx `{ "error": "..." }` answer into the expected-error shape, so pages show the message and never a raw failure.

### cli

- `core` catches every failure at the top, prints `error: <message>`, and sets the exit code; features raise the expected-error shape.

### e2e

- A shared helper in the e2e `shared` folder asserts the uniform error body, so every test checks errors the same way.

## Schema impact

| Schema | Element | Change | Description |
| --- | --- | --- | --- |
| back-api.api | `* /api/*` | changed | Every error answers `{ "error": "<message>" }` with its status; 404 for unknown paths, 400 for a malformed body, 500 for unexpected failures. |

## Verification

| Requirement | Acceptance test |
| --- | --- |
| R01 | Request any path; the day's log file gains one line with method, path, status, and duration. |
| R02 | Request an unknown path; its log line has level `WARN`. |
| R03 | Start with `LOG_LEVEL=warn`; a successful request leaves no line. |
| R04 | `GET /api/does-not-exist` answers 404 with `{ "error": "Not found" }`. |
| R05 | `POST` a malformed JSON body; the answer is 400 with a string `error`. |
| R06 | Run the `cli` with an unknown command; standard error starts with `error:` and the exit code is 1. |
