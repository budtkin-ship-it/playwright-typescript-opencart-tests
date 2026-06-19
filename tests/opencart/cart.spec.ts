import { test } from '@playwright/test';
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

        await productPage.expectProductName('iPhone');

        await productPage.addToCart();

        await productPage.expectProductAdded('iPhone');

        const cartPage = await miniCart.openCartPage();

        await cartPage.expectProductVisible('iPhone');
    });
});
