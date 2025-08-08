---
description: "Node.js Fetch API best practices"
applyTo: "**/*.ts"
---

# Node Fetch Instructions

## Overview

Node v18+ exposes a global Fetch API (Undici-based). Use `fetch`, `Request`, `Response`, and `Headers` without extra deps.

## Installation & Setup

- No install needed; ensure Node v20+ (v22+ recommended)
- Abort with `AbortController` for timeouts

## Core Concepts

- JSON requests: `await fetch(url).then(r => r.ok ? r.json() : throwHttp(r))`
- Timeouts: create `AbortController`, `setTimeout(() => ac.abort(), ms)`
- Retries: implement small retry with backoff for transient errors
- Dispatcher: for advanced cases, configure Undici global dispatcher

## Best Practices

- Always check `response.ok`; include status and body snippet in errors
- Set `Accept` and `User-Agent` headers where appropriate
- Keep DTO → domain mapping separate from fetch layer
- Make timeouts explicit (e.g., 5s) and configurable via env
