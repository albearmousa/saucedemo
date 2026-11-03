import { test, expect } from "../fixtures";

test.describe("Inventory functionality", () => {
  test("user can add an item to the cart", async ({ loggedInIventoryPage }) => {
    await loggedInIventoryPage.addToCart("Sauce Labs Backpack");
    await expect(loggedInIventoryPage.cartBadge).toHaveText("1");
  });

  test("user can add two items to the cart", async ({
    loggedInIventoryPage,
  }) => {
    await loggedInIventoryPage.addToCart("Sauce Labs Backpack");
    await loggedInIventoryPage.addToCart("Sauce Labs Bike Light");
    await expect(loggedInIventoryPage.cartBadge).toHaveText("2");
  });

  test("user can remove an item from the cart", async ({
    loggedInIventoryPage,
  }) => {
    await loggedInIventoryPage.addToCart("Sauce Labs Backpack");
    await loggedInIventoryPage.removeFromCart("Sauce Labs Backpack");
    await expect(loggedInIventoryPage.cartBadge).toBeHidden();
  });

  test("user can sort products by price low to high", async ({
    loggedInIventoryPage,
  }) => {
    await loggedInIventoryPage.sortBy("lohi");
    const pricesText = await loggedInIventoryPage.itemPrices.allTextContents();

    const prices = pricesText.map((price) =>
      parseFloat(price.replace("$", "")),
    );
    const sortedPrices = [...prices].sort((a, b) => a - b);

    expect(prices).toEqual(sortedPrices);
  });
});
