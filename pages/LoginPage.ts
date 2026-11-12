import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { User } from "../test-data/users";

export class LoginPage extends BasePage {
  readonly title: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMsg: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator("div.login_logo");
    this.usernameInput = page.getByRole("textbox", { name: "Username" });
    this.passwordInput = page.getByRole("textbox", { name: "Password" });
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.errorMsg = page.locator('[data-test="error"]');
  }
  async login(user: User) {
    await this.usernameInput.fill(user.username);
    await this.passwordInput.fill(user.password);
    await this.loginButton.click();
  }
}
