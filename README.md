# SauceDemo Playwright Framework

[![Playwright Tests](https://github.com/albearmousa/saucedemo/actions/workflows/playwright.yml/badge.svg)](https://github.com/albearmousa/saucedemo/actions/workflows/playwright.yml)

End-to-end test automation framework for [saucedemo.com](https://www.saucedemo.com/), built with **Playwright** and **TypeScript** using the Page Object Model.

## Tech stack

- Playwright Test
- TypeScript
- Page Object Model + custom fixtures
- GitHub Actions (CI)

## Project structure

```
saucedemo/
├── .github/workflows/
│   └── playwright.yml        # CI: runs all tests on every push / PR to main
├── pages/                    # Page objects: locators + actions, no assertions
│   ├── BasePage.ts
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   ├── CheckoutPage.ts
│   ├── CheckoutOverviewPage.ts
│   ├── CheckoutCompletePage.ts
│   └── SideMenu.ts
├── fixtures/
│   └── fixtures.ts           # Custom fixtures that provide ready-to-use pages
├── test-data/
│   ├── users.ts              # Test users (standard, locked out, invalid)
│   ├── products.ts           # Product names and prices
│   └── messages.ts           # Expected error and UI messages
├── tests/                    # Specs: what to verify
│   ├── login.spec.ts
│   ├── inventory.spec.ts
│   ├── cart.spec.ts
│   ├── checkout.spec.ts
│   └── logout.spec.ts
├── playwright.config.ts
├── tsconfig.json
└── package.json
```

## Test coverage

| Area      | Scenarios |
|-----------|-----------|
| Login     | Valid login, invalid password, locked-out user, empty fields |
| Inventory | Add and remove items from cart, sort products by price |
| Cart      | View added items, remove items, continue shopping, empty cart |
| Checkout  | Required field validation, complete order end to end |
| Logout    | Logout from the side menu |

## Design decisions

- **Page objects hold locators and actions only.** All assertions live in the spec files.
- **Stable locators.** `data-test` attributes and `getByRole` are preferred over CSS classes.
- **Fixtures remove setup duplication.** For example, `loggedInInventoryPage` logs in and returns the inventory page, and `cartWithItemsPage` builds on it to return a cart that already has items.
- **Test data is centralized** in `test-data/`, so tests never hardcode users, products or messages.
- **Independent tests.** Each test sets up its own state and can run alone or in parallel.

## Getting started

```bash
npm install
npx playwright install
```

## Running tests

```bash
npx playwright test               # run all tests
npx playwright test --ui          # interactive UI mode
npx playwright test --headed      # watch the browser
npx playwright test tests/login.spec.ts   # run one spec
```

## Reports

On failure, Playwright keeps a **screenshot**, a **video** and a **trace** of the test.

```bash
npx playwright show-report
```

In CI, the HTML report is uploaded as an artifact on every run, including failed runs, so traces can be downloaded and inspected.

## Type checking

```bash
npx tsc --noEmit
```