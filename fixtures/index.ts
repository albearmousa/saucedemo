import { test as base, expect } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { InventoryPage } from "../pages/inventoryPage";

type MyFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  loggedInIventoryPage: InventoryPage;
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },

  loggedInIventoryPage: async ({ loginPage, inventoryPage }, use) => {
    await loginPage.goTo("/");
    await loginPage.login("standard_user", "secret_sauce");
    await expect(inventoryPage.title).toContainText("Products");
    await use(inventoryPage);
  },
});

export { expect };
