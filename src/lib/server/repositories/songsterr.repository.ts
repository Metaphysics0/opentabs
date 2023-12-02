import Fetcher from '../utils/fetch';

export class SongsterrRepository {
	async search(searchText: string) {
		const url = this.createSongsterrSearchUrl(searchText);
		const searchResponse = await new Fetcher().fetch(url);

		return searchResponse.json();
	}

	private createSongsterrSearchUrl(searchText: string) {
		const baseUrl = `https://www.songsterr.com/api/songs?size=${this.MAX_SEARCH_RESULTS}&pattern=`;
		return baseUrl + searchText;
	}

	private MAX_SEARCH_RESULTS = 50;
}
