---
description: 'C# best practices and usage guidelines'
applyTo: '**/*.cs'
---

# C# Instructions

Follow Clean Code practices in [Clean Code Best Practices](bst_clean-code.instructions.md) . Prefer modern C#/.NET features and keep code small, cohesive, and testable.

## Installation & Setup

- .NET SDK: Use a supported LTS (8 or 9 when available). Pin via `global.json`.
- IDE: VS Code + C# Dev Kit or Visual Studio. Enable nullable reference types and latest language version.
- Analyzers & formatting
  - Add and enforce `.editorconfig` (style, naming, analyzers). Treat warnings as errors in CI.
  - Enable Microsoft code analysis (CA rules) and style analyzers.
  - Use `dotnet format` in CI to keep style consistent.
- Testing: xUnit, NUnit, or MSTest. Prefer xUnit for new projects; use `FluentAssertions` optionally.
- Logging: `Microsoft.Extensions.Logging` with structured logging placeholders, never log secrets.

## Core Concepts

- Types and immutability: prefer `record`/`record struct` or classes with `init`-only setters; keep state private.
- Nullability: `#nullable enable` project-wide; annotate APIs; avoid `!` suppression.
- Errors: use exceptions for exceptional flows; throw specific types; don’t catch `Exception` broadly.
- Async: use `async`/`await` for I/O; avoid `async void`; prefer `CancellationToken`; configure awaits in libraries (`ConfigureAwait(false)` when appropriate).
- LINQ and collections: keep queries readable; avoid multiple enumerations; materialize when needed; prefer spans/memory for hot paths.
- Dependency injection: prefer constructor injection; depend on abstractions; keep services small.
- Boundaries: isolate external calls (HTTP, DB); add timeouts/retries/circuit breakers where relevant.
- Observability: structured logs, correlation IDs (Logging scopes), metrics and tracing as needed.

## Best Practices

- Use Allman braces and four-space indentation; avoid tabs.
- Place `using` directives outside namespaces; order `System.*` first, then alphabetically.
- Prefer language keywords (`int`, `string`) over BCL types (`Int32`, `String`).
- Be explicit with visibility; put visibility first (e.g., `public sealed`).
- Prefer `var` only when the type is obvious from the right side; otherwise use explicit types.
- Favor expression-bodied members for trivial code; refactor when complexity grows.
- Validate inputs with guard clauses; use `ArgumentNullException.ThrowIfNull(param)` and `ArgumentOutOfRangeException` helpers.
- Keep methods small; one level of indentation; avoid `else` via early returns.
- Don’t expose mutable collections; return `IReadOnlyList<T>` or copies/unmodifiable views.
- Prefer `readonly` fields and `init` setters; avoid public setters in domain entities.
- Use records for simple data carriers; override equality only when behaviorally necessary.
- Dispose resources deterministically with `using` declarations; implement `IAsyncDisposable` for async resources.
- Avoid synchronous over async APIs (e.g., `Result`/`Wait()`), which can deadlock; bubble `CancellationToken` through.
- Logging: use placeholders (`logger.LogInformation("User {UserId} logged in", userId)`); don’t concatenate strings; avoid logging PII/secrets.
- LINQ: prefer method syntax when clearer; extract complex projections to named methods; avoid allocating in hot loops.
- Pattern matching and `switch` expressions for clarity; avoid deep `if` nesting.
- Exceptions: never swallow; wrap low-level exceptions with context when crossing boundaries.
- File-scoped namespaces; one type per file; keep files/classes under ~200 lines when practical.
- Configure analyzers to fail CI on warnings; keep builds warning-free.
- Security: validate and encode untrusted input; use `RandomNumberGenerator` for crypto; never hardcode secrets; store them in secure configuration.
- Performance: measure first; minimize allocations in tight paths; use `Span<T>/Memory<T>` when beneficial.
- Testing: Arrange-Act-Assert; isolate side effects; avoid time-based flakiness; prefer deterministic tests.

### Naming conventions

- Use `PascalCase` for public members (classes, methods, properties).
- Use `camelCase` for private fields and method parameters.
- Prefix private fields with `_` (e.g., `_fieldName`).
- Use `I` prefix for interfaces (e.g., `IService`).
- Use `Async` suffix for async methods (e.g., `GetDataAsync`).

> Based on Microsoft C# coding conventions and .NET runtime style. Align new code to existing file/component style when in doubt.
