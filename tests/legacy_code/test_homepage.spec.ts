// import { test, expect, Frame } from "@playwright/test";

// test.describe("The Internet Homepage tests", () => {
//   test.beforeEach(async ({ page }) => {
//     await page.goto("https://the-internet.herokuapp.com/");
//     await page.waitForLoadState("networkidle");
//     await expect(page).toHaveTitle("The Internet");
//   });
//   test.skip("A/B Testing", async ({ page }) => {
//     await page.getByRole("link", { name: "A/B Testing" }).click();

//     await expect(page).toHaveScreenshot("A_B_Testing_screenshot.png", {
//       maxDiffPixelRatio: 0.2,
//     });
//     // ✅ A/B Testing Page Automation Notes:
//     // 1. Use `toContainText` or check multiple possible text versions instead of hardcoding exact strings.
//     // 2. For screenshots, use `maxDiffPixelRatio` to allow small visual differences (e.g., 0.2 for 20% tolerance).
//     // 3. Mask dynamic elements in visual comparisons using `mask` to ignore changing UI parts.
//     // 4. Focus on core functionality over cosmetic or randomized UI differences.
//   });
//   test("Add and Remove elements functionality", async ({ page }) => {
//     const addRemoveLink = page.getByRole("link", {
//       name: "Add/Remove Elements",
//     });
//     const addElementBtn = page.getByRole("button", { name: "Add Element" });
//     const deleteBtn = page.getByRole("button", { name: "Delete" });
//     await expect(addRemoveLink).toBeVisible();
//     await addRemoveLink.click();
//     await expect(addElementBtn).toBeVisible();
//     await addElementBtn.click();
//     await expect(deleteBtn).toBeVisible();
//     await expect(deleteBtn).toHaveText("Delete");
//     await deleteBtn.click();
//     await expect(deleteBtn).toBeHidden();
//   });

//   /*
//   Note:
//   All the broken images will have width of zero.

//   What we do here is:
//   1. Use element handles (this is like findElements in Selenium)
//      to fetch all the image elements and store them in an array.
//   2. Loop through that array and find the width of each element
//      using the evaluate method.
//   3. Validate that the width is greater than zero.
//      - If it is, then we have no issue.
//      - If the width is zero, the assertion fails the test case.
//   */
//   // Also i marked this test case as fail, as i knew it would fail so i passes
//   test.fail("Broken Images", async ({ page }) => {
//     const Broken_Images_Link = page.getByRole("link", {
//       name: "Broken Images",
//     });
//     await expect(Broken_Images_Link).toBeVisible();
//     await Broken_Images_Link.click();

//     const broken_images_heading = page.getByRole("heading", {
//       name: "Broken Images",
//     });
//     await expect(broken_images_heading).toBeVisible();
//     const images = await page.locator("img").elementHandles();
//     for (const img of images) {
//       const width = await img.evaluate(
//         (el: HTMLImageElement) => el.naturalWidth
//       );
//       expect(width, "Broken image found").toBeGreaterThan(0);
//     }
//   });
//   // Open snippets of  vs code and added a resuable snippet of test which i use frequently
//   test("Challenging DOM", async ({ page }) => {
//     const Challenging_DOM_link = page.getByRole("link", {
//       name: "Challenging DOM",
//     });
//     await expect(Challenging_DOM_link).toBeVisible();
//     await Challenging_DOM_link.click();

//     /*
//     Tasks for "Challenging DOM" page automation:

//     1. Locate all three action buttons (blue, red, green) without relying on text labels.
//     2. Click each button one by one.
//     3. Verify clicking a button does not break the page (table still visible).
//     4. Dynamically get all table header names (no hardcoded column names).
//     5. Retrieve a specific cell value (e.g., row 3, column 4) without hardcoding content.
//     6. Loop through the table to:
//       - Count total rows and columns.
//       - Extract all cell text into an array.
//     7. Locate the canvas element and verify it is present with non-zero height/width.
//     8. (Optional) Take a screenshot of the canvas for visual comparison.

//     */

//     // as the button text keeps changing so we are focusing on color and order of button
//     const blue = page.locator(".button").nth(0);
//     const red = page.locator(".button").nth(1);
//     const green = page.locator(".button").nth(2);

//     //  2. Click each button one by one.
//     await expect(blue).toBeVisible();
//     await expect(red).toBeVisible();
//     await expect(green).toBeVisible();
//     await blue.click();
//     await red.click();
//     await green.click();

//     // 3. Verify clicking a button does not break the page (table still visible).

//     const table_1 = page.locator("table");
//     await expect(table_1).toBeVisible();

