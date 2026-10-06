<!--
Foundation spec 7 of 8. Only for a system with a `front-web` (Columbus principle 9; D53). It needs `layout`.
The page that tells what the application is, who made it, and with which technology.
Written in ASD-STE100 Simplified Technical English. Technical names are not dictionary words.
Create: aidd spec new feat about "About page" --domain foundation
Instance: replace each role (`front-web`, `e2e`) with the project name.
Remove the rows, requirements and Solution subsections of the roles that the system does not have. Then number the requirements again, with no gaps.
-->
# {id}-about — About page

## Problem

A person who opens the application must see what it is, its version, who made it, and the technology of each project.

### User Stories

- As a user, I want **a page that tells what the application is and which version runs** so that I know what I use.
- As an owner, I want **my name, a link to my website and a summary of the technology on that page** so that the application shows my work.

### Out of context

- Licenses of the dependencies, release notes, contact forms.

## Requirements

- **R01**: WHILE the `front-web` shows a page, the menu SHALL contain a link `About` to `/about`.
- **R02**: WHEN a user opens `/about`, the `front-web` SHALL show the application name, its description and its version.
- **R03**: WHEN a user opens `/about`, the `front-web` SHALL show the name of the author and a link to the website of the author.
- **R04**: WHEN a user opens `/about`, the `front-web` SHALL show, for each project of the system, its name, its type and its main technologies.
- **R05**: WHEN a user follows the link to the website of the author, the `front-web` SHALL open it in a new tab, with no access from that tab to the application.

## Expected URLs and APIs

| Kind | Project | Address | Expected answer | Requirements |
| --- | --- | --- | --- | --- |
| page | front-web | `/about` | Name, description, version, author with a link to the website, and the technology of each project | R01–R05 |

## Solution

### front-web

- The identity in `shared` (see `layout`) also has the author and the website, from `system.md`. A request with no author gets `AIDDbot` and `https://aiddbot.com`.
- The technology summary is a constant of the `about` feature, made at the foundation from `.product/system.md` and the `AGENTS.md` of each project: project, type, and its language, framework, main libraries and test tools. No request at runtime.
- Feature `about`: page `/about`, menu link `About`, access mark `everyone` when the system has `account`. No `logic` or `data` layer.
- The website link has `target="_blank"` and `rel="noopener noreferrer"`.

### e2e

- The page object of `/about` is in `shared/page-objects/`. It uses the shell page object.

## Test notes

- **R02**: the version is the version of the root `package.json`.
- **R05**: check the `target` and `rel` attributes; do not follow the link to the internet.
