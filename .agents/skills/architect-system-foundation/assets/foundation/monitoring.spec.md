<!--
Foundation spec 2 of 5 (Columbus principle 9; D17, D18, D39). It needs `configuration`.
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
- Each API error must use the body `{ "error": "<message>" }` with its HTTP status. An input error also names each incorrect field.
- Each request must have one identifier. The answer and the log line show it, so that a client report leads to its log line.
- Each answer must have the security headers. The `back-api` must refuse a body that is too large.

### Out of context

- Metrics, tracing and log shipping.
- Log rotation, other than one file for each day.
- Rate limits.

## Requirements

- **R01**: WHEN the `back-api` completes a request, it SHALL add one plain-text line to `{LOG_DIR}/{yyyy-mm-dd}.log` with the columns `time source LEVEL message`, separated by spaces. The `time` SHALL be the local time of day `HH:MM:SS.mmm`, with no date. The message SHALL contain the method, path, status and duration in milliseconds.
- **R02**: WHEN a request completes, the `back-api` SHALL log it at level `ERROR` if the status is 500 or more, at `WARN` if the status is from 400 to 499, and at `INFO` for other statuses.
- **R03**: WHILE `LOG_LEVEL` is set, the `back-api` SHALL write no line below that level.
- **R04**: WHEN a request goes to an API path that does not exist, the `back-api` SHALL answer 404 with `{ "error": "Not found" }`.
- **R05**: WHEN a request body is not valid JSON, the `back-api` SHALL answer 400 with `{ "error": "<message>" }`.
- **R06**: WHEN a `cli` command fails, it SHALL write `error: <message>` to standard error and stop with exit code 1.
- **R07**: WHEN a request has an `X-Request-Id` header, the `back-api` SHALL answer with the same `X-Request-Id` and write it in the log line of that request.
- **R08**: WHEN a request has no `X-Request-Id` header, the `back-api` SHALL make a new unique identifier, answer with it in `X-Request-Id`, and write it in the log line.
- **R09**: WHEN the `back-api` answers a request, the answer SHALL have the headers `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY` and `Referrer-Policy: no-referrer`.
- **R10**: IF a request body is larger than `BODY_LIMIT_KB` kilobytes, THEN the `back-api` SHALL answer 413 with `{ "error": "<message>" }`.

## Expected URLs and APIs

| Kind | Project | Address | Expected answer | Requirements |
| --- | --- | --- | --- | --- |
| api | back-api | `GET /api/{unknown}` | 404 `{ "error": "Not found" }` | R01, R02, R04 |
| api | back-api | `POST /api/{any}` with an incorrect body | 400 `{ "error": "<message>" }` | R05 |
| api | back-api | any path | `X-Request-Id` and the security headers | R07, R08, R09 |
| api | back-api | `POST /api/{any}` with a body larger than the limit | 413 `{ "error": "<message>" }` | R10 |
| command | cli | `{unknown-command}` | `error: <message>` on standard error. Exit code 1. | R06 |

## Solution

### back-api

- The logger is in `core`. Its policy:
  - One line for each event, with the columns `time source LEVEL message`. The message of a request line starts with the request identifier. A message with line breaks, such as a stack trace, stays on that one line: the logger replaces each line break with ` | `.
  - The `time` has no date, because the file name gives the date.
  - The level filter.
- The logger writes the lines to the daily file and to the console. `WARN` and `ERROR` go to standard error.
  - It does not block the request. It puts the lines in a queue, adds them to the file asynchronously, and writes all lines in the queue before the process stops.
  - If a file write fails, it reports the failure one time. The request continues.
- `core` reads these settings (see `configuration`):
  - `LOG_DIR`: default `./logs`.
  - `LOG_LEVEL`: `debug`, `info`, `warn` or `error`. Default `info`.
  - `BODY_LIMIT_KB`: the largest request body. Default 100.
- `core` puts the request identifier on each request before the request logger. It keeps a received `X-Request-Id` only if it is a short text of letters, digits and `-`. Otherwise, it makes a new one.
- `core` adds the security headers to each answer, also to an error answer.
- `core` contains the request logger and the error handler, and registers them.
- The error handler is the only code that changes an error into a response:
  - An expected error has its status and its message. An input error also has `fields`: one message for each incorrect field.
  - All other errors become 500 `{ "error": "Internal server error" }`. The handler logs them at `ERROR` with their cause.
- `shared` defines the one type of an expected error (status, message, and optional `fields`). Features and `core` use this type. The validation primitives of `shared` raise it with the field name.

### front-web

- `core` contains the only HTTP client. It changes each non-2xx `{ "error": "..." }` answer into the shape of an expected error. It keeps `fields` when the answer has them. Pages show the message and never a raw failure. A form shows each field message next to its field.

### cli

- `core` catches each failure at the top level. It writes `error: <message>` and sets the exit code. Features raise the expected error type of `shared`.

### e2e

- A helper in the e2e `shared` folder checks the uniform error body, and its `fields` when the test expects them. All tests use it to check errors.

## Schema impact

| Schema | Element | Change | Description |
| --- | --- | --- | --- |
| back-api.api | `* /api/*` | changed | Each error answers `{ "error": "<message>" }` with its status: 404 for an unknown path, 400 for an incorrect body (with `fields` for an input error), 413 for a body larger than the limit, 500 for an unexpected failure. Each answer has `X-Request-Id` and the security headers. |

## Verification

| Requirement | Acceptance test |
| --- | --- |
| R01 | Send a request to a path. The log file of the day gets one line that starts with the time of day (`HH:MM:SS.mmm`, no date), the source and the level, and that contains the method, path, status and duration. A JSON line fails the test. |
| R02 | Send a request to an unknown path. Its log line has the level `WARN`. |
| R03 | Start with `LOG_LEVEL=warn`. A successful request makes no line. |
| R04 | `GET /api/does-not-exist` answers 404 with `{ "error": "Not found" }`. |
| R05 | `POST` a body that is not valid JSON. The answer is 400 with a string `error`. |
| R06 | Run the `cli` with an unknown command. Standard error starts with `error:`. The exit code is 1. |
| R07 | Send a request with a unique `X-Request-Id`. The answer has the same `X-Request-Id`. The log file of the day has one line that contains it. |
| R08 | Send two requests without `X-Request-Id`. Each answer has a non-empty `X-Request-Id`, and the two values are different. |
| R09 | Send a request to an existing path and to an unknown path. Each answer has the three security headers. |
| R10 | `POST` a valid JSON body that is larger than the default limit. The answer is 413 with a string `error`. |
