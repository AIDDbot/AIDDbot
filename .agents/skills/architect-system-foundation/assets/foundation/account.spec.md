<!--
Foundation spec 6 of 6. Optional (Columbus principle 9; D39, D45, D47; plan 0.2.5 G4). It needs `basic-auth` and, with a `front-web`, `layout`.
Include it only when the system includes `basic-auth`.
The account of the user, logout, a menu by access, a page guard and a route with a path parameter.
Written in ASD-STE100 Simplified Technical English. Technical names are not dictionary words.
Create: aidd spec new feat account "User account" --domain foundation
Instance: replace each role (`back-api`, `front-web`, `e2e`) with the project name.
Remove the rows, requirements and Solution subsections of the roles that the system does not have. Then number the requirements again, with no gaps.
-->
# {id}-account — User account

## Problem

A user with a session must see their account and must be able to end the session. Each page and each menu link must tell who can use it. A user must never see the account of a different user.

### User Stories

- As a user, I want **to see my account** so that I know which data the application keeps about me.
- As a user, I want **to log out** so that nobody else can use my session on this device.
- As a visitor, I want **to log in and go back to the page that I asked for** so that I do not look for it again.

### Business rules

- A user can read only their own account. For a different account, the answer is the same as for an account that does not exist.
- Logout ends only the current session. The other sessions of the user stay valid.
- Each page and each menu link has one access mark: `everyone`, `anonymous` or `session`. The mark decides the menu, the page guard and the return after login.
- After login, the application goes back only to one of its own pages.

### Out of context

- A change to the account data, password reset and account deletion.
- Pages of other users and roles other than `user`.

## Requirements

- **R01**: WHEN a valid session requests `GET /api/users/:id` with the identifier of its own user, the `back-api` SHALL answer 200 with `{ name, email, createdAt }`.
- **R02**: IF a valid session requests `GET /api/users/:id` with a different identifier, THEN the `back-api` SHALL answer 404 with `{ "error": "Not found" }`, for an identifier that exists and for one that does not exist.
- **R03**: IF a request to `GET /api/users/:id` or `POST /api/auth/logout` has no valid session, THEN the `back-api` SHALL answer 401 with the uniform error body.
- **R04**: WHEN a valid session sends `POST /api/auth/logout`, the `back-api` SHALL answer 204 with no body and make that token invalid. The other sessions of the user SHALL stay valid.
- **R05**: WHEN a user with a session opens `/users/{id}` with their own identifier, the `front-web` SHALL show their name, email and creation date.
- **R06**: IF the account API answers 404, THEN the account page SHALL show `Account not found` and keep the menu.
- **R07**: WHILE no user is logged in, the menu SHALL show the links for `everyone` and for `anonymous`, such as `Login` and `Register`, and SHALL not show the account link or `Logout`.
- **R08**: WHILE a user is logged in, the menu SHALL show the name of the user as a link to their account and a `Logout` control, and SHALL not show the links for `anonymous`.
- **R09**: WHEN a visitor with no session opens a page with the mark `session`, the `front-web` SHALL show `/login`, keep the requested path, query and fragment, and not show the requested page.
- **R10**: WHEN the login succeeds after R09, the `front-web` SHALL show the requested page without a full reload of the document.
- **R11**: IF the kept target is not a page of the application on the same origin, THEN the `front-web` SHALL show `/` after the login.
- **R12**: WHEN a user selects `Logout` and the `back-api` answers 204 or 401, the `front-web` SHALL remove the token and the user, show `/` and show the menu for no session.
- **R13**: IF the logout fails because the `back-api` does not answer or answers 500, THEN the `front-web` SHALL show an error, keep the session, and let the user try again.

## Expected URLs and APIs

| Kind | Project | Address | Expected answer | Requirements |
| --- | --- | --- | --- | --- |
| api | back-api | `GET /api/users/:id` | 200 `{ name, email, createdAt }` for the own user. 404 for a different identifier. 401 without a valid session. | R01, R02, R03 |
| api | back-api | `POST /api/auth/logout` | 204 with no body. 401 without a valid session. | R03, R04 |
| page | front-web | `/users/{id}` | Name, email and creation date, or `Account not found`. With no session, `/login` and then back. | R05, R06, R09, R10, R11 |
| page | front-web | any page | Menu by access mark: `Login` and `Register` with no session; the name and `Logout` with a session | R07, R08, R12, R13 |

