---
description: 'Angular Framework Best Practices'
---

# Angular Framework Best Practices

## Overview

Write code using TypeScript language following [lang TypeScript](lng_typescript.instructions.md) best practices.

Follow [Architecture Best Practices](bst_architecture.instructions.md) for layered architecture and structure guidelines.

**CRITICAL: Use modern Angular features and patterns, avoid legacy patterns.**

## 🚫 AVOID These Dependencies and Patterns

**Never install these when using modern Angular:**

- `angular2-moment` or similar date libraries - Use native JavaScript Date or Angular DatePipe
- `lodash` - Use native JavaScript array methods and modern ES features
- `jquery` - Use Angular's DOM manipulation instead
- `bootstrap.js` - Use Angular components or CSS-only frameworks
- `ngx-bootstrap` - Prefer native Angular solutions or standalone libraries
- Any testing frameworks beyond Angular's built-in testing utilities
- `@ngrx/store` for simple applications - Use Angular Signals instead

**Avoid these legacy patterns:**

- `NgModules` - Use standalone components instead
- `Subject`/`BehaviorSubject` for state - Use Angular Signals instead
- `Observable` for simple reactive data - Use Angular Signals instead
- Template-driven forms for complex scenarios - Use Reactive Forms instead
- `OnPush` change detection - Use zoneless change detection instead

## ✔️ Allowed Dependencies

**Core Angular dependencies (always use latest stable):**

- `@angular/core` - Angular framework core
- `@angular/common` - Common Angular utilities and pipes
- `@angular/forms` - Reactive and template-driven forms
- `@angular/router` - Angular router
- `@angular/platform-browser` - Browser platform support
- `rxjs` - For complex reactive programming when Signals aren't sufficient

**Development dependencies:**

- `@angular/cli` - Angular command line interface
- `@angular/build` - Angular build system
- `typescript` - TypeScript compiler
- `prettier` - Code formatting
- `eslint` - Code linting

**Optional production dependencies:**

- CSS frameworks (PicoCSS, Bootstrap CSS-only)
- UI component libraries that support standalone components
- Utility libraries that don't conflict with Angular patterns

## Component Architecture

### Standalone Components (Mandatory)

All components must be standalone. Never use NgModules for new development.

> ✔️ Example of standalone component:

```ts
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  imports: [CommonModule, RouterOutlet],
  template: `
    <h1>{{ title }}</h1>
    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {
  protected title: string = "My App";
}
```

### Component Structure Patterns

**Page Components (Smart/Container):**

- Handle routing and data fetching
- Manage state through services
- Pass data down to presentation components
- Suffix: `.page.ts`

**Presentation Components (Dumb):**

- Receive data through inputs
- Emit events through outputs
- No direct service dependencies
- Pure and testable
- Suffix: `.component.ts`

> ✔️ Example of page and component separation:

```ts
// user.page.ts (Smart)
@Component({
  imports: [UserComponent, WaitingComponent],
  template: ` <app-user [user]="user()" (save)="onSave($event)" /> `,
})
export class UserPage {
  private readonly userService: UserService = inject(UserService);
  protected user: Signal<User> = this.userService.currentUser;

  protected onSave(userData: User): void {
    this.userService.save(userData);
  }
}

// user.component.ts (Dumb)
@Component({
  template: `<form (ngSubmit)="login.emit(loginDto)">...</form>`,
})
export class UserComponent {
  public readonly user: InputSignal<User> = input.required<User>();
  public readonly login: OutputEmitterRef<LoginDto> = output<LoginDto>();
}
```

## State Management with Signals

### Use Signals for Reactive State

Replace RxJS Subjects with Angular Signals for simple reactive state management.

> ✔️ Example of Signal-based service:

```ts
@Injectable({
  providedIn: "root",
})
export class UserStoreService {
  private readonly http: HttpClient = inject(HttpClient);

  // Private writable signals
  private readonly _users = signal<User[]>([]);
  private readonly _loading = signal<boolean>(false);
  private readonly _error = signal<string | undefined>(undefined);

  // Public readonly signals
  public readonly users = this._users.asReadonly();
  public readonly loading = this._loading.asReadonly();
  public readonly error = this._error.asReadonly();

  // Computed signals
  public readonly activeUsers = computed(() =>
    this.users().filter((user) => user.active),
  );

  public loadUsers(): void {
    this._loading.set(true);
    this._error.set(undefined);

    this.http.get<User[]>("/api/users").subscribe({
      next: (users) => {
        this._users.set(users);
        this._loading.set(false);
      },
      error: (error) => {
        this._error.set(error.message);
        this._loading.set(false);
      },
    });
  }
}
```

### Effects for Side Effects

Use `effect()` for side effects that should run when signals change.

> ✔️ Example of effects:

```ts
export class GlobalStore {
  private readonly cache: CacheService = inject(CacheService);
  private readonly state: Signal<GlobalState> = signal<GlobalState>(
    this.getInitialState(),
  );

  // Effect runs when state changes
  private persistEffect = effect(() => {
    this.cache.set("global", this.state());
  });
}
```

## Modern Angular Features

### Control Flow Syntax

Use the new `@if`, `@for`, `@switch` syntax instead of structural directives.

> ✔️ Example of new control flow:

```html
@if (user(); as currentUser) {
<div>Welcome {{ currentUser.name }}</div>
} @else {
<div>Please log in</div>
} @for (item of items(); track item.id) {
<div>{{ item.name }}</div>
} @empty {
<div>No items found</div>
} @switch (status()) { @case ('loading') {
<app-spinner />
} @case ('error') {
<app-error />
} @default {
<app-content />
} }
```

### Deferrable Views

Use `@defer` for lazy loading components and optimizing performance.

> ✔️ Example of deferrable views:

```html
@defer (when user(); on viewport) {
<app-user-profile [user]="user()" />
} @placeholder {
<div>Loading profile...</div>
} @loading {
<app-spinner />
} @error {
<app-error message="Failed to load profile" />
}
```

### Input and Output Functions

Use the new `input()` and `output()` functions for better type safety.

> ✔️ Example of input/output functions:

```ts
@Component({
  template: `<button (click)="handleClick()">{{ label() }}</button>`,
})
export class ButtonComponent {
  // Required input with transform
  public readonly label = input.required<string>({ transform: trimString });

