import { test, expect } from '@playwright/test';
import HeaderComponent from '../../src/opencart/components/header.component';
import SearchResultsPage from '../../src/opencart/pages/search-results.page';

test.describe('OpenCart cart', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should add product to cart from product details page', async ({ page }) => {
        const header = new HeaderComponent(page);
        const searchResultsPage = new SearchResultsPage(page);

        await header.searchFor('iPhone');
        await searchResultsPage.openProduct('iPhone');

        await expect(page.locator('div[id="content"] h1')).toHaveText('iPhone');

        await page.locator('#button-cart').click();

        await expect(page.locator('.alert-success')).toContainText(
            'Success: You have added iPhone to your shopping cart!'
        );

        await page.locator('#cart-total').click();
        await page.getByRole('link', { name: /View Cart/ }).click();

        const cartTable = page.locator('#content table.table-bordered');
        const productNameLink = cartTable.locator('tbody tr td.text-left a', { hasText: 'iPhone' });

        await expect(productNameLink).toHaveText('iPhone');
    });
});
