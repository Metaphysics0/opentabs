import { SupportedResources } from '$lib/types/enums';
import { BaseRepository } from './base.repostiory';

export class SongsterrRepository extends BaseRepository implements ResourceRepository {
	async search(searchText: string) {
		try {
			const url = this.createSearchUrl(searchText);
			const response = await this.scraper.fetchWithRandomUserAgent(url);
			const searchResults = (await response.json()) as SongsterrSearchResult[];

			return searchResults.map((searchResult) =>
				this.convertDataToSearchResultSchema(searchResult, searchText)
			);
		} catch (error) {
			this.logSearchError(error);
			return [];
		}
	}

	private convertDataToSearchResultSchema(
		data: SongsterrSearchResult,
		searchText: string
	): SearchResult {
		return {
			artistName: data.artist,
			songTitle: data.title,
			originUrl: `https://www.songsterr.com/?pattern=${searchText}`,
			origin: SupportedResources.SONGSTERR,
			metadata: data
		};
	}

	private createSearchUrl(searchText: string) {
		return `https://www.songsterr.com/api/songs?size=${this.MAX_SEARCH_RESULTS}&pattern=${searchText}`;
	}

	private MAX_SEARCH_RESULTS = 50;
}

/* this is the schema from songsterr's download API as of Dec 3 2023 */
interface SongsterrSearchResult {
	hasPlayer: boolean;
	artist: string;
	artistId: number;
	title: string;
	songId: number;
	defaultTrack: number;
	tracks: {
		tuning?: number[];
		tuningString?: string;
		instrumentId: number;
		dailyViews: number;
		views: number;
		difficulty?: string;
	}[];
}