//     // 4. Dynamically get all table header names (no hardcoded column names).
//     const table_1_headers = await page.locator("th").elementHandles();
//     let table_1_headers_text = [];
//     for (const th of table_1_headers) {
//       table_1_headers_text.push(await th.innerText());
//     }
//     console.log(table_1_headers_text);

//     //   6. Loop through the table to:
//     // - Count total rows and columns.
//     // - Extract all cell text into an array.
//     const table_1_rows = await page.locator("tbody tr").elementHandles();
//     const table_1_columns = await page.locator("thead th").elementHandles();
//     console.log(table_1_columns.length);
//     console.log(table_1_rows.length);

//     // ALternate we can also use the .count() method for same result
//     console.log(await page.locator("tbody tr").count());
//     console.log(await page.locator("thead th").count());

//     const all_cell_values = await table_1.allInnerTexts();
//     console.log(all_cell_values);

//     //  7. Locate the canvas element and verify it is present with non-zero height/width.

//     const canvas_1_element = page.locator("canvas");
//     const canvas_element_width = await canvas_1_element.evaluate(
//       (el: HTMLCanvasElement) => el.width
//     );
//     await expect(canvas_element_width, "Canvas Broken").toBeTruthy();
//     // 8. (Optional) Take a screenshot of the canvas for visual comparison.
//     await canvas_1_element.screenshot({ path: "canvas_1_element.png" });
//     await page.reload();
//   });

//   test("Check Boxes", async ({ page }) => {
//     const checkboxes_link = page.getByRole("link", { name: "Checkboxes" });
//     await expect(checkboxes_link).toBeVisible();
//     await checkboxes_link.click();
//     const checkbox_heading = page.getByRole("heading", { name: "Checkboxes" });
//     await expect(checkbox_heading).toHaveText("Checkboxes");

//     const checkbox_1 = page.getByRole("checkbox").first();
//     const checkbox_2 = page.getByRole("checkbox").nth(1);

//     await checkbox_1.check();
//     await checkbox_2.uncheck();

//     await expect(checkbox_1).toBeChecked();
//     // we can use .not to reverse any assertion condition of typescript playwright
//     await expect(checkbox_2).not.toBeChecked();
//   });

//   test("Context Menu", async ({ page }) => {
//     const context_menu_link = page.getByRole("link", { name: "Context Menu" });
//     // Note: Browser's native right-click menu is not part of the DOM, so Playwright can't display or verify it.
//     // Right-click in Playwright triggers the "contextmenu" event, which sites may override with custom menus.
//     // For testing, right-click an element and assert the expected DOM changes (e.g., custom menu appears).
//     // Native context menu testing is not possible; focus only on application-specific right-click behavior.
//   });
//   test("Disappearing Elements", async ({ page }) => {
//     const Disappearing_Elements_Link = page.getByRole("link", {
//       name: "Disappearing Elements",
//     });
//     await expect(Disappearing_Elements_Link).toBeVisible();
//     await Disappearing_Elements_Link.click();
//     const Disappearing_Elements_heading = page.getByRole("heading", {
//       name: "Disappearing Elements",
//     });
//     await expect(Disappearing_Elements_heading).toBeVisible();
//     const menu_items = page.locator("ul li a");
//     const menu_items_count_1 = await menu_items.count();
//     const home_1 = await page.locator("//a[text()='Home']");
//     await expect(home_1).toBeVisible();
//     await page.reload();
//     const menu_items_count_2 = await menu_items.count();
//     if (menu_items_count_1 !== menu_items_count_2) {
//       console.log("An ELement might have appeared or dissapeared");
//     }
//     await expect(home_1).toBeVisible();
//   });

//   test("Dynamic Loading", async ({ page }) => {
//     const Dynamic_Loading_link = page.getByRole("link", {
//       name: "Dynamic Loading",
//     });
//     await expect(Dynamic_Loading_link).toBeVisible();
//     await Dynamic_Loading_link.click();
//     const Dynamic_Loading_heading = page.getByRole("heading", {
//       name: "Dynamically Loaded Page",
//     });
//     await expect(Dynamic_Loading_heading).toContainText(
//       "Dynamically Loaded Page Elements"
//     );

//     const example_1 = page.locator(".example a").first();
//     const example_2 = page.locator(".example a").nth(1);
//     await expect(example_1).toBeVisible();
//     await expect(example_2).toBeVisible();

//     await example_1.click();
//     const start_button = page.getByRole("button", { name: "Start" });
//     await expect(start_button).toBeVisible();
//     await expect(start_button).toBeEnabled();

//     const hello_world_loaded = page.getByRole("heading", {
//       name: "Hello World!",
//     });
//     await expect(hello_world_loaded).toBeHidden();
//     await start_button.click();

