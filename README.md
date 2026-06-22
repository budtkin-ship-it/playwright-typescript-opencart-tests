# Playwright TypeScript QA Automation Portfolio

This is a QA automation portfolio project built with Playwright and TypeScript. UI tests cover core e-commerce journeys against the [OpenCart demo storefront](https://opencart.abstracta.us/). API tests cover public REST API scenarios against [DummyJSON](https://dummyjson.com/).

The UI test suite uses Playwright Test with a focused Page Object Model and Component Object structure to keep reusable page and widget interactions separate from test assertions.

## Tech Stack

- Playwright Test
- TypeScript
- Node.js and npm
- Page Object Model and Component Objects
- GitHub Actions

## Implemented Test Coverage

### UI coverage

- Searching for a product by full or partial name
- Verifying product search results
- Opening a product details page from search results
- Adding a product to the shopping cart
- Opening the cart through the mini cart widget
- Verifying the selected product in the cart
- Navigating from the cart to checkout

### API coverage

- Searching products by query
- Getting product by id
- Verifying not found response for a non-existing product
- Getting cart by id
- Getting carts by user id
- Getting user by id
- Verifying not found response for a non-existing user

## Project Structure

```text
.
├── src/
│   └── opencart/
│       ├── components/
│       │   ├── header.component.ts
│       │   └── mini-cart.component.ts
│       └── pages/
│           ├── cart.page.ts
│           ├── checkout.page.ts
│           ├── product.page.ts
│           └── search-results.page.ts
├── tests/
│   ├── fixtures/
│   │   ├── dummyjson-fixtures.ts
│   │   └── opencart-fixtures.ts
│   ├── opencart/
│   │   ├── cart.spec.ts
│   │   ├── checkout.spec.ts
│   │   └── search.spec.ts
│   └── api/
│       ├── products.spec.ts
│       ├── carts.spec.ts
│       └── users.spec.ts
├── .github/
│   └── workflows/
│       └── playwright.yml
├── playwright.config.ts
└── package.json
```

Page and component objects are stored under `src/opencart`. UI test specifications are stored under `tests/opencart`. API test specifications are stored under `tests/api`. Shared test fixtures are stored under `tests/fixtures`.

## Hooks vs Fixtures

Hooks handle simple setup actions, such as opening the OpenCart homepage before each UI test. Custom fixtures provide reusable test dependencies, including `header`, `miniCart`, and `dummyJsonRequest`.

The API fixture creates a dedicated `APIRequestContext` with the DummyJSON base URL, provides it to each test, and disposes it after the test finishes.

## Installation

Clone the repository and install the project dependencies:

```bash
npm ci
```

Install the Playwright browsers:

```bash
npx playwright install
```

## Test execution

Run the complete test suite across all configured Playwright projects:

```bash
npm test
```

Run the suite in Chromium only:

```bash
npm run test:chromium
```

Run API tests:

```bash
npm run test:api
```

API tests run through a dedicated Playwright project named `api`, so they are not repeated across browser projects.

Run Chromium tests in headed mode:

```bash
npm run test:headed
```

Run Chromium tests with the Playwright Inspector:

```bash
npm run test:debug
```

## Playwright Report

After a test run, open the HTML report with:

```bash
npm run report
```

## Continuous Integration

GitHub Actions runs the Playwright suite on pushes and pull requests targeting the `main` or `master` branch. The workflow installs the project dependencies and Playwright browsers, executes the tests, and uploads the HTML report as an artifact for test analysis.

## Project Status

This is an active learning and portfolio project. It is intended to demonstrate practical QA automation skills and is being expanded incrementally as new Playwright and test-design concepts are explored.

The systems under test are public demo environments, so availability and test data may occasionally be affected by external changes.
