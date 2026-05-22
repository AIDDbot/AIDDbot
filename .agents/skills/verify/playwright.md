# Playwright Test Writing Guidelines

## Golden Rules

1. **`getByRole()` over CSS/XPath** — resilient to markup changes, mirrors how users see the page
2. **Never `page.waitForTimeout()`** — use `expect(locator).toBeVisible()` or `page.waitForURL()`
3. **Web-first assertions** — `expect(locator)` auto-retries; `expect(await locator.textContent())` does not
4. **Isolate every test** — no shared state, no execution-order dependencies
5. **`baseURL` in config** — zero hardcoded URLs in tests
6. **Retries: `2` in CI, `0` locally** — surface flakiness where it matters
7. **Traces: `'on-first-retry'`** — rich debugging artifacts without CI slowdown
8. **Fixtures over globals** — share state via `test.extend()`, not module-level variables
9. **One behavior per test** — multiple related `expect()` calls are fine
10. **Mock external services only** — never mock your own app; mock third-party APIs, payment gateways, email


## Code Quality Standards
- **Locators**: Prioritize user-facing, role-based locators (`getByRole`, `getByLabel`, `getByText`, etc.) for resilience and accessibility. Use `test.step()` to group interactions and improve test readability and reporting.
- **Assertions**: Use auto-retrying web-first assertions. These assertions start with the `await` keyword (e.g., `await expect(locator).toHaveText()`). Avoid `expect(locator).toBeVisible()` unless specifically testing for visibility changes.
- **Timeouts**: Rely on Playwright's built-in auto-waiting mechanisms. Avoid hard-coded waits or increased default timeouts.
- **Clarity**: Use descriptive test and step titles that clearly state the intent. Add comments only to explain complex logic or non-obvious interactions.


## Test Structure
- **Imports**: Start with `import { test, expect } from '@playwright/test';`.
- **Organization**: Group related tests for a feature under a `test.describe()` block.
- **Hooks**: Use `beforeEach` for setup actions common to all tests in a `describe` block (e.g., navigating to a page).
- **Titles**: Follow a clear naming convention, such as `Feature - Specific action or scenario`.


## File Organization
- **Location**: Store all test files in the `e2e/tests/` directory.
- **Naming**: Use the convention `<feature-or-page>.test.ts` (e.g., `login.test.ts`, `search.test.ts`).
- **Scope**: Aim for one test file per major application feature or page.

## Fixture Management
- Use fixtures to manage test data and setup. 
- Save them at `e2e/fixtures/` and name them according to their purpose (e.g., `users.input.json`, `bookings.expected.json`).

## Assertion Best Practices
- **UI Structure**: Use `toMatchAriaSnapshot` to verify the accessibility tree structure of a component. This provides a comprehensive and accessible snapshot.
- **Element Counts**: Use `toHaveCount` to assert the number of elements found by a locator.
- **Text Content**: Use `toHaveText` for exact text matches and `toContainText` for partial matches.
- **Navigation**: Use `toHaveURL` to verify the page URL after an action.


## Examples

### Assertions
```typescript
// Web-first (auto-retry) — ALWAYS prefer these
await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
await expect(page.getByRole('heading')).toHaveText('Dashboard');
await expect(page.getByRole('listitem')).toHaveCount(5);

// Negative — auto-retries until condition is met
await expect(page.getByRole('dialog')).not.toBeVisible();

// Soft — collect failures, don't stop test
await expect.soft(page.getByRole('heading')).toHaveText('Title');

// Polling — non-DOM async conditions
await expect.poll(() => getUserCount()).toBe(10);

// Retry a block — multiple assertions that must pass together
await expect(async () => { /* assertions */ }).toPass();
```

### Locators
```typescript
// Priority order — use the first one that works:
page.getByRole('button', { name: 'Submit' })        // 1. Role (default)
page.getByLabel('Email address')                     // 2. Label (form fields)
page.getByText('Welcome back')                       // 3. Text (non-interactive)
page.getByPlaceholder('Search...')                    // 4. Placeholder
page.getByAltText('Company logo')                    // 5. Alt text (images)
page.getByTitle('Close dialog')                      // 6. Title attribute
page.getByTestId('checkout-summary')                 // 7. Test ID (last semantic option)
page.locator('css=.legacy-widget >> internal:role=button') // 8. CSS/XPath (last resort)
```

### Organization
```typescript
// tests/checkout/cart.spec.ts
import { test, expect } from '@playwright/test';

// Good: group by feature, describe behavior
test.describe('Shopping Cart', () => {
  test('should add item to empty cart', async ({ page }) => {
    await page.goto('/products/widget-a');
    await page.getByRole('button', { name: 'Add to cart' }).click();
    await expect(page.getByTestId('cart-count')).toHaveText('1');
  });

  test('should update quantity when same item added twice', async ({ page }) => {
    await page.goto('/products/widget-a');
    await page.getByRole('button', { name: 'Add to cart' }).click();
    await page.getByRole('button', { name: 'Add to cart' }).click();
    await expect(page.getByTestId('cart-count')).toHaveText('2');
  });

  test('user can remove item from cart', async ({ page }) => {
    await page.goto('/cart');
    // ... setup item in cart via API or fixture
    await page.getByRole('button', { name: 'Remove' }).first().click();
    await expect(page.getByText('Your cart is empty')).toBeVisible();
  });
});
```


## Test Execution Strategy

1. **Initial Run**: Execute tests with `npx playwright test --project=chromium`
2. **Debug Failures**: Analyze test failures and identify root causes
3. **Iterate**: Refine locators, assertions, or test logic two to three times to achieve stability
4. **Validate**: Ensure tests pass consistently and cover the intended functionality or skip to report issues that cannot be resolved
5. **Report**: Provide feedback on test results and any issues discovered

## Quality Checklist

Before finalizing tests, ensure:
- [ ] All locators are accessible and specific and avoid strict mode violations
- [ ] Tests are grouped logically and follow a clear structure
- [ ] Assertions are meaningful and reflect user expectations
- [ ] Tests follow consistent naming conventions
- [ ] Code is properly formatted and commented
