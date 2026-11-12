import { test, expect } from "../fixtures";

test.describe("Checkout process", () => {
  test.beforeEach(async ({ cartWithItemsPage, checkoutPage }) => {
    await cartWithItemsPage.openCheckout();
    await expect(checkoutPage.title).toHaveText("Checkout: Your Information");
  });

  test("user cannot continue with empty postal code", async ({
    checkoutPage,
  }) => {
    await checkoutPage.fillCheckoutForm("John", "Doe", "");
    await expect(checkoutPage.errorMsg).toContainText(
      "Postal Code is required",
    );
  });

  test("user cannot continue with empty first name", async ({
    checkoutPage,
  }) => {
    await checkoutPage.fillCheckoutForm("", "Doe", "12345");
    await expect(checkoutPage.errorMsg).toContainText("First Name is required");
  });

  test("user cannot continue with empty last name", async ({
    checkoutPage,
  }) => {
    await checkoutPage.fillCheckoutForm("John", "", "12345");
    await expect(checkoutPage.errorMsg).toContainText("Last Name is required");
  });

  test("user can cancel checkout and go back to cart page", async ({
    checkoutPage,
    cartPage,
  }) => {
    await checkoutPage.cancelCheckout();
    await expect(cartPage.title).toHaveText("Your Cart");
  });
});
