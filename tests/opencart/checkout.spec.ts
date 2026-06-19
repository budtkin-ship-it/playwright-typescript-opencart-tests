import { test, expect } from '@playwright/test';
import HeaderComponent from '../../src/opencart/components/header.component';
import SearchResultsPage from '../../src/opencart/pages/search-results.page';
import MiniCartComponent from '../../src/opencart/components/mini-cart.component';

test.describe('OpenCart checkout', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should navigate to checkout from cart with added product', async ({ page }) => {
    const header = new HeaderComponent(page);
    const searchResultsPage = new SearchResultsPage(page);
    const miniCart = new MiniCartComponent(page);

    await header.searchFor('iPhone');
    const productPage = await searchResultsPage.openProduct('iPhone');

    const addToCartButton = page.locator('#button-cart');

    await expect(addToCartButton).toBeVisible();
    await expect(addToCartButton).toBeEnabled();

    await productPage.addToCart();

    await expect(page.locator('.alert-success')).toContainText(
      'Success: You have added iPhone to your shopping cart!'
    );

    await expect(page.locator('#cart-total')).toContainText('1 item(s)');

    const cartPage = await miniCart.openCartPage();

    await cartPage.expectProductsCount(1);
    await cartPage.expectProductVisible('iPhone');
    await cartPage.proceedToCheckout();

    await expect(page).toHaveURL(/route=checkout\/checkout/);
    await expect(page.locator('div[id="checkout-checkout"] h1')).toHaveText('Checkout');
  });
});
