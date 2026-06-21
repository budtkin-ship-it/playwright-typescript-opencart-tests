import { test, expect } from '@playwright/test';

test.describe('DummyJSON products API', () => {
  test('should search products by query', async ({ request }) => {
    const response = await request.get('https://dummyjson.com/products/search?q=phone');

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(Array.isArray(body.products)).toBe(true);
    expect(body.products.length).toBeGreaterThan(0);

    const hasPhoneProduct = body.products.some((product: { title: string }) =>
      product.title.toLowerCase().includes('phone')
    );

    expect(hasPhoneProduct).toBe(true);
  });

  test('should get product by id', async ({ request }) => {
    const response = await request.get('https://dummyjson.com/products/1');

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.id).toBe(1);
    expect(body.title).toBeTruthy();
    expect(body.price).toBeGreaterThan(0);
    expect(body.category).toBeTruthy();
  });
});
