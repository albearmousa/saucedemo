import { test, expect } from "../fixtures";

test.describe("Inventory functionality", () => {
  test("user can add an item to the cart", async ({
    loggedInInventoryPage,
  }) => {
    await loggedInInventoryPage.addToCart("Sauce Labs Backpack");
    await expect(loggedInInventoryPage.cartBadge).toHaveText("1");
  });

  test("user can add two items to the cart", async ({
    loggedInInventoryPage,
  }) => {
    await loggedInInventoryPage.addToCart("Sauce Labs Backpack");
    await loggedInInventoryPage.addToCart("Sauce Labs Bike Light");
    await expect(loggedInInventoryPage.cartBadge).toHaveText("2");
  });

  test("user can remove an item from the cart", async ({
    loggedInInventoryPage,
  }) => {
    await loggedInInventoryPage.addToCart("Sauce Labs Backpack");
    await loggedInInventoryPage.removeFromCart("Sauce Labs Backpack");
    await expect(loggedInInventoryPage.cartBadge).toBeHidden();
  });

  test("user can sort products by price low to high", async ({
    loggedInInventoryPage,
  }) => {
    await loggedInInventoryPage.sortBy("lohi");
    const pricesText = await loggedInInventoryPage.itemPrices.allTextContents();

    const prices = pricesText.map((price) =>
      parseFloat(price.replace("$", "")),
    );
    const sortedPrices = [...prices].sort((a, b) => a - b);

    expect(prices).toEqual(sortedPrices);
  });
});
