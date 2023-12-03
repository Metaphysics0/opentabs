import Fetcher from '../utils/fetch';

export class SongsterrRepository implements ResourceRepository {
	async search(searchText: string) {
		try {
			const url = this.createSearchUrl(searchText);
			const searchResponse = await new Fetcher().fetch(url);

			return searchResponse.json();
		} catch (error) {
			console.error('songsterr search failed', error);
			return [];
		}
	}

	private createSearchUrl(searchText: string) {
		return `https://www.songsterr.com/api/songs?size=${this.MAX_SEARCH_RESULTS}&pattern=${searchText}`;
	}

	private MAX_SEARCH_RESULTS = 50;
}
