---
description: 'TypeScript best practices'
applyTo: '**/*.ts'
---

# TypeScript Best Practices

Follow [Clean Code Best Practices](bst_clean-code.instructions.md) for general coding practices.

## Name conventions

- Variables, methods and functions are in camelCase.
- Classes, interfaces and types are in PascalCase.
- Constants and enums are in UPPER_SNAKE_CASE.
- Files and directories are in kebab-case.
- Files should be named after the main exported component (e.g., `user.service.ts` for a service class named `UserService`).

## Types

- Annotate always with explicit types. Do it for variables, function parameters and return values.

> Example:

```ts
const add = (a: number, b: number): string => {
  const sum: number = a + b;
  const result: string = `The sum is ${sum}`;
  return result;
};
```

### Type declarations

- Avoid primitive obsession and define type aliases in its own `*.type.ts` file.

```ts
type Money = {
  amount: number;
  currency: string;
};
type UserId = string;
type User = {
  id: UserId;
  name: string;
  balance: Money;
};
```

- Leverage generics for reusable components
- Use `type` over `interface` for custom data types.
- Use `interface` for defining the object behavior.
- Prefer union types over `enum`.
- Use `===` and `!==` for equality checks.
- Define logic functions for runtime validation and formatting.

### Dealing with unknown or optional values

- Use `unknown` for values that are not known at the time of writing the code.
- Use `never` for values that are not expected to exist.
- Use `void` for functions that do not return a value.
- Declare a constant with default values to avoid check for`undefined` or `null`.
- Accept `undefined` for optional values, when the value may not exist at all.
- Do not use `null` (except when an external API uses it).
- Do not use `any` (except as a last resort).

## Modules

- In this context a module is a typescript file that exports a single component.

### Export

- Export objects with methods rather than standalone functions for better testability.
- Use named exports over default exports for clarity and better IDE support.
- Export only one component per file.

### Import

- Use ES modules (`import`) syntax, not CommonJS (`require`).
- Destructure imports when possible (eg. `import { foo } from 'bar.ts'`)
- Import types specifically from the module file (eg. `import type { Foo } from './foo.ts'`)

## Functions and methods

### Declarations over expressions

- Prefer `function` declarations over _arrow => functions_.
- Only use _arrow => functions_ for callbacks, one-liners, and when preserving parent scope `this`

### Array methods

- Prefer array functions (`map`, `filter`, `reduce`, `find`, etc.) over traditional `for` loops
- Use array destructuring and spreading for cleaner array manipulations.
- Consider array function composition for complex transformations.
- Use `for...of` loops when you need to break or continue iterations.
- Resort to traditional `for` loops only for complex control flow or performance-critical sections.

### Async

- Use `async`/`await` for async code.
- Mark functions that return promises as `async`.
- Use `await` for async operations.
- Use `try-catch` for error handling.
- Use `Promise.all()` for concurrent operations.

## Classes

- Use classes for coupling data and behavior.
- Declare and use an `interface` for class behavior.
- If no DI framework available, use constructor for dependencies and prefer interfaces over concrete classes.
- Be explicit for `public`, `private` or `protected` members.
- Use `readonly` for properties.

## Error handling

- Use `try-catch` at top level of the application.
- In other cases, use `try-catch` only if it adds value (eg. fix something or add context).
- Define and use a logger for error handling.

> End of TypeScript Best Practices
