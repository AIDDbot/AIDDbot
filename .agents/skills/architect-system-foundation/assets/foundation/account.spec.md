<!--
Foundation spec 6 of 7. Optional (Columbus principle 9; D39, D45, D47, D51; plan 0.2.5 G4). It needs `basic-auth` and, with a `front-web`, `layout`.
Include it only when the system includes `basic-auth`.
The account of the user, logout, a menu by access, a page guard and a route with a path parameter.
Written in ASD-STE100 Simplified Technical English. Technical names are not dictionary words.
Create: aidd spec new feat account "User account" --domain foundation
Instance: replace each role (`back-api`, `front-web`, `e2e`) with the project name.
Remove the rows, requirements and Solution subsections of the roles that the system does not have. Then number the requirements again, with no gaps.
-->
# {id}-account — User account

## Problem

A user with a session must see their account and end the session. Each page and menu link must tell who can use it. A user must never see the account of a different user.

### User Stories

- As a user, I want **to see my account** so that I know which data the application keeps about me.
- As a user, I want **to log out** so that nobody else can use my session on this device.
- As a visitor, I want **to log in and go back to the page that I asked for** so that I do not look for it again.

### Business rules

- Each page and each menu link has one access mark: `everyone`, `anonymous` or `session`. The mark decides the menu, the page guard and the return after login.

### Out of context

- A change to the account data, password reset, account deletion.
- Pages of other users and roles other than `user`.

## Requirements

- **R01**: WHEN a valid session requests `GET /api/users/:id` with the identifier of its own user, the `back-api` SHALL answer 200 with `{ name, email, createdAt }`.
- **R02**: IF a valid session requests `GET /api/users/:id` with a different identifier, THEN the `back-api` SHALL answer 404 with `{ "error": "Not found" }`, for an identifier that exists and for one that does not exist.
- **R03**: IF a request to `GET /api/users/:id` or `POST /api/auth/logout` has no valid session, THEN the `back-api` SHALL answer 401 with the uniform error body.
- **R04**: WHEN a valid session sends `POST /api/auth/logout`, the `back-api` SHALL answer 204 with no body and make that token invalid. The other sessions of the user SHALL stay valid.
- **R05**: WHEN a user with a session opens `/users/{id}` with their own identifier, the `front-web` SHALL show their name, their email and their creation date as a date that a person reads (such as `5 Oct 2026, 16:40`).
- **R06**: IF the account API answers 404, THEN the account page SHALL show `Account not found` and keep the menu.
- **R07**: WHILE no user is logged in, the menu SHALL show the links for `everyone` and for `anonymous`, such as `Login` and `Register`, and SHALL not show the account link or `Logout`.
- **R08**: WHILE a user is logged in, the menu SHALL show the name of the user as a link to their account and a `Logout` control, and SHALL not show the links for `anonymous`.
- **R09**: WHEN a visitor with no session opens a page with the mark `session`, the `front-web` SHALL show `/login`, keep the requested path, query and fragment, and not show the requested page.
- **R10**: WHEN the login succeeds after R09, the `front-web` SHALL show the requested page without a full reload of the document.
- **R11**: IF the kept target is not a page of the application on the same origin, THEN the `front-web` SHALL show `/` after the login.
- **R12**: WHEN a user selects `Logout` and the `back-api` answers 204 or 401, the `front-web` SHALL remove the token and the user, show `/` and show the menu for no session.
- **R13**: IF the logout fails because the `back-api` does not answer or answers 500, THEN the `front-web` SHALL show an error, keep the session, and let the user try again.
- **R14**: WHILE a user is logged in, the greeting of the auth card on the home page SHALL be a link to their account.
## Expected URLs and APIs

| Kind | Project | Address | Expected answer | Requirements |
| --- | --- | --- | --- | --- |
| api | back-api | `GET /api/users/:id` | 200 `{ name, email, createdAt }` for the own user. 404 `{ "error": "Not found" }` for a different identifier. 401 without a valid session. | R01, R02, R03 |
| api | back-api | `POST /api/auth/logout` | 204 with no body; the token becomes invalid. 401 without a valid session. | R03, R04 |
| page | front-web | `/users/{id}` | Name, email and creation date, or `Account not found`. With no session, `/login` and then back. | R05, R06, R09, R10, R11 |
| page | front-web | `/` | With a session, the greeting of the auth card links to `/users/{id}` | R14 |
| page | front-web | any page | Menu by access mark: `Login` and `Register` with no session; the name and `Logout` with a session | R07, R08, R12, R13 |

## Solution

### back-api

- Feature `users`: `logic` compares the identifier with the current user from the `auth` facade; any other identifier is the expected error 404. No `data` layer. Its registration has no public mark, so it is protected (see `basic-auth`).
- Feature `auth` adds logout to its protected registration: `logic` removes only the stored hash of the current token.

### front-web

- One access mark on each page registration and menu link; no other mark tells the access. The menu of `core` shows a link only for its mark and the session state. The router of `core` shows a `session` page only with a session; otherwise it goes to the login page with the target in the query parameter `returnTo`. An `anonymous` page is never a return target.
- `core` gets the session state and the login path from the `auth` registration through the composition; it never imports `auth`.
- After a login, `core` accepts the target only if it starts with one `/`, is on the same origin, and is a registered page; otherwise `/`.
- A change of the session state updates the menu and the cards. It never shows the current page again, so that a form keeps what the user typed.
- Feature `users`: page `/users/:id` with `id` as a typed path parameter (see `layout`), mark `session`, no menu link. `logic` keeps the state: loading, loaded, not found or unavailable. The page shows the creation date with the shared primitive `formatDate`.
- The `auth` registration gives the session menu entries: the name of the user, as a link to `/users/{id}`, and `Logout`. Logout gives its action name to the console logger. The greeting of the `auth` card becomes a link to `/users/{id}`.

### e2e

- The API client of `basic-auth` adds logout. The page object of the account page is in `shared/page-objects/`; the shell page object adds the session menu.

## Test notes

- **R02**: register two users; use the session of the first with the identifier of the second and with an identifier that does not exist.
- **R04**: log in two times as the same user; log out with the first token; `GET /api/auth/me` answers 401 with it and 200 with the second.
- **R09**: open `/users/{id}?a=1#b` with no session.
- **R10**: put a mark on the document before the login.
- **R11**: use `returnTo` values `https://example.com/`, `//example.com` and `/no-such-page`.
- **R13**: make `POST /api/auth/logout` answer 500 in the browser.
