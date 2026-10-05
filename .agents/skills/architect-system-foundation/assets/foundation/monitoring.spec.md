<!--
Foundation spec 2 of 7 (Columbus principle 9; D17, D18, D39, D51). It needs `configuration`.
Written in ASD-STE100 Simplified Technical English. Technical names are not dictionary words.
Create: aidd spec new feat monitoring "Monitoring" --domain foundation
Instance: replace each role (`back-api`, `front-web`, `cli`, `e2e`) with the project name.
Remove the rows, requirements and Solution subsections of the roles that the system does not have. Then number the requirements again, with no gaps.
-->
# {id}-monitoring — Monitoring

## Problem

When a failure occurs, the operator must see what occurred, and each client must read failures in one shape.

### User Stories

- As an operator, I want **one short log line for each request and each error, in a daily file** so that I can find the cause of a failure.
- As a client developer, I want **each API error in one body shape** so that I handle failures in one location.
- As a developer, I want **each server to show its address when it starts** so that I can open it.

### Business rules

- A log line is plain text that a person can read, never JSON.
- An error response must not show internal details.
- A log line or a console line must never contain a password, a token or a form value.

### Out of context

- Metrics, tracing, log shipping, rate limits.
- Log rotation, other than one file for each day.

## Requirements

- **R01**: WHEN the `back-api` completes a request, it SHALL add one plain-text line to `{LOG_DIR}/{yyyy-mm-dd}.log` with the columns `time source LEVEL message`, separated by spaces. The `time` SHALL be the local time of day `HH:MM:SS.mmm`, with no date. The message SHALL contain the method, path, status and duration in milliseconds, and no request identifier.
- **R02**: WHEN a request completes, the `back-api` SHALL log it at level `ERROR` if the status is 500 or more, at `WARN` if the status is from 400 to 499, and at `INFO` for other statuses.
- **R03**: WHILE `LOG_LEVEL` is set, the `back-api` SHALL write no line below that level.
- **R04**: WHEN a request goes to an API path that does not exist, the `back-api` SHALL answer 404 with `{ "error": "Not found" }`.
- **R05**: WHEN a request body is not valid JSON, the `back-api` SHALL answer 400 with `{ "error": "<message>" }`.
- **R06**: WHEN a `cli` command fails, it SHALL write `error: <message>` to standard error and stop with exit code 1.
- **R07**: WHEN a request has an `X-Request-Id` header, the `back-api` SHALL answer with the same `X-Request-Id`.
- **R08**: WHEN a request has no `X-Request-Id` header, the `back-api` SHALL make a new unique identifier and answer with it in `X-Request-Id`.
- **R09**: WHEN the `back-api` answers a request, the answer SHALL have the headers `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY` and `Referrer-Policy: no-referrer`.
- **R10**: IF a request body is larger than `BODY_LIMIT_KB` kilobytes, THEN the `back-api` SHALL answer 413 with `{ "error": "<message>" }`.
- **R11**: WHEN the `back-api` starts to listen, it SHALL write one console line with a URL that a browser can open: the configured host, or `localhost` when it listens on all interfaces.
- **R12**: WHEN the `front-web` server starts to listen, it SHALL write one console line with a URL that a browser can open.
- **R13**: IF a server cannot start, THEN it SHALL write no listening line.

## Expected URLs and APIs

| Kind | Project | Address | Expected answer | Requirements |
| --- | --- | --- | --- | --- |
| api | back-api | `GET /api/{unknown}` | 404 `{ "error": "Not found" }` | R01, R02, R04 |
| api | back-api | `POST /api/{any}` with an incorrect body | 400 `{ "error": "<message>" }`, with `fields` for an input error | R05 |
| api | back-api | `POST /api/{any}` with a body larger than the limit | 413 `{ "error": "<message>" }` | R10 |
| api | back-api | any path | `X-Request-Id` and the security headers, also on an error. An unexpected failure: 500 `{ "error": "Internal server error" }` | R07, R08, R09 |
| process | back-api, front-web | start | One console line with an openable URL | R11, R12, R13 |
| command | cli | `{unknown-command}` | `error: <message>` on standard error. Exit code 1. | R06 |

## Solution

### back-api

- The logger is in `core`: one line for each event; line breaks in a message (such as a stack trace) become ` | `; `WARN` and `ERROR` go to standard error.
- It never blocks a request: a queue, asynchronous file writes, all queued lines written before the process stops. A failed write is reported one time; the request continues.
- Settings (see `configuration`): `LOG_DIR` (`./logs`), `LOG_LEVEL` (`debug`, `info`, `warn`, `error`; `info`), `BODY_LIMIT_KB` (100).
- A received `X-Request-Id` stays only if it is a short text of letters, digits and `-`; otherwise a new one.
- The error handler of `core` is the only code that changes an error into a response. An expected error has its status, message and optional `fields`; any other error is logged at `ERROR` with its cause.
- `shared` defines the one expected error type. The validation primitives of `shared` raise it with the field name.
- The listening line comes only after the server confirms that it listens. An IPv6 host is in brackets.

### front-web

- The listening line comes only after the server confirms that it listens.
- The console logger of the browser is in `core`: one short plain-text line for each user action, with the action name and its path or value. A feature gives the action name; the logger has no words of a feature and never gets a form value, a password or a token. `layout` and the features add the actions.
- The only HTTP client is in `core`. It changes each non-2xx `{ "error": ... }` answer into the expected error, with its `fields`. Pages show the message, never a raw failure; a form shows each field message next to its field.

### cli

- `core` catches each failure at the top level. Features raise the expected error of `shared`.

### e2e

- One helper in `shared` checks the uniform error body and its `fields`. All tests use it.

## Test notes

- **R01**: send a known `X-Request-Id`; the line must not contain it. A JSON line fails.
- **R03**: start with `LOG_LEVEL=warn`; a successful request writes no line.
- **R11, R12**: start on a free port; the line has `http://localhost:{port}`, and that URL answers.
- **R13**: start the `back-api` with an incorrect `PORT`.
