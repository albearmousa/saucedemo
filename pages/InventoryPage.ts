import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class InventoryPage extends BasePage {
  readonly title: Locator;
  readonly items: Locator;
  readonly itemNames: Locator;
  readonly itemPrices: Locator;
  readonly cartBadge: Locator;
  readonly sortDropdown: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator('[data-test="title"]');
    this.items = page.locator('[data-test="inventory-item"]');
    this.itemNames = page.locator('[data-test="inventory-item-name"]');
    this.itemPrices = page.locator('[data-test="inventory-item-price"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  async getTitle() {
    return await this.title.textContent();
  }

  async addToCart(itemName: string) {
    await this.items
      .filter({ hasText: itemName })
      .getByRole("button", { name: "Add to cart" })
      .click();
  }

  async removeFromCart(itemName: string) {
    await this.items
      .filter({ hasText: itemName })
      .getByRole("button", { name: "Remove" })
      .click();
  }

  async sortBy(option: string) {
    await this.sortDropdown.selectOption(option);
  }

  async openCart() {
    await this.cartLink.click();
  }
}
