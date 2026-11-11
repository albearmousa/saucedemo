import { test, expect } from "../fixtures";

test.describe("Login functionality", () => {
  
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goTo();
  });

  test("user can login with valid credentials", async ({
    page,
    loginPage,
    inventoryPage,
  }) => {
    await loginPage.login("standard_user", "secret_sauce");
    await expect(page).toHaveURL("/inventory.html");
    await expect(inventoryPage.title).toHaveText("Products");
  });

  test("user cannot login with invalid credentials", async ({ loginPage }) => {
    await loginPage.login("standard_user", "secret_sauces");

    await expect(loginPage.errorMsg).toBeVisible();
    await expect(loginPage.errorMsg).toContainText(
      "Username and password do not match",
    );
  });

  test("user cannot login with locked out user", async ({ loginPage }) => {
    await loginPage.login("locked_out_user", "secret_sauce");
    await expect(loginPage.errorMsg).toBeVisible();
    await expect(loginPage.errorMsg).toContainText(
      "this user has been locked out",
    );
  });

  test("user cannot login with empty username and password", async ({
    loginPage,
  }) => {
    await loginPage.login("", "");
    await expect(loginPage.errorMsg).toBeVisible();
    await expect(loginPage.errorMsg).toContainText(
      "Epic sadface: Username is required",
    );
  });

  test("user cannot login with empty password", async ({ loginPage }) => {
    await loginPage.login("standard_user", "");
    await expect(loginPage.errorMsg).toBeVisible();
    await expect(loginPage.errorMsg).toContainText(
      "Epic sadface: Password is required",
    );
  });

  test("user cannot login with empty username", async ({ loginPage }) => {
    await loginPage.login("", "secret_sauce");
    await expect(loginPage.errorMsg).toBeVisible();
    await expect(loginPage.errorMsg).toContainText(
      "Epic sadface: Username is required",
    );
  });
});
