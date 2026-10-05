<!--
Foundation spec 5 of 6. Optional (Columbus principle 9; D3, D6, D13, D17, D18, D39, D45, D47). It needs `configuration`, `monitoring`, `health` and, with a `front-web`, `layout`.
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

- One email must have only one account. Upper case and lower case letters are the same.
- A password must never be stored or returned in a form that a person can read.
- A failed login must not show if the email exists.
- Each API route must have a valid session, but health, register and login are public.
- Each user has the role `user`. A client cannot select a different role.

### Out of context

- Logout and the account page (`account`).
- Password reset and email verification.
- Other roles and external identity providers.
- Rate limits.

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
- **R14**: WHILE a user is logged in, the home page SHALL show an auth card with `Hello, {name}`. WHILE no user is logged in, the auth card SHALL show links to `/login` and `/register`.
- **R15**: WHEN a user sends the register form or the login form and the browser accepts its fields, the `front-web` SHALL write one console line with the name of the operation, before the answer comes. The line SHALL not contain a form value, a password or a token.

## Expected URLs and APIs

| Kind | Project | Address | Expected answer | Requirements |
| --- | --- | --- | --- | --- |
| api | back-api | `POST /api/auth/register` | 201 public user. 400 invalid input with `fields`. 409 email already registered. | R01, R02, R03 |
| api | back-api | `POST /api/auth/login` | 200 `{ token, user }`. 400 invalid input. 401 invalid credentials. | R04, R05 |
| api | back-api | `GET /api/auth/me` | 200 public user. 401 without a valid session. | R06, R07 |
| page | front-web | `/register` | Form with email, name and password. No role field. | R08, R11, R12, R13, R15 |
| page | front-web | `/login` | Form with email and password | R09, R10, R11, R12, R15 |
| page | front-web | `/` | Auth card: `Hello, {name}`, or links to `/login` and `/register` | R14 |

## Solution

### back-api

- The input checks use the shared primitive `requireText`. Email normalization becomes a new shared primitive at the root of `shared`. Add it to the `AGENTS.md` of the project.
- Feature `auth`:
  - `presentation` has the three routes.
  - `logic` validates the input and changes the email to lower case. It hashes and verifies passwords with a slow, salted algorithm that OWASP recommends. Its cost parameters are explicit in the code, are not less than the OWASP minimum, and are stored with each hash. It makes sessions.
  - `data` stores users and sessions. Their tables come in a migration of the feature (see `configuration`).
- The token is random and opaque. The session is in the database, so it can be revoked. The database stores only a hash of the token (such as SHA-256), never the token.
- A session expires `SESSION_TTL_HOURS` after its creation: an integer setting of `configuration`, from 1 to 720, with the default 24. The session resolver treats an expired session as an invalid token.
- If the email is unknown, `logic` still does one password verification. Thus the two failures take the same time.
- The session guard is in `core`. It contains no business rules. It reads the bearer token and asks a session resolver. `createApp()` in `main` gets the resolver from the `auth` facade and gives it to `core`.
- Each registration in the manifest tells if it is public. A registration is protected unless it says that it is public. A feature can have one public and one protected registration. `health`, register and login are public; `GET /api/auth/me` is protected.
- `main` gives `core` each registration with this mark. `core` mounts the public registrations first, then each protected registration behind the session guard on its own base path. Never write a separate list of paths, and never change the router of the framework to add the guard. Thus each new route is protected. A path under the base path of a protected registration answers 401 without a valid session, so an anonymous client cannot find which routes exist. Each other unknown path gets the 404 of the error handler.
- `unit` tests: a test feature with no public mark answers 401 without a token; an expired session answers 401; the stored session has no token in clear text.
- Other features get the current user only through the `auth` facade.

### front-web

- Feature `auth`:
  - `presentation` has the register page and the login page.
  - `logic` keeps the session state. It disables a form while the form sends.
  - `data` calls the three endpoints through the HTTP client of `core`.
- The token stays in the browser storage. The HTTP client of `core` sends it as a bearer token.
- The `auth` facade registers the menu links `Login` and `Register`. When the user is logged in, the menu shows the name of the user in the place of these links.
- The `auth` facade exports the card registration of the home page (see `layout`). The card follows the session state.
- The form gives the name of its operation (`register` or `login`) to the console logger of `core`. It never gives a field value.

### e2e

- An API client for register and login is at the root of the e2e `shared` folder. The page objects for register and login are in `shared/page-objects/`.
- Each run uses unique test emails. Thus the suite can run again on the same database.

## Schema impact

| Schema | Element | Change | Description |
| --- | --- | --- | --- |
| model | User | new | `id`, `email` (unique, lower case), `name`, `role` (`user`), `passwordHash`, `createdAt`. |
| model | Session | new | `tokenHash`, `userId` → User, `createdAt`, `expiresAt`. |
| back-api.db | `users.*`, `sessions.*` | new | The fields of User and Session. `users.email` is unique. |
| back-api.api | `POST /api/auth/register` | new | 201 public user. 400 invalid input with `fields`. 409 email already registered. |
| back-api.api | `POST /api/auth/login` | new | 200 `{ token, user }`. 400 invalid input. 401 invalid credentials. |
| back-api.api | `GET /api/auth/me` | new | 200 public user. 401 missing or invalid session. |

## Verification

| Requirement | Acceptance test |
| --- | --- |
| R01 | Register a unique email. The answer is 201 with the public user, the role `user`, and no password field. |
| R02 | Register without a name, and with an empty password. Both answers are 400, and `fields` names the incorrect field. A login with those values fails. |
| R03 | Register the same email in upper case. The answer is 409. The first password still logs in. |
| R04 | Log in with valid credentials. The answer is 200 with a non-empty token and the user. |
| R05 | Log in with an incorrect password, and with an unknown email. Both answers are 401 with the same body. |
| R06 | Call `GET /api/auth/me` with the login token. The answer is 200 with the same user. |
| R07 | Call `GET /api/auth/me` without a token, and with a fake token. Both answers are 401 with `{ "error": ... }`. |
| R08 | Register through the page. The page shows success. Register the same email again. The page shows the error, and a new try operates. |
| R09 | Log in through the page. The menu shows the name. Use an incorrect password. The page shows the error, and a new try operates. |
| R10 | Log in and reload the page. The menu still shows the name. |
| R11 | Click the submit button two times quickly on register and on login. Each form sends one request. |
| R12 | Open `/register`. Follow the link to `/login` without a reload and send valid credentials: the page sends a login request. Follow the link to `/register` and send a new account: the page sends a register request. |
| R13 | On `/register`, send a name that has only spaces. The page shows the message of the server next to the name field. |
| R14 | Open `/` with no session. The auth card has the links to `/login` and `/register`. Log in and open `/`. The card shows `Hello, {name}`. Reload. The card still shows it. |
| R15 | Send the login form with valid credentials. The console has one line with `login` before the answer. No console line contains the email or the password. Do the same with the register form. |
