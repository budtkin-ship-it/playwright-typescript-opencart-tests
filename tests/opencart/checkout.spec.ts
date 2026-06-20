import { test, expect } from '@playwright/test';
import HeaderComponent from '../../src/opencart/components/header.component';
import MiniCartComponent from '../../src/opencart/components/mini-cart.component';

test.describe('OpenCart checkout', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should navigate to checkout from cart with added product', async ({ page }) => {
    const header = new HeaderComponent(page);
    const miniCart = new MiniCartComponent(page);

    const searchResultsPage = await header.searchFor('iPhone');
    const productPage = await searchResultsPage.openProduct('iPhone');

    await productPage.expectAddToCartAvailable();

    await productPage.addToCart();

    await productPage.expectProductAdded('iPhone');

    await miniCart.expectItemsCount(1);

    const cartPage = await miniCart.openCartPage();

    await cartPage.expectProductsCount(1);
    await cartPage.expectProductVisible('iPhone');
    await cartPage.proceedToCheckout();

    await expect(page).toHaveURL(/route=checkout\/checkout/);
    await expect(page.locator('div[id="checkout-checkout"] h1')).toHaveText('Checkout');
  });
});
