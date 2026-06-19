import { Locator, Page } from '@playwright/test';
import ProductPage from './product.page';

export default class SearchResultsPage {
  private readonly productLinks: Locator;

  constructor(private readonly page: Page) {
    this.productLinks = this.page.locator('.product-layout h4 a');
  }

  async openProduct(productName: string): Promise<ProductPage> {
    const productLink = this.productLinks.filter({ hasText: productName });

    await Promise.all([
      this.page.waitForURL(/route=product\/product/),
      productLink.click(),
    ]);

    return new ProductPage(this.page);
  }
}
