<!--
Foundation spec 4 of 4, optional (Columbus principle 9; D3, D4, D6, D13, D17, D18). Requires `configuration`, `monitoring`, and `health`.
Include it only when the system has users (actors, model.schema.md); ask only when that is unclear.
Create: aidd spec new feat basic-auth "Basic authentication" --domain foundation
Instance: replace each role (`back-api`, `front-web`, `e2e`) with the project name; delete the rows,
requirements, and Solution subsections of roles the system lacks, then renumber without gaps.
-->
# {id}-basic-auth — Basic authentication

## Problem

A system with users needs a minimal, safe way to know who calls it, before any feature depends on it.

### User Stories

- As a visitor, I want **to register with my email, name, and password** so that I get an account.
- As a user, I want **to log in and stay signed in after a reload** so that I can use the protected features.

### Business rules

- An email must belong to one account only, regardless of letter case.
- A password must never be stored or returned in a readable form.
- A failed login must not reveal whether the email exists.
- Every API route must require a valid session, except health, register, and login.
- Every user has the role `user`; a client cannot choose another.

### Out of context

- Logout, password reset, email verification, other roles, external identity providers, and rate limits.

## Requirements

- **R01**: WHEN a visitor registers with a new email, a name, and a password, the `back-api` SHALL answer 201 with the public user `{ id, email, name, role: "user", createdAt }`.
- **R02**: IF the email, name, or password is missing or not a non-empty string, THEN the `back-api` SHALL answer 400 and create no user.
- **R03**: IF the email is already registered in any letter case, THEN the `back-api` SHALL answer 409 and keep the first account unchanged.
- **R04**: WHEN a user logs in with valid credentials, the `back-api` SHALL answer 200 with `{ token, user }`, where `token` is a non-empty opaque string.
- **R05**: IF the password is wrong or the email is unknown, THEN the `back-api` SHALL answer 401 with the same body `{ "error": "Invalid credentials" }`.
- **R06**: WHEN a request carries `Authorization: Bearer <token>` of a valid session, `GET /api/auth/me` SHALL answer 200 with the public user.
- **R07**: IF a request to a protected route has no token or an invalid one, THEN the `back-api` SHALL answer 401 with the uniform error body.
- **R08**: WHEN a visitor submits the register form, the `front-web` SHALL confirm the registration, and on a duplicate email SHALL show the error and allow a retry.
- **R09**: WHEN a user submits valid credentials on the login page, the `front-web` SHALL show the user's name in the navigation; on wrong credentials it SHALL show the error and allow a retry.
- **R10**: WHILE a user is signed in, the `front-web` SHALL keep the session after a page reload.
- **R11**: WHEN a user submits a form twice quickly, the `front-web` SHALL send one request.
- **R12**: WHEN a user moves between `/register` and `/login` without a page reload, the form SHALL submit the operation of the page that it shows.

## Expected URLs and APIs

| Kind | Project | Address | Expected answer | Requirements |
| --- | --- | --- | --- | --- |
| api | back-api | `POST /api/auth/register` | 201 public user; 400 invalid input; 409 duplicate email | R01, R02, R03 |
| api | back-api | `POST /api/auth/login` | 200 `{ token, user }`; 400 invalid input; 401 invalid credentials | R04, R05 |
| api | back-api | `GET /api/auth/me` | 200 public user; 401 without a valid session | R06, R07 |
| page | front-web | `/register` | Form with email, name, password; no role field | R08, R11, R12 |
| page | front-web | `/login` | Form with email and password | R09, R10, R11, R12 |

## Solution

### back-api

- Input checks use the `requireText` shared primitive; email normalization becomes a new shared primitive in `logic`, added to the project's `AGENTS.md`.
- Feature `auth`: `presentation` has the three routes; `logic` validates input, normalizes the email to lower case, hashes and verifies passwords with a slow, salted algorithm that OWASP recommends, and creates sessions; `data` stores users and sessions.
- The token is random and opaque; the session lives in the database, so it can be revoked.
- On an unknown email, `logic` still runs one password verification, so both failures take the same time.
- The session guard lives in `shared/presentation` without business: it reads the bearer token and asks a session resolver that `core` injects from the `auth` facade. `core` mounts it after the public routes, so every new route is protected by default.
- Other features read the current user only through the `auth` facade.

### front-web

- Feature `auth`: `presentation` has the register and login pages; `logic` holds the session state and disables a form while it submits; `data` calls the three endpoints through the shared HTTP client.
- The token persists in browser storage and the shared HTTP client sends it as a bearer token; the navigation shows the user's name when signed in.

### e2e

- An API client and page objects for register and login in the e2e `data` layer; unique test emails per run, so the suite repeats on the same database.

## Schema impact

| Schema | Element | Change | Description |
| --- | --- | --- | --- |
| model | User | new | `id`, `email` (unique, lower case), `name`, `role` (`user`), `passwordHash`, `createdAt`. |
| model | Session | new | `token`, `userId` → User, `createdAt`. |
| back-api.db | `users.*`, `sessions.*` | new | Fields of User and Session; `users.email` unique. |
| back-api.api | `POST /api/auth/register` | new | 201 public user; 400 invalid input; 409 email already registered. |
| back-api.api | `POST /api/auth/login` | new | 200 `{ token, user }`; 400 invalid input; 401 invalid credentials. |
| back-api.api | `GET /api/auth/me` | new | 200 public user; 401 missing or invalid session. |

## Verification

| Requirement | Acceptance test |
| --- | --- |
| R01 | Register a unique email; 201 with the public user, role `user`, and no password field. |
| R02 | Register without a name, and with an empty password; both 400, and login with them fails. |
| R03 | Register the same email in upper case; 409, and the first password still logs in. |
| R04 | Log in with valid credentials; 200 with a non-empty token and the user. |
| R05 | Log in with a wrong password and with an unknown email; both 401 with the same body. |
| R06 | Call `GET /api/auth/me` with the login token; 200 with the same user. |
| R07 | Call `GET /api/auth/me` without a token and with a fake token; both 401 with `{ "error": ... }`. |
| R08 | Register through the page; success is shown. Register the same email again; the error is shown and a retry works. |
| R09 | Log in through the page; the navigation shows the name. Use a wrong password; the error is shown and a retry works. |
| R10 | Log in, reload the page; the navigation still shows the name. |
| R11 | Double-click submit on register and on login; one request each. |
| R12 | Open `/register`, follow the link to `/login` without a reload, and submit valid credentials: a login request is sent. Then follow the link back to `/register` and submit a new account: a register request is sent. |
