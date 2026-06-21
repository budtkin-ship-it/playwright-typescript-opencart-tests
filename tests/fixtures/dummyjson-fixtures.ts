import { test as base, expect, APIRequestContext } from '@playwright/test';

type DummyJsonFixtures = {
  dummyJsonRequest: APIRequestContext;
};

export const test = base.extend<DummyJsonFixtures>({
  dummyJsonRequest: async ({ playwright }, use) => {
    const apiContext = await playwright.request.newContext({
      baseURL: 'https://dummyjson.com',
    });

    await use(apiContext);
    await apiContext.dispose();
  },
});

export { expect };
