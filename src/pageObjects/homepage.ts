import { Page, Locator, FrameLocator } from "playwright";

class Homepage {
  private page: Page;
  public locators: Record<string, Locator>;
  public frameLocators: Record<string, FrameLocator>;

  constructor(page: Page) {
    this.page = page;
    this.locators = this.initLocators();
    this.frameLocators = this.initFrameLocators();
  }

  private initFrameLocators(): Record<string, FrameLocator> {
    return {
      frameTop: this.page.frameLocator("frame[name='frame-top']"),
      frameBottom: this.page.frameLocator("frame[name='frame-bottom']"),
      frameLeft: this.page
        .frameLocator("frame[name='frame-top']")
        .frameLocator("frame[name='frame-left']"),
      frameMiddle: this.page
        .frameLocator("frame[name='frame-top']")
        .frameLocator("frame[name='frame-middle']"),
      frameRight: this.page
        .frameLocator("frame[name='frame-top']")
        .frameLocator("frame[name='frame-right']"),
    };
  }

  private initLocators(): Record<string, Locator> {
    return {
      addRemoveLink: this.page.getByRole("link", {
        name: "Add/Remove Elements",
      }),
      abTestingLink: this.page.getByRole("link", { name: "A/B Testing" }),
      addElementBtn: this.page.getByRole("button", { name: "Add Element" }),
      deleteBtn: this.page.getByRole("button", { name: "Delete" }),

      brokenImagesLink: this.page.getByRole("link", { name: "Broken Images" }),
      brokenImagesHeading: this.page.getByRole("heading", {
        name: "Broken Images",
      }),
      images: this.page.locator("img"),

      challengingDOMLink: this.page.getByRole("link", {
        name: "Challenging DOM",
      }),
      table_challenging: this.page.locator("table"),
      blueBtn: this.page.locator(".button"),
      redBtn: this.page.locator(".button.alert"),
      greenBtn: this.page.locator(".button.success"),
      table1: this.page.locator("#table1"),
      table1Headers: this.page.locator("#table1 thead tr th"),
      table1Rows: this.page.locator("#table1 tbody tr"),
      table1Columns1: this.page.locator("#table1 tbody tr td"),
      table1Columns2: this.page.locator("#table1 tbody tr td:nth-child(2)"),
      table1Columns3: this.page.locator("#table1 tbody tr td:nth-child(3)"),
      table1Columns4: this.page.locator("#table1 tbody tr td:nth-child(4)"),
      table1Columns5: this.page.locator("#table1 tbody tr td:nth-child(5)"),
      table1FirstName: this.page.locator("#table1").getByText("First Name"),
      table1LastName: this.page.locator("#table1").getByText("Last Name"),
      table1Email: this.page.locator("#table1").getByText("Email"),
      table1Due: this.page.locator("#table1").getByText("Due"),
      table1Website: this.page.locator("#table1").getByText("Web Site"),
      table2: this.page.locator("#table2"),
      table2FirstName: this.page.locator("#table2").getByText("First Name"),
      table2LastName: this.page.locator("#table2").getByText("Last Name"),
      table2Email: this.page.locator("#table2").getByText("Email"),
      table2Due: this.page.locator("#table2").getByText("Due"),
      table2Website: this.page.locator("#table2").getByText("Web Site"),

      canvasElement: this.page.locator("#canvas"),
      checkboxesLink: this.page.getByRole("link", { name: "Checkboxes" }),
      checkboxHeading: this.page.getByRole("heading", { name: "Checkboxes" }),
      checkbox1: this.page.getByRole("checkbox").nth(0),
      checkbox2: this.page.getByRole("checkbox").nth(1),

      contextMenuLink: this.page.getByRole("link", { name: "Context Menu" }),
      disappearingElementsLink: this.page.getByRole("link", {
        name: "Disappearing Elements",
      }),
      disappearingElementsHeading: this.page.getByRole("heading", {
        name: "Disappearing Elements",
      }),
      menuItems: this.page.locator("ul li"),

      dynamicLoadingLink: this.page.getByRole("link", {
        name: "Dynamic Loading",
      }),
      dynamicLoadingHeading: this.page.getByRole("heading", {
        name: "Dynamically Loaded Page Elements",
      }),
      example1: this.page.getByRole("link", {
        name: "Example 1: Element on page that is hidden",
      }),
      example2: this.page.getByRole("link", {
        name: "Example 2: Element rendered after the fact",
      }),
      startButton: this.page.getByRole("button", { name: "Start" }),
      helloWorldLoaded: this.page.getByRole("heading", {
        name: "Hello World!",
      }),
      loadingElement: this.page.locator("#loading"),

      dragAndDropLink: this.page.getByRole("link", { name: "Drag and Drop" }),
      columnA: this.page.locator("#column-a"),
      columnB: this.page.locator("#column-b"),

      dropdownLink: this.page.getByRole("link", { name: "Dropdown" }),
      dropdown1: this.page.locator("#dropdown"),

      dynamicControlsLink: this.page.getByRole("link", {
        name: "Dynamic Controls",
      }),
      removeButton: this.page.getByRole("button", { name: "Remove" }),
      enableButton: this.page.getByRole("button", { name: "Enable" }),
      disableButton: this.page.getByRole("button", { name: "Disable" }),
      addButton: this.page.getByRole("button", { name: "Add" }),
      checkbox4: this.page.getByRole("checkbox"),
      textbox1: this.page.getByRole("textbox"),
      waitMessage: this.page.locator("#message"),

      entryAdLink: this.page.getByRole("link", { name: "Entry Ad" }),
      entryAdModal: this.page.locator("#modal"),
      entryAdCloseBtn: this.page.getByText("Close", { exact: true }),

      exitIntentLink: this.page.getByRole("link", { name: "Exit Intent" }),
      exitIntentModal: this.page.locator("#ouibounce-modal"),
      exitIntentCloseBtn: this.page.getByText("Close", { exact: true }),

      fileDownloadLink: this.page.getByRole("link", { name: "File Download" }),
      fileDownloadLinks: this.page.locator("div.example a"),

      floatingMenuLink: this.page.getByRole("link", { name: "Floating Menu" }),
      menuLinks: this.page.locator("#menu a"),
      footerBox: this.page.locator("#page-footer"),

      formAuthLink: this.page.getByRole("link", {
        name: "Form Authentication",
      }),
      usernameField: this.page.getByLabel("Username"),
      passwordField: this.page.getByLabel("Password"),
      loginBtn: this.page.getByRole("button", { name: "Login" }),
      invalidUsernameMsg: this.page.getByText("Your username is invalid!"),
      invalidPasswordMsg: this.page.getByText("Your password is invalid!"),
      secureAreaHeading: this.page.getByRole("heading", {
        name: "Secure Area",
      }),
      logoutBtn: this.page.getByRole("link", { name: "Logout" }),

      framesLink: this.page.getByRole("link", { name: "Frames" }),
      nestedFramesLink: this.page.getByRole("link", { name: "Nested Frames" }),
      iframeLink: this.page.getByRole("link", { name: "iFrame" }),

      horizontalSliderLink: this.page.getByRole("link", {
        name: "Horizontal Slider",
      }),
      horizontalSliderHeading: this.page.getByRole("heading", {
        name: "Horizontal Slider",
      }),
      sliderRange: this.page.locator("#range"),
      sliderInput: this.page.locator("input[type=range]"),

      image1: this.page.locator(".example .figure").nth(0),
      image2: this.page.locator(".example .figure").nth(1),
      image3: this.page.locator(".example .figure").nth(2),
      user1: this.page.locator(".example .figcaption").nth(0),
      viewProfile: this.page.getByRole("link", { name: "View profile" }),
      user2: this.page.locator(".example .figcaption").nth(1),
      user3: this.page.locator(".example .figcaption").nth(2),

      hoversLink: this.page.getByRole("link", { name: "Hovers" }),
      basicAuthLink: this.page.getByRole("link", { name: "Basic Auth" }),
      basicAuthSuccessMessage: this.page.getByText("Congratulations! You must"),

      // Multiple Windows
      multipleWindowsLink: this.page.getByRole("link", {
        name: "Multiple Windows",
      }),
      clickHereNewWindowLink: this.page.getByRole("link", {
        name: "Click Here",
      }),
      newWindowHeading: this.page.getByRole("heading", { name: "New Window" }),

      // Infinite Scroll
      infiniteScrollLink: this.page.getByRole("link", {
        name: "Infinite Scroll",
      }),
      infiniteScrollContent: this.page.locator(".jscroll-added"),

      // Inputs
      inputsLink: this.page.getByRole("link", { name: "Inputs" }),
      spinButton: this.page.getByRole("spinbutton"),

      // JQuery UI Menus
      jqueryMenusLink: this.page.getByRole("link", { name: "JQuery UI Menus" }),
      enabledLink: this.page.getByRole("link", { name: "Enabled" }),
      downloadsLink: this.page.getByRole("link", { name: "Downloads" }),
      pdfLink: this.page.getByRole("link", { name: "PDF" }),

      // JavaScript Alerts
      jsAlertsLink: this.page.getByRole("link", { name: "JavaScript Alerts" }),
      jsAlertButton: this.page.getByRole("button", {
        name: "Click for JS Alert",
      }),
      jsConfirmButton: this.page.getByRole("button", {
        name: "Click for JS Confirm",
      }),
      jsPromptButton: this.page.getByRole("button", {
        name: "Click for JS Prompt",
      }),
      jsResult: this.page.locator("#result"),

      // JavaScript onload error
      jsOnloadErrorLink: this.page.getByRole("link", {
        name: "JavaScript onload event error",
      }),

      // Key Presses
      keyPressesLink: this.page.getByRole("link", { name: "Key Presses" }),
      inputTarget: this.page.locator("#target"),
      keyPressResult: this.page.locator("#result"),

      // Large & Deep DOM
      largeDeepDOMLink: this.page.getByRole("link", {
        name: "Large & Deep DOM",
      }),
      largeTable: this.page.locator("#large-table"),
      // Notification Messages
      notificationMessagesLink: this.page.getByRole("link", {
        name: "Notification Messages",
      }),
      clickHereLink: this.page.getByRole("link", { name: "Click here" }),
      successNotification: this.page.getByText("Action successful ×"),
      errorNotification: this.page.getByText("Action unsuccesful, please"),

      // Redirect Link
      redirectLink: this.page.getByRole("link", { name: "Redirect Link" }),
      redirectHereLink: this.page.getByRole("link", { name: "here" }),
      status200Link: this.page.getByRole("link", { name: "200" }),
      status301Link: this.page.getByRole("link", { name: "301" }),
      status404Link: this.page.getByRole("link", { name: "404" }),
      status500Link: this.page.getByRole("link", { name: "500" }),

      // Secure File Download
      secureDownloadLink: this.page.getByRole("link", {
        name: "Secure File Download",
      }),
      secureDownloadFiles: this.page.locator(".example a"),

      // Shadow DOM
      shadowDOMLink: this.page.getByRole("link", { name: "Shadow DOM" }),
      shadowText1: this.page
        .locator("my-paragraph")
        .filter({ hasText: "Let's have some different text! My default text" })
        .getByRole("paragraph"),
      shadowText2: this.page
        .getByRole("listitem")
        .filter({ hasText: "Let's have some different" }),
      shadowText3: this.page.getByText("In a list!"),
      // Shifting Resources
      shiftingContentLink: this.page.getByRole("link", {
        name: "Shifting Content",
      }),
      shiftingImageLink: this.page.getByRole("link", {
        name: "Example 2: An image",
      }),
      shiftingImage: this.page.locator("#content").getByRole("img"),

      // Sortable Data Tables
      sortableDataTablesLink: this.page.getByRole("link", {
        name: "Sortable Data Tables",
      }),
    };
  }

  async goto() {
    await this.page.goto("https://the-internet.herokuapp.com/");
    await this.page.waitForLoadState("networkidle");
  }
}

export default Homepage;
