import { test as base, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { CheckoutCompletePage } from "../pages/CheckoutCompletePage";
import { CheckoutOverviewPage } from "../pages/CheckoutOverviewPage";
import { SideMenu } from "../pages/components/SideMenu";
import { users } from "../test-data/users";
import { products } from "../test-data/products";

type MyFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  loggedInInventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  checkoutCompletePage: CheckoutCompletePage;
  checkoutOverviewPage: CheckoutOverviewPage;
  sideMenu: SideMenu;
  cartWithItemsPage: CartPage;
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  checkoutCompletePage: async ({ page }, use) => {
    await use(new CheckoutCompletePage(page));
  },
  checkoutOverviewPage: async ({ page }, use) => {
    await use(new CheckoutOverviewPage(page));
  },
  sideMenu: async ({ page }, use) => {
    await use(new SideMenu(page));
  },

  loggedInInventoryPage: async ({ loginPage, inventoryPage }, use) => {
    await loginPage.goTo("/");
    await loginPage.login(users.standard);
    await expect(inventoryPage.title).toContainText("Products");
    await use(inventoryPage);
  },

  cartWithItemsPage: async ({ loggedInInventoryPage, cartPage }, use) => {
    await loggedInInventoryPage.addToCart(products.backpack);
    await loggedInInventoryPage.addToCart(products.bikeLight);
    await expect(loggedInInventoryPage.cartBadge).toHaveText("2");
    await loggedInInventoryPage.openCart();
    await expect(cartPage.title).toHaveText("Your Cart");
    await use(cartPage);
  },
});




export { expect };
