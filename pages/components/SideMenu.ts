import { Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class SideMenu extends BasePage {
  readonly openBtn: Locator;
  readonly logoutLink: Locator;
  readonly allItemsLink: Locator;
  readonly resetLink: Locator;

  constructor(page: Page) {
    super(page);
    this.openBtn = page.getByRole("button", { name: "Open Menu" });
    this.logoutLink = page.getByRole("button", { name: "Logout" });
    this.allItemsLink = page.getByRole("link", { name: "All Items" });
    this.resetLink = page.getByRole("link", { name: "Reset App State" });
  }

  async logout() {
    await this.openBtn.click();
    await this.logoutLink.click();
  }
}