//     const loading_element = page.getByText("Loading...");
//     await expect(loading_element).toBeVisible();
//     await expect(hello_world_loaded).toBeVisible({ timeout: 30000 });

//     await page.goBack();
//     await example_2.click();
//     await start_button.click();
//     await expect(loading_element).toBeVisible();
//     await expect(hello_world_loaded).toBeVisible({ timeout: 30000 });
//   });

//   test("Drag and Drop", async ({ page }) => {
//     const Drag_and_Drop_link = page.getByRole("link", {
//       name: "Drag and Drop",
//     });
//     await Drag_and_Drop_link.click();
//     const a_block = page.locator("#column-a");
//     const b_block = page.locator("#column-b");
//     const before = await page.screenshot({ path: "before.png" });
//     await a_block.dragTo(b_block);
//     const after = await page.screenshot({ path: "after.png" });
//     await expect(page).toHaveScreenshot("after.png");
//     await b_block.dragTo(a_block);
//     await expect(page).toHaveScreenshot("before.png");
//   });

//   test("Dropdown", async ({ page }) => {
//     const Dropdown_link = page.getByRole("link", { name: "Dropdown" });
//     await Dropdown_link.click();
//     const dropdown_1 = page.locator("#dropdown");
//     await dropdown_1.selectOption("Option 2");
//     await dropdown_1.selectOption({ index: 1 });
//   });

//   test("Dynamic Controls", async ({ page }) => {
//     const Dynamic_Controls_link = page.getByRole("link", {
//       name: "Dynamic Controls",
//     });
//     await Dynamic_Controls_link.click();

//     const Remove_button = page.getByRole("button", { name: "Remove" });
//     const enable_button = page.getByRole("button", { name: "Enable" });
//     const disable_button = page.getByRole("button", { name: "Disable" });
//     const add_button = page.getByRole("button", { name: "Add" });
//     const checkbox_4 = page.getByRole("checkbox");
//     const textbox_1 = page.getByRole("textbox");
//     const wait_message = page.getByText("Wait for it...");

//     await expect(checkbox_4).not.toBeChecked();
//     await expect(Remove_button).toBeEnabled();
//     await expect(enable_button).toBeEnabled();
//     await expect(add_button).toBeHidden();
//     await expect(disable_button).toBeHidden();
//     await expect(textbox_1).toBeDisabled();

//     await checkbox_4.check();
//     await Remove_button.click();
//     await expect(wait_message).toHaveText("Wait for it...");
//     await expect(add_button).toBeVisible();
//     await expect(add_button).toBeEnabled();

//     await enable_button.click();
//     await expect(disable_button).toBeVisible();
//     await expect(disable_button).toBeEnabled();
//     await expect(textbox_1).toBeEnabled();
//     await textbox_1.fill("Hello world");
//     await textbox_1.clear();

//     await expect(Remove_button).toBeHidden();
//     await expect(enable_button).toBeHidden();
//   });

//   test("Entry Ad", async ({ page }) => {
//     const entry_ad_link = page.getByRole("link", { name: "Entry Ad" });
//     await entry_ad_link.click();

//     const modal_window = page.getByRole("heading", {
//       name: "This is a modal window",
//     });
//     await expect(modal_window).toBeVisible();
//     const close_button = page.getByText("Close", { exact: true });
//     await close_button.click();
//     await page.reload();
//     await expect(close_button).toBeHidden();
//   });

//   test("Exit Intent", async ({ page }) => {
//     const exit_intent_link = page.getByRole("link", { name: "Exit Intent" });
//     await exit_intent_link.click();
//     // What is exit intent?
//     // Exit intent is basically your mouse is in the browser window range
//     // and suppose you went to change tab in browser
//     // immediately a pop will come as soon as you leave the window section

//     // SO how to veryify it?
//     // make mouse leave browser window by using javascript
//     // or inspect the webpage and find function that triggers exit intent and then verify

//     await page.waitForLoadState("networkidle");

//     // page.evaluate() lets you run JavaScript code inside the browser page’s context, as if you opened DevTools Console and typed it there.

//     await page.evaluate(() => {
//       const evt = new MouseEvent("mouseleave", {
//         bubbles: true,
//         cancelable: true,
//         clientY: 0, // top of the page
//       });
//       document.documentElement.dispatchEvent(evt);
//     });
//     const modal_window = page.getByRole("heading", {
//       name: "This is a modal window",
//     });
//     await expect(modal_window).toBeVisible();
//     const close_button = page.getByText("Close", { exact: true });
//     await close_button.click();
//   });

//   test.fail("Download", async ({ page }) => {
//     // test.slow();
//     test.setTimeout(180000);
//     const file_download_link = page.getByRole("link", {
//       name: "File Download",
//       exact: true,
//     });

