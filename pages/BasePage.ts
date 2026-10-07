import { Page } from "@playwright/test";

export class BasePage {
  constructor(protected readonly page: Page) {}

  async goTo(path: string = "/") {
    await this.page.goto(path);
  }
}
