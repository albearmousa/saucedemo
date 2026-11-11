import { test, expect } from "../fixtures";

test.describe("Logout", () => {
  test("user can logout", async ({
    loggedInInventoryPage,
    sideMenu,
    loginPage,
  }) => {
    await sideMenu.logout();
    await expect(loginPage.title).toContainText("Swag Labs");
  });
});
