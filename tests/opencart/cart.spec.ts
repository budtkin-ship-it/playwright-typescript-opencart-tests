import { test, expect } from '@playwright/test';
import HeaderComponent from '../../src/opencart/components/header.component';
import SearchResultsPage from '../../src/opencart/pages/search-results.page';
import MiniCartComponent from '../../src/opencart/components/mini-cart.component';

test.describe('OpenCart cart', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should add product to cart from product details page', async ({ page }) => {
        const header = new HeaderComponent(page);
        const searchResultsPage = new SearchResultsPage(page);
        const miniCart = new MiniCartComponent(page);

        await header.searchFor('iPhone');
        const productPage = await searchResultsPage.openProduct('iPhone');

        await expect(page.locator('div[id="content"] h1')).toHaveText('iPhone');

        await productPage.addToCart();

        await expect(page.locator('.alert-success')).toContainText(
            'Success: You have added iPhone to your shopping cart!'
        );

        await miniCart.openCartPage();

        const cartTable = page.locator('#content table.table-bordered');
        const productNameLink = cartTable.locator('tbody tr td.text-left a', { hasText: 'iPhone' });

        await expect(productNameLink).toHaveText('iPhone');
    });
});
