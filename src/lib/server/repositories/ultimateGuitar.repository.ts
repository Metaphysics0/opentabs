import { ScraperService } from '../services/scraper.service';
import Fetcher from '../utils/fetch';

export class UltimateGuitarRepository implements ResourceRepository {
	constructor(
		private fetcher = new Fetcher(),
		private scraperService = new ScraperService()
	) {}

	async search(searchText: string): Promise<any[]> {
		try {
			const url = this.createSearchUrl(searchText);
			const response = await this.fetcher.fetchWithRandomUserAgent(url);
			const document = await this.scraperService.convertResponseTextToDocument(response);
			const content = document.getElementsByClassName('js-store')[0].getAttribute('data-content');
			if (!content) {
				console.error('scraping UG Url failed', url);
				throw new Error('UltimateGuitar search error: unable to find js-store from page request');
			}
			return JSON.parse(content)?.store?.page?.data?.results;
		} catch (error) {
			console.error('Ultimate guitar search failed:', error);
			return [];
		}
	}

	private createSearchUrl(searchText: string) {
		return `https://www.ultimate-guitar.com/search.php?title=${searchText}&page=1&type=500`;
	}
}
