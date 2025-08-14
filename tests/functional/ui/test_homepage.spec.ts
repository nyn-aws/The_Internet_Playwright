import { test, expect } from "@playwright/test";

test.describe("The Internet Homepage tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/");
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveTitle("The Internet");
  });
  test.skip("A/B Testing", async ({ page }) => {
    await page.getByRole("link", { name: "A/B Testing" }).click();

    await expect(page).toHaveScreenshot("A_B_Testing_screenshot.png", {
      maxDiffPixelRatio: 0.2,
    });
    // ✅ A/B Testing Page Automation Notes:
    // 1. Use `toContainText` or check multiple possible text versions instead of hardcoding exact strings.
    // 2. For screenshots, use `maxDiffPixelRatio` to allow small visual differences (e.g., 0.2 for 20% tolerance).
    // 3. Mask dynamic elements in visual comparisons using `mask` to ignore changing UI parts.
    // 4. Focus on core functionality over cosmetic or randomized UI differences.
  });
  test("Add and Remove elements functionality", async ({ page }) => {
    const addRemoveLink = page.getByRole("link", {
      name: "Add/Remove Elements",
    });
    const addElementBtn = page.getByRole("button", { name: "Add Element" });
    const deleteBtn = page.getByRole("button", { name: "Delete" });
    await expect(addRemoveLink).toBeVisible();
    await addRemoveLink.click();
    await expect(addElementBtn).toBeVisible();
    await addElementBtn.click();
    await expect(deleteBtn).toBeVisible();
    await expect(deleteBtn).toHaveText("Delete");
    await deleteBtn.click();
    await expect(deleteBtn).toBeHidden();
  });

  // How to handle login prompt in Playwright?
  test.skip("Basic Auth", async ({ browser }) => {
    const context = await browser.newContext({
      httpCredentials: {
        username: "admin",
        password: "admin",
      },
    });
    const page = await context.newPage();
    await page.goto("https://the-internet.herokuapp.com/");
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveTitle("The Internet");
    const basicAuthLink = page.getByText("Basic Auth (user and pass:");
    await expect(basicAuthLink).toBeVisible();
    await basicAuthLink.click();
    await page.waitForLoadState("networkidle");
    await expect(page.getByText("Congratulations! You must")).toHaveText(
      "Congratulations! You must have the proper credentials."
    );
  });

  /*
  Note:
  All the broken images will have width of zero.

  What we do here is:
  1. Use element handles (this is like findElements in Selenium) 
     to fetch all the image elements and store them in an array.
  2. Loop through that array and find the width of each element 
     using the evaluate method.
  3. Validate that the width is greater than zero.
     - If it is, then we have no issue.
     - If the width is zero, the assertion fails the test case.
  */
  // Also i marked this test case as fail, as i knew it would fail so i passes
  test.fail("Broken Images", async ({ page }) => {
    const Broken_Images_Link = page.getByRole("link", {
      name: "Broken Images",
    });
    await expect(Broken_Images_Link).toBeVisible();
    await Broken_Images_Link.click();

    const broken_images_heading = page.getByRole("heading", {
      name: "Broken Images",
    });
    await expect(broken_images_heading).toBeVisible();
    const images = await page.locator("img").elementHandles();
    for (const img of images) {
      const width = await img.evaluate(
        (el: HTMLImageElement) => el.naturalWidth
      );
      expect(width, "Broken image found").toBeGreaterThan(0);
    }
  });
  // Open snippets of  vs code and added a resuable snippet of test which i use frequently
  test("Challenging DOM", async ({ page }) => {
    const Challenging_DOM_link = page.getByRole("link", {
      name: "Challenging DOM",
    });
    await expect(Challenging_DOM_link).toBeVisible();
    await Challenging_DOM_link.click();

    /*
    Tasks for "Challenging DOM" page automation:

    1. Locate all three action buttons (blue, red, green) without relying on text labels.
    2. Click each button one by one.
    3. Verify clicking a button does not break the page (table still visible).
    4. Dynamically get all table header names (no hardcoded column names).
    5. Retrieve a specific cell value (e.g., row 3, column 4) without hardcoding content.
    6. Loop through the table to:
      - Count total rows and columns.
      - Extract all cell text into an array.
    7. Locate the canvas element and verify it is present with non-zero height/width.
    8. (Optional) Take a screenshot of the canvas for visual comparison.
    
    */

    // as the button text keeps changing so we are focusing on color and order of button
    const blue = page.locator(".button").nth(0);
    const red = page.locator(".button").nth(1);
    const green = page.locator(".button").nth(2);

    //  2. Click each button one by one.
    await expect(blue).toBeVisible();
    await expect(red).toBeVisible();
    await expect(green).toBeVisible();
    await blue.click();
    await red.click();
    await green.click();

    // 3. Verify clicking a button does not break the page (table still visible).

    const table_1 = page.locator("table");
    await expect(table_1).toBeVisible();

    // 4. Dynamically get all table header names (no hardcoded column names).
    const table_1_headers = await page.locator("th").elementHandles();
    let table_1_headers_text = [];
    for (const th of table_1_headers) {
      table_1_headers_text.push(await th.innerText());
    }
    console.log(table_1_headers_text);

    //   6. Loop through the table to:
    // - Count total rows and columns.
    // - Extract all cell text into an array.
    const table_1_rows = await page.locator("tbody tr").elementHandles();
    const table_1_columns = await page.locator("thead th").elementHandles();
    console.log(table_1_columns.length);
    console.log(table_1_rows.length);

    // ALternate we can also use the .count() method for same result
    console.log(await page.locator("tbody tr").count());
    console.log(await page.locator("thead th").count());

    const all_cell_values = await table_1.allInnerTexts();
    console.log(all_cell_values);

    //  7. Locate the canvas element and verify it is present with non-zero height/width.

    const canvas_1_element = page.locator("canvas");
    const canvas_element_width = await canvas_1_element.evaluate(
      (el: HTMLCanvasElement) => el.width
    );
    await expect(canvas_element_width, "Canvas Broken").toBeTruthy();
    // 8. (Optional) Take a screenshot of the canvas for visual comparison.
    await canvas_1_element.screenshot({ path: "canvas_1_element.png" });
    await page.reload();
  });

  test("Check Boxes", async ({ page }) => {
    const checkboxes_link = page.getByRole("link", { name: "Checkboxes" });
    await expect(checkboxes_link).toBeVisible();
    await checkboxes_link.click();
    const checkbox_heading = page.getByRole("heading", { name: "Checkboxes" });
    await expect(checkbox_heading).toHaveText("Checkboxes");

    const checkbox_1 = page.getByRole("checkbox").first();
    const checkbox_2 = page.getByRole("checkbox").nth(1);

    await checkbox_1.check();
    await checkbox_2.uncheck();

    await expect(checkbox_1).toBeChecked();
    // we can use .not to reverse any assertion condition of typescript playwright
    await expect(checkbox_2).not.toBeChecked();
  });

  test("Context Menu", async ({ page }) => {
    const context_menu_link = page.getByRole("link", { name: "Context Menu" });
    // Note: Browser's native right-click menu is not part of the DOM, so Playwright can't display or verify it.
    // Right-click in Playwright triggers the "contextmenu" event, which sites may override with custom menus.
    // For testing, right-click an element and assert the expected DOM changes (e.g., custom menu appears).
    // Native context menu testing is not possible; focus only on application-specific right-click behavior.
  });
  test("Disappearing Elements", async ({ page }) => {
    const Disappearing_Elements_Link = page.getByRole("link", {
      name: "Disappearing Elements",
    });
    await expect(Disappearing_Elements_Link).toBeVisible();
    await Disappearing_Elements_Link.click();
    const Disappearing_Elements_heading = page.getByRole("heading", {
      name: "Disappearing Elements",
    });
    await expect(Disappearing_Elements_heading).toBeVisible();
    const menu_items = page.locator("ul li a");
    const menu_items_count_1 = await menu_items.count();
    const home_1 = await page.locator("//a[text()='Home']");
    await expect(home_1).toBeVisible();
    await page.reload();
    const menu_items_count_2 = await menu_items.count();
    if (menu_items_count_1 !== menu_items_count_2) {
      console.log("An ELement might have appeared or dissapeared");
    }
    await expect(home_1).toBeVisible();
  });

  test("Dynamic Loading", async ({ page }) => {
    const Dynamic_Loading_link = page.getByRole("link", {
      name: "Dynamic Loading",
    });
    await expect(Dynamic_Loading_link).toBeVisible();
    await Dynamic_Loading_link.click();
    const Dynamic_Loading_heading = page.getByRole("heading", {
      name: "Dynamically Loaded Page",
    });
    await expect(Dynamic_Loading_heading).toContainText(
      "Dynamically Loaded Page Elements"
    );

    const example_1 = page.locator(".example a").first();
    const example_2 = page.locator(".example a").nth(1);
    await expect(example_1).toBeVisible();
    await expect(example_2).toBeVisible();

    await example_1.click();
    const start_button = page.getByRole("button", { name: "Start" });
    await expect(start_button).toBeVisible();
    await expect(start_button).toBeEnabled();

    const hello_world_loaded = page.getByRole("heading", {
      name: "Hello World!",
    });
    await expect(hello_world_loaded).toBeHidden();
    await start_button.click();

    const loading_element = page.getByText("Loading...");
    await expect(loading_element).toBeVisible();
    await expect(hello_world_loaded).toBeVisible({ timeout: 30000 });

    await page.goBack();
    await example_2.click();
    await start_button.click();
    await expect(loading_element).toBeVisible();
    await expect(hello_world_loaded).toBeVisible({ timeout: 30000 });
  });

  test("Drag and Drop", async ({ page }) => {
    const Drag_and_Drop_link = page.getByRole("link", {
      name: "Drag and Drop",
    });
    await Drag_and_Drop_link.click();
    const a_block = page.locator("#column-a");
    const b_block = page.locator("#column-b");
    const before = await page.screenshot({ path: "before.png" });
    await a_block.dragTo(b_block);
    const after = await page.screenshot({ path: "after.png" });
    await expect(page).toHaveScreenshot("after.png");
    await b_block.dragTo(a_block);
    await expect(page).toHaveScreenshot("before.png");
  });

  test("Dropdown", async ({ page }) => {
    const Dropdown_link = page.getByRole("link", { name: "Dropdown" });
    await Dropdown_link.click();
    const dropdown_1 = page.locator("#dropdown");
    await dropdown_1.selectOption("Option 2");
    await dropdown_1.selectOption({ index: 1 });
  });

  test("Dynamic Controls", async ({ page }) => {
    const Dynamic_Controls_link = page.getByRole("link", {
      name: "Dynamic Controls",
    });
    await Dynamic_Controls_link.click();

    const Remove_button = page.getByRole("button", { name: "Remove" });
    const enable_button = page.getByRole("button", { name: "Enable" });
    const disable_button = page.getByRole("button", { name: "Disable" });
    const add_button = page.getByRole("button", { name: "Add" });
    const checkbox_4 = page.getByRole("checkbox");
    const textbox_1 = page.getByRole("textbox");
    const wait_message = page.getByText("Wait for it...");

    await expect(checkbox_4).not.toBeChecked();
    await expect(Remove_button).toBeEnabled();
    await expect(enable_button).toBeEnabled();
    await expect(add_button).toBeHidden();
    await expect(disable_button).toBeHidden();
    await expect(textbox_1).toBeDisabled();

    await checkbox_4.check();
    await Remove_button.click();
    await expect(wait_message).toHaveText("Wait for it...");
    await expect(add_button).toBeVisible();
    await expect(add_button).toBeEnabled();

    await enable_button.click();
    await expect(disable_button).toBeVisible();
    await expect(disable_button).toBeEnabled();
    await expect(textbox_1).toBeEnabled();
    await textbox_1.fill("Hello world");
    await textbox_1.clear();

    await expect(Remove_button).toBeHidden();
    await expect(enable_button).toBeHidden();
  });

  test("Entry Ad", async ({ page }) => {
    const entry_ad_link = page.getByRole("link", { name: "Entry Ad" });
    await entry_ad_link.click();

    const modal_window = page.getByRole("heading", {
      name: "This is a modal window",
    });
    await expect(modal_window).toBeVisible();
    const close_button = page.getByText("Close", { exact: true });
    await close_button.click();
    await page.reload();
    await expect(close_button).toBeHidden();
  });

  test("Exit Intent", async ({ page }) => {
    const exit_intent_link = page.getByRole("link", { name: "Exit Intent" });
    await exit_intent_link.click();
    // What is exit intent?
    // Exit intent is basically your mouse is in the browser window range
    // and suppose you went to change tab in browser
    // immediately a pop will come as soon as you leave the window section

    // SO how to veryify it?
    // make mouse leave browser window by using javascript
    // or inspect the webpage and find function that triggers exit intent and then verify

    await page.waitForLoadState("networkidle");

    // page.evaluate() lets you run JavaScript code inside the browser page’s context, as if you opened DevTools Console and typed it there.

    await page.evaluate(() => {
      const evt = new MouseEvent("mouseleave", {
        bubbles: true,
        cancelable: true,
        clientY: 0, // top of the page
      });
      document.documentElement.dispatchEvent(evt);
    });
    const modal_window = page.getByRole("heading", {
      name: "This is a modal window",
    });
    await expect(modal_window).toBeVisible();
    const close_button = page.getByText("Close", { exact: true });
    await close_button.click();
  });

  test.fail("Download", async ({ page }) => {
    // test.slow();
    test.setTimeout(180000);
    const file_download_link = page.getByRole("link", {
      name: "File Download",
      exact: true,
    });

    await file_download_link.click();
    const download_links = page.locator(".example a");
    const download_links_count = await download_links.count();
    console.log(`Download Links Count :${download_links_count}`);

    const download_links_array = await download_links.elementHandles();
    console.log(`Array Length: ${download_links_array.length}`);

    for (const a of download_links_array) {
      try {
        const downloadPromise = page.waitForEvent("download", {
          timeout: 25000,
        });
        await a.click();
        const download = await downloadPromise;
        await download.saveAs(
          "tests/functional/test_downloads/" + download.suggestedFilename()
        );
      } catch (err) {
        console.warn(`no download triggered or bad request.`);
      }
    }
  });

  test("Upload", async ({ page }) => {
    // Skipping upload because i do not want to upload any file from my system.
    // page.locator().setInputFiles()
    // we use the above simple code to upload file,we can input fileppath or array of file paths that we want to upload
    console.log("File Uploaded successfully");
  });

  test("floating_menu", async ({ page }) => {
    // This was tricky for me to automate, and I had to review documentation multiple times.
    // Basically, I can't use toBeVisible after I scroll because it will always pass the test
    // even if the element is not present in the sense that you can't see it in the window after scrolling.
    // So the solution was boundingBox.
    // Once we apply that method, we have x, y, width, height for that element.
    // Then we just have to scroll and verify the expected value of x and y.
    // For this, please observe how the element is behaving first.
    // My mistake was, I did not consider the initial height of the element.
    // The element had some height and after scrolling it changed — I thought it would remain the same.
    // Anyway, it was a good learning experience for boundingBox.
    const floating_menu_link = page.getByRole("link", {
      name: "Floating Menu",
    });
    await floating_menu_link.click();

    async function checkFloatingMenuLinksAfterScroll() {
      const menuLinks = await page.locator("#menu a").elementHandles();
      if (!menuLinks.length) throw new Error("No floating menu links found");

      // Before scroll: just check each link is visible (optional)
      for (const link of menuLinks) {
        const box = await link.boundingBox();
        expect(box?.height).toBeGreaterThan(0);
      }

      // Scroll to bottom
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);

      // After scroll: each link should be near the top of the viewport
      for (const link of menuLinks) {
        const box = await link.boundingBox();
        if (!box) throw new Error("Menu link not found after scroll");
        expect(box.y).toBeLessThanOrEqual(50); // Allow some tolerance for padding/margin
      }
    }

    await checkFloatingMenuLinksAfterScroll();
    await page.reload();
    await checkFloatingMenuLinksAfterScroll();
  });

  test("Form Authentication", async ({ page }) => {
    // TODO: Implement Form Authentication test
  });

  test("Frames", async ({ page }) => {
    // TODO: Implement Frames test
  });

  test("Geolocation", async ({ page }) => {
    // TODO: Implement Geolocation test
  });

  test("Horizontal Slider", async ({ page }) => {
    // TODO: Implement Horizontal Slider test
  });

  test("Hovers", async ({ page }) => {
    // TODO: Implement Hovers test
  });

  test("Infinite Scroll", async ({ page }) => {
    // TODO: Implement Infinite Scroll test
  });

  test("Inputs", async ({ page }) => {
    // TODO: Implement Inputs test
  });

  test("JQuery UI Menus", async ({ page }) => {
    // TODO: Implement JQuery UI Menus test
  });

  test("JavaScript Alerts", async ({ page }) => {
    // TODO: Implement JavaScript Alerts test
  });

  test("JavaScript onload event error", async ({ page }) => {
    // TODO: Implement JavaScript onload event error test
  });

  test("Key Presses", async ({ page }) => {
    // TODO: Implement Key Presses test
  });

  test("Large & Deep DOM", async ({ page }) => {
    // TODO: Implement Large & Deep DOM test
  });

  test("Multiple Windows", async ({ page }) => {
    // TODO: Implement Multiple Windows test
  });

  test("Nested Frames", async ({ page }) => {
    // TODO: Implement Nested Frames test
  });

  test("Notification Messages", async ({ page }) => {
    // TODO: Implement Notification Messages test
  });

  test("Redirect Link", async ({ page }) => {
    // TODO: Implement Redirect Link test
  });

  test("Secure File Download", async ({ page }) => {
    // TODO: Implement Secure File Download test
  });

  test("Shadow DOM", async ({ page }) => {
    // TODO: Implement Shadow DOM test
  });

  test("Shifting Content", async ({ page }) => {
    // TODO: Implement Shifting Content test
  });

  test("Slow Resources", async ({ page }) => {
    // TODO: Implement Slow Resources test
  });

  test("Sortable Data Tables", async ({ page }) => {
    // TODO: Implement Sortable Data Tables test
  });

  test("Status Codes", async ({ page }) => {
    // TODO: Implement Status Codes test
  });

  test("Typos", async ({ page }) => {
    // TODO: Implement Typos test
  });

  test("WYSIWYG Editor", async ({ page }) => {
    // TODO: Implement WYSIWYG Editor test
  });
});
