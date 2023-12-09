import { SupportedResources } from '$lib/types/enums';
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

			return Array.from(searchResultsHtml)
				.map(this.convertDataToSearchResultSchema)
				.filter(this.isValidSearchResult);
		} catch (error) {
			this.logSearchError(error);
			return [];
		}
	}

	private convertDataToSearchResultSchema(item: HTMLTableRowElement): SearchResult {
		try {
			const tdElements = item.getElementsByTagName('td');
			const [songTitle, artistName, fileExtension, downloadCount] = Array.from(tdElements).map(
				(a) => a.textContent
			);
			const downloadLink =
				tdElements?.[0]?.getElementsByTagName('a')[0]?.getAttribute('href') + 'download';

			return {
				songTitle: songTitle!,
				artistName: artistName!,
				origin: SupportedResources.GUITAR_PRO_TABS_ORG,
				originUrl: downloadLink,
				metadata: {
					fileExtension,
					downloadCount
				}
			};
		} catch (error) {
			console.warn(`error extracting search result data from: ${item}`);
			// @ts-ignore
			return {};
		}
	}

	private createSearchUrl(query: string) {
		return `https://guitarprotabs.org/search.php?search=${query}&in=songs&page=1`;
	}
}
