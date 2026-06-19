# OpenCart UI Test Automation

This repository is a QA automation portfolio project built with Playwright and TypeScript. It demonstrates automated UI testing of core e-commerce journeys against the [OpenCart demo storefront](https://opencart.abstracta.us/).

The test suite uses Playwright Test with a focused Page Object Model and Component Object structure to keep reusable page and widget interactions separate from test assertions.

## Tech Stack

- Playwright Test
- TypeScript
- Node.js and npm
- Page Object Model and Component Objects
- GitHub Actions

## Implemented Test Coverage

Current scenarios cover:

- Searching for a product by full or partial name
- Verifying product search results
- Opening a product details page from search results
- Adding a product to the shopping cart
- Opening the cart through the mini cart widget
- Verifying the selected product in the cart
- Navigating from the cart to checkout

## Project Structure

```text
.
├── src/
│   └── opencart/
│       ├── components/
│       │   ├── header.component.ts
│       │   └── mini-cart.component.ts
│       └── pages/
│           ├── product.page.ts
│           └── search-results.page.ts
├── tests/
│   └── opencart/
│       ├── cart.spec.ts
│       ├── checkout.spec.ts
│       └── search.spec.ts
├── .github/
│   └── workflows/
│       └── playwright.yml
├── playwright.config.ts
└── package.json
```

Page and component objects are stored under `src/opencart`. Test specifications are stored under `tests/opencart`.

## Installation

Clone the repository and install the project dependencies:

```bash
npm ci
```

Install the Playwright browsers:

```bash
npx playwright install
```

## Running Tests

Run the complete test suite across all configured browsers:

```bash
npm test
```

Run the suite in Chromium only:

```bash
npm run test:chromium
```

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

The application under test is a public demo environment, so availability and test data may occasionally be affected by external changes.
