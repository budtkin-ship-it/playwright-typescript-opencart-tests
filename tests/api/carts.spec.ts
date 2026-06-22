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
    expect(typeof body.userId).toBe('number');
    expect(body.userId).toBeGreaterThan(0);
  });

  test('should get carts by user id', async ({ dummyJsonRequest }) => {
    const response = await dummyJsonRequest.get('/carts/user/5');

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(Array.isArray(body.carts)).toBe(true);
    expect(body.carts.length).toBeGreaterThan(0);
    expect(body.total).toBeGreaterThan(0);

    const hasCartForExpectedUser = body.carts.some((cart: { userId: number }) =>
      cart.userId === 5
    );

    expect(hasCartForExpectedUser).toBe(true);
  });
});
