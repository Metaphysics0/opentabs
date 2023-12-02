import Fetcher from '../utils/fetch';

export class UltimateGuitarRepository {
	async search(searchText: string) {
		const url = this.createSearchUrl(searchText);
		const searchResponse = await new Fetcher().fetch(url);

		const text = await searchResponse.text();
		console.log('RESPONSE TEXT', text);

		return [];
		// return searchResponse.json();
	}

	private createSearchUrl(searchText: string) {
		return `https://www.ultimate-guitar.com/search.php?title=${searchText}&page=1&type=500`;
	}
}
