import { test, expect } from '@playwright/test';

test('Playwright homepage should have correct title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  await expect(page).toHaveTitle(/Playwright/);
});

test('Example.com page should have correct heading', async ({ page }) => {
  await page.goto('https://example.com/');

  await expect(page.getByRole('heading', { name: 'Example Domain' })).toBeVisible();
});