---
description: Project structure best practices for any language
---
# Project Structure Best Practices

## Repository Structure

- If the project is a simple application or library, use a single repository and start coding in the root directory.

> Example:

```txt
my-project/
├── docs/
├── src/
│   ├── core/
│   ├── module1/
│   └── shared/
└── README.md
```

- For larger projects (frontend, backend, and database instructions), consider using a monorepo structure with multiple packages (AKA containers AKA projects).

> Example:

```txt  
my-monorepo/
├── docs/
├── package1/
│   ├── src/
│   └── README.md
├── package2/
│   ├── src/
│   └── README.md
└── README.md
```

## General Guidelines
- Organize code into modules or packages based on functionality.
- Keep related files together (e.g., models, views, controllers).
- Use a consistent naming convention for files and directories.

## Directory Layout
- Place all source code in a dedicated `src` directory.
- Follow screaming structure : group by feature not by type.
- Organize features into three main directories: `core`, `routes | commands`, and `shared`.

> Example for API project:

```txt
src/
├── core/                # Core application logic
│   ├── middlewares/     # Middleware functions
│   └── config/          # Configuration files
├── routes/              # API Route handlers
│   ├── users/           # User-related routes
│   └── products/        # Product-related routes
└── shared/              # Shared utilities and components
    ├── utils/           # Utility functions
    └── logger/          # Logging utilities
```


> Example for Web SPA project:

```txt
src/
├── core/                # Core application logic
│   ├── interceptors/    # Api call interceptors
│   └── layout/          # Main layout components
├── routes/              # Page Route handlers
│   ├── users/           # User-related routes
│   └── products/        # Product-related routes
└── shared/              # Shared utilities and components
    ├── ui/              # UI components
    └── logger/          # Logging utilities
```

> Example for a CLI project:

```txt
src/
├── core/                # Core application logic
│   └── config/          # Configuration files
├── commands/            # Command handlers
│   ├── users/           # User-related commands
│   └── products/        # Product-related commands
└── shared/              # Shared utilities and components
    ├── utils/           # Utility functions
    └── logger/          # Logging utilities
```

## Configuration Files
- Keep configuration files in a dedicated files or `config` directory, depending on the project structure.
- Use environment variables for sensitive information (e.g., API keys, database URLs).
- Provide default configuration files with sensible defaults.

> End of Structure Instructions