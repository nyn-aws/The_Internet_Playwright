import { test, expect } from "@playwright/test";

test.describe("The Internet Homepage tests", () => {
  test.beforeEach(async ({ page }) => {
    page.goto("https://the-internet.herokuapp.com/");
  });
  test.only("A/B Testing", async ({ page }) => {
    await page.getByRole("link", { name: "A/B Testing" }).click();

    await expect(page).toHaveScreenshot("A_B_Testing_screenshot.png", {
      maxDiffPixelRatio: 0.2,
    });
  });
});
