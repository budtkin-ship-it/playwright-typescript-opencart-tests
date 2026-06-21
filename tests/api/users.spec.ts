import { test, expect } from '../fixtures/dummyjson-fixtures';

test.describe('DummyJSON users API', () => {
  test('should get user by id', async ({ dummyJsonRequest }) => {
    const response = await dummyJsonRequest.get('/users/1');

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.id).toBe(1);
    expect(body.firstName).toBeTruthy();
    expect(body.lastName).toBeTruthy();
    expect(body.email).toBeTruthy();
    expect(body.username).toBeTruthy();
  });
});
