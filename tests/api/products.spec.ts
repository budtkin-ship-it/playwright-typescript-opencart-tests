import { test, expect } from '../fixtures/dummyjson-fixtures';

// dummyJsonRequest is our small API fixture.
// It keeps the DummyJSON baseURL in one place, so tests can stay cleaner.
test.describe('DummyJSON products API', () => {
  test('should search products by query', async ({ dummyJsonRequest }) => {
    const response = await dummyJsonRequest.get('/products/search?q=phone');

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(Array.isArray(body.products)).toBe(true);
    expect(body.products.length).toBeGreaterThan(0);

    const hasPhoneProduct = body.products.some((product: { title: string }) =>
      product.title.toLowerCase().includes('phone')
    );

    expect(hasPhoneProduct).toBe(true);
  });

  test('should get product by id', async ({ dummyJsonRequest }) => {
    const response = await dummyJsonRequest.get('/products/1');

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.id).toBe(1);
    expect(body.title).toBeTruthy();
    expect(body.price).toBeGreaterThan(0);
    expect(body.category).toBeTruthy();
  });
});
