<!--
Foundation spec 8 of 8. Only for a system with a `front-web`. It needs `layout`, and it comes after every other foundation spec, because it changes their cards and detail pages.
One visual pattern for each record that the application shows: a card on the home page, a detail page, and a table for a list of records.
Written in ASD-STE100 Simplified Technical English. Technical names are not dictionary words.
Create: aidd spec new feat record-views "Record views" --domain foundation
Instance: replace each role (`front-web`, `e2e`) with the project name.
Remove the records of the features that the system does not have (`auth`, `users`). Then number the requirements again, with no gaps.
-->
# {id}-record-views — Record views

## Problem

The cards and the detail pages show their data as plain text. Each feature makes its own markup, so the views do not look the same and are hard to scan.

A record is one thing that the application shows, such as the health of the system, the current user, an account or the application itself. Each record must have one consistent view: a card on the home page that summarizes it, and a detail page that shows all of it. A list of records of one kind, such as the technology of each project, must have one consistent table, because business specs will add more lists.

### User Stories

- As a user, I want **cards and detail pages that look the same and show the important value first** so that I understand a record at a glance.
- As a user, I want **dates, durations and states that a person reads** so that I do not decode raw values.
- As a user, I want **a list of records as a clear table** so that I compare the records quickly.

### Out of context

- New data, new endpoints, charts, animations, and changes to the texts of earlier specs.
- Sort, filter and pagination of a table. Business specs add them when they need them.
- A new style sheet library or new brand tokens. Pico CSS and the theme of `layout` stay.

## Requirements

- **R01**: WHEN a user opens `/`, each card SHALL show a header with its title as a heading, its facts as label and value pairs, and a footer with its main link or action.
- **R02**: WHEN a user opens a detail page (`/health`, `/users/{id}`, `/about`), the `front-web` SHALL show a page header with the title of the record, and the facts of the record as label and value pairs, in one or more sections with a heading.
- **R03**: WHILE a card or a detail page loads its data, it SHALL be marked as busy for assistive technology, and SHALL not show a fact.
- **R04**: IF a card or a detail page cannot load its data, THEN it SHALL show the error message of its spec in the place of its facts, and SHALL keep its title and its footer link.
- **R05**: WHERE a record has a state (such as the status of `health`), the view SHALL show the state as a badge with text, and SHALL not use only color to tell it.
- **R06**: WHEN a fact is a date, a duration or a number, the view SHALL show it in a form that a person reads, in the language of the browser.
- **R07**: WHEN a user opens `/` on a screen 375 CSS pixels wide, the cards SHALL be in one column with no horizontal scroll. WHEN the screen is 1024 CSS pixels wide, the cards SHALL be in two or more columns.
- **R08**: WHILE the light theme or the dark theme is active, the text of each label and each value SHALL have a contrast ratio of 4.5:1 or more with its background.
- **R09**: WHEN a view shows a list of records of one kind (such as the technology of each project on `/about`), it SHALL show a table with a caption, one header row with a column header for each field, and one row for each record.
- **R10**: WHEN a user opens a page with a table on a screen 375 CSS pixels wide, the page SHALL have no horizontal scroll. The table SHALL scroll in its own area.

## Expected URLs and APIs

| Kind | Project | Address | Expected answer | Requirements |
| --- | --- | --- | --- | --- |
| page | front-web | `/` | Card grid. Each card: header with a heading, label and value pairs, footer link. | R01, R03–R08 |
| page | front-web | `/health` | Page header, state badge, facts as label and value pairs | R02–R06, R08 |
| page | front-web | `/users/{id}` | Page header with the name of the user, facts as label and value pairs | R02–R04, R06, R08 |
| page | front-web | `/about` | Page header with the application name, a section for the application, and a table of the technology of each project | R02, R08–R10 |

## Solution

### front-web

- Three components in `shared/components/`: a record card, a record detail and a record table. The card and the detail render a typed description: title, optional subtitle, optional state, facts, and a footer link or action. A fact is a label and a value of one kind: text, date, duration, number, link or list. The table renders a caption, typed columns (label and kind) and rows, and an empty message. The components own the markup and the formats; the features give only the description.
- Semantic HTML that Pico CSS styles: `article` with `header` and `footer` for a card; a `dl` with `dt` and `dd` for the facts; `aria-busy="true"` while the data loads. For a table: a `figure` that scrolls on the horizontal axis, a `table` with the Pico `striped` class, a `caption`, and `th` with `scope="col"`. A list value shows as short items in one cell. A table with no row shows a message that tells that the list is empty, in the place of the table. A column of numbers, dates or durations aligns its header and its values to the end of the cell. Unit tests of the record table prove these two rules, because no foundation page has an empty list or a number column. No class of a different library.
- The formats use the shared primitives `formatDate` and `formatDuration`, and `Intl.NumberFormat` for a number. A missing value becomes `—` in the component, never `undefined`, `null` or an empty value, and never in a feature; a unit test of the components proves it.
- The badge and the grid of the facts go in `custom.css` of the theme, with the `--pico-*` and brand tokens only, for the light and the dark theme. No color value in a component.
- The card grid of the home page uses `repeat(auto-fit, minmax(18rem, 1fr))`, so it has one column on a narrow screen without a media query.
- The cards and the detail pages of `health`, `auth`, `users` and `about` use the components. The technology of `about` is a record table: project, type, language, framework, main libraries and test tools. Their texts, links and states stay as their specs say, and the tests of those specs stay green.

### e2e

- A page object of a record view is in `shared/page-objects/`: title, state, the value of a fact by its label, the footer link, and for a table its caption, column headers and the cells of a row. The page objects of the features use it.
- A helper in `shared` calculates the contrast ratio of two computed colors (WCAG 2 relative luminance).

## Test notes

- **R01, R02**: check the structure by role: heading, term and definition (`dt` and `dd`), and link. Do not check the class names.
- **R03**: delay the API answer in the browser, and check `aria-busy` before the answer.
- **R04**: block the API in the browser.
- **R05**: check that the badge has text.
- **R06**: check the shape of each value (such as a number and a unit), never an exact value.
- **R07**: compare the left position of the first two cards; on the wide screen they are different.
- **R08**: check each theme. Use the computed color of the text and the first background that is not transparent.
- **R09**: check the roles: table, caption, column header, row and cell. One row for each project of the system.
- **R10**: the width of the document is not more than the width of the viewport; the scroll width of the table area can be more.
