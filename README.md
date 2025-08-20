# The Internet Playwright Test Automation

This repository is essentially a practice ground for Playwright automation. It's an automated test suite designed to validate features on [The Internet](https://the-internet.herokuapp.com/), which is a web application built specifically for automation practice. The goal here is to create solid, maintainable end-to-end tests and ensure the application works as expected.

## Features

- **Comprehensive Test Coverage:** Covers a wide range of features available on The Internet application.
- **Playwright Framework:** Leverages Playwright for reliable and fast browser automation.
- **Page Object Model (POM):** Implements the POM design pattern for organized, reusable, and maintainable test code.
- **TypeScript:** Utilizes TypeScript for enhanced code quality and type safety.
- **Continuous Integration (CI):** Configured with GitHub Actions for automated test execution on every push and pull request.

## Project Structure

```
.
├── .github/
│   └── workflows/
│       └── playwright.yml         # GitHub Actions workflow for CI
├── playwright.config.ts         # Playwright test configuration
├── package.json                 # Project dependencies and scripts
├── src/
│   └── pageObjects/
│       └── homepage.ts          # Page Object for the Homepage
├── tests/
│   └── functional/
│       └── ui/
│           └── test_homepage.spec.ts  # Functional UI tests for the Homepage
└── README.md                    # This file
```

## Getting Started

To run these tests locally, follow these steps:

### Prerequisites

- Node.js (LTS version recommended)
- npm (Node Package Manager)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/nyn-aws/The_Internet_Playwright.git
    cd The_Internet_Playwright
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Install Playwright browsers:**
    ```bash
    npx playwright install --with-deps
    ```

## Running Tests

Tests can be executed using various Playwright commands:

- **Run all tests:**

  ```bash
  npm test
  ```

- **Run tests with UI mode (interactive debugging):**

  ```bash
  npm run test:ui
  ```

- **Run tests in headed mode (browser visible):**

  ```bash
  npm run test:headed
  ```

- **Run tests with Playwright Inspector (debug mode):**
  ```bash
  npm run test:debug
  ```

## Test Reporting

- **HTML Report:** An HTML report is generated after test execution, which can be viewed in your browser:

  ```bash
  npm run report:show
  ```

  The report will be located in the `playwright-report/` directory.

- **JSON Report:** A JSON report is also generated for programmatic consumption:
  ```bash
  npm run report:json
  ```
  The JSON report will be located in `reports/results.json`.

## Continuous Integration

This project uses GitHub Actions to automate test execution. The workflow defined in `.github/workflows/playwright.yml` will automatically run the test suite on `push` and `pull_request` events to the `main` or `master` branches.

You can view the CI build status and test results in the "Actions" tab of the GitHub repository.
