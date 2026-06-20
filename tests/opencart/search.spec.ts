import { test, expect } from '@playwright/test';
import HeaderComponent from '../../src/opencart/components/header.component';

test.describe('OpenCart product search', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should find product by search query', async ({ page }) => {
        const header = new HeaderComponent(page);

        const searchResultsPage = await header.searchFor('iPhone');
        await searchResultsPage.expectLoadedFor('iPhone');
        await searchResultsPage.expectProductVisible('iPhone');
    });

    test('should find product by partial search query', async ({ page }) => {
        const header = new HeaderComponent(page);

        const searchResultsPage = await header.searchFor('iPh');
        await searchResultsPage.expectLoadedFor('iPh');
        await searchResultsPage.expectProductVisible('iPhone');
    });

    test('should open product details from search results', async ({ page }) => {
        const header = new HeaderComponent(page);

        const searchResultsPage = await header.searchFor('iPhone');
        const productPage = await searchResultsPage.openProduct('iPhone');

        await productPage.expectProductName('iPhone');
        await expect(page).toHaveURL(/product_id=40/);
    });
});
