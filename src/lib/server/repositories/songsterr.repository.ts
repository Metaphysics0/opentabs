import { BaseRepository } from './base.repostiory';

export class SongsterrRepository extends BaseRepository implements ResourceRepository {
	async search(searchText: string) {
		try {
			const url = this.createSearchUrl(searchText);
			const searchResponse = await this.fetcher.fetchWithRandomUserAgent(url);

			return searchResponse.json();
		} catch (error) {
			this.logSearchError(error);
			return [];
		}
	}

	private createSearchUrl(searchText: string) {
		return `https://www.songsterr.com/api/songs?size=${this.MAX_SEARCH_RESULTS}&pattern=${searchText}`;
	}

	private MAX_SEARCH_RESULTS = 50;
}
