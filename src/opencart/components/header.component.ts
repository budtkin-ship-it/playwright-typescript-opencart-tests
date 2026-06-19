import { Page } from '@playwright/test';

export default class HeaderComponent {
  constructor(private readonly page: Page) {}

  async searchFor(productName: string) {
    await this.page.locator('input[name="search"]').fill(productName);
    await this.page.locator('#search button').click();
  }
}
