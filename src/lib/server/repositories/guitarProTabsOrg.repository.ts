import { ScraperService } from '../services/scraper.service';
import Fetcher from '../utils/fetch';

export class GuitarProTabsOrgRepository implements ResourceRepository {
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
		} catch (error) {
			console.error('error getting search results from UltimateProTabs.org', error);
			return [];
		}
	}

	private extractInformationFromSearchResultItem(item: HTMLTableRowElement) {
		const tdElements = item.getElementsByTagName('td');
		const [songName, artist, fileExtension, downloadCount] = Array.from(tdElements).map(
			(a) => a.textContent
		);
		const downloadLink =
			tdElements?.[0]?.getElementsByTagName('a')[0]?.getAttribute('href') + 'download';

		return {
			songName,
			artist,
			fileExtension,
			downloadCount,
			downloadLink
		};
	}

	private createSearchUrl(query: string) {
		return `https://guitarprotabs.org/search.php?search=${query}&in=songs&page=1`;
	}
}
