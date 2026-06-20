import { test, expect } from '../fixtures/opencart-fixtures';

test.describe('OpenCart product search', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should find product by search query', async ({ header }) => {
        const searchResultsPage = await header.searchFor('iPhone');
        await searchResultsPage.expectLoadedFor('iPhone');
        await searchResultsPage.expectProductVisible('iPhone');
    });

    test('should find product by partial search query', async ({ header }) => {
        const searchResultsPage = await header.searchFor('iPh');
        await searchResultsPage.expectLoadedFor('iPh');
        await searchResultsPage.expectProductVisible('iPhone');
    });

    test('should open product details from search results', async ({ page, header }) => {
        const searchResultsPage = await header.searchFor('iPhone');
        const productPage = await searchResultsPage.openProduct('iPhone');

        await productPage.expectProductName('iPhone');
        await expect(page).toHaveURL(/product_id=40/);
    });
});
