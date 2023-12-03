import { ScraperService } from '../services/scraper.service';
import Fetcher from '../utils/fetch';

export class GuitarProTabsNetRepository implements ResourceRepository {
	constructor(
		private fetcher = new Fetcher(),
		private scraper = new ScraperService()
	) {}

	async search(query: string) {
		try {
			const url = this.createSearchUrl(query);
			const response = await this.fetcher.fetchWithRandomUserAgent(url);
			const document = await this.scraper.convertResponseTextToDocument(response);
			const searchResultsHtml = document
				.getElementsByTagName('tbody')[0]
				.getElementsByTagName('tr');

			return Array.from(searchResultsHtml).map(this.extractInformationFromSearchResultItem);
			return [];
		} catch (error) {
			console.error('error getting search results from UltimateProTabs.org', error);
			return [];
		}
	}

	private extractInformationFromSearchResultItem(item: HTMLTableRowElement) {
		const tdElements = item.getElementsByTagName('td');
		const [guitarProVersion, songNameAndArtist, album, viewCount] = Array.from(tdElements).map(
			(a) => a.textContent
		);
		/* NEED TO IMPLEMENT  */
		// const downloadLink = tdElements?.[1]?.getElementsByTagName('a')[0]?.getAttribute('href');

		return {
			guitarProVersion,
			songNameAndArtist,
			album,
			viewCount
		};
	}

	private createSearchUrl(query: string) {
		return `https://www.guitarprotabs.net/q-${query}`;
	}
}