## Solution

### back-api

- Feature `users`:
  - `presentation` answers `GET /api/users/:id`.
  - `logic` compares the identifier with the current user and makes the answer. Any other identifier raises the expected error 404.
  - It has no `data` layer: the current user comes from the `auth` facade.
- The `users` registration has no public mark. Thus it is protected (see `basic-auth`).
- Feature `auth` adds logout to its protected registration. `logic` removes only the stored hash of the current token.

### front-web

- Each page registration and each menu link has one access mark: `everyone`, `anonymous` or `session`. No other mark tells the access.
  - The menu of `core` shows a link only for its mark and the session state.
  - The router of `core` shows a page with the mark `session` only with a session. With no session, it goes to the login page with the requested target in the query parameter `returnTo`.
  - A page with the mark `anonymous` is never a return target.
- `core` gets the session state and the login path from the `auth` facade through `main`. It never imports the `auth` feature.
- A change of the session state updates the menu and the cards. It never shows the current page again, so that a form keeps what the user typed.
- After a login, `core` checks the target: it starts with one `/`, it is on the same origin, and it is a registered page. Otherwise, it goes to `/`.
- Feature `users`:
  - `presentation` is the page `/users/:id`. It gets `id` as a typed path parameter from the router (see `layout`).
  - `logic` keeps the state of the page: loading, loaded, not found or unavailable.
  - `data` calls `GET /api/users/:id` through the HTTP client of `core`.
  - The `users` facade registers the page with the mark `session` and no menu link.
- The `auth` facade gives the menu entries for a session: the name of the user, as a link to `/users/{id}`, and `Logout`. Logout gives the name of its action to the console logger of `core`.

### e2e

- The API client of `basic-auth` adds logout.
- The page object of the account page is in `shared/page-objects/`. The page object of the shell adds the session menu.

## Schema impact

| Schema | Element | Change | Description |
| --- | --- | --- | --- |
| back-api.api | `GET /api/users/:id` | new | 200 `{ name, email, createdAt }` for the own user. 404 for a different identifier. 401 without a valid session. |
| back-api.api | `POST /api/auth/logout` | new | 204 with no body; the token becomes invalid. 401 without a valid session. |

## Verification

| Requirement | Acceptance test |
| --- | --- |
| R01 | Register and log in. Request `GET /api/users/{own id}`. The answer is 200 with exactly `name`, `email` and `createdAt`. |
| R02 | Register two users. With the session of the first, request the identifier of the second and an identifier that does not exist. Both answers are 404 with the same body. |
| R03 | Request `GET /api/users/{id}` and `POST /api/auth/logout` without a token. Both answers are 401 with `{ "error": ... }`. |
| R04 | Log in two times as the same user. Log out with the first token. The answer is 204. `GET /api/auth/me` with the first token answers 401, and with the second token answers 200. |
| R05 | Log in through the page and follow the name in the menu. The account page shows the name, the email and the creation date. |
| R06 | Log in through the page and open `/users/{different id}`. The page shows `Account not found`. The menu is visible. |
| R07 | Open `/` with no session. The menu has `Login` and `Register`, and no account link and no `Logout`. |
| R08 | Log in through the page. The menu has the name and `Logout`, and no `Login` and no `Register`. |
| R09 | With no session, open `/users/{id}?a=1#b`. The login page shows. The account data is not visible. |
| R10 | After R09, log in. The account page shows without a full reload of the document. |
| R11 | Open `/login?returnTo=https://example.com/` and log in. The page is `/`. Do the same with `//example.com` and with `/no-such-page`. |
| R12 | Log in through the page and select `Logout`. The page is `/`. The menu has `Login` and `Register`. A reload keeps no session. |
| R13 | Log in through the page. Make `POST /api/auth/logout` fail with 500 and select `Logout`. The page shows an error and the menu keeps the name. A new try operates. |
