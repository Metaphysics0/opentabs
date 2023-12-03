import { BaseRepository } from './base.repostiory';

export class UltimateGuitarRepository extends BaseRepository implements ResourceRepository {
	async search(searchText: string): Promise<any[]> {
		try {
			const url = this.createSearchUrl(searchText);
			const response = await this.fetcher.fetchWithRandomUserAgent(url);
			const document = await this.scraper.convertResponseTextToDocument(response);
			const content = document.getElementsByClassName('js-store')[0].getAttribute('data-content');
			if (!content) {
				console.error('scraping UG Url failed', url);
				throw new Error('UltimateGuitar search error: unable to find js-store from page request');
			}
			return JSON.parse(content)?.store?.page?.data?.results;
		} catch (error) {
			this.logSearchError(error);
			return [];
		}
	}

	private createSearchUrl(searchText: string) {
		return `https://www.ultimate-guitar.com/search.php?title=${searchText}&page=1&type=500`;
	}
}
