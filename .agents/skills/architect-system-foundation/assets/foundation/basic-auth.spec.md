<!--
Foundation spec 4 of 4. Optional (Columbus principle 9; D3, D4, D6, D13, D17, D18). It needs `configuration`, `monitoring` and `health`.
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

- Logout, password reset and email verification.
- Other roles and external identity providers.
- Rate limits.

## Requirements

- **R01**: WHEN a visitor registers with a new email, a name and a password, the `back-api` SHALL answer 201 with the public user `{ id, email, name, role: "user", createdAt }`.
- **R02**: IF the email, name or password is missing or is not a non-empty string, THEN the `back-api` SHALL answer 400 and make no user.
- **R03**: IF the email is already registered, in upper case or lower case, THEN the `back-api` SHALL answer 409 and keep the first account without changes.
- **R04**: WHEN a user logs in with valid credentials, the `back-api` SHALL answer 200 with `{ token, user }`. The `token` is a non-empty opaque string.
- **R05**: IF the password is incorrect or the email is unknown, THEN the `back-api` SHALL answer 401 with the same body `{ "error": "Invalid credentials" }`.
- **R06**: WHEN a request has `Authorization: Bearer <token>` of a valid session, `GET /api/auth/me` SHALL answer 200 with the public user.
- **R07**: IF a request to a protected route has no token or an invalid token, THEN the `back-api` SHALL answer 401 with the uniform error body.
- **R08**: WHEN a visitor sends the register form, the `front-web` SHALL confirm the registration. IF the email is already registered, THEN it SHALL show the error and let the visitor try again.
- **R09**: WHEN a user sends valid credentials on the login page, the `front-web` SHALL show the name of the user in the navigation. IF the credentials are incorrect, THEN it SHALL show the error and let the user try again.
- **R10**: WHILE a user is logged in, the `front-web` SHALL keep the session after a reload of the page.
- **R11**: WHEN a user sends a form two times quickly, the `front-web` SHALL send one request.
- **R12**: WHEN a user moves between `/register` and `/login` without a reload of the page, the form SHALL send the operation of the page that it shows.

## Expected URLs and APIs

| Kind | Project | Address | Expected answer | Requirements |
| --- | --- | --- | --- | --- |
| api | back-api | `POST /api/auth/register` | 201 public user. 400 invalid input. 409 email already registered. | R01, R02, R03 |
| api | back-api | `POST /api/auth/login` | 200 `{ token, user }`. 400 invalid input. 401 invalid credentials. | R04, R05 |
| api | back-api | `GET /api/auth/me` | 200 public user. 401 without a valid session. | R06, R07 |
| page | front-web | `/register` | Form with email, name and password. No role field. | R08, R11, R12 |
| page | front-web | `/login` | Form with email and password | R09, R10, R11, R12 |

## Solution

### back-api

- The input checks use the shared primitive `requireText`. Email normalization becomes a new shared primitive in `logic`. Add it to the `AGENTS.md` of the project.
- Feature `auth`:
  - `presentation` has the three routes.
  - `logic` validates the input and changes the email to lower case. It hashes and verifies passwords with a slow, salted algorithm that OWASP recommends. Its cost parameters are explicit in the code, are not less than the OWASP minimum, and are stored with each hash. It makes sessions.
  - `data` stores users and sessions.
- The token is random and opaque. The session is in the database, so it can be revoked.
- If the email is unknown, `logic` still does one password verification. Thus the two failures take the same time.
- The session guard is in `shared/presentation`. It contains no business rules. It reads the bearer token and asks a session resolver. `core` gives the resolver by injection from the `auth` facade.
- `core` puts the session guard after the public routes. Thus each new route is protected.
- Other features get the current user only through the `auth` facade.

### front-web

- Feature `auth`:
  - `presentation` has the register page and the login page.
  - `logic` keeps the session state. It disables a form while the form sends.
  - `data` calls the three endpoints through the shared HTTP client.
- The token stays in the browser storage. The shared HTTP client sends it as a bearer token.
- When the user is logged in, the navigation shows the name of the user.

### e2e

- An API client and page objects for register and login are in the e2e `data` layer.
- Each run uses unique test emails. Thus the suite can run again on the same database.

## Schema impact

| Schema | Element | Change | Description |
| --- | --- | --- | --- |
| model | User | new | `id`, `email` (unique, lower case), `name`, `role` (`user`), `passwordHash`, `createdAt`. |
| model | Session | new | `token`, `userId` → User, `createdAt`. |
| back-api.db | `users.*`, `sessions.*` | new | The fields of User and Session. `users.email` is unique. |
| back-api.api | `POST /api/auth/register` | new | 201 public user. 400 invalid input. 409 email already registered. |
| back-api.api | `POST /api/auth/login` | new | 200 `{ token, user }`. 400 invalid input. 401 invalid credentials. |
| back-api.api | `GET /api/auth/me` | new | 200 public user. 401 missing or invalid session. |

## Verification

| Requirement | Acceptance test |
| --- | --- |
| R01 | Register a unique email. The answer is 201 with the public user, the role `user`, and no password field. |
| R02 | Register without a name, and with an empty password. Both answers are 400. A login with those values fails. |
| R03 | Register the same email in upper case. The answer is 409. The first password still logs in. |
| R04 | Log in with valid credentials. The answer is 200 with a non-empty token and the user. |
| R05 | Log in with an incorrect password, and with an unknown email. Both answers are 401 with the same body. |
| R06 | Call `GET /api/auth/me` with the login token. The answer is 200 with the same user. |
| R07 | Call `GET /api/auth/me` without a token, and with a fake token. Both answers are 401 with `{ "error": ... }`. |
| R08 | Register through the page. The page shows success. Register the same email again. The page shows the error, and a new try operates. |
| R09 | Log in through the page. The navigation shows the name. Use an incorrect password. The page shows the error, and a new try operates. |
| R10 | Log in and reload the page. The navigation still shows the name. |
| R11 | Click the submit button two times quickly on register and on login. Each form sends one request. |
| R12 | Open `/register`. Follow the link to `/login` without a reload and send valid credentials: the page sends a login request. Follow the link to `/register` and send a new account: the page sends a register request. |
