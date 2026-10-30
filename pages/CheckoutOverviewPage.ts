import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CheckoutOverviewPage extends BasePage {
  readonly title: Locator;
  readonly finishBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator('[data-test="title"]');
    this.finishBtn = page.locator('[data-test="finish"]');
  }

  async finishCheckout() {
    await this.finishBtn.click();
  }
}
