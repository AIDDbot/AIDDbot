<!--
Foundation spec 5 of 7. Optional (Columbus principle 9; D3, D6, D13, D17, D18, D39, D45, D47, D51). It needs `configuration`, `monitoring`, `health` and, with a `front-web`, `layout`.
Include it only if the system has users (actors, model.schema.md). Ask only if this is not clear.
Written in ASD-STE100 Simplified Technical English. Technical names are not dictionary words.
Create: aidd spec new feat basic-auth "Basic authentication" --domain foundation
Instance: replace each role (`back-api`, `front-web`, `e2e`) with the project name.
Remove the rows, requirements and Solution subsections of the roles that the system does not have. Then number the requirements again, with no gaps.
-->
# {id}-basic-auth — Basic authentication

## Problem

A system with users must know who sends each request, before a feature needs this data. The method must be small and safe.

### User Stories

- As a visitor, I want **to register with my email, name and password** so that I get an account.
- As a user, I want **to log in and stay logged in after a reload** so that I can use the protected features.

### Business rules

- A password must never be stored or returned in a form that a person can read.
- Each API route must have a valid session, but health, register and login are public.
- Each user has the role `user`. A client cannot select a different role.

### Out of context

- Logout and the account page (`account`). Password reset and email verification.
- Other roles, external identity providers, rate limits.

## Requirements

- **R01**: WHEN a visitor registers with a new email, a name and a password, the `back-api` SHALL answer 201 with the public user `{ id, email, name, role: "user", createdAt }`.
- **R02**: IF the email, name or password is missing or is not a non-empty string, THEN the `back-api` SHALL answer 400 with one `fields` entry for each incorrect field, and make no user.
- **R03**: IF the email is already registered, in upper case or lower case, THEN the `back-api` SHALL answer 409 and keep the first account without changes.
- **R04**: WHEN a user logs in with valid credentials, the `back-api` SHALL answer 200 with `{ token, user }`. The `token` is a non-empty opaque string.
- **R05**: IF the password is incorrect or the email is unknown, THEN the `back-api` SHALL answer 401 with the same body `{ "error": "Invalid credentials" }`.
- **R06**: WHEN a request has `Authorization: Bearer <token>` of a valid session, `GET /api/auth/me` SHALL answer 200 with the public user.
- **R07**: IF a request to a protected route has no token or an invalid token, THEN the `back-api` SHALL answer 401 with the uniform error body.
- **R08**: WHEN a visitor sends the register form, the `front-web` SHALL confirm the registration. IF the email is already registered, THEN it SHALL show the error and let the visitor try again.
- **R09**: WHEN a user sends valid credentials on the login page, the `front-web` SHALL show the name of the user in the menu. IF the credentials are incorrect, THEN it SHALL show the error and let the user try again.
- **R10**: WHILE a user is logged in, the `front-web` SHALL keep the session after a reload of the page.
- **R11**: WHEN a user sends a form two times quickly, the `front-web` SHALL send one request.
- **R12**: WHEN a user moves between `/register` and `/login` without a reload of the page, the form SHALL send the operation of the page that it shows.
- **R13**: IF the `back-api` answers the register form with `fields`, THEN the `front-web` SHALL show each message next to its field.
- **R14**: WHILE a user is logged in, the home page SHALL show an auth card with `Hello, {name}` and SHALL not show the links to `/login` and `/register`. WHILE no user is logged in, the auth card SHALL show links to `/login` and `/register`.
- **R15**: WHEN a user sends the register form or the login form and the browser accepts its fields, the `front-web` SHALL write one console line with the name of the operation, before the answer comes. The line SHALL not contain a form value, a password or a token.

## Expected URLs and APIs

| Kind | Project | Address | Expected answer | Requirements |
| --- | --- | --- | --- | --- |
| api | back-api | `POST /api/auth/register` | 201 public user. 400 invalid input with `fields`. 409 email already registered. | R01, R02, R03 |
| api | back-api | `POST /api/auth/login` | 200 `{ token, user }`. 400 invalid input. 401 invalid credentials. | R04, R05 |
| api | back-api | `GET /api/auth/me` | 200 public user. 401 without a valid session. | R06, R07 |
| page | front-web | `/register` | Form with email, name and password. No role field. | R08, R11, R12, R13, R15 |
| page | front-web | `/login` | Form with email and password | R09, R10, R11, R12, R15 |
| page | front-web | `/` | Auth card: `Hello, {name}` and no links, or links to `/login` and `/register` | R14 |

## Solution

### back-api

- Input checks use the shared primitive `requireText`. `Email` is a new value object at the root of `shared`: it makes the email lower case and checks only what the requirements state. Register and login make it at the edge, and `logic` and `data` use it, never a bare string. Add it to the `AGENTS.md` of the project.
- Passwords: a slow, salted algorithm that OWASP recommends. Its cost parameters are explicit in the code, not less than the OWASP minimum, and stored with each hash. With an unknown email, `logic` still does one verification, so the two failures take the same time.
- Sessions: a random, opaque token. The database stores only a hash of the token (such as SHA-256), never the token, so a session can be revoked. A session expires `SESSION_TTL_HOURS` after its creation (a setting of `configuration`: integer 1–720, default 24); the resolver treats an expired session as an invalid token.
- The session guard is in `core`, with no business rules: it reads the bearer token and asks a session resolver that the composition gets from the `auth` registration.
- Each registration in the manifest tells if it is public; it is protected unless it says so. A feature can have one public and one protected registration. `health`, register and login are public; `GET /api/auth/me` is protected.
- `core` mounts the public registrations first, then each protected registration behind the session guard on its own base path. Never write a separate list of paths, and never change the router of the framework to add the guard. A path under the base path of a protected registration answers 401 without a valid session; each other unknown path gets the 404 of the error handler.
- `unit` tests: a test feature with no public mark answers 401 without a token; an expired session answers 401; the stored session has no token in clear text.
- Other features get the current user only through the `auth` facade.

### front-web

- `logic` keeps the session state and disables a form while it sends. The token stays in the browser storage; the HTTP client sends it as a bearer token.
- The registration adds the menu links `Login` and `Register` (the name of the user in their place with a session) and the card of the home page (see `layout`).
- The form gives the name of its operation (`register` or `login`) to the console logger, never a field value.

### e2e

- An API client for register and login is in `shared`. The page objects of register and login are in `shared/page-objects/`.
- Each run uses unique test emails, so the suite can run again on the same database.

## Schema impact

| Schema | Element | Change | Description |
| --- | --- | --- | --- |
| model | User | new | `id`, `email` (unique, lower case), `name`, `role` (`user`), `passwordHash`, `createdAt`. |
| model | Session | new | `tokenHash`, `userId` → User, `createdAt`, `expiresAt`. |
| back-api.db | `users.*`, `sessions.*` | new | The fields of User and Session. `users.email` is unique. |

## Test notes

- **R02**: a login with the rejected values also fails.
- **R03**: after the 409, the first password still logs in.
- **R11**: give the two clicks inside one browser step, such as two `click()` calls of the button in one page script. The click of a test tool waits until the button is enabled again, so two tool clicks send two requests and the test fails with a correct application. Count the requests.
- **R12**: follow the links without a reload, then send each form and check which request it sends.
- **R13**: send a name that has only spaces.
- **R15**: read the browser console; no line contains the email or the password.