//     await file_download_link.click();
//     const download_links = page.locator(".example a");
//     const download_links_count = await download_links.count();
//     console.log(`Download Links Count :${download_links_count}`);

//     const download_links_array = await download_links.elementHandles();
//     console.log(`Array Length: ${download_links_array.length}`);

//     for (const a of download_links_array) {
//       try {
//         const downloadPromise = page.waitForEvent("download", {
//           timeout: 25000,
//         });
//         await a.click();
//         const download = await downloadPromise;
//         await download.saveAs(
//           "tests/functional/test_downloads/" + download.suggestedFilename()
//         );
//       } catch (err) {
//         console.warn(`no download triggered or bad request.`);
//       }
//     }
//   });

//   test("Upload", async ({ page }) => {
//     // Skipping upload because i do not want to upload any file from my system.
//     // page.locator().setInputFiles()
//     // we use the above simple code to upload file,we can input fileppath or array of file paths that we want to upload
//     console.log("File Uploaded successfully");
//   });

//   test("floating_menu", async ({ page }) => {
//     // This was tricky for me to automate, and I had to review documentation multiple times.
//     // Basically, I can't use toBeVisible after I scroll because it will always pass the test
//     // even if the element is not present in the sense that you can't see it in the window after scrolling.
//     // So the solution was boundingBox.
//     // Once we apply that method, we have x, y, width, height for that element.
//     // Then we just have to scroll and verify the expected value of x and y.
//     // For this, please observe how the element is behaving first.
//     // My mistake was, I did not consider the initial height of the element.
//     // The element had some height and after scrolling it changed — I thought it would remain the same.
//     // Anyway, it was a good learning experience for boundingBox.
//     const floating_menu_link = page.getByRole("link", {
//       name: "Floating Menu",
//     });
//     await floating_menu_link.click();

//     async function checkFloatingMenuLinksAfterScroll() {
//       const menuLinks = await page.locator("#menu a").elementHandles();
//       if (!menuLinks.length) throw new Error("No floating menu links found");

//       // Before scroll: just check each link is visible (optional)
//       for (const link of menuLinks) {
//         const box = await link.boundingBox();
//         expect(box?.height).toBeGreaterThan(0);
//       }

//       // Scroll to bottom
//       await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
//       await page.waitForTimeout(500);

//       // After scroll: each link should be near the top of the viewport
//       for (const link of menuLinks) {
//         const box = await link.boundingBox();
//         if (!box) throw new Error("Menu link not found after scroll");
//         expect(box.y).toBeLessThanOrEqual(50); // Allow some tolerance for padding/margin
//       }
//     }

//     await checkFloatingMenuLinksAfterScroll();
//     await page.reload();
//     await checkFloatingMenuLinksAfterScroll();
//   });

//   test("Form Authentication", async ({ page }) => {
//     const form_authentication_link = page.getByRole("link", {
//       name: "Form Authentication",
//     });
//     await form_authentication_link.click();

//     const username_1 = page.getByRole("textbox", { name: "Username" });
//     const password_1 = page.getByRole("textbox", { name: "Password" });
//     const login_1 = page.locator("//i[contains(text(),'Login')]");

//     // Input incorrect credential to verify error message
//     await username_1.fill("Incorrect");
//     await password_1.fill("password");
//     await login_1.click();
//     const invalid_username_warning = page.locator(
//       "//*[contains(text(),'Your username is invalid!')]"
//     );
//     await expect(invalid_username_warning).toBeVisible();

//     // incorrect password warning validation
//     const incorrect_password_warning = page.locator(
//       "//*[contains(text(),'Your password is invalid!')]"
//     );

//     await username_1.fill("tomsmith");
//     await password_1.fill("password");
//     await login_1.click();
//     await expect(incorrect_password_warning).toBeVisible();

//     // Entering correct credentials

//     await username_1.fill("tomsmith");
//     await password_1.fill("SuperSecretPassword!");
//     await login_1.click();

//     // Secure area validations

//     const secure_area_1 = page.getByText("You logged into a secure area");
//     const logout_button_1 = page.getByRole("link", { name: "Logout" });

//     await expect(secure_area_1).toBeVisible();
//     await expect(logout_button_1).toBeVisible();
//     await expect(logout_button_1).toBeEnabled();

//     // Logout validation
//     await logout_button_1.click();
//     await expect(username_1).toBeVisible();
//     await expect(password_1).toBeVisible();
//   });

//   test("Frames", async ({ page }) => {
//     // FOr frames to work first check what is the current structure in which frames are present
//     // example: If the frames are nested: than first you have to consider a parent frame verify it is not null or undefined and then
//     // access its child elements
//     // one you have access to child element frame its a simple game of locators and performing different operations

