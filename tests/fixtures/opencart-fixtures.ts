import { test as base, expect } from '@playwright/test';
import HeaderComponent from '../../src/opencart/components/header.component';
import MiniCartComponent from '../../src/opencart/components/mini-cart.component';

type OpenCartFixtures = {
  header: HeaderComponent;
  miniCart: MiniCartComponent;
};

export const test = base.extend<OpenCartFixtures>({
  header: async ({ page }, use) => {
    await use(new HeaderComponent(page));
  },

  miniCart: async ({ page }, use) => {
    await use(new MiniCartComponent(page));
  },
});

export { expect };
