import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class InventoryPage extends BasePage {
  readonly title: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator(".title");
  }

  async getTitle() {
    return await this.title.textContent();
  }
}
