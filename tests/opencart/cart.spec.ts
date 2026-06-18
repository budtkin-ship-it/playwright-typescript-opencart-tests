import { test, expect } from '@playwright/test';

test.describe('OpenCart cart', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://opencart.abstracta.us/');
  });

  test('should add product to cart from product details page', async ({ page }) => {
    await page.locator('input[name="search"]').fill('iPhone');
    await page.locator('#search button').click();

    const productLink = page.locator('.product-layout h4 a', { hasText: 'iPhone' });

    await productLink.click();

    await expect(page.locator('div[id="content"] h1')).toHaveText('iPhone');

    await page.locator('#button-cart').click();

    await expect(page.locator('.alert-success')).toContainText(
      'Success: You have added iPhone to your shopping cart!'
    );

    await page.locator('#cart-total').click();
    await page.getByRole('link', { name: /View Cart/ }).click();

    await expect(page.locator('#content')).toContainText('iPhone');
  });
});