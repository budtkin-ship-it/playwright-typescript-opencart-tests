import { test, expect } from '../fixtures/dummyjson-fixtures';

test.describe('DummyJSON users API', () => {
  test('should get user by id', async ({ dummyJsonRequest }) => {
    const response = await dummyJsonRequest.get('/users/1');

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.id).toBe(1);
    expect(typeof body.firstName).toBe('string');
    expect(body.firstName.trim().length).toBeGreaterThan(0);

    expect(typeof body.lastName).toBe('string');
    expect(body.lastName.trim().length).toBeGreaterThan(0);

    expect(typeof body.email).toBe('string');
    expect(body.email).toContain('@');

    expect(typeof body.username).toBe('string');
    expect(body.username.trim().length).toBeGreaterThan(0);
  });

  test('should return not found for non-existing user id', async ({ dummyJsonRequest }) => {
    const response = await dummyJsonRequest.get('/users/999999');

    expect(response.status()).toBe(404);

    const body = await response.json();

    expect(body.message).toContain('not found');
  });
});
