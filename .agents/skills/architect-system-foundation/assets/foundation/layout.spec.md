<!--
Foundation spec 3 of 5. Only for a system with a `front-web` (Columbus principle 9; D17, D18, D37, D38, D39). It needs `configuration` and `monitoring`.
The shell of the `front-web`: title, menu, theme, not-found page and the visual base.
Written in ASD-STE100 Simplified Technical English. Technical names are not dictionary words.
Create: aidd spec new feat layout "Application layout" --domain foundation
Instance: replace each role (`front-web`, `e2e`) with the project name.
Remove the rows, requirements and Solution subsections of the roles that the system does not have. Then number the requirements again, with no gaps.
The technology and the visual base (style sheet, fonts, colors) are in the AGENTS.md of the project, never here.
-->
# {id}-layout — Application layout

## Problem

Each page of the `front-web` must have the same frame. The user must always see where they are and how to go to a different page. The application must show its pages in the theme that the user selects.

### User Stories

- As a user, I want **a menu with the pages of the application** so that I can go to each page quickly.
- As a user, I want **a clear page for an unknown address** so that I never see an empty screen.
- As a user, I want **a light or a dark theme** so that I can read the application easily.

### Business rules

- Each page must show the application title and the menu.
- An unknown address must show a not-found page, never an error.
- The theme must agree with the preference of the system until the user selects a theme.
- The theme that the user selects must stay after a reload.

### Out of context

- The pages of the features (`health`, `basic-auth` and business specs).
- The translation of the application.
- A theme other than light and dark.

## Requirements

- **R01**: WHEN a user opens `/`, the `front-web` SHALL show the application title, the menu and the home page.
- **R02**: WHILE the `front-web` shows a page, the menu SHALL contain a link to `/`.
- **R03**: WHILE the `front-web` shows a page, the menu SHALL mark the link of that page as the current page.
- **R04**: WHEN a user follows a menu link, the `front-web` SHALL change the page without a full reload of the document.
- **R05**: WHEN a user opens an unknown path directly, the `front-web` SHALL show a not-found page with the requested path and a link to `/`.
- **R06**: WHEN a user opens the `front-web` and has not selected a theme, the theme SHALL agree with the color preference of the system.
- **R07**: WHEN a user selects the theme control, the `front-web` SHALL change between the light and the dark theme.
- **R08**: WHEN a user reloads the page after a theme selection, the `front-web` SHALL show the theme that the user selected.

## Expected URLs and APIs

| Kind | Project | Address | Expected answer | Requirements |
| --- | --- | --- | --- | --- |
| page | front-web | `/` | Title, menu, theme control and home page | R01, R02, R03, R04, R06, R07, R08 |
| page | front-web | `/{unknown}` | Not-found page with the path and a link to `/` | R05 |

## Solution

### front-web

- `core` contains the shell:
  - A header with the application title, the menu and the theme control.
  - A main area for the current page.
  - The router and the not-found page.
- The server answers each unknown path with the shell. Thus direct links to pages operate.
- `createApp()` in `main` gets the pages and the menu links from the manifest. It gives them to the router and to the menu of `core`. `core` never imports a page.
- Feature `home`:
  - `presentation` is the page `/`. It shows the application title and one short sentence.
  - The `home` facade registers the page `/` and its menu link `Home`. The manifest lists it.
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

- The page object of the shell is in the e2e `data` layer. It has the title, the menu, the current link and the theme control. The page objects of the features use it.
- The page object of the not-found page is in the e2e `data` layer.
- The tests of R06 set the color preference of the browser. They do not set it in the operating system.

## Schema impact

| Schema | Element | Change | Description |
| --- | --- | --- | --- |
| — | — | — | No change. |

## Verification

| Requirement | Acceptance test |
| --- | --- |
| R01 | Open `/`. The title, the menu and the home page are visible. |
| R02 | Open `/`. The menu has a link to `/`. |
| R03 | Open `/`. The link to `/` has the mark of the current page. |
| R04 | Open `/no-such-page` directly. Put a mark on the document. Follow the menu link to `/`. The home page is visible and the mark is still there. |
| R05 | Open `/no-such-page` directly. The not-found page shows `/no-such-page` and a link to `/`. |
| R06 | Set the browser color preference to dark. Open `/`. The theme is dark. Set it to light. Open `/` in a new context. The theme is light. |
| R07 | Open `/`. Read the theme. Select the theme control. The theme is the other theme. |
| R08 | Select the theme control. Reload the page. The theme is the one that the user selected. |
