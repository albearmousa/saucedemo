import { test, expect } from "../fixtures";

test.describe("Checkout Overview Page Tests", () => {
  test.beforeEach(
    async ({
      loggedInInventoryPage,
      cartPage,
      checkoutPage,
      checkoutOverviewPage,
    }) => {
      await loggedInInventoryPage.addToCart("Sauce Labs Backpack");
      await loggedInInventoryPage.addToCart("Sauce Labs Bike Light");
      await expect(loggedInInventoryPage.cartBadge).toHaveText("2");
      await loggedInInventoryPage.openCart();
      await expect(cartPage.title).toHaveText("Your Cart");
      await cartPage.openCheckout();
      await checkoutPage.fillCheckoutForm("John", "Doe", "12345");
      await expect(checkoutOverviewPage.title).toContainText(
        "Checkout: Overview",
      );
    },
  );

  test("user can see the items and finish the request", async ({
    checkoutCompletePage,
    inventoryPage,
    checkoutOverviewPage,
  }) => {
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
