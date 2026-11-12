import { test, expect } from "../fixtures";

test.describe("Cart with items", () => {
  test("user can see added items in the cart", async ({
    cartWithItemsPage,
  }) => {
    await expect(cartWithItemsPage.items).toHaveCount(2);
    await expect(cartWithItemsPage.itemNames).toHaveText([
      "Sauce Labs Backpack",
      "Sauce Labs Bike Light",
    ]);
  });

  test("user can remove an item from the cart", async ({
    cartWithItemsPage,
  }) => {
    await cartWithItemsPage.removeItem("Sauce Labs Backpack");
    await expect(cartWithItemsPage.items).toHaveCount(1);
    await expect(cartWithItemsPage.itemNames).toHaveText([
      "Sauce Labs Bike Light",
    ]);
  });

  test("user can go back to the inventory page with continue shopping", async ({
    page,
    cartWithItemsPage,
  }) => {
    await cartWithItemsPage.continueShopping();
    await expect(page).toHaveURL("/inventory.html");
  });
});

test.describe("Empty cart", () => {
  test.beforeEach(async ({ loggedInInventoryPage, cartPage }) => {
    await loggedInInventoryPage.openCart();
    await expect(cartPage.title).toHaveText("Your Cart");
  });

  test("user sees no items when the cart is empty", async ({
    loggedInInventoryPage,
  }) => {
    await expect(loggedInInventoryPage.items).toHaveCount(0);
  });
});
