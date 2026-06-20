import { test } from '../fixtures/opencart-fixtures';

test.describe('OpenCart cart', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should add product to cart from product details page', async ({ header, miniCart }) => {
        const searchResultsPage = await header.searchFor('iPhone');
        const productPage = await searchResultsPage.openProduct('iPhone');

        await productPage.expectProductName('iPhone');

        await productPage.addToCart();

        await productPage.expectProductAdded('iPhone');

        const cartPage = await miniCart.openCartPage();

        await cartPage.expectProductVisible('iPhone');
    });
});