  // Optional input with default
  public readonly disabled = input<boolean>(false);

  // Output with better type safety
  public readonly clicked = output<MouseEvent>();

  protected handleClick(event: MouseEvent): void {
    if (!this.disabled()) {
      this.clicked.emit(event);
    }
  }
}
```

## HTTP Client and Interceptors

### Repository Pattern for HTTP

Encapsulate HTTP calls in repository services following the repository pattern.

> ✔️ Example of repository service:

```ts
@Injectable({
  providedIn: "root",
})
export class UserRepository {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = "http://localhost:3000/users";

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  public getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  public createUser(user: CreateUserDto): Observable<User> {
    return this.http.post<User>(this.baseUrl, user);
  }

  public updateUser(id: string, user: UpdateUserDto): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/${id}`, user);
  }

  public deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
```

### Functional Interceptors

Use functional interceptors instead of class-based interceptors.

> ✔️ Example of functional interceptor:

```ts
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService).getToken();

  if (token) {
    const authReq = req.clone({
      headers: req.headers.set("Authorization", `Bearer ${token}`),
    });
    return next(authReq);
  }

  return next(req);
};
```

## Forms

### Reactive Forms with Typed Forms

Use strongly typed reactive forms with the new typed forms API.

> ✔️ Example of typed reactive form:

```ts
@Component({
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
      <input formControlName="name" placeholder="Name" />
      <input formControlName="email" type="email" placeholder="Email" />
      <button type="submit" [disabled]="userForm.invalid">Save</button>
    </form>
  `,
})
export class UserFormComponent {
  private fb = inject(FormBuilder);

  protected userForm = this.fb.group({
    name: ["", [Validators.required, Validators.minLength(2)]],
    email: ["", [Validators.required, Validators.email]],
  });

  protected onSubmit(): void {
    if (this.userForm.valid) {
      const formValue = this.userForm.getRawValue(); // Strongly typed
      // Handle form submission
    }
  }
}
```

## Routing

### Functional Guards and Resolvers

Use functional guards and resolvers instead of class-based ones.

> ✔️ Example of functional guard:

```ts
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree(["/login"]);
};

// In routes
export const routes: Routes = [
  {
    path: "dashboard",
    loadComponent: () =>
      import("./dashboard/dashboard.page").then((m) => m.DashboardPage),
    canActivate: [authGuard],
  },
];
```

## Configuration

### Application Configuration

Configure the application using the `ApplicationConfig` pattern.

> ✔️ Example of app configuration:

```ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([authInterceptor, loggingInterceptor])),
    provideAnimations(),
    // Custom providers
    { provide: API_BASE_URL, useValue: environment.apiUrl },
    importProvidersFrom(SomeFeatureModule),
  ],
};
```

### Environment Configuration

Use environment files for configuration and create custom injection tokens.

> ✔️ Example of environment token:

```ts
// env.token.ts
export const ENV = new InjectionToken<Env>("app.env");

export function provideEnv(data: Env): Provider {
  return { provide: ENV, useValue: data };
}

// Usage in component
@Component({})
export class AppComponent {
  private env = inject(ENV);

  protected title = this.env.appName;
}
```

## Testing

### Component Testing with Signals

Test components that use signals by accessing signal values directly.

> ✔️ Example of component test:

```ts
describe("UserComponent", () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
  });

  it("should display user name", () => {
    const testUser = { id: "1", name: "John Doe" };
    fixture.componentRef.setInput("user", testUser);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain("John Doe");
  });
});
```

## File Naming Conventions

- Components: `*.component.ts` or `*.form.ts` or `*.table.ts`
- Pages (Smart components): `*.page.ts`
- Services: `*.service.ts`
- Stores: `*.store.ts` or `*.store.service.ts`
- Guards: `*.guard.ts`
- Interceptors: `*.interceptor.ts`
- Types: `*.type.ts`
- DTOs: `*.dto.ts`

## Import Instructions

- Always use standalone components
- Import Angular modules and dependencies explicitly
- Use typed imports for type definitions
- Use relative imports for local files

> ✔️ Example of proper imports:

```ts
import { Component, inject, input, output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import type { User } from "./user.type";
import { UserService } from "./user.service";
```

## Project Structure

Follow the architecture guidelines with feature-based organization:

```
src/
├── app/
│   ├── core/                    # Core application components
│   │   ├── header.component.ts  # Global header
│   │   ├── footer.component.ts  # Global footer
│   │   └── *.interceptor.ts     # HTTP interceptors
│   ├── routes/                  # Feature routes (pages)
│   │   ├── home/               # Home feature
│   │   ├── user/               # User feature
│   │   └── dashboard/          # Dashboard feature
│   ├── shared/                 # Shared utilities and components
│   │   ├── components/         # Reusable UI components
│   │   ├── services/           # Shared services
│   │   └── types/             # Shared types
│   ├── app.component.ts       # Root component
│   ├── app.config.ts          # Application configuration
│   └── app.routes.ts          # Application routes
└── environments/              # Environment configurations
```

> End of Angular Framework Best Practices.
