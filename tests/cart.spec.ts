import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";

test.describe("Cart with items", () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    await loginPage.goTo();
    await loginPage.login("standard_user", "secret_sauce");
    await expect(inventoryPage.title).toHaveText("Products");
    await inventoryPage.addToCart("Sauce Labs Backpack");
    await inventoryPage.addToCart("Sauce Labs Bike Light");
    await expect(inventoryPage.cartBadge).toHaveText("2");
    await inventoryPage.openCart();
    await expect(cartPage.title).toHaveText("Your Cart");
  });

  test("user can see added items in the cart", async () => {
    await expect(cartPage.items).toHaveCount(2);
    await expect(cartPage.itemNames).toHaveText([
      "Sauce Labs Backpack",
      "Sauce Labs Bike Light",
    ]);
  });

  test("user can remove an item from the cart", async () => {
    await cartPage.removeItem("Sauce Labs Backpack");
    await expect(cartPage.items).toHaveCount(1);
    await expect(cartPage.itemNames).toHaveText(["Sauce Labs Bike Light"]);
  });

  test("user can go back to the inventory page with continue shopping", async ({
    page,
  }) => {
    await cartPage.continueShopping();
    await expect(page).toHaveURL("/inventory.html");
  });
});

test.describe("Empty cart", () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    await loginPage.goTo();
    await loginPage.login("standard_user", "secret_sauce");
    await expect(inventoryPage.title).toHaveText("Products");
    await inventoryPage.addToCart("Sauce Labs Backpack");
    await inventoryPage.addToCart("Sauce Labs Bike Light");
    await expect(inventoryPage.cartBadge).toHaveText("2");
    await inventoryPage.openCart();
    await expect(cartPage.title).toHaveText("Your Cart");
  });

  test("user sees no items when the cart is empty", async () => {
    await expect(cartPage.items).toHaveCount(0);
  });
});