import { test, expect } from '../fixtures/dummyjson-fixtures';

// dummyJsonRequest is our small API fixture.
// It keeps the DummyJSON baseURL in one place, so tests can stay cleaner.
test.describe('DummyJSON products API', () => {
  test('should search products by query parameter', async ({ dummyJsonRequest }) => {
    const response = await dummyJsonRequest.get('/products/search?q=iPhone');

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(Array.isArray(body.products)).toBe(true);
    expect(body.products.length).toBeGreaterThan(0);

    const hasExpectedProduct = body.products.some((product: { title: string }) =>
      product.title.includes('iPhone')
    );

    expect(hasExpectedProduct).toBe(true);
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

  test('should return not found for non-existing product id', async ({ dummyJsonRequest }) => {
    const response = await dummyJsonRequest.get('/products/999999');

    expect(response.status()).toBe(404);

    const body = await response.json();

    expect(body.message).toContain('not found');
  });
});
