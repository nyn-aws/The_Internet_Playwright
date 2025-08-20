import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  timeout: 30 * 1000,
  workers: 6,
  fullyParallel: true,
  reporter: [
    ["html", { outputFile: "reports/results.html", open: "never" }],
    ["json", { outputFile: "reports/results.json" }],
  ],
  use: {
    browserName: "chromium",
    headless: false,
    screenshot: "on",
    baseURL: "https://the-internet.herokuapp.com/",
    trace: "retain-on-failure",
    video: "retain-on-failure",
  },
  /* Configure projects for major browsers */
  // projects: [
  //   {
  //     name: "chromium",
  //     use: { ...devices["Desktop Chrome"] },
  //   },

  //   {
  //     name: "firefox",
  //     use: { ...devices["Desktop Firefox"] },
  //   },

  //   {
  //     name: "webkit",
  //     use: { ...devices["Desktop Safari"] },
  //   },
  // ],
});
