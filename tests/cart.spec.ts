import { test, expect } from "../fixtures";

test.describe("Cart with items", () => {
  test.beforeEach(async ({ loggedInInventoryPage, cartPage }) => {
    await loggedInInventoryPage.addToCart("Sauce Labs Backpack");
    await loggedInInventoryPage.addToCart("Sauce Labs Bike Light");
    await expect(loggedInInventoryPage.cartBadge).toHaveText("2");
    await loggedInInventoryPage.openCart();
    await expect(cartPage.title).toHaveText("Your Cart");
  });

  test("user can see added items in the cart", async ({ cartPage }) => {
    await expect(cartPage.items).toHaveCount(2);
    await expect(cartPage.itemNames).toHaveText([
      "Sauce Labs Backpack",
      "Sauce Labs Bike Light",
    ]);
  });

  test("user can remove an item from the cart", async ({ cartPage }) => {
    await cartPage.removeItem("Sauce Labs Backpack");
    await expect(cartPage.items).toHaveCount(1);
    await expect(cartPage.itemNames).toHaveText(["Sauce Labs Bike Light"]);
  });

  test("user can go back to the inventory page with continue shopping", async ({
    page,
    cartPage,
  }) => {
    await cartPage.continueShopping();
    await expect(page).toHaveURL("/inventory.html");
  });
});

test.describe("Empty cart", () => {
  test.beforeEach(async ({ loggedInInventoryPage, cartPage }) => {
    await loggedInInventoryPage.openCart();
    await expect(cartPage.title).toHaveText("Your Cart");
  });

  test("user sees no items when the cart is empty", async ({ cartPage }) => {
    await expect(cartPage.items).toHaveCount(0);
  });
});
