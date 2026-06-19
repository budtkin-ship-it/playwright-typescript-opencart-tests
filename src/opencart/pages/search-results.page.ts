import { Page } from '@playwright/test';

export default class SearchResultsPage {
  constructor(private readonly page: Page) {}

  async openProduct(productName: string) {
    const productLink = this.page.locator('.product-layout h4 a', { hasText: productName });

    await Promise.all([
      this.page.waitForURL(/route=product\/product/),
      productLink.click(),
    ]);
  }
}