//     const frames_link = page.getByRole("link", { name: "Frames", exact: true });
//     await frames_link.click();
//     const nested_frames_link = page.getByRole("link", {
//       name: "Nested Frames",
//     });
//     const iframe_link = page.getByRole("link", { name: "iFrame" });
//     await expect(nested_frames_link).toBeVisible();
//     await expect(iframe_link).toBeVisible();

//     await nested_frames_link.click();
//     await page.waitForLoadState("networkidle");
//     await page.frames().forEach((fr) => {
//       console.log(fr.name());
//     });
//     const frame_top = page.frame({ name: "frame-top" });
//     const frame_bottom = page.frame({ name: "frame-bottom" });
//     if (!frame_top) {
//       throw new Error("frame-top not found");
//     }
//     if (!frame_bottom) {
//       throw new Error("frame-bottom not found");
//     }
//     const frame_left: Frame = frame_top.childFrames()[0];
//     const frame_middle = frame_top.childFrames()[1];
//     const frame_right = frame_top.childFrames()[2];

//     // Assertions
//     await expect(frame_left.locator("body")).toContainText("LEFT");
//     await expect(frame_middle.locator("body")).toContainText("MIDDLE");
//     await expect(frame_right.locator("body")).toContainText("RIGHT");
//     await expect(frame_bottom.locator("body")).toContainText("BOTTOM");
//   });

//   test("Geolocation", async ({ page }) => {
//     // skipping this as it want to me to share my location.
//     // Approach should be somewhere along the line of handling prompts
//   });

//   test("Horizontal Slider", async ({ page }) => {
//     // There are two approaches i know of dealing with sliders
//     // First in  clicking on the element then usingkeyboard commend the sending press/other key commands
//     // second is playwright in built method that just takes locator and you can use press command directly.
//     // For most cases I prefer second approach

//     const horizontal_slider_link = page.getByRole("link", {
//       name: "Horizontal Slider",
//     });
//     await horizontal_slider_link.click();
//     const horizontal_slider_heading = page.getByRole("heading", {
//       name: "Horizontal Slider",
//     });
//     await expect(horizontal_slider_heading).toContainText("Horizontal Slider");
//     const range = page.locator("#range");

//     // approach one
//     const slider = page.getByRole("slider");
//     await slider.click();
//     const n = 1;
//     for (let a = 0; a < n; a++) {
//       await page.keyboard.press("ArrowRight");
//     }

//     // approach 2
//     await page.reload();
//     await page.waitForLoadState("networkidle");
//     await slider.press("ArrowRight");
//   });

//   test("Hovers", async ({ page }) => {
//     await page.getByRole("link", { name: "Hovers" }).click();
//     const img1 = page.getByRole("img", { name: "User Avatar" }).first();
//     const img2 = page.getByRole("img", { name: "User Avatar" }).nth(1);
//     const img3 = page.getByRole("img", { name: "User Avatar" }).nth(2);

//     // Image assertions
//     await expect(img1).toBeVisible();
//     await expect(img2).toBeVisible();
//     await expect(img3).toBeVisible();

//     // Hover and assert visibility of elements that appear after hovering opver the element
//     await img1.hover();
//     const user_1 = page.getByRole("heading", { name: "name: user1" });
//     const view_profile = page.getByRole("link", { name: "View profile" });
//     await expect(user_1).toBeVisible();
//     await expect(user_1).toContainText("user1");
//     await expect(view_profile).toBeVisible();

//     await img2.hover();
//     const user_2 = page.getByRole("heading", { name: "name: user2" });
//     await expect(user_2).toBeVisible();
//     await expect(user_2).toContainText("user2");
//     await expect(view_profile).toBeVisible();

//     await img3.hover();
//     const user_3 = page.getByRole("heading", { name: "name: user3" });
//     await expect(user_3).toBeVisible();
//     await expect(user_3).toContainText("user3");
//     await expect(view_profile).toBeVisible();
//   });

//   test("Infinite Scroll", async ({ page }) => {
//     //  This one is easy, you just need to scroll adn take count of the locator of the class which keeps getting auto
//     // generated and use expect

//     await page.getByRole("link", { name: "Infinite Scroll" }).click();
//     const iterations = 10;
//     for (let index = 0; index < iterations; index++) {
//       const current_content_count = await page
//         .locator(".jscroll-added")
//         .count();
//       await page.evaluate(() => {
//         window.scrollBy(0, window.innerHeight);
//       });
//       await page.waitForTimeout(1000);
//       const updated_content_count = await page
//         .locator(".jscroll-added")
//         .count();
//       expect(updated_content_count).toBeGreaterThan(current_content_count);
//     }
//   });

