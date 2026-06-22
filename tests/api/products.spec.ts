import { test, expect } from '../fixtures/dummyjson-fixtures';

// dummyJsonRequest is our small API fixture.
// It keeps the DummyJSON baseURL in one place, so tests can stay cleaner.
test.describe('DummyJSON products API', () => {
  test('should return products matching search query', async ({ dummyJsonRequest }) => {
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
    expect(typeof body.title).toBe('string');
    expect(body.title.trim().length).toBeGreaterThan(0);
    expect(body.price).toBeGreaterThan(0);
    expect(typeof body.category).toBe('string');
    expect(body.category.trim().length).toBeGreaterThan(0);
  });

  test('should add product', async ({ dummyJsonRequest }) => {
    const productData = {
      title: 'Test Automation Product',
      price: 99,
      description: 'Product created from Playwright API test',
      category: 'test',
    };

    const response = await dummyJsonRequest.post('/products/add', {
      data: productData,
    });

    expect(response.status()).toBe(201);

    const body = await response.json();

    expect(body.id).toBeGreaterThan(0);
    expect(body.title).toBe(productData.title);
    expect(body.price).toBe(productData.price);
    expect(body.description).toBe(productData.description);
    expect(body.category).toBe(productData.category);
  });

  test('should return not found for non-existing product id', async ({ dummyJsonRequest }) => {
    const response = await dummyJsonRequest.get('/products/999999');

    expect(response.status()).toBe(404);

    const body = await response.json();

    expect(body.message).toContain('not found');
  });
});
