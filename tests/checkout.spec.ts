import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";

test.describe("Checkout process", () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    await loginPage.goTo();
    await loginPage.login("standard_user", "secret_sauce");
    await expect(inventoryPage.title).toHaveText("Products");
    await inventoryPage.addToCart("Sauce Labs Backpack");
    await inventoryPage.addToCart("Sauce Labs Bike Light");
    await expect(inventoryPage.cartBadge).toHaveText("2");
    await inventoryPage.openCart();
    await expect(cartPage.title).toHaveText("Your Cart");
    await cartPage.openCheckout();
    await expect(checkoutPage.title).toHaveText("Checkout: Your Information");
  });

  test("user cannot continue with empty postal code", async () => {
    await checkoutPage.fillCheckoutForm("John", "Doe", "");
    await expect(checkoutPage.errorMsg).toContainText(
      "Postal Code is required",
    );
  });

  test("user cannot continue with empty first name", async () => {
    await checkoutPage.fillCheckoutForm("", "Doe", "12345");
    await expect(checkoutPage.errorMsg).toContainText("First Name is required");
  });

  test("user cannot continue with empty last name", async () => {
    await checkoutPage.fillCheckoutForm("John", "", "12345");
    await expect(checkoutPage.errorMsg).toContainText("Last Name is required");
  });

  test("user can cancel checkout and go back to cart page", async () => {
    await checkoutPage.cancelCheckout();
    await expect(cartPage.title).toHaveText("Your Cart");
  });
});
