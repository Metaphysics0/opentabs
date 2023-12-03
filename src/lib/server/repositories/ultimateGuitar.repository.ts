import { BaseRepository } from './base.repostiory';

export class UltimateGuitarRepository extends BaseRepository implements ResourceRepository {
	async search(searchText: string): Promise<any[]> {
		try {
			const url = this.createSearchUrl(searchText);
			const document = await this.scraper.fetchAndGetDocument(url);
			const searchResults = this.getSearchResultsFromDocument(document);

			return searchResults.map(this.convertDataToSearchResultSchema);
		} catch (error) {
			this.logSearchError(error);
			return [];
		}
	}

	private getSearchResultsFromDocument(document: Document): UltimateGuitarSearchResult[] {
		const content = document.getElementsByClassName('js-store')[0].getAttribute('data-content');
		if (!content) {
			throw new Error('UltimateGuitar search error: unable to find js-store from page request');
		}

		try {
			return JSON.parse(content)?.store?.page?.data?.results;
		} catch (error) {
			console.error(error);
			throw new Error('Error parsing JSON content from ultimate guitar');
		}
	}

	private convertDataToSearchResultSchema(data: UltimateGuitarSearchResult): SearchResult {
		return {
			artistName: data.artist_name,
			songTitle: data.song_name,
			originUrl: data.tab_url,
			origin: SupportedResources.ULTIMATE_GUITAR,
			metadata: data
		};
	}

	private createSearchUrl(searchText: string) {
		return `https://www.ultimate-guitar.com/search.php?title=${searchText}&page=1&type=500`;
	}
}

interface UltimateGuitarSearchResult {
	id: number;
	song_id: number;
	song_name: string;
	artist_id: number;
	artist_name: string;
	type: string;
	part: string;
	version: number;
	votes: number;
	difficulty: string;
	rating: number;
	date: string;
	status: string;
	preset_id: number;
	tab_access_type: string;
	tp_version: number;
	tonality_name: string;
	version_description?: any;
	verified: number;
	recording: {
		is_acoustic: number;
		tonality_name: string;
		performance?: any;
		recording_artists: any[];
	};
	artist_url: string;
	tab_url: string;
}
