import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CheckoutPage extends BasePage {
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly zipCode: Locator;
  readonly continueBtn: Locator;
  readonly errorMsg: Locator;
  readonly title: Locator;
  readonly cancelBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.firstName = page.locator('[data-test="firstName"]');
    this.lastName = page.locator('[data-test="lastName"]');
    this.zipCode = page.locator('[data-test="postalCode"]');
    this.continueBtn = page.locator('[data-test="continue"]');
    this.errorMsg = page.locator('[data-test="error"]');
    this.title = page.locator('[data-test="title"]');
    this.cancelBtn = page.locator('[data-test="cancel"]');
  }

  async fillCheckoutForm(firstName: string, lastName: string, zipCode: string) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.zipCode.fill(zipCode);
    await this.continueBtn.click();
  }


  async cancelCheckout() {
    await this.cancelBtn.click();
  }
  
}