//   test("Inputs", async ({ page }) => {
//     await page.getByRole("link", { name: "Inputs" }).click();
//     const spin_button = page.getByRole("spinbutton");
//     await expect(spin_button).toBeEditable();
//     await spin_button.press("ArrowDown");
//     expect(spin_button).toHaveValue("-1");
//   });

//   test("JQuery UI Menus", async ({ page }) => {
//     await page.getByRole("link", { name: "JQuery UI Menus" }).click();

//     await page.getByRole("link", { name: "Enabled" }).hover();
//     await page.getByRole("link", { name: "Downloads" }).hover();
//     const downloadPromise2 = page.waitForEvent("download");
//     await page.getByRole("link", { name: "PDF" }).click();
//     const download = await downloadPromise2;
//     await download.saveAs(
//       "tests/functional/test_data/" + download.suggestedFilename()
//     );
//   });

//   test("JavaScript Alerts", async ({ page }) => {
//     // alert(), confirm(), prompt() dialogs
//     // By default, dialogs are auto-dismissed by Playwright, so you don't have to handle them. However, you can register a dialog handler before the action that triggers the dialog to either dialog.accept() or dialog.dismiss() it.
//   });

//   test.fail("JavaScript onload event error", async ({ page }) => {
//     // We create an empty array for error and before navigating to the page with errors
//     // we define page.on
//     // we push error into error array if there is any and use simple expect to validate the array length
//     const errors: string[] = [];
//     page.on("pageerror", (err) => {
//       console.log("❌ JS Error:", err.message);
//       errors.push(err.message);
//     });

//     await page
//       .getByRole("link", { name: "JavaScript onload event error" })
//       .click();
//     // Example assertion: fail test if any JS errors happened
//     await expect(errors, "No JS errors should occur on page load").toHaveLength(
//       0
//     );
//   });

//   test("Key Presses", async ({ page }) => {
//     await page.getByRole("link", { name: "Key Presses" }).click();
//     await page.waitForLoadState("networkidle");
//     await page.locator("#target").press("Tab");
//     const validation_1 = page.getByText("You entered: TAB");
//     await expect(validation_1).toBeVisible();
//   });

//   test("Large & Deep DOM", async ({ page }) => {
//     const start = Date.now();
//     await page.getByRole("link", { name: "Large & Deep DOM" }).click();
//     const loadTime = Date.now() - start;
//     console.log(`Page load time: ${loadTime} ms`);
//   });

//   test("Notification Messages", async ({ page }) => {
//     await page.getByRole("link", { name: "Notification Messages" }).click();
//     const notification_1 = page.getByText("Action successful ×");
//     const notification_2 = page.getByText("Action unsuccesful, please");
//     await page.getByRole("link", { name: "Click here" }).click();
//     await Promise.any([
//       expect(notification_1).toBeVisible(),
//       expect(notification_2).toBeVisible(),
//     ]);

//     // here i used promise.any because, after clicking on that buttonn randomly we can get the notification
//     // so this promise checks if one is passing and passes the steps
//   });

//   test("Redirect Link", async ({ page }) => {
//     await page.getByRole("link", { name: "Redirect Link" }).click();
//     const redirect_link_1 = page.getByRole("link", { name: "here" });
//     await redirect_link_1.click();
//     await expect(page).toHaveTitle("The Internet");
//     const status_200_link = page.getByRole("link", { name: "200" });
//     const status_301_link = page.getByRole("link", { name: "301" });
//     const status_404_link = page.getByRole("link", { name: "404" });
//     const status_500_link = page.getByRole("link", { name: "500" });

//     await status_200_link.click();
//     await expect(page).toHaveURL(
//       "https://the-internet.herokuapp.com/status_codes/200"
//     );

//     await page.goBack();
//     await expect(status_301_link).toHaveAttribute("href", "status_codes/301");

//     await status_404_link.click();
//     await expect(page).toHaveURL(
//       "https://the-internet.herokuapp.com/status_codes/404"
//     );

//     await page.goBack();
//     await expect(status_500_link).toHaveAttribute("href", "status_codes/500");

//     await redirect_link_1.click();
//     await page.goBack();
//   });

//   test("Shadow DOM", async ({ page }) => {
//     // Dealing with shadow dom is easy is typescript
//     // we just have to use normal playwright locators
//     await page.getByRole("link", { name: "Shadow DOM" }).click();
//     const text_field_1 = page
//       .locator("my-paragraph")
//       .filter({ hasText: "Let's have some different text! My default text" })
//       .getByRole("paragraph");
//     const text_field_2 = page
//       .getByRole("listitem")
//       .filter({ hasText: "Let's have some different" });
//     const text_field_3 = page.getByText("In a list!");

