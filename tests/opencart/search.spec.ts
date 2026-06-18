import { test, expect } from '@playwright/test';

test.describe('OpenCart product search', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://opencart.abstracta.us/');
  });

  test('should find product by search query', async ({ page }) => {
    await page.locator('input[name="search"]').fill('iPhone');
    await page.locator('#search button').click();

    await expect(page).toHaveURL(/search=iPhone/);
    await expect(page.locator('div[id="content"] h1')).toHaveText('Search - iPhone');
    await expect(page.locator('.product-layout')).toContainText('iPhone');
  });
});