import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CartPage extends BasePage {
  readonly title: Locator;
  readonly items: Locator;
  readonly itemNames: Locator;
  readonly continueToShoppingBtn: Locator;
  readonly checkoutBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator('[data-test="title"]');
    this.items = page.locator('[data-test="inventory-item"]');
    this.itemNames = page.locator('[data-test="inventory-item-name"]');
    this.continueToShoppingBtn = page.locator(
      '[data-test = "continue-shopping"]',
    );
    this.checkoutBtn = page.locator('[data-test = "checkout"]');
  }

  async removeItem(productName: string) {
    await this.items
      .filter({ hasText: productName })
      .getByRole("button", { name: "Remove" })
      .click();
  }

  async continueShopping() {
    await this.continueToShoppingBtn.click();
  }

  async openCheckout() {
    await this.checkoutBtn.click();
  }
}
