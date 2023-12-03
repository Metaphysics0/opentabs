import { BaseRepository } from './base.repostiory';

export class UltimateGuitarRepository extends BaseRepository implements ResourceRepository {
	async search(searchText: string): Promise<any[]> {
		try {
			const url = this.createSearchUrl(searchText);
			const document = await this.scraper.fetchAndGetDocument(url);
			return this.getSearchResultsFromDocument(document);
		} catch (error) {
			this.logSearchError(error);
			return [];
		}
	}

	private getSearchResultsFromDocument(document: Document) {
		const content = document.getElementsByClassName('js-store')[0].getAttribute('data-content');
		if (!content) {
			throw new Error('UltimateGuitar search error: unable to find js-store from page request');
		}
		return JSON.parse(content)?.store?.page?.data?.results;
	}

	private createSearchUrl(searchText: string) {
		return `https://www.ultimate-guitar.com/search.php?title=${searchText}&page=1&type=500`;
	}
}
