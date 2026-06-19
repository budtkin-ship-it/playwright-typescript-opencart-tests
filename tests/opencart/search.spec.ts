import { test, expect } from '@playwright/test';

test.describe('OpenCart product search', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should find product by search query', async ({ page }) => {
        await page.locator('input[name="search"]').fill('iPhone');
        await page.locator('#search button').click();

        await expect(page).toHaveURL(/search=iPhone/);
        await expect(page.locator('div[id="content"] h1')).toHaveText('Search - iPhone');
        await expect(page.locator('.product-layout')).toContainText('iPhone');
    });

    test('should find product by partial search query', async ({ page }) => {
        await page.locator('input[name="search"]').fill('iPh');
        await page.locator('#search button').click();

        await expect(page).toHaveURL(/search=iPh/);
        await expect(page.locator('div[id="content"] h1')).toHaveText('Search - iPh');
        await expect(page.locator('.product-layout')).toContainText('iPhone');
    });

    test('should open product details from search results', async ({ page }) => {
        await page.locator('input[name="search"]').fill('iPhone');
        await page.locator('#search button').click();

        const productLink = page.locator('.product-layout h4 a', { hasText: 'iPhone' });

        await productLink.click();

        await expect(page.locator('div[id="content"] h1')).toHaveText('iPhone');
        await expect(page).toHaveURL(/product_id=40/);
    });
});
