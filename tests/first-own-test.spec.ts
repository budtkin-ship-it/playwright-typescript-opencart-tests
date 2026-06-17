import { test, expect } from '@playwright/test';

test('open Playwright website and check title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  await expect(page).toHaveTitle(/Playwright/);
});

test('open example.com and check heading', async ({ page }) => {
  await page.goto('https://example.com/');

  await expect(page.getByRole('heading', { name: 'Example Domain' })).toBeVisible();
});