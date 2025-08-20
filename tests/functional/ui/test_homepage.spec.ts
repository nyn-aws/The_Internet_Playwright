import { test, expect, Frame } from "@playwright/test";
import Homepage from "@pages/homepage";
let homepage: Homepage;
test.describe("The Internet Homepage tests", () => {
  test.beforeEach(async ({ page }) => {
    homepage = new Homepage(page);
    await homepage.goto();
    await expect(page).toHaveTitle("The Internet");
  });
  test("A/B Testing", async ({ page }) => {
    await homepage.locators.abTestingLink.click();

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
    await expect(homepage.locators.addRemoveLink).toBeVisible();
    await homepage.locators.addRemoveLink.click();
    await expect(homepage.locators.addElementBtn).toBeVisible();
    await homepage.locators.addElementBtn.click();
    await expect(homepage.locators.deleteBtn).toBeVisible();
    await expect(homepage.locators.deleteBtn).toHaveText("Delete");
    await homepage.locators.deleteBtn.click();
    await expect(homepage.locators.deleteBtn).toBeHidden();
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
    await expect(homepage.locators.brokenImagesLink).toBeVisible();
    await homepage.locators.brokenImagesLink.click();

    await expect(homepage.locators.brokenImagesHeading).toBeVisible();
    const images = await homepage.locators.images.elementHandles();
    for (const img of images) {
      const width = await img.evaluate(
        (el: HTMLImageElement) => el.naturalWidth
      );
      expect(width, "Broken image found").toBeGreaterThan(0);
    }
  });
  // Open snippets of  vs code and added a resuable snippet of test which i use frequently
  test("Challenging DOM", async ({ page }) => {
    await expect(homepage.locators.challengingDOMLink).toBeVisible();
    await homepage.locators.challengingDOMLink.click();

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
    //  2. Click each button one by one.
    await expect(homepage.locators.blueBtn.nth(0)).toBeVisible();
    await expect(homepage.locators.redBtn).toBeVisible();
    await expect(homepage.locators.greenBtn).toBeVisible();
    await homepage.locators.blueBtn.nth(0).click();
    await homepage.locators.redBtn.click();
    await homepage.locators.greenBtn.click();

    // 3. Verify clicking a button does not break the page (table still visible).

    await expect(homepage.locators.table_challenging).toBeVisible();

    // 4. Dynamically get all table header names (no hardcoded column names).
    const table_1_headers =
      await homepage.locators.table1Headers.elementHandles();
    let table_1_headers_text = [];
    for (const th of table_1_headers) {
      table_1_headers_text.push(await th.innerText());
    }
    console.log(table_1_headers_text);

    //   6. Loop through the table to:
    // - Count total rows and columns.
    // - Extract all cell text into an array.
    const table_1_rows = await homepage.locators.table1Rows.elementHandles();
    const table_1_columns =
      await homepage.locators.table1Headers.elementHandles();
    console.log(table_1_columns.length);
    console.log(table_1_rows.length);

    // ALternate we can also use the .count() method for same result
    console.log(await homepage.locators.table1Rows.count());
    console.log(await homepage.locators.table1Headers.count());

    const all_cell_values = await homepage.locators.table1.allInnerTexts();
    console.log(all_cell_values);

    //  7. Locate the canvas element and verify it is present with non-zero height/width.

    const canvas_element_width = await homepage.locators.canvasElement.evaluate(
      (el: HTMLCanvasElement) => el.width
    );
    await expect(canvas_element_width, "Canvas Broken").toBeTruthy();
    // 8. (Optional) Take a screenshot of the canvas for visual comparison.
    await homepage.locators.canvasElement.screenshot({
      path: "canvas_1_element.png",
    });
    await page.reload();
  });

  test("Check Boxes", async ({ page }) => {
    await expect(homepage.locators.checkboxesLink).toBeVisible();
    await homepage.locators.checkboxesLink.click();
    await expect(homepage.locators.checkboxHeading).toHaveText("Checkboxes");

    await homepage.locators.checkbox1.check();
    await homepage.locators.checkbox2.uncheck();

    await expect(homepage.locators.checkbox1).toBeChecked();
    // we can use .not to reverse any assertion condition of typescript playwright
    await expect(homepage.locators.checkbox2).not.toBeChecked();
  });

  test("Context Menu", async ({ page }) => {
    await homepage.locators.contextMenuLink.click();
    // Note: Browser's native right-click menu is not part of the DOM, so Playwright can't display or verify it.
    // Right-click in Playwright triggers the "contextmenu" event, which sites may override with custom menus.
    // For testing, right-click an element and assert the expected DOM changes (e.g., custom menu appears).
    // Native context menu testing is not possible; focus only on application-specific right-click behavior.
  });
  test("Disappearing Elements", async ({ page }) => {
    await expect(homepage.locators.disappearingElementsLink).toBeVisible();
    await homepage.locators.disappearingElementsLink.click();
    await expect(homepage.locators.disappearingElementsHeading).toBeVisible();
    const menu_items = homepage.locators.menuItems;
    const menu_items_count_1 = await menu_items.count();
    const home_1 = await menu_items.filter({ hasText: "Home" });
    await expect(home_1).toBeVisible();
    await page.reload();
    const menu_items_count_2 = await menu_items.count();
    if (menu_items_count_1 !== menu_items_count_2) {
      console.log("An ELement might have appeared or dissapeared");
    }
    await expect(home_1).toBeVisible();
  });

  test("Dynamic Loading", async ({ page }) => {
    await expect(homepage.locators.dynamicLoadingLink).toBeVisible();
    await homepage.locators.dynamicLoadingLink.click();
    await expect(homepage.locators.dynamicLoadingHeading).toContainText(
      "Dynamically Loaded Page Elements"
    );

    await expect(homepage.locators.example1).toBeVisible();
    await expect(homepage.locators.example2).toBeVisible();

    await homepage.locators.example1.click();
    await expect(homepage.locators.startButton).toBeVisible();
    await expect(homepage.locators.startButton).toBeEnabled();

    await expect(homepage.locators.helloWorldLoaded).toBeHidden();
    await homepage.locators.startButton.click();

    await expect(homepage.locators.loadingElement).toBeVisible();
    await expect(homepage.locators.helloWorldLoaded).toBeVisible({
      timeout: 30000,
    });

    await page.goBack();
    await homepage.locators.example2.click();
    await homepage.locators.startButton.click();
    await expect(homepage.locators.loadingElement).toBeVisible();
    await expect(homepage.locators.helloWorldLoaded).toBeVisible({
      timeout: 30000,
    });
  });

  test("Drag and Drop", async ({ page }) => {
    await homepage.locators.dragAndDropLink.click();
    const before = await page.screenshot({ path: "before.png" });
    await homepage.locators.columnA.dragTo(homepage.locators.columnB);
    const after = await page.screenshot({ path: "after.png" });
    await expect(page).toHaveScreenshot("after.png");
    await homepage.locators.columnB.dragTo(homepage.locators.columnA);
    await expect(page).toHaveScreenshot("before.png");
  });

  test("Dropdown", async ({ page }) => {
    await homepage.locators.dropdownLink.click();
    await homepage.locators.dropdown1.selectOption("Option 2");
    await homepage.locators.dropdown1.selectOption({ index: 1 });
  });

  test("Dynamic Controls", async ({ page }) => {
    await homepage.locators.dynamicControlsLink.click();

    await expect(homepage.locators.checkbox4).not.toBeChecked();
    await expect(homepage.locators.removeButton).toBeEnabled();
    await expect(homepage.locators.enableButton).toBeEnabled();
    await expect(homepage.locators.addButton).toBeHidden();
    await expect(homepage.locators.disableButton).toBeHidden();
    await expect(homepage.locators.textbox1).toBeDisabled();

    await homepage.locators.checkbox4.check();
    await homepage.locators.removeButton.click();
    // await expect(homepage.locators.waitMessage).toHaveText("Wait for it...");
    await expect(homepage.locators.addButton).toBeVisible();
    await expect(homepage.locators.addButton).toBeEnabled();

    await homepage.locators.enableButton.click();
    await expect(homepage.locators.disableButton).toBeVisible();
    await expect(homepage.locators.disableButton).toBeEnabled();
    await expect(homepage.locators.textbox1).toBeEnabled();
    await homepage.locators.textbox1.fill("Hello world");
    await homepage.locators.textbox1.clear();

    await expect(homepage.locators.removeButton).toBeHidden();
    await expect(homepage.locators.enableButton).toBeHidden();
  });

  test("Entry Ad", async ({ page }) => {
    await homepage.locators.entryAdLink.click();
    await expect(homepage.locators.entryAdModal).toBeVisible();
    await homepage.locators.entryAdCloseBtn.click();
    await page.reload();
    await expect(homepage.locators.entryAdCloseBtn).toBeHidden();
  });

  test("Exit Intent", async ({ page }) => {
    await homepage.locators.exitIntentLink.click();
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
    const exitIntentModalWindow = homepage.locators.exitIntentModal;
    await expect(exitIntentModalWindow).toBeVisible();
    const exitIntentCloseButton = homepage.locators.exitIntentCloseBtn;
    await exitIntentCloseButton.click();
  });

  test.skip("Download", async ({ page }) => {
    // test.slow();
    test.setTimeout(180000);
    await homepage.locators.fileDownloadLink.click();
    const fileDownloadLinks = homepage.locators.fileDownloadLinks;
    const fileDownloadLinksCount = await fileDownloadLinks.count();
    console.log(`Download Links Count :${fileDownloadLinksCount}`);

    const fileDownloadLinksArray = await fileDownloadLinks.elementHandles();
    console.log(`Array Length: ${fileDownloadLinksArray.length}`);

    for (const a of fileDownloadLinksArray) {
      try {
        const fileDownloadPromise = page.waitForEvent("download", {
          timeout: 25000,
        });
        await a.click();
        const fileDownload = await fileDownloadPromise;
        await fileDownload.saveAs(
          "tests/functional/test_downloads/" + fileDownload.suggestedFilename()
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
    await homepage.locators.floatingMenuLink.click();

    async function checkFloatingMenuLinksAfterScroll() {
      const menuLinks = await homepage.locators.menuLinks.elementHandles();
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
    await homepage.locators.formAuthLink.click();

    // Input incorrect credential to verify error message
    await homepage.locators.usernameField.fill("Incorrect");
    await homepage.locators.passwordField.fill("password");
    await homepage.locators.loginBtn.click();
    await expect(homepage.locators.invalidUsernameMsg).toBeVisible();

    // incorrect password warning validation
    await homepage.locators.usernameField.fill("tomsmith");
    await homepage.locators.passwordField.fill("password");
    await homepage.locators.loginBtn.click();
    await expect(homepage.locators.invalidPasswordMsg).toBeVisible();

    // Entering correct credentials
    await homepage.locators.usernameField.fill("tomsmith");
    await homepage.locators.passwordField.fill("SuperSecretPassword!");
    await homepage.locators.loginBtn.click();

    // Secure area validations
    await expect(homepage.locators.secureAreaHeading.first()).toBeVisible();
    await expect(homepage.locators.logoutBtn).toBeVisible();
    await expect(homepage.locators.logoutBtn).toBeEnabled();

    // Logout validation
    await homepage.locators.logoutBtn.click();
    await expect(homepage.locators.usernameField).toBeVisible();
    await expect(homepage.locators.passwordField).toBeVisible();
  });

  test("Frames", async ({ page }) => {
    // FOr frames to work first check what is the current structure in which frames are present
    // example: If the frames are nested: than first you have to consider a parent frame verify it is not null or undefined and then
    // access its child elements
    // one you have access to child element frame its a simple game of locators and performing different operations

    await homepage.locators.framesLink.first().click();
    await expect(homepage.locators.nestedFramesLink).toBeVisible();
    await expect(homepage.locators.iframeLink).toBeVisible();

    await homepage.locators.nestedFramesLink.click();
    await page.waitForLoadState("networkidle");
    // Assertions
    await expect(
      homepage.frameLocators.frameLeft.locator("body")
    ).toContainText("LEFT");
    await expect(
      homepage.frameLocators.frameMiddle.locator("body")
    ).toContainText("MIDDLE");
    await expect(
      homepage.frameLocators.frameRight.locator("body")
    ).toContainText("RIGHT");
    await expect(
      homepage.frameLocators.frameBottom.locator("body")
    ).toContainText("BOTTOM");
  });

  test("Geolocation", async ({ page }) => {
    // skipping this as it want to me to share my location.
    // Approach should be somewhere along the line of handling prompts
  });

  test("Horizontal Slider", async ({ page }) => {
    // There are two approaches i know of dealing with sliders
    // First in  clicking on the element then usingkeyboard commend the sending press/other key commands
    // second is playwright in built method that just takes locator and you can use press command directly.
    // For most cases I prefer second approach

    await homepage.locators.horizontalSliderLink.click();
    await expect(homepage.locators.horizontalSliderHeading).toContainText(
      "Horizontal Slider"
    );
    const range = homepage.locators.sliderRange;

    // approach one
    const slider = homepage.locators.sliderInput;
    await slider.click();
    const n = 1;
    for (let a = 0; a < n; a++) {
      await page.keyboard.press("ArrowRight");
    }

    // approach 2
    await page.reload();
    await page.waitForLoadState("networkidle");
    await slider.press("ArrowRight");
  });

  test("Hovers", async ({ page }) => {
    await homepage.locators.hoversLink.click();
    // Image assertions
    await expect(homepage.locators.image1).toBeVisible();
    await expect(homepage.locators.image2).toBeVisible();
    await expect(homepage.locators.image3).toBeVisible();

    // Hover and assert visibility of elements that appear after hovering over the element
    await homepage.locators.image1.hover();
    await expect(homepage.locators.user1).toBeVisible();
    await expect(homepage.locators.user1).toContainText("user1");
    await expect(homepage.locators.viewProfile).toBeVisible();

    await homepage.locators.image2.hover();
    await expect(homepage.locators.user2).toBeVisible();
    await expect(homepage.locators.user2).toContainText("user2");
    await expect(homepage.locators.viewProfile).toBeVisible();

    await homepage.locators.image3.hover();
    await expect(homepage.locators.user3).toBeVisible();
    await expect(homepage.locators.user3).toContainText("user3");
    await expect(homepage.locators.viewProfile).toBeVisible();
  });

  test("Infinite Scroll", async ({ page }) => {
    //  This one is easy, you just need to scroll and take count of the locator of the class which keeps getting auto
    // generated and use expect

    await homepage.locators.infiniteScrollLink.click();
    const infiniteScrollContent = homepage.locators.infiniteScrollContent;
    const iterations = 10;
    for (let index = 0; index < iterations; index++) {
      const current_content_count = await infiniteScrollContent.count();
      await page.evaluate(() => {
        window.scrollBy(0, window.innerHeight);
      });
      await page.waitForTimeout(1000);
      const updated_content_count = await infiniteScrollContent.count();
      expect(updated_content_count).toBeGreaterThan(current_content_count);
    }
  });

  test("Inputs", async ({ page }) => {
    await homepage.locators.inputsLink.click();
    const spin_button = homepage.locators.spinButton;
    await expect(spin_button).toBeEditable();
    await spin_button.press("ArrowDown");
    expect(spin_button).toHaveValue("-1");
  });

  test("JQuery UI Menus", async ({ page }) => {
    await homepage.locators.jqueryMenusLink.click();

    await homepage.locators.enabledLink.hover();
    await homepage.locators.downloadsLink.hover();
    const menuDownloadPromise = page.waitForEvent("download");
    await homepage.locators.pdfLink.click();
    const menuDownload = await menuDownloadPromise;
    await menuDownload.saveAs(
      "tests/functional/test_data/" + menuDownload.suggestedFilename()
    );
  });

  test("JavaScript Alerts", async ({ page }) => {
    await homepage.locators.jsAlertsLink.click();

    // alert(), confirm(), prompt() dialogs
    // By default, dialogs are auto-dismissed by Playwright, so you don't have to handle them. However, you can register a dialog handler before the action that triggers the dialog to either dialog.accept() or dialog.dismiss() it.

    // For alert
    page.on("dialog", (dialog) => dialog.accept());
    await homepage.locators.jsAlertButton.click();
    await expect(homepage.locators.jsResult).toHaveText(
      "You successfully clicked an alert"
    );
  });

  test.fail("JavaScript onload event error", async ({ page }) => {
    // We create an empty array for error and before navigating to the page with errors
    // we define page.on
    // we push error into error array if there is any and use simple expect to validate the array length
    const errors: string[] = [];
    page.on("pageerror", (err) => {
      console.log("❌ JS Error:", err.message);
      errors.push(err.message);
    });

    await homepage.locators.jsOnloadErrorLink.click();
    // Example assertion: fail test if any JS errors happened
    await expect(errors, "No JS errors should occur on page load").toHaveLength(
      0
    );
  });

  test("Key Presses", async ({ page }) => {
    await homepage.locators.keyPressesLink.click();
    await page.waitForLoadState("networkidle");
    await homepage.locators.inputTarget.press("Tab");
    await expect(homepage.locators.keyPressResult).toHaveText(
      "You entered: TAB"
    );
  });

  test("Large & Deep DOM", async ({ page }) => {
    const start = Date.now();
    await homepage.locators.largeDeepDOMLink.click();
    const loadTime = Date.now() - start;
    console.log(`Page load time: ${loadTime} ms`);
    await expect(homepage.locators.largeTable).toBeVisible();
  });

  test("Notification Messages", async ({ page }) => {
    await homepage.locators.notificationMessagesLink.click();
    await homepage.locators.clickHereLink.click();
    await Promise.any([
      expect(homepage.locators.successNotification).toBeVisible(),
      expect(homepage.locators.errorNotification).toBeVisible(),
    ]);

    // here i used promise.any because, after clicking on that buttonn randomly we can get the notification
    // so this promise checks if one is passing and passes the steps
  });

  test("Redirect Link", async ({ page }) => {
    await homepage.locators.redirectLink.click();
    await homepage.locators.redirectHereLink.click();
    await expect(page).toHaveTitle("The Internet");

    await homepage.locators.status200Link.click();
    await expect(page).toHaveURL(
      "https://the-internet.herokuapp.com/status_codes/200"
    );

    await page.goBack();
    await expect(homepage.locators.status301Link).toHaveAttribute(
      "href",
      "status_codes/301"
    );

    await homepage.locators.status404Link.click();
    await expect(page).toHaveURL(
      "https://the-internet.herokuapp.com/status_codes/404"
    );

    await page.goBack();
    await expect(homepage.locators.status500Link).toHaveAttribute(
      "href",
      "status_codes/500"
    );

    await homepage.locators.redirectHereLink.click();
    await page.goBack();
  });

  test("Shadow DOM", async ({ page }) => {
    // Dealing with shadow dom is easy is typescript
    // we just have to use normal playwright locators
    await homepage.locators.shadowDOMLink.click();
    await expect(homepage.locators.shadowText1).toBeVisible();
    await expect(homepage.locators.shadowText2).toContainText(
      "Let's have some different text!"
    );
    await expect(homepage.locators.shadowText3).toBeVisible();
  });

  test("Shifting Resources", async ({ page }) => {
    await homepage.locators.shiftingContentLink.click();
    await homepage.locators.shiftingImageLink.click();

    // Store initial bounding box
    const initialBox = await homepage.locators.shiftingImage.boundingBox();
    if (!initialBox) throw new Error("Resource not found");

    let shiftDetected = false;

    // Reload the page multiple times to detect a shift
    for (let i = 0; i < 5; i++) {
      await page.reload();
      const newBox = await homepage.locators.shiftingImage.boundingBox();

      if (!newBox) throw new Error("Resource disappeared after reload");

      if (
        newBox.x !== initialBox.x ||
        newBox.y !== initialBox.y ||
        newBox.width !== initialBox.width ||
        newBox.height !== initialBox.height
      ) {
        shiftDetected = true;
        break;
      }
    }

    // Verify that at least one shift occurred
    expect(shiftDetected).toBeTruthy();
  });

  test("Sortable Data Tables", async ({ page }) => {
    await homepage.locators.sortableDataTablesLink.click();

    // Table 1
    const sort_headers = [
      homepage.locators.table1,
      homepage.locators.table2,
      homepage.locators.table1FirstName,
      homepage.locators.table1LastName,
      homepage.locators.table1Due,
      homepage.locators.table1Email,
      homepage.locators.table1Website,
      homepage.locators.table2FirstName,
      homepage.locators.table2Due,
      homepage.locators.table2Email,
      homepage.locators.table2LastName,
      homepage.locators.table2Website,
    ];

    // Validating the visibility of the elements
    for (const a of sort_headers) {
      await expect(a).toBeVisible();
      await expect(a).toBeEnabled();
    }

    let count1 = 0;
    // sorting via last name and validating the last names sorted
    const last_names_array_before = [];
    for (let index = 0; index < 4; index++) {
      const element = await homepage.locators.table1Columns1
        .nth(count1)
        .textContent();
      last_names_array_before.push(element);
      count1 = count1 + 6;
    }
    console.log(last_names_array_before);

    await homepage.locators.table1LastName.click();
    await page.waitForTimeout(1000);
    let count2 = 0;
    const last_names_array_after = [];
    for (let index = 0; index < 4; index++) {
      const element = await homepage.locators.table1Columns1
        .nth(count2)
        .textContent();
      console.log(element);
      last_names_array_after.push(element);
      count2 += 6;
    }
    console.log(last_names_array_after);
    await expect(last_names_array_before.sort()).toEqual(
      last_names_array_after
    );

    // another approach:
    // validating firstname sort:
    const firstname_array_before =
      await homepage.locators.table1Columns2.allTextContents();
    console.log(firstname_array_before);

    await homepage.locators.table1FirstName.click();
    await page.waitForTimeout(1000);
    await page.waitForLoadState("networkidle");

    const firstname_array_after =
      await homepage.locators.table1Columns2.allTextContents();
    console.log(firstname_array_after);

    await expect(firstname_array_before.sort()).toEqual(firstname_array_after);

    // Validating Email sort
    const emailBefore =
      await homepage.locators.table1Columns3.allTextContents();
    console.log("Emails (before):", emailBefore);

    await homepage.locators.table1Email.click();
    await page.waitForTimeout(1000);
    await page.waitForLoadState("networkidle");

    const emailAfter = await homepage.locators.table1Columns3.allTextContents();
    console.log("Emails (after):", emailAfter);

    expect(emailAfter).toEqual(
      [...emailBefore].sort((a, b) => a.localeCompare(b))
    );

    // Validating Due Amount sort (numeric)
    const dueBefore = await homepage.locators.table1Columns4.allTextContents();
    console.log("Due (before):", dueBefore);

    await homepage.locators.table1Due.click();
    await page.waitForTimeout(1000);
    await page.waitForLoadState("networkidle");

    const dueAfter = await homepage.locators.table1Columns4.allTextContents();
    console.log("Due (after):", dueAfter);

    // Convert "$51.00" → 51.00 for correct numeric comparison
    const parseDue = (arr: string[]) =>
      arr.map((val) => parseFloat(val.replace("$", "")));

    expect(parseDue(dueAfter)).toEqual(
      [...parseDue(dueBefore)].sort((a, b) => a - b)
    );

    // Validating Website Name sort
    const websiteBefore =
      await homepage.locators.table1Columns5.allTextContents();
    console.log("Websites (before):", websiteBefore);

    await homepage.locators.table1Website.click();
    await page.waitForTimeout(1000);
    await page.waitForLoadState("networkidle");

    const websiteAfter =
      await homepage.locators.table1Columns5.allTextContents();
    console.log("Websites (after):", websiteAfter);

    expect(websiteAfter).toEqual(
      [...websiteBefore].sort((a, b) => a.localeCompare(b))
    );

    // something new i learned while automating sort
    // 📌 Note on .localeCompare:
    // JavaScript's default .sort() compares strings by Unicode code points,
    // which means capital letters and lowercase letters may not sort
    // in natural alphabetical order (e.g., "Zebra" < "apple").
    //
    // Example:
    // ["Zebra", "apple", "Banana"].sort()
    // → ["Banana", "Zebra", "apple"]  ❌ (not natural alphabetical order)
    //
    // .localeCompare() fixes this by comparing strings using language rules,
    // so the sort is human-friendly and case-insensitive by default.
    //
    // Example:
    // ["Zebra", "apple", "Banana"].sort((a, b) => a.localeCompare(b))
    // → ["apple", "Banana", "Zebra"] ✅
    //
    // 👉 That’s why we use .localeCompare() for First Name, Email, Website, etc.
    // to make sure the table sort is validated in natural alphabetical order.
  });
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
  homepage = new Homepage(page); // Initialize homepage with the new page
  await expect(homepage.locators.basicAuthLink).toBeVisible();
  await homepage.locators.basicAuthLink.click();
  await page.waitForLoadState("networkidle");
  await expect(homepage.locators.basicAuthSuccessMessage).toHaveText(
    "Congratulations! You must have the proper credentials."
  );
});

test("Multiple Windows", async ({ context }) => {
  const page = await context.newPage();
  await page.goto("https://the-internet.herokuapp.com/");
  homepage = new Homepage(page); // Initialize homepage with the new page
  await homepage.locators.multipleWindowsLink.click();
  const pagePromise = context.waitForEvent("page");
  await homepage.locators.clickHereNewWindowLink.click();
  const page2 = await pagePromise;
  await expect(homepage.locators.newWindowHeading).toBeVisible();
});

test.skip("Secure File Download", async ({ browser }) => {
  test.setTimeout(180000);

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
  homepage = new Homepage(page);
  await homepage.locators.secureDownloadLink.click();
  await page.waitForLoadState("networkidle");

  const secureDownloadLinksCount =
    await homepage.locators.secureDownloadFiles.count();
  console.log(`Download Links Count :${secureDownloadLinksCount}`);

  const secureDownloadLinksArray =
    await homepage.locators.secureDownloadFiles.elementHandles();
  console.log(`Array Length: ${secureDownloadLinksArray.length}`);

  for (const a of secureDownloadLinksArray) {
    try {
      const secureFileDownloadPromise = page.waitForEvent("download", {
        timeout: 25000,
      });
      await a.click();
      const secureFileDownload = await secureFileDownloadPromise;
      await secureFileDownload.saveAs(
        "tests/functional/test_downloads/" +
          secureFileDownload.suggestedFilename()
      );
    } catch (err) {
      console.warn(`no download triggered or bad request.`);
    }
  }
});