//     await expect(text_field_1).toBeVisible();
//     await expect(text_field_2).toContainText("Let's have some different text!");
//     await expect(text_field_3).toBeVisible();
//   });

//   test("Shifting Resources", async ({ page }) => {
//     // Navigate to Shifting Resources page
//     await page.getByRole("link", { name: "Shifting Content" }).click();
//     await page.getByRole("link", { name: "Example 2: An image" }).click();
//     const resource = page.locator("#content").getByRole("img"); // The shifting image

//     // Store initial bounding box
//     const initialBox = await resource.boundingBox();
//     if (!initialBox) throw new Error("Resource not found");

//     let shiftDetected = false;

//     // Reload the page multiple times to detect a shift
//     for (let i = 0; i < 5; i++) {
//       await page.reload();
//       const newBox = await resource.boundingBox();

//       if (!newBox) throw new Error("Resource disappeared after reload");

//       if (
//         newBox.x !== initialBox.x ||
//         newBox.y !== initialBox.y ||
//         newBox.width !== initialBox.width ||
//         newBox.height !== initialBox.height
//       ) {
//         shiftDetected = true;
//         break;
//       }
//     }

//     // Verify that at least one shift occurred
//     expect(shiftDetected).toBeTruthy();
//   });

//   test("Sortable Data Tables", async ({ page }) => {
//     await page.getByRole("link", { name: "Sortable Data Tables" }).click();

//     // Table 1
//     const T1 = page.locator("#table1");
//     const T1_First_name = page.locator("#table1").getByText("First Name");
//     const T1_last_name = page.locator("#table1").getByText("Last Name");
//     const T1_email = page.locator("#table1").getByText("Email");
//     const T1_due = page.locator("#table1").getByText("Due");
//     const T1_website = page.locator("#table1").getByText("Web Site");

//     // Table 2

//     const T2 = page.locator("#table2");
//     const T2_First_name = page.locator("#table2").getByText("First Name");
//     const T2_last_name = page.locator("#table2").getByText("Last Name");
//     const T2_email = page.locator("#table2").getByText("Email");
//     const T2_due = page.locator("#table2").getByText("Due");
//     const T2_website = page.locator("#table2").getByText("Web Site");

//     const sort_headers = [
//       T1,
//       T2,
//       T1_First_name,
//       T1_last_name,
//       T1_due,
//       T1_email,
//       T1_website,
//       T2_First_name,
//       T2_due,
//       T2_email,
//       T2_last_name,
//       T2_website,
//     ];

//     // Validating the visibility of the elements
//     for (const a of sort_headers) {
//       await expect(a).toBeVisible();
//       await expect(a).toBeEnabled();
//     }

//     let count1 = 0;
//     // sorting via last name and validating the last names sorted
//     const last_names_array_before = [];
//     for (let index = 0; index < 4; index++) {
//       const element = await page
//         .locator("#table1 tbody tr td")
//         .nth(count1)
//         .textContent();
//       last_names_array_before.push(element);
//       count1 = count1 + 6;
//     }
//     console.log(last_names_array_before);

//     await T1_last_name.click();
//     let count2 = 0;
//     const last_names_array_after = [];
//     for (let index = 0; index < 4; index++) {
//       const element = await page
//         .locator("#table1 tbody tr td")
//         .nth(count2)
//         .textContent();
//       last_names_array_after.push(element);
//       count2 += 6;
//     }
//     console.log(last_names_array_after);
//     await expect(last_names_array_before.sort()).toEqual(
//       last_names_array_after
//     );

//     // another approach:
//     // validating firstname sort:
//     const firstname_array_before = await page
//       .locator("#table1 tbody tr td:nth-child(2)")
//       .allTextContents();
//     console.log(firstname_array_before);

//     await T1_First_name.click();

//     const firstname_array_after = await page
//       .locator("#table1 tbody tr td:nth-child(2)")
//       .allTextContents();
//     console.log(firstname_array_after);

//     await expect(firstname_array_before.sort()).toEqual(firstname_array_after);

//     // Validating Email sort
//     const emailBefore = await page
//       .locator("#table1 tbody tr td:nth-child(3)")
//       .allTextContents();
//     console.log("Emails (before):", emailBefore);

//     await T1_email.click();

//     const emailAfter = await page
//       .locator("#table1 tbody tr td:nth-child(3)")
//       .allTextContents();
//     console.log("Emails (after):", emailAfter);

//     expect(emailAfter).toEqual(
//       [...emailBefore].sort((a, b) => a.localeCompare(b))
//     );

//     // Validating Due Amount sort (numeric)
//     const dueBefore = await page
//       .locator("#table1 tbody tr td:nth-child(4)")
//       .allTextContents();
//     console.log("Due (before):", dueBefore);

