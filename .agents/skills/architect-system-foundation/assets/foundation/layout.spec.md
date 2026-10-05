<!--
Foundation spec 3 of 6. Only for a system with a `front-web` (Columbus principle 9; D17, D18, D37, D38, D39). It needs `configuration` and `monitoring`.
The shell of the `front-web`: application identity, menu, theme, home dashboard, not-found page, page contract and the visual base.
Written in ASD-STE100 Simplified Technical English. Technical names are not dictionary words.
Create: aidd spec new feat layout "Application layout" --domain foundation
Instance: replace each role (`front-web`, `e2e`) with the project name.
Remove the rows, requirements and Solution subsections of the roles that the system does not have. Then number the requirements again, with no gaps.
The technology and the visual base (style sheet, fonts, colors) are in the AGENTS.md of the project, never here.
-->
# {id}-layout — Application layout

## Problem

Each page of the `front-web` must have the same frame. The user must always see where they are and how to go to a different page. The application must show its pages in the theme that the user selects. The home page must show the state of the application at a glance, and each later feature must add to it without a change to the home page.

### User Stories

- As a user, I want **a menu with the pages of the application** so that I can go to each page quickly.
- As a user, I want **a clear page for an unknown address** so that I never see an empty screen.
- As a user, I want **a light or a dark theme** so that I can read the application easily.
- As a user, I want **a home page with one card for each part of the application** so that I see its state at a glance.
- As an owner, I want **the name and the description of the application in one location** so that I change them one time for the full application.

### Business rules

- Each page must show the application name and the menu.
- The name and the description of the application come from `system.md`. The application keeps them in one location only.
- The home page knows no feature. Each feature adds its own cards.
- An unknown address must show a not-found page, never an error.
- The theme must agree with the preference of the system until the user selects a theme.
- The theme that the user selects must stay after a reload.

### Out of context

- The pages and the cards of the features (`health`, `basic-auth` and business specs).
- The translation of the application.
- A theme other than light and dark.

## Requirements

- **R01**: WHEN a user opens `/`, the `front-web` SHALL show the shell header with the application name, the menu, and the home page: a header with the application name and description, and a grid for the cards of the features.
- **R02**: WHILE the `front-web` shows a page, the menu SHALL contain a link to `/`.
- **R03**: WHILE the `front-web` shows a page, the menu SHALL mark the link of that page as the current page.
- **R04**: WHEN a user follows a menu link, the `front-web` SHALL change the page without a full reload of the document.
- **R05**: WHEN a user opens an unknown path directly, the `front-web` SHALL show a not-found page with the requested path and a link to `/`.
- **R06**: WHEN a user opens the `front-web` and has not selected a theme, the theme SHALL agree with the color preference of the system.
- **R07**: WHEN a user selects the theme control, the `front-web` SHALL change between the light and the dark theme.
- **R08**: WHEN a user reloads the page after a theme selection, the `front-web` SHALL show the theme that the user selected.
- **R09**: WHILE the `front-web` shows a page, the title of the document SHALL be the application name.
- **R10**: WHEN the `front-web` shows a page after the first load or after a navigation, it SHALL write one console line with the path of that page.
- **R11**: WHEN a user changes the theme, the `front-web` SHALL write one console line with the selected theme.

## Expected URLs and APIs

| Kind | Project | Address | Expected answer | Requirements |
| --- | --- | --- | --- | --- |
| page | front-web | `/` | Shell header with the name, menu, theme control, and the home header with the name, the description and the card grid | R01, R02, R03, R04, R06, R07, R08, R09, R10, R11 |
| page | front-web | `/{unknown}` | Not-found page with the path and a link to `/` | R05 |

## Solution

### front-web

- The application identity (name and description) is in `core`, in one file, with the values of `system.md`. The title of the document, the shell header and the home page get it from there.
- `core` contains the shell:
  - A header with the application name, the menu and the theme control.
  - A main area for the current page.
  - The router and the not-found page.
- The server answers each unknown path with the shell. Thus direct links to pages operate.
- `createApp()` in `main` gets the pages, the menu links and the cards from the manifest. It gives the pages and the menu links to the router and to the menu of `core`. `core` never imports a page.
- The page contract:
  - Each page gets the same services of `core` (such as the HTTP client, the logger and the navigation). All of them are required: no optional service, and no assertion that a value is present.
  - The router reads the path parameters of a route (such as `/users/:id`) and gives them to the page as a separate, typed argument.
  - A page that needs other data gets it from its own registration.
- Feature `home`:
  - `presentation` is the page `/`: a header with the application name and description, and a grid of cards. On a narrow screen, the cards are in one column.
  - A card registration has a function that loads the card when the home page shows it. Each feature facade exports its card registrations. The manifest lists them. `main` gives them to the `home` registration.
  - The `home` facade registers the page `/` and its menu link `Home`. The manifest lists it.
- The console logger of `core` (see `monitoring`) gets the navigation from the router, after the page shows, and the theme from the theme control.
- The menu marks the current link with the accessible attribute for the current page.
- The theme:
  - The theme is an attribute on the root element of the document.
  - The first value comes from the color preference of the system.
  - The theme control changes the value and keeps it in the browser storage. The stored value has priority over the preference of the system.
  - The theme is set before the first paint. Thus the page does not change color when it opens.
- The visual base:
  - Pages use semantic HTML elements. A style sheet with no classes gives them their style.
  - The fonts and the color tokens of the two themes are in the project. The application operates offline.
  - The `AGENTS.md` of the project tells the style sheet, the fonts and the color tokens.

### e2e

- The page object of the shell is in `shared/page-objects/` of the e2e project. It has the title, the menu, the current link and the theme control. The page objects of the features use it.
- The page object of the not-found page is in `shared/page-objects/` of the e2e project.
- The page object of the home page is in `shared/page-objects/` of the e2e project. It has the header and the cards. The tests of the cards of the features use it.
- The tests of R06 set the color preference of the browser. They do not set it in the operating system.

## Schema impact

| Schema | Element | Change | Description |
| --- | --- | --- | --- |
| — | — | — | No change. |

## Verification

| Requirement | Acceptance test |
| --- | --- |
| R01 | Open `/`. The shell header shows the application name. The menu, the home header with the name and the description, and the card grid are visible. |
| R02 | Open `/`. The menu has a link to `/`. |
| R03 | Open `/`. The link to `/` has the mark of the current page. |
| R04 | Open `/no-such-page` directly. Put a mark on the document. Follow the menu link to `/`. The home page is visible and the mark is still there. |
| R05 | Open `/no-such-page` directly. The not-found page shows `/no-such-page` and a link to `/`. |
| R06 | Set the browser color preference to dark. Open `/`. The theme is dark. Set it to light. Open `/` in a new context. The theme is light. |
| R07 | Open `/`. Read the theme. Select the theme control. The theme is the other theme. |
| R08 | Select the theme control. Reload the page. The theme is the one that the user selected. |
| R09 | Open `/` and `/no-such-page`. The title of the document is the application name on each page. |
| R10 | Open `/`. The console has one line with `/`. Follow a menu link. The console has one line with the new path. |
| R11 | Select the theme control. The console has one line with the selected theme. |
