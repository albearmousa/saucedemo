import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutOverviewPage } from "../pages/CheckoutOverviewPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { CheckoutCompletePage } from "../pages/CheckoutCompletePage";

test.describe("Checkout Overview Page Tests", () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;
  let checkoutOverviewPage: CheckoutOverviewPage;
  let checkoutCompletePage: CheckoutCompletePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    checkoutOverviewPage = new CheckoutOverviewPage(page);
    checkoutCompletePage = new CheckoutCompletePage(page);

    await loginPage.goTo();
    await loginPage.login("standard_user", "secret_sauce");
    await expect(inventoryPage.title).toHaveText("Products");
    await inventoryPage.addToCart("Sauce Labs Backpack");
    await inventoryPage.addToCart("Sauce Labs Bike Light");
    await expect(inventoryPage.cartBadge).toHaveText("2");
    await inventoryPage.openCart();
    await expect(cartPage.title).toHaveText("Your Cart");
    await cartPage.openCheckout();
    await checkoutPage.fillCheckoutForm("John", "Doe", "12345");
    await expect(checkoutOverviewPage.title).toContainText(
      "Checkout: Overview",
    );
  });

  test("user can see the items and finish the request", async () => {
    await checkoutOverviewPage.finishCheckout();
    await expect(checkoutCompletePage.title).toContainText(
      "Checkout: Complete!",
    );
    await expect(checkoutCompletePage.completeHeader).toContainText(
      "Thank you for your order!",
    );

    await checkoutCompletePage.goBackProducts();
    await expect(inventoryPage.title).toHaveText("Products");

  
  });
});
