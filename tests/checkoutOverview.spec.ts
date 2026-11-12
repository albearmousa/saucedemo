import { test, expect } from "../fixtures";

test.describe("Checkout Overview Page Tests", () => {
  test.beforeEach(
    async ({ cartWithItemsPage, checkoutPage, checkoutOverviewPage }) => {
      await cartWithItemsPage.openCheckout();
      await checkoutPage.fillCheckoutForm("John", "Doe", "12345");
      await expect(checkoutOverviewPage.title).toContainText(
        "Checkout: Overview",
      );
    },
  );

  test("user can see the items and finish the request", async ({
    checkoutCompletePage,
    loggedInInventoryPage,
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
    await expect(loggedInInventoryPage.title).toHaveText("Products");
  });
});
