<!--
Foundation spec 3 of 6. Only for a system with a `front-web` (Columbus principle 9; D17, D18, D37, D38, D39, D51). It needs `configuration` and `monitoring`.
The shell of the `front-web`: application identity, menu, theme, home dashboard, not-found page, page contract and the visual base.
Written in ASD-STE100 Simplified Technical English. Technical names are not dictionary words.
Create: aidd spec new feat layout "Application layout" --domain foundation
Instance: replace each role (`front-web`, `e2e`) with the project name.
Remove the rows, requirements and Solution subsections of the roles that the system does not have. Then number the requirements again, with no gaps.
The technology and the visual base (style sheet, fonts, colors) are in the AGENTS.md of the project, never here.
-->
# {id}-layout — Application layout

## Problem

Each page of the `front-web` must have the same frame, in the theme that the user selects. The home page must show the state of the application at a glance, and each later feature must add to it without a change to the home page.

### User Stories

- As a user, I want **a menu with the pages of the application** so that I can go to each page quickly.
- As a user, I want **a clear page for an unknown address** so that I never see an empty screen.
- As a user, I want **a light or a dark theme** so that I can read the application easily.
- As a user, I want **a home page with one card for each part of the application** so that I see its state at a glance.
- As an owner, I want **the name and the description of the application in one location** so that I change them one time.

### Business rules

- The name and the description of the application come from `system.md`, and the application keeps them in one location only.
- The home page knows no feature. Each feature adds its own cards.

### Out of context

- The pages and the cards of the features (`health`, `basic-auth` and business specs).
- Translation. A theme other than light and dark.

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
| page | front-web | `/` | Shell header with the name, menu, theme control; home header with the name and the description, and the card grid | R01–R04, R06–R11 |
| page | front-web | `/{unknown}` | Not-found page with the path and a link to `/` | R05, R09 |

## Solution

### front-web

- Identity: one file in `core` with the name and the description of `system.md`. The document title, the shell header and the home page read it.
- Shell in `core`: header (name, menu, theme control), main area, router, not-found page. The server answers each unknown path with the shell, so direct links operate.
- `main` gets the pages, the menu links and the cards from the manifest. It gives the pages and the menu links to `core`, and the cards to the `home` registration. `core` never imports a page.
- Page contract:
  - Each page gets the same services of `core` (such as the HTTP client, the logger and the navigation), all required: no optional service and no assertion that a value is present.
  - The router reads the path parameters of a route (such as `/users/:id`) and gives them to the page as a separate, typed argument.
  - A page that needs other data gets it from its own registration.
- Feature `home`: page `/` and its menu link `Home`. Header and card grid; one column on a narrow screen. A card registration loads the card when the home page shows it; each facade exports its own.
- The menu marks the current link with the accessible attribute for the current page.
- Theme: an attribute on the root element, first from the color preference of the system, then from the browser storage after a selection. It is set before the first paint.
- Visual base: semantic HTML on the style sheet of the archetype, with the brand theme files copied as they are (fonts, the color tokens of the two themes mapped to the style sheet). It operates offline. The `AGENTS.md` of the project names the files.
- The console logger of `core` (see `monitoring`) gets the navigation from the router after the page shows, and the theme from the theme control.

### e2e

- Page objects in `shared/page-objects/`: the shell (title, menu, current link, theme control), the not-found page, and the home page (header and cards). The page objects of the features use them.

## Test notes

- **R04**: open `/no-such-page`, put a mark on the document, follow the menu link to `/`: the mark is still there.
- **R06**: set the color preference of the browser, not of the operating system, and use a new context for each preference.
- **R10, R11**: read the browser console.
