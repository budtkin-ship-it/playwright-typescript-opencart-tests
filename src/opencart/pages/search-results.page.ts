import { expect, Locator, Page } from '@playwright/test';
import ProductPage from './product.page';

export default class SearchResultsPage {
  private readonly heading: Locator;
  private readonly productLinks: Locator;

  constructor(private readonly page: Page) {
    this.heading = this.page.locator('div[id="content"] h1');
    this.productLinks = this.page.locator('.product-layout h4 a');
  }

  async expectLoadedFor(searchQuery: string): Promise<void> {
    await expect(this.page).toHaveURL(url => url.searchParams.get('search') === searchQuery);
    await expect(this.heading).toHaveText(`Search - ${searchQuery}`);
  }

  async expectProductVisible(productName: string): Promise<void> {
    const productLink = this.productLinks.filter({ hasText: productName });

    await expect(productLink).toHaveText(productName);
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
