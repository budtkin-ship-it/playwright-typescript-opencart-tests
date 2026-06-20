import { Locator, Page } from '@playwright/test';
import SearchResultsPage from '../pages/search-results.page';

export default class HeaderComponent {
  private readonly searchInput: Locator;
  private readonly searchButton: Locator;

  constructor(private readonly page: Page) {
    this.searchInput = this.page.locator('input[name="search"]');
    this.searchButton = this.page.locator('#search button');
  }

  async searchFor(productName: string): Promise<SearchResultsPage> {
    await this.searchInput.fill(productName);
    await this.searchButton.click();

    return new SearchResultsPage(this.page);
  }
}
