import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";

test.describe("Login functionality", () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.goTo();
  });

  test("user can login with valid credentials", async ({ page }) => {
    await loginPage.login("standard_user", "secret_sauce");
    await expect(page).toHaveURL("/inventory.html");
    await expect(inventoryPage.title).toHaveText("Products");
  });

  test("user cannot login with invalid credentials", async ({}) => {
    await loginPage.login("standard_user", "secret_sauces");

    await expect(loginPage.errorMsg).toBeVisible();
    await expect(loginPage.errorMsg).toContainText(
      "Username and password do not match",
    );
  });

  test("user cannot login with locked out user", async ({}) => {
    await loginPage.login("locked_out_user", "secret_sauce");
    await expect(loginPage.errorMsg).toBeVisible();
    await expect(loginPage.errorMsg).toContainText(
      "this user has been locked out",
    );
  });
});
