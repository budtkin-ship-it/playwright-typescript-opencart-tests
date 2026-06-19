import { test, expect } from '@playwright/test';

test.describe('OpenCart checkout', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should navigate to checkout from cart with added product', async ({ page }) => {
    await page.locator('input[name="search"]').fill('iPhone');
    await page.locator('#search button').click();

    const productLink = page.locator('.product-layout h4 a', { hasText: 'iPhone' });

    await Promise.all([
      page.waitForURL(/route=product\/product/),
      productLink.click(),
    ]);

    const addToCartButton = page.locator('#button-cart');

    await expect(addToCartButton).toBeVisible();
    await expect(addToCartButton).toBeEnabled();

    await addToCartButton.click();

    await expect(page.locator('.alert-success')).toContainText(
      'Success: You have added iPhone to your shopping cart!'
    );

    await expect(page.locator('#cart-total')).toContainText('1 item(s)');

    await page.locator('#cart-total').click();
    await page.getByRole('link', { name: /View Cart/i }).click();

    const cartTable = page.locator('#content div.table-responsive table.table-bordered');
    const cartRows = cartTable.locator('tbody tr');

    await expect(cartRows).toHaveCount(1);

    const productNameLink = cartRows.first().locator('td').nth(1).locator('a');

    await expect(productNameLink).toHaveText('iPhone');

    await page.locator('#content').getByRole('link', { name: 'Checkout' }).click();

    await expect(page).toHaveURL(/route=checkout\/checkout/);
    await expect(page.locator('div[id="checkout-checkout"] h1')).toHaveText('Checkout');
  });
});
