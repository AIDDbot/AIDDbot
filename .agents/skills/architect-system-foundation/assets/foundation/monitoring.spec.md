<!--
Foundation spec 2 of 4 (Columbus principle 9; D17, D18). It needs `configuration`.
Written in ASD-STE100 Simplified Technical English. Technical names are not dictionary words.
Create: aidd spec new feat monitoring "Monitoring" --domain foundation
Instance: replace each role (`back-api`, `front-web`, `cli`, `e2e`) with the project name.
Remove the rows, requirements and Solution subsections of the roles that the system does not have. Then number the requirements again, with no gaps.
-->
# {id}-monitoring — Monitoring

## Problem

When a failure occurs, the operator must see what occurred. Each client must read failures in one shape.

### User Stories

- As an operator, I want **one log line for each request and each error, in a daily file** so that I can find the cause of a failure.
- As a client developer, I want **each API error in one body shape** so that I handle failures in one location.

### Business rules

- Each request must make one log line. The level of the line must agree with the status.
- A log line is plain text that a person can read. It is not JSON.
- An error response must not show internal details.
- Each API error must use the body `{ "error": "<message>" }` with its HTTP status.

### Out of context

- Metrics, tracing and log shipping.
- Log rotation, other than one file for each day.

## Requirements

- **R01**: WHEN the `back-api` completes a request, it SHALL add one plain-text line to `{LOG_DIR}/{yyyy-mm-dd}.log` with the columns `time source LEVEL message`, separated by spaces. The message SHALL contain the method, path, status and duration in milliseconds.
- **R02**: WHEN a request completes, the `back-api` SHALL log it at level `ERROR` if the status is 500 or more, at `WARN` if the status is from 400 to 499, and at `INFO` for other statuses.
- **R03**: WHILE `LOG_LEVEL` is set, the `back-api` SHALL write no line below that level.
- **R04**: WHEN a request goes to an API path that does not exist, the `back-api` SHALL answer 404 with `{ "error": "Not found" }`.
- **R05**: WHEN a request body is not valid JSON, the `back-api` SHALL answer 400 with `{ "error": "<message>" }`.
- **R06**: WHEN a `cli` command fails, it SHALL write `error: <message>` to standard error and stop with exit code 1.

## Expected URLs and APIs

| Kind | Project | Address | Expected answer | Requirements |
| --- | --- | --- | --- | --- |
| api | back-api | `GET /api/{unknown}` | 404 `{ "error": "Not found" }` | R01, R02, R04 |
| api | back-api | `POST /api/{any}` with an incorrect body | 400 `{ "error": "<message>" }` | R05 |
| command | cli | `{unknown-command}` | `error: <message>` on standard error. Exit code 1. | R06 |

## Solution

### back-api

- `shared/logic` contains the logger policy:
  - One line for each event, with the columns `time source LEVEL message`.
  - The level filter.
- `shared/data` writes the lines to the daily file and to the console. `WARN` and `ERROR` go to standard error.
  - It does not block the request. It puts the lines in a queue, adds them to the file asynchronously, and writes all lines in the queue before the process stops.
  - If a file write fails, it reports the failure one time. The request continues.
- `core` reads these settings (see `configuration`):
  - `LOG_DIR`: default `./logs`.
  - `LOG_LEVEL`: `debug`, `info`, `warn` or `error`. Default `info`.
- `shared/presentation` contains the request logger and the error handler. `core` registers them.
- The error handler is the only code that changes an error into a response:
  - An expected error has its status and its message.
  - All other errors become 500 `{ "error": "Internal server error" }`. The handler logs them at `ERROR` with their cause.
- `shared/logic` defines the one shape of an expected error (status and message). Features raise this shape.

### front-web

- `shared/data` contains the only HTTP client. It changes each non-2xx `{ "error": "..." }` answer into the shape of an expected error. Pages show the message and never a raw failure.

### cli

- `core` catches each failure at the top level. It writes `error: <message>` and sets the exit code. Features raise the shape of an expected error.

### e2e

- A helper in the e2e `shared` folder checks the uniform error body. All tests use it to check errors.

## Schema impact

| Schema | Element | Change | Description |
| --- | --- | --- | --- |
| back-api.api | `* /api/*` | changed | Each error answers `{ "error": "<message>" }` with its status: 404 for an unknown path, 400 for an incorrect body, 500 for an unexpected failure. |

## Verification

| Requirement | Acceptance test |
| --- | --- |
| R01 | Send a request to a path. The log file of the day gets one line that starts with the time, the source and the level, and that contains the method, path, status and duration. A JSON line fails the test. |
| R02 | Send a request to an unknown path. Its log line has the level `WARN`. |
| R03 | Start with `LOG_LEVEL=warn`. A successful request makes no line. |
| R04 | `GET /api/does-not-exist` answers 404 with `{ "error": "Not found" }`. |
| R05 | `POST` a body that is not valid JSON. The answer is 400 with a string `error`. |
| R06 | Run the `cli` with an unknown command. Standard error starts with `error:`. The exit code is 1. |
