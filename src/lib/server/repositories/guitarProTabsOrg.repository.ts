import { BaseRepository } from './base.repostiory';

export class GuitarProTabsOrgRepository extends BaseRepository implements ResourceRepository {
	constructor() {
		super();
	}

	async search(query: string) {
		try {
			const url = this.createSearchUrl(query);
			const document = await this.scraper.fetchAndGetDocument(url);
			const searchResultsHtml = document
				.getElementsByTagName('tbody')[0]
				.getElementsByTagName('tr');

			return Array.from(searchResultsHtml).map(this.extractInformationFromSearchResultItem);
		} catch (error) {
			this.logSearchError(error);
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
