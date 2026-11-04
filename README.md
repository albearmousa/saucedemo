# Sauce Demo – Playwright Test Automation

End-to-end UI test automation framework for [Sauce Demo](https://www.saucedemo.com) built with **Playwright** and **TypeScript**.

## Features
- Page Object Model (POM) for maintainable, reusable page classes
- Custom Playwright fixtures (e.g. a logged-in inventory page fixture)
- Test coverage for login (valid, invalid, empty fields), logout, and inventory page flows
- Side menu component abstraction

## Tech Stack
- Playwright
- TypeScript
- Node.js

## Project Structure
```
├── fixtures/            # Custom fixtures (e.g. loggedInInventoryPage)
├── pages/               # Page objects and components
├── tests/               # Test specs
└── playwright.config.ts # Playwright configuration
```

## Getting Started
```bash
# Install dependencies
npm install

# Install browsers
npx playwright install

# Run all tests
npx playwright test

# Open the HTML report
npx playwright show-report
```

## Test Scenarios
- Login with valid credentials
- Login with invalid credentials
- Login with empty fields
- Logout from the side menu
- Inventory page validations
