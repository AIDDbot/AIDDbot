---
name: spec-refactor
description: Define a new refactor spec, get it validated, then take it to release.
---
# spec-refactor

Define a new refactor specification — a structural change that leaves behavior untouched — from
the inputs you are given.

Call `/restructure` to create it, then ask the human to check the result before going any further.

Once they have validated it, call `/build-spec` to take the specification through to release.
