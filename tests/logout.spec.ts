import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { SideMenu } from "../pages/components/sideMenu";

test.describe("Checkout Overview Page Tests", () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let sideMenu: SideMenu;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    sideMenu = new SideMenu(page);

    await loginPage.goTo();
    await loginPage.login("standard_user", "secret_sauce");
    await expect(inventoryPage.title).toHaveText("Products");
  });

  test("user can logout", async () => {
    await sideMenu.logout();
    await expect(loginPage.title).toContainText("Swag Labs");
  });
});
