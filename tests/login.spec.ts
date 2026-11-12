import { test, expect } from "../fixtures";
import { users } from "../test-data/users";
import { messages } from "../test-data/messages";

test.describe("Login functionality", () => {
  
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goTo();
  });

  test("user can login with valid credentials", async ({
    page,
    loginPage,
    inventoryPage,
  }) => {
    await loginPage.login(users.standard);
    await expect(page).toHaveURL("/inventory.html");
    await expect(inventoryPage.title).toHaveText("Products");
  });

  test("user cannot login with invalid credentials", async ({ loginPage }) => {
    await loginPage.login(users.invalid);

    await expect(loginPage.errorMsg).toBeVisible();
    await expect(loginPage.errorMsg).toContainText(
      messages.login.invalidCredentials,
    );
  });

  test("user cannot login with locked out user", async ({ loginPage }) => {
    await loginPage.login(users.lockedOutUser);
    await expect(loginPage.errorMsg).toBeVisible();
    await expect(loginPage.errorMsg).toContainText(messages.login.lockedOut);
  });

  test("user cannot login with empty username and password", async ({
    loginPage,
  }) => {
    await loginPage.login(users.emptyUsernameAndPassword);
    await expect(loginPage.errorMsg).toBeVisible();
    await expect(loginPage.errorMsg).toContainText(
      messages.login.usernameRequired,
    );
  });

  test("user cannot login with empty password", async ({ loginPage }) => {
    await loginPage.login(users.emptyPassword);
    await expect(loginPage.errorMsg).toBeVisible();
    await expect(loginPage.errorMsg).toContainText(
      messages.login.passwordRequired,
    );
  });

  test("user cannot login with empty username", async ({ loginPage }) => {
    await loginPage.login(users.emptyUsername);
    await expect(loginPage.errorMsg).toBeVisible();
    await expect(loginPage.errorMsg).toContainText(
      messages.login.usernameRequired,
    );
  });
});
