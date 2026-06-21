import { test, expect } from '../fixtures/dummyjson-fixtures';

test.describe('DummyJSON carts API', () => {
  test('should get cart by id', async ({ dummyJsonRequest }) => {
    const response = await dummyJsonRequest.get('/carts/1');

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.id).toBe(1);
    expect(Array.isArray(body.products)).toBe(true);
    expect(body.products.length).toBeGreaterThan(0);
    expect(body.total).toBeGreaterThan(0);
    expect(body.userId).toBeTruthy();
  });
});