//     await T1_due.click();

//     const dueAfter = await page
//       .locator("#table1 tbody tr td:nth-child(4)")
//       .allTextContents();
//     console.log("Due (after):", dueAfter);

//     // Convert "$51.00" → 51.00 for correct numeric comparison
//     const parseDue = (arr: string[]) =>
//       arr.map((val) => parseFloat(val.replace("$", "")));

//     expect(parseDue(dueAfter)).toEqual(
//       [...parseDue(dueBefore)].sort((a, b) => a - b)
//     );

//     // Validating Website Name sort
//     const websiteBefore = await page
//       .locator("#table1 tbody tr td:nth-child(5)")
//       .allTextContents();
//     console.log("Websites (before):", websiteBefore);

//     await T1_website.click();

//     const websiteAfter = await page
//       .locator("#table1 tbody tr td:nth-child(5)")
//       .allTextContents();
//     console.log("Websites (after):", websiteAfter);

//     expect(websiteAfter).toEqual(
//       [...websiteBefore].sort((a, b) => a.localeCompare(b))
//     );

//     // something new i learned while automating sort
//     // 📌 Note on .localeCompare:
//     // JavaScript's default .sort() compares strings by Unicode code points,
//     // which means capital letters and lowercase letters may not sort
//     // in natural alphabetical order (e.g., "Zebra" < "apple").
//     //
//     // Example:
//     // ["Zebra", "apple", "Banana"].sort()
//     // → ["Banana", "Zebra", "apple"]  ❌ (not natural alphabetical order)
//     //
//     // .localeCompare() fixes this by comparing strings using language rules,
//     // so the sort is human-friendly and case-insensitive by default.
//     //
//     // Example:
//     // ["Zebra", "apple", "Banana"].sort((a, b) => a.localeCompare(b))
//     // → ["apple", "Banana", "Zebra"] ✅
//     //
//     // 👉 That’s why we use .localeCompare() for First Name, Email, Website, etc.
//     // to make sure the table sort is validated in natural alphabetical order.
//   });
// });

// // How to handle login prompt in Playwright?
// test.skip("Basic Auth", async ({ browser }) => {
//   const context = await browser.newContext({
//     httpCredentials: {
//       username: "admin",
//       password: "admin",
//     },
//   });
//   const page = await context.newPage();
//   await page.goto("https://the-internet.herokuapp.com/");
//   await page.waitForLoadState("networkidle");
//   await expect(page).toHaveTitle("The Internet");
//   const basicAuthLink = page.getByText("Basic Auth (user and pass:");
//   await expect(basicAuthLink).toBeVisible();
//   await basicAuthLink.click();
//   await page.waitForLoadState("networkidle");
//   await expect(page.getByText("Congratulations! You must")).toHaveText(
//     "Congratulations! You must have the proper credentials."
//   );
// });

// test("Multiple Windows", async ({ context }) => {
//   const page1 = await context.newPage();
//   await page1.goto("https://the-internet.herokuapp.com/");
//   await page1.getByRole("link", { name: "Multiple Windows" }).click();
//   const pagePromise = context.waitForEvent("page");
//   await page1.getByRole("link", { name: "Click Here" }).click();
//   const page2 = await pagePromise;
//   const newWindowValidation = page2.getByRole("heading", {
//     name: "New Window",
//   });
//   await expect(newWindowValidation).toBeVisible();
// });

// test.fail("Secure File Download", async ({ browser }) => {
//   test.setTimeout(180000);

//   const context = await browser.newContext({
//     httpCredentials: {
//       username: "admin",
//       password: "admin",
//     },
//   });
//   const page = await context.newPage();
//   await page.goto("https://the-internet.herokuapp.com/");
//   await page.waitForLoadState("networkidle");
//   await expect(page).toHaveTitle("The Internet");
//   await page.getByRole("link", { name: "Secure File Download" }).click();
//   await page.waitForLoadState("networkidle");
//   const download_links = page.locator(".example a");
//   const download_links_count = await download_links.count();
//   console.log(`Download Links Count :${download_links_count}`);

//   const download_links_array = await download_links.elementHandles();
//   console.log(`Array Length: ${download_links_array.length}`);

//   for (const a of download_links_array) {
//     try {
//       const downloadPromise = page.waitForEvent("download", {
//         timeout: 25000,
//       });
//       await a.click();
//       const download = await downloadPromise;
//       await download.saveAs(
//         "tests/functional/test_downloads/" + download.suggestedFilename()
//       );
//     } catch (err) {
//       console.warn(`no download triggered or bad request.`);
//     }
//   }
// });
