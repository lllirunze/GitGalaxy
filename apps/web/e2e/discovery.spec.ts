import { expect, test } from "@playwright/test";

test("searches a repository and opens its detail panel", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Explore the code/i })).toBeVisible();

  await page.getByRole("button", { name: "搜索已收录项目" }).click();
  await page.getByPlaceholder("Search repositories, languages, or topics").fill("react/react");
  await page.getByRole("option", { name: /^react\/react JavaScript/ }).click();

  const detail = page.getByRole("complementary", { name: "react/react 项目信息" });
  await expect(detail).toBeVisible();
  await expect(detail.getByRole("link", { name: /Open on GitHub/i })).toHaveAttribute("href", "https://github.com/react/react");
});

test("opens search with the keyboard shortcut", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Explore the code/i })).toBeVisible();
  await page.evaluate(() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true, bubbles: true })));
  await expect(page.getByRole("dialog", { name: "搜索 GitHub 项目" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog", { name: "搜索 GitHub 项目" })).toBeHidden();
});
