import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";

test.describe("Inventory functionality", () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.goTo();
    await loginPage.login("standard_user", "secret_sauce");
    await expect(inventoryPage.title).toHaveText("Products");
  });

  test("user can add an item to the cart", async () => {
    await inventoryPage.addToCart("Sauce Labs Backpack");
    await expect(inventoryPage.cartBadge).toHaveText("1");
  });

  test("user can add two items to the cart", async () => {
    await inventoryPage.addToCart("Sauce Labs Backpack");
    await inventoryPage.addToCart("Sauce Labs Bike Light");
    await expect(inventoryPage.cartBadge).toHaveText("2");
  });

  test("user can remove an item from the cart", async () => {
    await inventoryPage.addToCart("Sauce Labs Backpack");
    await inventoryPage.removeFromCart("Sauce Labs Backpack");
    await expect(inventoryPage.cartBadge).toBeHidden();
  });

  test("user can sort products by price low to high", async () => {
    await inventoryPage.sortBy("lohi");
    const pricesText = await inventoryPage.itemPrices.allTextContents();

    const prices = pricesText.map((price) =>
      parseFloat(price.replace("$", "")),
    );
    const sortedPrices = [...prices].sort((a, b) => a - b);

    expect(prices).toEqual(sortedPrices);
  });
});
